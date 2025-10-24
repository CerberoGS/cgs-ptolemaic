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

            // Invitations management (admin only)
            Route::middleware('permission:invitations.manage')->group(function () {
                Route::get('/invitations', [\App\Http\Controllers\Admin\InvitationController::class, 'index'])->name('invitations.index');
                Route::get('/invitations/create', [\App\Http\Controllers\Admin\InvitationController::class, 'create'])->name('invitations.create');
                Route::post('/invitations', [\App\Http\Controllers\Admin\InvitationController::class, 'store'])->name('invitations.store');
                Route::get('/invitations/{invitation}', [\App\Http\Controllers\Admin\InvitationController::class, 'show'])->name('invitations.show');
                Route::put('/invitations/{invitation}', [\App\Http\Controllers\Admin\InvitationController::class, 'update'])->name('invitations.update');
                Route::delete('/invitations/{invitation}', [\App\Http\Controllers\Admin\InvitationController::class, 'destroy'])->name('invitations.destroy');
            });

            // Pricing management (admin only)
            Route::middleware('permission:pricing.manage')->group(function () {
                Route::get('/pricing', [AdminPricingController::class, 'index'])->name('pricing.index');
                Route::get('/pricing/{pricingPlan}/edit', [AdminPricingController::class, 'edit'])->name('pricing.edit');
                Route::put('/pricing/{pricingPlan}', [AdminPricingController::class, 'update'])->name('pricing.update');
                Route::post('/pricing/{pricingPlan}/toggle-offer', [AdminPricingController::class, 'toggleOffer'])->name('pricing.toggle-offer');
                Route::post('/pricing/{pricingPlan}/toggle-scarcity', [AdminPricingController::class, 'toggleScarcity'])->name('pricing.toggle-scarcity');
                Route::post('/pricing/{pricingPlan}/increment-scarcity', [AdminPricingController::class, 'incrementScarcity'])->name('pricing.increment-scarcity');
                Route::post('/pricing/{pricingPlan}/reset-scarcity', [AdminPricingController::class, 'resetScarcity'])->name('pricing.reset-scarcity');
            });

            // Language management (admin only)
            Route::middleware('permission:languages.manage')->group(function () {
                Route::resource('languages', \App\Http\Controllers\Admin\LanguageController::class);
                Route::post('/languages/{language}/toggle-active', [\App\Http\Controllers\Admin\LanguageController::class, 'toggleActive'])->name('languages.toggle-active');
                Route::post('/languages/{language}/set-default', [\App\Http\Controllers\Admin\LanguageController::class, 'setDefault'])->name('languages.set-default');
            });

            // Affiliate management (admin only)
            Route::middleware('permission:affiliate.manage')->group(function () {
                Route::get('/affiliate', [AdminAffiliateController::class, 'index'])->name('affiliate.index');
                Route::get('/affiliate/codes', [AdminAffiliateController::class, 'codes'])->name('affiliate.codes');
                Route::get('/affiliate/referrals', [AdminAffiliateController::class, 'referrals'])->name('affiliate.referrals');
                Route::get('/affiliate/rewards', [AdminAffiliateController::class, 'rewards'])->name('affiliate.rewards');
                Route::post('/affiliate/reward-config', [AdminAffiliateController::class, 'updateRewardConfig'])->name('affiliate.reward-config');
                Route::post('/affiliate/codes/{affiliateCode}/toggle', [AdminAffiliateController::class, 'toggleCodeStatus'])->name('affiliate.codes.toggle');
                Route::put('/affiliate/referrals/{referral}/status', [AdminAffiliateController::class, 'updateReferralStatus'])->name('affiliate.referrals.status');
                Route::put('/affiliate/rewards/{reward}/status', [AdminAffiliateController::class, 'updateRewardStatus'])->name('affiliate.rewards.status');
            });

            // Waitlist management (admin only)
            Route::middleware('permission:admin.dashboard')->group(function () {
                Route::get('/waitlist', [AdminWaitlistController::class, 'index'])->name('waitlist.index');
                Route::put('/waitlist/{waitlistEntry}/status', [AdminWaitlistController::class, 'updateStatus'])->name('waitlist.status');
                Route::delete('/waitlist/{waitlistEntry}', [AdminWaitlistController::class, 'destroy'])->name('waitlist.destroy');
            });
        });
