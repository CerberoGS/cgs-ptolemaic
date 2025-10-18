<?php

namespace App\Providers;

use App\Enums\PlanType;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->loadViewsFrom(base_path('vendor/laravel/passport/resources/views'), 'passport');

        Passport::tokensCan([
            'mcp:use' => 'Use MCP server integrations.',
        ]);

        Passport::setDefaultScope([]);
        Passport::viewNamespace('passport');

        // ============================================
        // GATES - PLAN BASED (Business Features)
        // ============================================

        // Integrations
        Gate::define('access-integrations', function (User $user) {
            return $user->canAccessProviderIntegrations();
        });

        Gate::define('manage-own-api-keys', function (User $user) {
            return $user->canManageProviderKeys();
        });

        Gate::define('use-managed-keys', function (User $user) {
            return $user->usesManagedProviderKeys() && ! $user->hasTrialExpired();
        });

        // AI Features
        Gate::define('use-ai-analysis', function (User $user) {
            return $user->canUseFeature('integrations.view');
        });

        Gate::define('use-advanced-automation', function (User $user) {
            return $user->canUseFeature('automation.advanced');
        });

        Gate::define('use-advanced-analytics', function (User $user) {
            return $user->canUseFeature('analytics.advanced');
        });

        // Plan Checks
        Gate::define('is-paid-plan', function (User $user) {
            return $user->plan->isPaid();
        });

        Gate::define('has-active-trial', function (User $user) {
            return $user->isOnTrial();
        });

        // Usage Limits
        Gate::define('within-daily-limit', function (User $user) {
            if (! $user->usesManagedProviderKeys()) {
                return true; // No limits for BYOK plans
            }

            $limit = $user->managedDailyLimit();
            if ($limit === null) {
                return true;
            }

            // TODO: Implement usage tracking
            // $todayUsage = $user->getTodayUsageCount();
            // return $todayUsage < $limit;

            return true; // Placeholder
        });

        // ============================================
        // GATES - COMBINED (Plan + Permission)
        // ============================================

        // Admin access requires both permission AND active plan
        Gate::define('access-admin-features', function (User $user) {
            return $user->hasPermissionTo('admin.dashboard')
                && ! $user->hasTrialExpired();
        });

        // Feedback management (Managers with paid plan OR Staff plan)
        Gate::define('manage-feedback', function (User $user) {
            if ($user->plan === PlanType::Staff || $user->plan === PlanType::Internal) {
                return true;
            }

            return $user->hasPermissionTo('feedback.manage')
                && $user->plan->isPaid();
        });
    }
}
