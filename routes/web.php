<?php

use App\Http\Controllers\AchievementController;
use App\Http\Controllers\AnalyticsDashboardController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\JournalEntryController;
use App\Http\Controllers\PricingController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Http\Controllers\ConfirmedTwoFactorAuthenticationController;
use Laravel\Fortify\Http\Controllers\RecoveryCodeController;
use Laravel\Fortify\Http\Controllers\TwoFactorAuthenticationController;
use Laravel\Fortify\Http\Controllers\TwoFactorQrCodeController;
use Laravel\Fortify\Http\Controllers\TwoFactorSecretKeyController;
use Laravel\Socialite\Facades\Socialite;

Route::pattern('locale', 'en|es');

Route::group([
    'prefix' => '{locale}',
    'where' => [
        'locale' => implode('|', config('app.supported_locales', ['es', 'en'])),
    ],
], function () {

    // Home route
    Route::get('/', function () {
        if (request()->getQueryString() !== null) {
            $canonicalHome = route('home', ['locale' => app()->getLocale()], absolute: false);

            return redirect($canonicalHome);
        }

        // Load pricing plans with billing options
        $pricingPlans = \App\Models\PricingPlan::query()
            ->active()
            ->public()
            ->with('billingOptions')
            ->orderBy('display_order')
            ->get()
            ->mapWithKeys(function ($plan) {
                $defaultOption = $plan->billingOptions
                    ->where('is_default', true)
                    ->first() ?? $plan->billingOptions->first();

                return [
                    $plan->slug => [
                        'name' => $plan->name(),
                        'price' => $defaultOption ? $defaultOption->calculateFinalPrice(false) : 0,
                        'currency' => $defaultOption?->currency ?? 'USD',
                        'billing_cycle' => $defaultOption?->billing_cycle_slug ?? 'monthly',
                    ],
                ];
            });

        return Inertia::render('welcome', [
            'pricingPlans' => $pricingPlans,
        ]);
    })->name('home');

    // Página de prueba para diagnosticar idioma
    Route::get('/test-home', function () {
        return Inertia::render('test-home', [
            'currentLocale' => app()->getLocale(),
            'configLocale' => config('app.locale'),
            'routeLocale' => request()->route()->parameter('locale'),
            'cookieLocale' => request()->cookie('locale'),
            'availableLanguages' => \App\Models\Language::getActiveLanguages(),
        ]);
    })->name('test-home');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/dashboard', function () {
            $recentTrades = auth()->user()
                ->journalEntries()
                ->latest('trade_date')
                ->limit(5)
                ->get()
                ->map(fn ($entry) => [
                    'id' => $entry->id,
                    'symbol' => $entry->symbol,
                    'direction' => $entry->direction instanceof \BackedEnum ? $entry->direction->value : $entry->direction,
                    'asset_type' => $entry->asset_type instanceof \BackedEnum ? $entry->asset_type->value : $entry->asset_type,
                    'pnl' => $entry->pnl,
                    'pnl_percentage' => $entry->pnl_percentage,
                    'trade_date' => $entry->trade_date->format('Y-m-d'),
                    'is_closed' => $entry->isClosed(),
                    'is_profitable' => $entry->isProfitable(),
                ]);

            return Inertia::render('dashboard', [
                'recentTrades' => $recentTrades,
            ]);
        })->name('dashboard');

        // Journal routes
        // Exportaciones - Solo Pro+ (automatización avanzada)
        Route::middleware('feature:use-advanced-automation')->group(function () {
            Route::get('/journal/export/csv', [JournalEntryController::class, 'exportCsv'])->name('journal.export.csv');
            Route::get('/journal/export/pdf', [JournalEntryController::class, 'exportPdf'])->name('journal.export.pdf');
        });

        Route::get('/journal', [JournalEntryController::class, 'index'])->name('journal.index');
        Route::resource('journal', JournalEntryController::class)->except(['index']);

        // Achievements - Solo planes pagados (Managed+)
        Route::middleware('feature:is-paid-plan')->group(function () {
            Route::get('/achievements', [AchievementController::class, 'index'])->name('achievements.index');
        });

        // Analytics avanzadas - Solo Pro+
        Route::middleware('feature:use-advanced-analytics')->group(function () {
            Route::get('/analytics', [AnalyticsDashboardController::class, 'index'])->name('analytics.index');
        });

        // Feedback route (anyone can submit)
        Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');

        // Public pricing API
        Route::get('/api/pricing', [PricingController::class, 'index'])->name('pricing.index');
        Route::get('/api/pricing/{planType}', [PricingController::class, 'show'])->name('pricing.show');

        // Public pricing page
        Route::get('/pricing', function () {
            return Inertia::render('pricing/index', [
                'auth' => [
                    'user' => auth()->user() ? [
                        'plan' => auth()->user()->plan,
                    ] : null,
                ],
            ]);
        })->name('pricing');

    });

    Route::get('/login-google', function () {
        return Socialite::driver('google')->redirect();
    })->name('login.google');

    Route::get('/google-callback', function () {
        $googleUser = Socialite::driver('google')->stateless()->user();

        // Buscar o crear el usuario
        $user = App\Models\User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'email_verified_at' => now(),
                'google_id' => $googleUser->getId(),
                'password' => null, // Los usuarios OAuth no necesitan password
            ]
        );

        // Asegurar que tenga plan asignado (por si el evento creating no se ejecutó)
        if (empty($user->pricing_plan_id) || empty($user->plan)) {
            $freePlanId = cache()->remember('pricing_plan_free_id', 3600, function () {
                return App\Models\PricingPlan::query()->where('slug', 'free')->value('id');
            });

            if ($freePlanId) {
                $user->update([
                    'pricing_plan_id' => $freePlanId,
                    'plan' => 'free',
                    'plan_started_at' => now(),
                ]);
            }
        }

        $user->ensureDefaultRole();

        // Iniciar sesion con el usuario encontrado o creado
        Auth::login($user, true);

        return redirect()->route('dashboard');
    })->name('google.callback');

    require __DIR__.'/settings.php';
    require __DIR__.'/auth.php';

    // Telegram configuration (Admin only)
    Route::middleware(['auth', 'permission:admin.manage'])->group(function () {
        Route::get('/admin/telegram-config', [App\Http\Controllers\Admin\TelegramConfigController::class, 'index'])->name('admin.telegram-config');
        Route::post('/admin/telegram-config', [App\Http\Controllers\Admin\TelegramConfigController::class, 'update'])->name('admin.telegram-config.update');
        Route::post('/admin/telegram-config/test', [App\Http\Controllers\Admin\TelegramConfigController::class, 'test'])->name('admin.telegram-config.test');
    });

    // Telegram webhook (public)
    Route::post('/telegram/webhook', [App\Http\Controllers\Admin\TelegramConfigController::class, 'webhook'])->name('telegram.webhook');
});

