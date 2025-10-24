<?php

namespace App\Models\Concerns;

use App\Models\PricingPlan;
use Illuminate\Support\Facades\Cache;

trait HasPlanFeatures
{
    /**
     * Get current plan (cached 30 minutes)
     */
    public function currentPlan(): ?PricingPlan
    {
        return Cache::remember(
            "user.{$this->id}.current_plan",
            now()->addMinutes(30),
            fn () => PricingPlan::where('slug', $this->plan)->first()
        );
    }

    /**
     * Check if user has a specific feature
     */
    public function hasFeature(string $featureKey): bool
    {
        $plan = $this->currentPlan();

        return $plan?->hasFeature($featureKey) ?? false;
    }

    /**
     * Get feature limit value
     */
    public function getFeatureLimit(string $featureKey): ?int
    {
        $plan = $this->currentPlan();

        return $plan?->getFeatureLimit($featureKey);
    }

    /**
     * Get feature value (generic)
     */
    public function getFeatureValue(string $featureKey, string $type = 'limit')
    {
        $plan = $this->currentPlan();

        return $plan?->getFeatureValue($featureKey, $type);
    }

    /**
     * Check if user can use a feature (with limit check)
     */
    public function canUseFeature(string $featureKey, ?int $requiredValue = null): bool
    {
        if (! $this->hasFeature($featureKey)) {
            return false;
        }

        if ($requiredValue !== null) {
            $limit = $this->getFeatureLimit($featureKey);

            // null = unlimited
            return $limit === null || $limit >= $requiredValue;
        }

        return true;
    }

    /**
     * Sync Spatie role when plan changes
     */
    public function syncPlanRole(): void
    {
        $plan = $this->currentPlan();

        if ($plan && $plan->role) {
            // Remove all plan roles first
            $planRoles = \Spatie\Permission\Models\Role::where('name', 'like', 'plan:%')->get();
            $this->roles()->detach($planRoles->pluck('id'));

            // Assign new plan role
            $this->syncRoles([$plan->role]);

            // Clear cache
            Cache::forget("user.{$this->id}.current_plan");
        }
    }

    /**
     * Check if user has unlimited access to a feature
     */
    public function hasUnlimitedFeature(string $featureKey): bool
    {
        if (! $this->hasFeature($featureKey)) {
            return false;
        }

        $limit = $this->getFeatureLimit($featureKey);

        return $limit === null; // null = unlimited
    }

    /**
     * Get remaining usage for a limited feature
     */
    public function getRemainingUsage(string $featureKey, int $currentUsage): ?int
    {
        $limit = $this->getFeatureLimit($featureKey);

        if ($limit === null) {
            return null; // unlimited
        }

        return max(0, $limit - $currentUsage);
    }

    /**
     * Check if user is close to limit (80%)
     */
    public function isApproachingLimit(string $featureKey, int $currentUsage, float $threshold = 0.8): bool
    {
        $limit = $this->getFeatureLimit($featureKey);

        if ($limit === null) {
            return false; // unlimited
        }

        return $currentUsage >= ($limit * $threshold);
    }
}
