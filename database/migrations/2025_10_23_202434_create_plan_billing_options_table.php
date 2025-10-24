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
        Schema::create('plan_billing_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plan_id')->constrained('pricing_plans')->onDelete('cascade');

            // Identificación del ciclo de facturación
            $table->string('billing_cycle_slug', 50)->comment('monthly, quarterly, semiannual, annual, etc.');
            $table->string('billing_cycle_name_key', 255)->nullable()->comment('Translation key for billing cycle name');

            // Período de facturación
            $table->integer('billing_months')->comment('Number of months in billing cycle');
            $table->integer('billing_days')->nullable()->comment('Alternative: billing period in days');

            // Precio base
            $table->decimal('base_price', 10, 2)->comment('Base price for this billing cycle');
            $table->string('currency', 3)->default('USD')->comment('Currency code');

            // Descuentos por autopago
            $table->boolean('has_autopay_discount')->default(false)->comment('Offers autopay discount');
            $table->string('autopay_discount_type', 20)->nullable()->comment('fixed or percentage');
            $table->decimal('autopay_discount_value', 10, 2)->nullable()->comment('Discount amount or percentage');

            // Descuentos por pago adelantado
            $table->integer('upfront_discount_percentage')->default(0)->comment('Discount % for upfront payment');

            // Extras
            $table->decimal('setup_fee', 10, 2)->default(0)->comment('One-time setup fee');
            $table->integer('trial_days')->default(0)->comment('Trial period in days');

            // Estado y visualización
            $table->boolean('is_active')->default(true)->comment('Option is available');
            $table->boolean('is_default')->default(false)->comment('Default option for this plan');
            $table->boolean('is_popular')->default(false)->comment('Mark as popular/recommended');
            $table->integer('display_order')->default(0)->comment('Display order on pricing page');

            // Metadata para UI
            $table->string('description_key', 255)->nullable()->comment('Translation key for description');
            $table->string('highlight_text_key', 255)->nullable()->comment('Translation key for highlight badge');

            $table->timestamps();

            // Índices
            $table->unique(['plan_id', 'billing_cycle_slug'], 'plan_billing_unique');
            $table->index(['plan_id', 'is_active'], 'plan_active_idx');
            $table->index(['is_active', 'display_order'], 'active_order_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_billing_options');
    }
};
