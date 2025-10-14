<?php

namespace App\Http\Controllers\Settings;

use App\Enums\PlanType;
use App\Http\Controllers\Controller;
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
        $currentPlan = $user?->planOrDefault() ?? PlanType::default();

        $plans = collect(PlanType::cases())->map(
            function (PlanType $plan) use ($currentPlan): array {
                $dailyLimit = $plan->dailyUsageLimit();
                $monthlyLimit = $plan->monthlyUsageLimit();

                $features = collect($plan->features())
                    ->map(function (string $feature) use ($dailyLimit, $monthlyLimit): string {
                        return __($feature, [
                            'daily' => $dailyLimit !== null ? number_format($dailyLimit) : '',
                            'monthly' => $monthlyLimit !== null ? number_format($monthlyLimit) : '',
                        ]);
                    })
                    ->values();

                return [
                    'type' => $plan->value,
                    'label' => $plan->label(),
                    'price' => $plan->price(),
                    'summary' => $plan->summary(),
                    'features' => $features,
                    'description' => $plan->description(),
                    'canAccessIntegrations' => $plan->canAccessIntegrations(),
                    'canManageProviderKeys' => $plan->canManageProviderKeys(),
                    'usesManagedKeys' => $plan->usesManagedKeys(),
                    'hasUsageLimits' => $plan->hasUsageLimits(),
                    'usageLimits' => [
                        'daily' => $dailyLimit,
                        'monthly' => $monthlyLimit,
                    ],
                    'isCurrent' => $plan === $currentPlan,
                ];
            }
        )->values();

        return Inertia::render('settings/plan', [
            'currentPlan' => [
                'type' => $currentPlan->value,
                'label' => $currentPlan->label(),
                'description' => $currentPlan->description(),
                'isTrial' => $user?->isOnTrial() ?? false,
                'trialEndsAt' => $user?->trial_ends_at?->toIso8601String(),
                'canManageProviderKeys' => $user?->canManageProviderKeys() ?? false,
                'usesManagedKeys' => $user?->usesManagedProviderKeys() ?? false,
                'managedLimits' => [
                    'daily' => $user?->managedDailyLimit(),
                    'monthly' => $user?->managedMonthlyLimit(),
                ],
            ],
            'plans' => $plans,
            'upgradeOrder' => config('plans.upgrade_order'),
        ]);
    }
}
