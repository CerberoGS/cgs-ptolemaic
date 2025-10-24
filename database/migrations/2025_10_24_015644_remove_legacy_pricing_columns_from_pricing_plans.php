<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * REFACTOR: Remove legacy pricing columns from pricing_plans.
     * All pricing data now lives in plan_billing_options table.
     *
     * This migration is part of the architectural cleanup to have a single
     * source of truth for pricing. See PLAN_BILLING_OPTIONS.md for details.
     */
    public function up(): void
    {
        Schema::table('pricing_plans', function (Blueprint $table) {
            // Drop legacy indexes FIRST (before dropping columns)
            try {
                $table->dropIndex(['offer_active', 'offer_ends_at']);
            } catch (\Exception $e) {
                // Index might not exist in all environments
            }

            // Remove legacy price columns (now in plan_billing_options)
            $table->dropColumn([
                'price_monthly',
                'price_yearly',
            ]);

            // Remove legacy offer columns (now in plan_billing_options per cycle)
            $table->dropColumn([
                'offer_price_monthly',
                'offer_price_yearly',
                'offer_active',
                'offer_name',
                'offer_starts_at',
                'offer_ends_at',
            ]);

            // Remove legacy scarcity columns (now in plan_billing_options)
            $table->dropColumn([
                'scarcity_active',
                'scarcity_limit',
                'scarcity_sold',
            ]);

            // Remove legacy currency (now per billing option)
            $table->dropColumn('currency');
        });

        // Add Stripe/Paddle integration to plan_billing_options
        Schema::table('plan_billing_options', function (Blueprint $table) {
            $table->string('stripe_price_id')->nullable()->after('is_popular')
                ->comment('Stripe Price ID for payment processing');

            $table->string('paddle_price_id')->nullable()->after('stripe_price_id')
                ->comment('Paddle Price ID for payment processing');

            $table->index('stripe_price_id');
            $table->index('paddle_price_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove payment gateway IDs from plan_billing_options
        Schema::table('plan_billing_options', function (Blueprint $table) {
            $table->dropIndex(['stripe_price_id']);
            $table->dropIndex(['paddle_price_id']);

            $table->dropColumn([
                'stripe_price_id',
                'paddle_price_id',
            ]);
        });

        // Restore legacy columns to pricing_plans
        Schema::table('pricing_plans', function (Blueprint $table) {
            // Restore price columns
            $table->decimal('price_monthly', 10, 2)->default(0)->after('slug');
            $table->decimal('price_yearly', 10, 2)->default(0)->after('price_monthly');

            // Restore offer columns
            $table->decimal('offer_price_monthly', 10, 2)->nullable()->after('price_yearly');
            $table->decimal('offer_price_yearly', 10, 2)->nullable()->after('offer_price_monthly');
            $table->boolean('offer_active')->default(false)->after('offer_price_yearly');
            $table->string('offer_name')->nullable()->after('offer_active');
            $table->timestamp('offer_starts_at')->nullable()->after('offer_description_key');
            $table->timestamp('offer_ends_at')->nullable()->after('offer_starts_at');

            // Restore scarcity columns
            $table->boolean('scarcity_active')->default(false)->after('scarcity_message_key');
            $table->integer('scarcity_limit')->nullable()->after('scarcity_active');
            $table->integer('scarcity_sold')->default(0)->after('scarcity_limit');

            // Restore currency
            $table->string('currency', 3)->default('USD')->after('price_yearly');

            // Restore indexes
            $table->index(['offer_active', 'offer_ends_at']);
        });
    }
};