Route::get('/login-google', function () {
    return redirect()->route('login.google', ['locale' => app()->getLocale() ?? config('app.locale')]);
});

Route::get('/google-callback', function () {
    $locale = app()->getLocale() ?? config('app.locale');

    return redirect()->route('google.callback', array_merge(
        ['locale' => $locale],
        request()->query()
    ));
});

if (Features::enabled(Features::twoFactorAuthentication())) {
    $authMiddleware = config('fortify.auth_middleware', 'auth').':'.config('fortify.guard');

    $twoFactorMiddleware = Features::optionEnabled(Features::twoFactorAuthentication(), 'confirmPassword')
        ? [$authMiddleware, 'password.confirm']
        : [$authMiddleware];

    Route::post('user/two-factor-authentication', [TwoFactorAuthenticationController::class, 'store'])
        ->middleware($twoFactorMiddleware)
        ->name('two-factor.enable');

    Route::post('user/confirmed-two-factor-authentication', [ConfirmedTwoFactorAuthenticationController::class, 'store'])
        ->middleware($twoFactorMiddleware)
        ->name('two-factor.confirm');

    Route::delete('user/two-factor-authentication', [TwoFactorAuthenticationController::class, 'destroy'])
        ->middleware($twoFactorMiddleware)
        ->name('two-factor.disable');

    Route::get('user/two-factor-qr-code', [TwoFactorQrCodeController::class, 'show'])
        ->middleware($twoFactorMiddleware)
        ->name('two-factor.qr-code');

    Route::get('user/two-factor-secret-key', [TwoFactorSecretKeyController::class, 'show'])
        ->middleware($twoFactorMiddleware)
        ->name('two-factor.secret-key');

    Route::get('user/two-factor-recovery-codes', [RecoveryCodeController::class, 'index'])
        ->middleware($twoFactorMiddleware)
        ->name('two-factor.recovery-codes');

    Route::post('user/two-factor-recovery-codes', [RecoveryCodeController::class, 'store'])
        ->middleware($twoFactorMiddleware)
        ->name('two-factor.regenerate-recovery-codes');

    // Public invitation routes (no locale prefix)
    Route::get('invite/{code}', [\App\Http\Controllers\InvitationRedemptionController::class, 'show'])->name('invitation.show');
    Route::post('invite/{code}/redeem', [\App\Http\Controllers\InvitationRedemptionController::class, 'redeem'])
        ->middleware('auth')
        ->name('invitation.redeem');
}

// Root redirect to locale with trailing slash
Route::get('/', function () {
    $locale = app()->getLocale() ?? config('app.locale');

    request()->query->replace([]);
    request()->server->set('QUERY_STRING', '');

    $localizedHome = route('home', ['locale' => $locale], absolute: false);

    return redirect($localizedHome);
});

// Affiliate referral redirect with trailing slash
Route::get('ref/{code}', function (string $code) {
    $locale = app()->getLocale() ?? config('app.locale');

    return redirect("/{$locale}/?ref={$code}");
})->name('affiliate.legacy');
