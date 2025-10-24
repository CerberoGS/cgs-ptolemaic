<?php

namespace Database\Seeders;

use App\Models\PlanBillingOption;
use App\Models\PricingPlan;
use Illuminate\Database\Seeder;

class PlanBillingOptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all pricing plans
        $plans = PricingPlan::all()->keyBy('slug');

        // Free Plan - Solo mensual (gratis)
        if ($plans->has('free')) {
            $freePlan = $plans['free'];

            PlanBillingOption::create([
                'plan_id' => $freePlan->id,
                'billing_cycle_slug' => 'monthly',
                'billing_cycle_name_key' => 'billing.cycles.monthly',
                'billing_months' => 1,
                'base_price' => 0.00,
                'currency' => 'USD',
                'is_active' => true,
                'is_default' => true,
                'is_popular' => false,
                'display_order' => 1,
            ]);
        }

        // Pro Plan - Opciones múltiples
        if ($plans->has('pro')) {
            $proPlan = $plans['pro'];
            $baseMonthly = 29.99;

            // Mensual con autopago
            PlanBillingOption::create([
                'plan_id' => $proPlan->id,
                'billing_cycle_slug' => 'monthly',
                'billing_cycle_name_key' => 'billing.cycles.monthly',
                'billing_months' => 1,
                'base_price' => $baseMonthly,
                'currency' => 'USD',
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'fixed',
                'autopay_discount_value' => 5.00,
                'is_active' => true,
                'is_default' => true,
                'is_popular' => false,
                'display_order' => 1,
                'description_key' => 'billing.descriptions.monthly_autopay',
                'highlight_text_key' => null,
            ]);

            // Trimestral (3 meses) - 10% descuento + autopago
            PlanBillingOption::create([
                'plan_id' => $proPlan->id,
                'billing_cycle_slug' => 'quarterly',
                'billing_cycle_name_key' => 'billing.cycles.quarterly',
                'billing_months' => 3,
                'base_price' => $baseMonthly * 3,
                'currency' => 'USD',
                'upfront_discount_percentage' => 10,
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'fixed',
                'autopay_discount_value' => 5.00,
                'is_active' => true,
                'is_default' => false,
                'is_popular' => false,
                'display_order' => 2,
                'description_key' => 'billing.descriptions.save_10_percent',
                'highlight_text_key' => null,
            ]);

            // Semestral (6 meses) - 15% descuento + autopago
            PlanBillingOption::create([
                'plan_id' => $proPlan->id,
                'billing_cycle_slug' => 'semiannual',
                'billing_cycle_name_key' => 'billing.cycles.semiannual',
                'billing_months' => 6,
                'base_price' => $baseMonthly * 6,
                'currency' => 'USD',
                'upfront_discount_percentage' => 15,
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'fixed',
                'autopay_discount_value' => 10.00,
                'is_active' => true,
                'is_default' => false,
                'is_popular' => true,
                'display_order' => 3,
                'description_key' => 'billing.descriptions.save_15_percent',
                'highlight_text_key' => 'billing.highlights.most_popular',
            ]);

            // Anual (12 meses) - 20% descuento + autopago
            PlanBillingOption::create([
                'plan_id' => $proPlan->id,
                'billing_cycle_slug' => 'annual',
                'billing_cycle_name_key' => 'billing.cycles.annual',
                'billing_months' => 12,
                'base_price' => $baseMonthly * 12,
                'currency' => 'USD',
                'upfront_discount_percentage' => 20,
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'percentage',
                'autopay_discount_value' => 5.00,
                'is_active' => true,
                'is_default' => false,
                'is_popular' => false,
                'display_order' => 4,
                'description_key' => 'billing.descriptions.save_20_percent',
                'highlight_text_key' => 'billing.highlights.best_value',
            ]);
        }

        // Managed Plan - Opciones premium
        if ($plans->has('managed')) {
            $managedPlan = $plans['managed'];
            $baseMonthly = 99.99;

            // Mensual con autopago
            PlanBillingOption::create([
                'plan_id' => $managedPlan->id,
                'billing_cycle_slug' => 'monthly',
                'billing_cycle_name_key' => 'billing.cycles.monthly',
                'billing_months' => 1,
                'base_price' => $baseMonthly,
                'currency' => 'USD',
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'fixed',
                'autopay_discount_value' => 10.00,
                'setup_fee' => 50.00,
                'is_active' => true,
                'is_default' => true,
                'is_popular' => false,
                'display_order' => 1,
            ]);

            // Trimestral (3 meses) - 12% descuento
            PlanBillingOption::create([
                'plan_id' => $managedPlan->id,
                'billing_cycle_slug' => 'quarterly',
                'billing_cycle_name_key' => 'billing.cycles.quarterly',
                'billing_months' => 3,
                'base_price' => $baseMonthly * 3,
                'currency' => 'USD',
                'upfront_discount_percentage' => 12,
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'fixed',
                'autopay_discount_value' => 15.00,
                'setup_fee' => 25.00,
                'is_active' => true,
                'is_default' => false,
                'is_popular' => false,
                'display_order' => 2,
                'description_key' => 'billing.descriptions.save_12_percent',
            ]);

            // Semestral (6 meses) - 18% descuento
            PlanBillingOption::create([
                'plan_id' => $managedPlan->id,
                'billing_cycle_slug' => 'semiannual',
                'billing_cycle_name_key' => 'billing.cycles.semiannual',
                'billing_months' => 6,
                'base_price' => $baseMonthly * 6,
                'currency' => 'USD',
                'upfront_discount_percentage' => 18,
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'percentage',
                'autopay_discount_value' => 5.00,
                'is_active' => true,
                'is_default' => false,
                'is_popular' => true,
                'display_order' => 3,
                'description_key' => 'billing.descriptions.save_18_percent',
                'highlight_text_key' => 'billing.highlights.most_popular',
            ]);

            // Anual (12 meses) - 25% descuento
            PlanBillingOption::create([
                'plan_id' => $managedPlan->id,
                'billing_cycle_slug' => 'annual',
                'billing_cycle_name_key' => 'billing.cycles.annual',
                'billing_months' => 12,
                'base_price' => $baseMonthly * 12,
                'currency' => 'USD',
                'upfront_discount_percentage' => 25,
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'percentage',
                'autopay_discount_value' => 10.00,
                'is_active' => true,
                'is_default' => false,
                'is_popular' => false,
                'display_order' => 4,
                'description_key' => 'billing.descriptions.save_25_percent',
                'highlight_text_key' => 'billing.highlights.best_value',
            ]);
        }

        // Enterprise Plan - Opciones empresariales
        if ($plans->has('enterprise')) {
            $enterprisePlan = $plans['enterprise'];
            $baseMonthly = 299.99;

            // Mensual
            PlanBillingOption::create([
                'plan_id' => $enterprisePlan->id,
                'billing_cycle_slug' => 'monthly',
                'billing_cycle_name_key' => 'billing.cycles.monthly',
                'billing_months' => 1,
                'base_price' => $baseMonthly,
                'currency' => 'USD',
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'fixed',
                'autopay_discount_value' => 20.00,
                'setup_fee' => 100.00,
                'is_active' => true,
                'is_default' => true,
                'is_popular' => false,
                'display_order' => 1,
            ]);

            // Trimestral (3 meses) - 15% descuento
            PlanBillingOption::create([
                'plan_id' => $enterprisePlan->id,
                'billing_cycle_slug' => 'quarterly',
                'billing_cycle_name_key' => 'billing.cycles.quarterly',
                'billing_months' => 3,
                'base_price' => $baseMonthly * 3,
                'currency' => 'USD',
                'upfront_discount_percentage' => 15,
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'percentage',
                'autopay_discount_value' => 5.00,
                'is_active' => true,
                'is_default' => false,
                'is_popular' => false,
                'display_order' => 2,
                'description_key' => 'billing.descriptions.save_15_percent',
            ]);

            // Anual (12 meses) - 30% descuento
            PlanBillingOption::create([
                'plan_id' => $enterprisePlan->id,
                'billing_cycle_slug' => 'annual',
                'billing_cycle_name_key' => 'billing.cycles.annual',
                'billing_months' => 12,
                'base_price' => $baseMonthly * 12,
                'currency' => 'USD',
                'upfront_discount_percentage' => 30,
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'percentage',
                'autopay_discount_value' => 10.00,
                'is_active' => true,
                'is_default' => false,
                'is_popular' => true,
                'display_order' => 3,
                'description_key' => 'billing.descriptions.save_30_percent',
                'highlight_text_key' => 'billing.highlights.best_value',
            ]);

            // Bianual (24 meses) - 35% descuento
            PlanBillingOption::create([
                'plan_id' => $enterprisePlan->id,
                'billing_cycle_slug' => 'biennial',
                'billing_cycle_name_key' => 'billing.cycles.biennial',
                'billing_months' => 24,
                'base_price' => $baseMonthly * 24,
                'currency' => 'USD',
                'upfront_discount_percentage' => 35,
                'has_autopay_discount' => true,
                'autopay_discount_type' => 'percentage',
                'autopay_discount_value' => 15.00,
                'is_active' => true,
                'is_default' => false,
                'is_popular' => false,
                'display_order' => 4,
                'description_key' => 'billing.descriptions.save_35_percent',
                'highlight_text_key' => 'billing.highlights.maximum_savings',
            ]);
        }
    }
}
