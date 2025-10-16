<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();

            // Plan identification
            $table->string('plan_type')->unique(); // 'managed', 'pro', 'enterprise'

            // Normal prices
            $table->decimal('price_monthly', 10, 2);
            $table->decimal('price_yearly', 10, 2);

            // Offer prices
            $table->decimal('offer_price_monthly', 10, 2)->nullable();
            $table->decimal('offer_price_yearly', 10, 2)->nullable();

            // Offer management
            $table->boolean('offer_active')->default(false);
            $table->string('offer_name')->nullable(); // "Black Friday", "New Year Sale"
            $table->text('offer_description')->nullable();

            // Countdown timer
            $table->timestamp('offer_starts_at')->nullable();
            $table->timestamp('offer_ends_at')->nullable();

            // Scarcity (FOMO)
            $table->boolean('scarcity_active')->default(false);
            $table->string('scarcity_message')->nullable(); // "Solo quedan 5 cupos"
            $table->integer('scarcity_limit')->nullable();
            $table->integer('scarcity_sold')->default(0);

            // Status
            $table->boolean('is_active')->default(true);

            $table->timestamps();

            // Indexes
            $table->index(['plan_type', 'is_active']);
            $table->index(['offer_active', 'offer_ends_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pricing_plans');
    }
};
