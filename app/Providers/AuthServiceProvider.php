<?php

namespace App\Providers;

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
        // GATES - FLEXIBLE FEATURE SYSTEM
        // ============================================

        /**
         * Generic feature gate - check if user's plan has a specific feature
         * Usage: Gate::allows('feature', 'ai_analytics')
         */
        Gate::define('feature', function (User $user, string $featureKey) {
            return $user->hasFeature($featureKey);
        });

        /**
         * Feature with limit check - verify current usage is within limit
         * Usage: Gate::allows('feature.limit', ['daily_analysis_limit', $currentUsage])
         */
        Gate::define('feature.limit', function (User $user, string $featureKey, int $currentUsage) {
            $limit = $user->getFeatureLimit($featureKey);

            // null = unlimited
            if ($limit === null) {
                return true;
            }

            return $currentUsage <= $limit;
        });

        /**
         * Check if user can use a feature based on limit
         * Usage: Gate::allows('feature.can-use', ['daily_analysis_limit', $requiredAmount])
         */
        Gate::define('feature.can-use', function (User $user, string $featureKey, ?int $requiredAmount = null) {
            return $user->canUseFeature($featureKey, $requiredAmount);
        });

        // ============================================
        // GATES - SPECIFIC FEATURES (Convenience)
        // ============================================

        // AI & Analytics
        Gate::define('use-ai-analytics', function (User $user) {
            return $user->hasFeature('ai_analytics');
        });

        Gate::define('use-advanced-analytics', function (User $user) {
            return $user->hasFeature('advanced_analytics');
        });

        // Integrations
        Gate::define('use-own-api-keys', function (User $user) {
            return $user->hasFeature('own_api_keys');
        });

        Gate::define('use-managed-api-keys', function (User $user) {
            return $user->hasFeature('managed_api_keys');
        });

        Gate::define('use-custom-integrations', function (User $user) {
            return $user->hasFeature('custom_integrations');
        });

        // Support
        Gate::define('access-priority-support', function (User $user) {
            return $user->hasFeature('priority_support');
        });

        Gate::define('access-community-support', function (User $user) {
            return $user->hasFeature('community_support');
        });

        // Journal
        Gate::define('export-journal', function (User $user) {
            return $user->hasFeature('export_journal');
        });

        Gate::define('advanced-journal', function (User $user) {
            return $user->hasFeature('advanced_journal');
        });

        // Automation
        Gate::define('use-automation', function (User $user) {
            return $user->hasFeature('automation');
        });

        // Team
        Gate::define('manage-team', function (User $user) {
            $limit = $user->getFeatureLimit('team_members');

            return $limit !== null && $limit > 0;
        });

        // Admin & Internal
        Gate::define('access-admin-panel', function (User $user) {
            return $user->hasFeature('admin_panel_access');
        });

        // ============================================
        // GATES - PLAN CHECKS
        // ============================================

        Gate::define('is-paid-plan', function (User $user) {
            $plan = $user->currentPlan();

            return $plan && $plan->price_monthly > 0;
        });

        Gate::define('is-free-plan', function (User $user) {
            return $user->plan === 'free';
        });

        Gate::define('has-active-trial', function (User $user) {
            return $user->isOnTrial();
        });

        // ============================================
        // GATES - COMBINED (Feature + Permission)
        // ============================================

        // Feedback management (Staff/Internal plans OR has permission + feature)
        Gate::define('manage-feedback', function (User $user) {
            // Staff and Internal always have access
            if (in_array($user->plan, ['staff', 'internal'])) {
                return true;
            }

            // Check both Spatie permission and plan feature
            return $user->hasPermissionTo('feedback.manage')
                && $user->hasFeature('manage_feedback');
        });
    }
}
