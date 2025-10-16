<?php

namespace Database\Seeders;

use App\Models\PricingPlan;
use Illuminate\Database\Seeder;

class PricingPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plans = [
            [
                'plan_type' => 'managed',
                'price_monthly' => 49.00,
                'price_yearly' => 588.00, // $49 * 12 = $588
                'offer_price_monthly' => null,
                'offer_price_yearly' => null,
                'offer_active' => false,
                'offer_name' => null,
                'offer_description' => null,
                'offer_starts_at' => null,
                'offer_ends_at' => null,
                'scarcity_active' => false,
                'scarcity_message' => null,
                'scarcity_limit' => null,
                'scarcity_sold' => 0,
                'is_active' => true,
            ],
            [
                'plan_type' => 'pro',
                'price_monthly' => 99.00,
                'price_yearly' => 1188.00, // $99 * 12 = $1188
                'offer_price_monthly' => null,
                'offer_price_yearly' => null,
                'offer_active' => false,
                'offer_name' => null,
                'offer_description' => null,
                'offer_starts_at' => null,
                'offer_ends_at' => null,
                'scarcity_active' => false,
                'scarcity_message' => null,
                'scarcity_limit' => null,
                'scarcity_sold' => 0,
                'is_active' => true,
            ],
            [
                'plan_type' => 'enterprise',
                'price_monthly' => 0.00, // Custom pricing
                'price_yearly' => 0.00,
                'offer_price_monthly' => null,
                'offer_price_yearly' => null,
                'offer_active' => false,
                'offer_name' => null,
                'offer_description' => null,
                'offer_starts_at' => null,
                'offer_ends_at' => null,
                'scarcity_active' => false,
                'scarcity_message' => null,
                'scarcity_limit' => null,
                'scarcity_sold' => 0,
                'is_active' => true,
            ],
        ];

        foreach ($plans as $plan) {
            PricingPlan::updateOrCreate(
                ['plan_type' => $plan['plan_type']],
                $plan
            );
        }
    }
}
