<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Http\Controllers\ConfirmablePasswordController;
use Laravel\Fortify\Http\Controllers\ConfirmedTwoFactorAuthenticationController;
use Laravel\Fortify\Http\Controllers\RecoveryCodeController;
use Laravel\Fortify\Http\Controllers\TwoFactorAuthenticatedSessionController;
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
                return Inertia::render('dashboard');
            })->name('dashboard');
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
