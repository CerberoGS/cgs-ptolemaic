<?php

use App\Http\Controllers\Settings\AffiliateController;
use App\Http\Controllers\Settings\WaitlistController;
use App\Http\Controllers\Settings\IntegrationsController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\PlanController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\TrialCardController;
use App\Http\Controllers\Settings\TrialController;
use App\Http\Controllers\Settings\TwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->prefix('settings')->group(function () {
    Route::get('/', function () {
        return redirect()->route('profile.edit');
    })->name('settings.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/password', [PasswordController::class, 'edit'])->name('password.edit');

    Route::put('/password', [PasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('password.update');

    Route::get('/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance.edit');

    Route::get('/two-factor', [TwoFactorAuthenticationController::class, 'show'])
        ->name('two-factor.show');

    Route::get('/plan', PlanController::class)->name('settings.plan.show');

    Route::post('/trial/managed', [TrialController::class, 'storeManaged'])->name('settings.trial.managed');

    Route::post('/trial/pro', [TrialController::class, 'storePro'])->name('settings.trial.pro');

    Route::post('/trial/add-card', [TrialCardController::class, 'store'])->name('settings.trial.add-card');

    Route::get('/integrations', [IntegrationsController::class, 'index'])
        ->middleware('plan.integrations')
        ->name('settings.integrations.index');

            Route::get('/affiliate', [AffiliateController::class, 'index'])->name('settings.affiliate.index');
            Route::post('/affiliate/redeem-discount', [AffiliateController::class, 'redeemDiscount'])->name('settings.affiliate.redeem-discount');
            Route::post('/affiliate/copy-link', [AffiliateController::class, 'copyLink'])->name('settings.affiliate.copy-link');
            
            // Waitlist management
            Route::post('/waitlist', [WaitlistController::class, 'store'])->name('settings.waitlist.store');
            Route::delete('/waitlist', [WaitlistController::class, 'destroy'])->name('settings.waitlist.destroy');
            Route::get('/waitlist/status', [WaitlistController::class, 'status'])->name('settings.waitlist.status');
});
