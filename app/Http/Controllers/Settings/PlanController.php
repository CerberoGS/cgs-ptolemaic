<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\PricingPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlanController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $currentPlanSlug = $user?->planOrDefault() ?? 'free';
        $currentPlanModel = $user?->currentPlan();
        $isAdmin = $user?->hasRole('Admin') ?? false;

        // Get upgrade prompt from flash session (set by RequiresFeature middleware)
        $upgradePrompt = session('upgrade_prompt');

        // Get all active public plans (or include internal if admin)
        $plans = PricingPlan::query()
            ->active()
            ->with(['features', 'billingOptions'])
            ->when(! $isAdmin, function ($query) {
                // Non-admins only see public plans
                $query->public();
            })
            ->orderBy('display_order')
            ->get()
            ->map(function (PricingPlan $plan) use ($currentPlanSlug): array {
                $dailyLimit = $plan->features
                    ->where('key', 'daily_analysis_limit')
                    ->first()?->pivot?->limit_value;

                $monthlyLimit = $plan->features
                    ->where('key', 'monthly_analysis_limit')
                    ->first()?->pivot?->limit_value;

                $features = $plan->features
                    ->filter(fn ($feature) => $feature->pivot->is_enabled)
                    ->map(function ($feature): string {
                        $description = $feature->description();

                        // If feature has a limit, append it to the description
                        if ($feature->pivot->limit_value !== null) {
                            $description .= ' ('.number_format($feature->pivot->limit_value).')';
                        }

                        return $description;
                    })
                    ->values();

                // Get default billing option price (monthly or first available)
                $defaultBillingOption = $plan->billingOptions
                    ->where('is_default', true)
                    ->first() ?? $plan->billingOptions->first();

                $price = $defaultBillingOption
                    ? $defaultBillingOption->calculateFinalPrice(false)
                    : 0;

                return [
                    'type' => $plan->slug,
                    'label' => $plan->name(),
                    'price' => $price,
                    'summary' => $plan->tagline(),
                    'features' => $features,
                    'description' => $plan->description(),
                    'canAccessIntegrations' => $plan->features->where('key', 'access_integrations')->first()?->pivot?->is_enabled ?? false,
                    'canManageProviderKeys' => $plan->features->where('key', 'manage_own_api_keys')->first()?->pivot?->is_enabled ?? false,
                    'usesManagedKeys' => $plan->features->where('key', 'use_managed_keys')->first()?->pivot?->is_enabled ?? false,
                    'hasUsageLimits' => $dailyLimit !== null || $monthlyLimit !== null,
                    'usageLimits' => [
                        'daily' => $dailyLimit,
                        'monthly' => $monthlyLimit,
                    ],
                    'isCurrent' => $plan->slug === $currentPlanSlug,
                    'isInternal' => in_array($plan->slug, ['internal', 'staff']),
                    'emoji' => $plan->emoji,
                    'accentColor' => $plan->accent_color,
                    'tagline' => $plan->tagline(),
                ];
            })
            ->values();

        return Inertia::render('settings/plan', [
            'currentPlan' => [
                'type' => $currentPlanSlug,
                'label' => $currentPlanModel?->name() ?? ucfirst($currentPlanSlug),
                'description' => $currentPlanModel?->description() ?? '',
                'isTrial' => $user?->isOnTrial() ?? false,
                'trialEndsAt' => $user?->trial_ends_at?->toIso8601String(),
                'canManageProviderKeys' => $user?->canManageProviderKeys() ?? false,
                'usesManagedKeys' => $user?->usesManagedProviderKeys() ?? false,
                'managedLimits' => [
                    'daily' => $user?->managedDailyLimit(),
                    'monthly' => $user?->managedMonthlyLimit(),
                ],
                'isInternal' => in_array($currentPlanSlug, ['internal', 'staff']),
                'emoji' => $currentPlanModel?->emoji ?? '👤',
                'accentColor' => $currentPlanModel?->accent_color ?? 'gray',
                'tagline' => $currentPlanModel?->tagline() ?? '',
            ],
            'plans' => $plans,
            'upgradeOrder' => config('plans.upgrade_order'),
            'upgrade_prompt' => $upgradePrompt,
        ]);
    }
}
