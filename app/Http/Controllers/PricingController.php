<?php

namespace App\Http\Controllers;

use App\Models\PricingPlan;

class PricingController extends Controller
{
    /**
     * Display all pricing plans
     */
    public function index()
    {
        $pricingPlans = PricingPlan::active()
            ->orderBy('plan_type')
            ->get()
            ->map(function ($plan) {
                return [
                    'plan_type' => $plan->plan_type,
                    'plan_name' => $plan->getPlanTypeEnum()->label(),
                    'price_monthly' => $plan->price_monthly,
                    'price_yearly' => $plan->price_yearly,
                    'offer_active' => $plan->isOfferActive(),
                    'offer_name' => $plan->offer_name,
                    'offer_description' => $plan->offer_description,
                    'offer_price_monthly' => $plan->offer_price_monthly,
                    'offer_price_yearly' => $plan->offer_price_yearly,
                    'offer_starts_at' => $plan->offer_starts_at?->toISOString(),
                    'offer_ends_at' => $plan->offer_ends_at?->toISOString(),
                    'discount_percentage' => $plan->getDiscountPercentage(),
                    'time_remaining' => $plan->getTimeRemaining()?->toISOString(),
                    'scarcity_active' => $plan->canShowScarcity(),
                    'scarcity_message' => $plan->getScarcityMessage(),
                    'scarcity_percentage' => $plan->getScarcityPercentage(),
                    'remaining_slots' => $plan->getRemainingSlots(),
                    'current_price_monthly' => $plan->getCurrentPrice('monthly'),
                    'current_price_yearly' => $plan->getCurrentPrice('yearly'),
                ];
            });

        return response()->json([
            'pricing_plans' => $pricingPlans,
        ]);
    }

    /**
     * Display a specific pricing plan
     */
    public function show(string $planType)
    {
        $pricingPlan = PricingPlan::active()
            ->where('plan_type', $planType)
            ->firstOrFail();

        return response()->json([
            'pricing_plan' => [
                'plan_type' => $pricingPlan->plan_type,
                'plan_name' => $pricingPlan->getPlanTypeEnum()->label(),
                'price_monthly' => $pricingPlan->price_monthly,
                'price_yearly' => $pricingPlan->price_yearly,
                'offer_active' => $pricingPlan->isOfferActive(),
                'offer_name' => $pricingPlan->offer_name,
                'offer_description' => $pricingPlan->offer_description,
                'offer_price_monthly' => $pricingPlan->offer_price_monthly,
                'offer_price_yearly' => $pricingPlan->offer_price_yearly,
                'offer_starts_at' => $pricingPlan->offer_starts_at?->toISOString(),
                'offer_ends_at' => $pricingPlan->offer_ends_at?->toISOString(),
                'discount_percentage' => $pricingPlan->getDiscountPercentage(),
                'time_remaining' => $pricingPlan->getTimeRemaining()?->toISOString(),
                'scarcity_active' => $pricingPlan->canShowScarcity(),
                'scarcity_message' => $pricingPlan->getScarcityMessage(),
                'scarcity_percentage' => $pricingPlan->getScarcityPercentage(),
                'remaining_slots' => $pricingPlan->getRemainingSlots(),
                'current_price_monthly' => $pricingPlan->getCurrentPrice('monthly'),
                'current_price_yearly' => $pricingPlan->getCurrentPrice('yearly'),
            ],
        ]);
    }
}
