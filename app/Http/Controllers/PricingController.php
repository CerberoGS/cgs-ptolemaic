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
            ->public()
            ->with('billingOptions')
            ->orderBy('display_order')
            ->get()
            ->map(function ($plan) {
                $monthlyOption = $plan->activeBillingOptions->firstWhere('billing_cycle_slug', 'monthly');

                return [
                    'slug' => $plan->slug,
                    'name' => $plan->name(),
                    'tagline' => $plan->tagline(),
                    'description' => $plan->description(),
                    'emoji' => $plan->emoji,
                    'accent_color' => $plan->accent_color,
                    'is_featured' => $plan->is_featured,
                    'billing_options' => $plan->activeBillingOptions->map(function ($option) use ($monthlyOption) {
                        return [
                            'id' => $option->id,
                            'billing_cycle_slug' => $option->billing_cycle_slug,
                            'billing_cycle_name' => $option->name(),
                            'billing_months' => $option->billing_months,
                            'base_price' => (float) $option->base_price,
                            'currency' => $option->currency,
                            'has_autopay_discount' => $option->has_autopay_discount,
                            'autopay_discount_type' => $option->autopay_discount_type,
                            'autopay_discount_value' => $option->autopay_discount_value ? (float) $option->autopay_discount_value : null,
                            'upfront_discount_percentage' => $option->upfront_discount_percentage,
                            'setup_fee' => (float) $option->setup_fee,
                            'trial_days' => $option->trial_days,
                            'is_default' => $option->is_default,
                            'is_popular' => $option->is_popular,
                            'description' => $option->description(),
                            'highlight_text' => $option->highlightText(),
                            'final_price' => $option->calculateFinalPrice(false),
                            'final_price_with_autopay' => $option->calculateFinalPrice(true),
                            'monthly_equivalent' => $option->monthlyEquivalent(false),
                            'monthly_equivalent_with_autopay' => $option->monthlyEquivalent(true),
                            'savings_vs_monthly' => $monthlyOption ? $option->savingsVsMonthly((float) $monthlyOption->base_price, false) : 0,
                            'savings_percentage' => $monthlyOption ? $option->savingsPercentage((float) $monthlyOption->base_price, false) : 0,
                            'total_discount_percentage' => $option->totalDiscountPercentage(false),
                            'total_discount_percentage_with_autopay' => $option->totalDiscountPercentage(true),
                        ];
                    })->values(),
                ];
            });

        return response()->json([
            'pricing_plans' => $pricingPlans,
        ]);
    }

    /**
     * Display a specific pricing plan
     */
    public function show(string $slug)
    {
        $pricingPlan = PricingPlan::active()
            ->public()
            ->with('billingOptions')
            ->where('slug', $slug)
            ->firstOrFail();

        $monthlyOption = $pricingPlan->activeBillingOptions->firstWhere('billing_cycle_slug', 'monthly');

        return response()->json([
            'pricing_plan' => [
                'slug' => $pricingPlan->slug,
                'name' => $pricingPlan->name(),
                'tagline' => $pricingPlan->tagline(),
                'description' => $pricingPlan->description(),
                'emoji' => $pricingPlan->emoji,
                'accent_color' => $pricingPlan->accent_color,
                'is_featured' => $pricingPlan->is_featured,
                'billing_options' => $pricingPlan->activeBillingOptions->map(function ($option) use ($monthlyOption) {
                    return [
                        'id' => $option->id,
                        'billing_cycle_slug' => $option->billing_cycle_slug,
                        'billing_cycle_name' => $option->name(),
                        'billing_months' => $option->billing_months,
                        'base_price' => (float) $option->base_price,
                        'currency' => $option->currency,
                        'has_autopay_discount' => $option->has_autopay_discount,
                        'autopay_discount_type' => $option->autopay_discount_type,
                        'autopay_discount_value' => $option->autopay_discount_value ? (float) $option->autopay_discount_value : null,
                        'upfront_discount_percentage' => $option->upfront_discount_percentage,
                        'setup_fee' => (float) $option->setup_fee,
                        'trial_days' => $option->trial_days,
                        'is_default' => $option->is_default,
                        'is_popular' => $option->is_popular,
                        'description' => $option->description(),
                        'highlight_text' => $option->highlightText(),
                        'final_price' => $option->calculateFinalPrice(false),
                        'final_price_with_autopay' => $option->calculateFinalPrice(true),
                        'monthly_equivalent' => $option->monthlyEquivalent(false),
                        'monthly_equivalent_with_autopay' => $option->monthlyEquivalent(true),
                        'savings_vs_monthly' => $monthlyOption ? $option->savingsVsMonthly((float) $monthlyOption->base_price, false) : 0,
                        'savings_percentage' => $monthlyOption ? $option->savingsPercentage((float) $monthlyOption->base_price, false) : 0,
                        'total_discount_percentage' => $option->totalDiscountPercentage(false),
                        'total_discount_percentage_with_autopay' => $option->totalDiscountPercentage(true),
                    ];
                })->values(),
            ],
        ]);
    }
}
