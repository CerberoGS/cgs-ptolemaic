<?php

use App\Http\Controllers\AchievementController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminProviderController;
use App\Http\Controllers\Admin\AdminRoleController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\UserPlanController;
use App\Http\Controllers\AnalyticsDashboardController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\JournalEntryController;
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
    'prefix' => '{locale?}',
    'where' => [
        'locale' => implode('|', config('app.supported_locales', ['es', 'en'])),
    ],
    'defaults' => [
        'locale' => config('app.locale'),
    ],
], function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

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
        Route::get('/journal/export/csv', [JournalEntryController::class, 'exportCsv'])->name('journal.export.csv');
        Route::get('/journal/export/pdf', [JournalEntryController::class, 'exportPdf'])->name('journal.export.pdf');
        Route::get('/journal', [JournalEntryController::class, 'index'])->name('journal.index');
        Route::resource('journal', JournalEntryController::class)->except(['index']);

        Route::get('/achievements', [AchievementController::class, 'index'])->name('achievements.index');
        Route::get('/analytics', [AnalyticsDashboardController::class, 'index'])->name('analytics.index');

        // Feedback route (anyone can submit)
        Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');

        Route::prefix('admin')->as('admin.')->group(function () {
            Route::get('/', AdminDashboardController::class)
                ->middleware('permission:admin.dashboard')
                ->name('dashboard');

            Route::middleware('permission:providers.view|providers.manage')->group(function () {
                Route::get('/providers', [AdminProviderController::class, 'index'])->name('providers.index');
            });

            Route::middleware('permission:providers.manage')->group(function () {
                Route::post('/providers', [AdminProviderController::class, 'store'])->name('providers.store');
                Route::put('/providers/{type}/{provider}', [AdminProviderController::class, 'update'])->name('providers.update');
                Route::delete('/providers/{type}/{provider}', [AdminProviderController::class, 'destroy'])->name('providers.destroy');
            });

            Route::middleware('permission:users.view')->group(function () {
                Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
            });

            Route::middleware('permission:users.manage')->group(function () {
                Route::put('/users/{user}/roles', [AdminUserController::class, 'updateRoles'])->name('users.roles.update');
                Route::put('/users/{user}/defaults', [AdminUserController::class, 'updateDefaults'])->name('users.defaults.update');
                Route::get('/users/{user}/plan', [UserPlanController::class, 'edit'])->name('users.plan.edit');
                Route::put('/users/{user}/plan', [UserPlanController::class, 'update'])->name('users.plan.update');
            });

            Route::middleware('permission:roles.view|roles.manage')->group(function () {
                Route::get('/roles', [AdminRoleController::class, 'index'])->name('roles.index');
            });

            Route::middleware('permission:roles.manage')->group(function () {
                Route::post('/roles', [AdminRoleController::class, 'store'])->name('roles.store');
                Route::put('/roles/{role}', [AdminRoleController::class, 'update'])->name('roles.update');
                Route::delete('/roles/{role}', [AdminRoleController::class, 'destroy'])->name('roles.destroy');
            });

            // Feedback management (admin only)
            Route::middleware('permission:feedback.manage')->group(function () {
                Route::get('/feedback', [\App\Http\Controllers\Admin\FeedbackController::class, 'index'])->name('feedback.index');
                Route::get('/feedback/{feedback}', [\App\Http\Controllers\Admin\FeedbackController::class, 'show'])->name('feedback.show');
                Route::put('/feedback/{feedback}', [\App\Http\Controllers\Admin\FeedbackController::class, 'update'])->name('feedback.update');
            });
        });
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

        $user->ensureDefaultRole();

        // Iniciar sesion con el usuario encontrado o creado
        Auth::login($user, true);

        return redirect()->route('dashboard');
    })->name('google.callback');

    require __DIR__.'/settings.php';
    require __DIR__.'/auth.php';
});

Route::get('/', function () {
    return Inertia::render('welcome');
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
}
