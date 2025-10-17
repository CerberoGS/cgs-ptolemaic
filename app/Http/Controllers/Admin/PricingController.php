<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdatePricingPlanRequest;
use App\Models\PricingPlan;
use Inertia\Inertia;

class PricingController extends Controller
{
    /**
     * Display a listing of pricing plans
     */
    public function index()
    {
        $pricingPlans = PricingPlan::active()
            ->orderBy('plan_type')
            ->get()
            ->map(function ($plan) {
                return [
                    'id' => $plan->id,
                    'plan_type' => $plan->plan_type,
                    'plan_name' => $plan->getPlanTypeEnum()->label(),
                    'price_monthly' => $plan->price_monthly,
                    'price_yearly' => $plan->price_yearly,
                    'offer_active' => $plan->offer_active,
                    'offer_name' => $plan->offer_name,
                    'offer_price_monthly' => $plan->offer_price_monthly,
                    'offer_price_yearly' => $plan->offer_price_yearly,
                    'offer_starts_at' => $plan->offer_starts_at?->format('Y-m-d\TH:i'),
                    'offer_ends_at' => $plan->offer_ends_at?->format('Y-m-d\TH:i'),
                    'scarcity_active' => $plan->scarcity_active,
                    'scarcity_message' => $plan->scarcity_message,
                    'scarcity_limit' => $plan->scarcity_limit,
                    'scarcity_sold' => $plan->scarcity_sold,
                    'is_active' => $plan->is_active,
                    'discount_percentage' => $plan->getDiscountPercentage(),
                    'time_remaining' => $plan->getTimeRemaining()?->diffForHumans(),
                    'scarcity_percentage' => $plan->getScarcityPercentage(),
                    'remaining_slots' => $plan->getRemainingSlots(),
                ];
            });

        return Inertia::render('admin/pricing/index', [
            'pricingPlans' => $pricingPlans,
        ]);
    }

    /**
     * Show the form for editing a pricing plan
     */
    public function edit(string $locale, $pricingPlan)
    {
        // Handle both model binding and manual ID resolution
        if (is_string($pricingPlan) || is_numeric($pricingPlan)) {
            $pricingPlan = PricingPlan::findOrFail($pricingPlan);
        }
        return Inertia::render('admin/pricing/edit', [
            'pricingPlan' => [
                'id' => $pricingPlan->id,
                'plan_type' => $pricingPlan->plan_type,
                'plan_name' => $pricingPlan->getPlanTypeEnum()->label(),
                'price_monthly' => $pricingPlan->price_monthly,
                'price_yearly' => $pricingPlan->price_yearly,
                'offer_price_monthly' => $pricingPlan->offer_price_monthly,
                'offer_price_yearly' => $pricingPlan->offer_price_yearly,
                'offer_active' => $pricingPlan->offer_active,
                'offer_name' => $pricingPlan->offer_name,
                'offer_description' => $pricingPlan->offer_description,
                'offer_starts_at' => $pricingPlan->offer_starts_at?->format('Y-m-d\TH:i'),
                'offer_ends_at' => $pricingPlan->offer_ends_at?->format('Y-m-d\TH:i'),
                'scarcity_active' => $pricingPlan->scarcity_active,
                'scarcity_message' => $pricingPlan->scarcity_message,
                'scarcity_limit' => $pricingPlan->scarcity_limit,
                'scarcity_sold' => $pricingPlan->scarcity_sold,
                'is_active' => $pricingPlan->is_active,
            ],
        ]);
    }

    /**
     * Update the specified pricing plan
     */
    public function update(UpdatePricingPlanRequest $request, string $locale, $pricingPlan)
    {
        // Handle both model binding and manual ID resolution
        if (is_string($pricingPlan) || is_numeric($pricingPlan)) {
            $pricingPlan = PricingPlan::findOrFail($pricingPlan);
        }
        $data = $request->validated();

        // Convert datetime strings to Carbon instances
        if ($data['offer_starts_at'] ?? null) {
            $data['offer_starts_at'] = \Carbon\Carbon::parse($data['offer_starts_at']);
        }
        if ($data['offer_ends_at'] ?? null) {
            $data['offer_ends_at'] = \Carbon\Carbon::parse($data['offer_ends_at']);
        }

        $pricingPlan->update($data);

        return redirect()->route('admin.pricing.index')
            ->with('success', __('pricing.updated_successfully'));
    }

    /**
     * Toggle offer status
     */
    public function toggleOffer(string $locale, $pricingPlan)
    {
        // Handle both model binding and manual ID resolution
        if (is_string($pricingPlan) || is_numeric($pricingPlan)) {
            $pricingPlan = PricingPlan::findOrFail($pricingPlan);
        }
        $pricingPlan->update([
            'offer_active' => ! $pricingPlan->offer_active,
        ]);

        $status = $pricingPlan->offer_active ? 'activated' : 'deactivated';

        return redirect()->back()
            ->with('success', __("pricing.offer_{$status}"));
    }

    /**
     * Toggle scarcity status
     */
    public function toggleScarcity(string $locale, $pricingPlan)
    {
        // Handle both model binding and manual ID resolution
        if (is_string($pricingPlan) || is_numeric($pricingPlan)) {
            $pricingPlan = PricingPlan::findOrFail($pricingPlan);
        }
        $pricingPlan->update([
            'scarcity_active' => ! $pricingPlan->scarcity_active,
        ]);

        $status = $pricingPlan->scarcity_active ? 'activated' : 'deactivated';

        return redirect()->back()
            ->with('success', __("pricing.scarcity_{$status}"));
    }

    /**
     * Increment scarcity sold count
     */
    public function incrementScarcity(string $locale, $pricingPlan)
    {
        // Handle both model binding and manual ID resolution
        if (is_string($pricingPlan) || is_numeric($pricingPlan)) {
            $pricingPlan = PricingPlan::findOrFail($pricingPlan);
        }
        if ($pricingPlan->scarcity_active && $pricingPlan->scarcity_sold < $pricingPlan->scarcity_limit) {
            $pricingPlan->increment('scarcity_sold');
        }

        return redirect()->back()
            ->with('success', __('pricing.scarcity_incremented'));
    }

    /**
     * Reset scarcity sold count
     */
    public function resetScarcity(string $locale, $pricingPlan)
    {
        // Handle both model binding and manual ID resolution
        if (is_string($pricingPlan) || is_numeric($pricingPlan)) {
            $pricingPlan = PricingPlan::findOrFail($pricingPlan);
        }
        $pricingPlan->update(['scarcity_sold' => 0]);

        return redirect()->back()
            ->with('success', __('pricing.scarcity_reset'));
    }
}
