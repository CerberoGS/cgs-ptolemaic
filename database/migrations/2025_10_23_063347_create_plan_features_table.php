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
        Schema::create('plan_features', function (Blueprint $table) {
            $table->id();
            $table->foreignId('plan_id')->constrained('pricing_plans')->onDelete('cascade');
            $table->foreignId('feature_id')->constrained('features')->onDelete('cascade');

            $table->boolean('is_enabled')->default(true)->comment('Is this feature enabled for this plan');

            // Valores específicos por tipo
            $table->integer('limit_value')->nullable()->comment('For value_type=integer features (limits)');
            $table->text('string_value')->nullable()->comment('For value_type=string features');
            $table->jsonb('json_value')->nullable()->comment('For value_type=json features');

            // Configuración específica de esta feature en este plan
            $table->jsonb('config')->nullable()->comment('Specific configuration (soft_limit, warning_threshold, etc)');

            $table->timestamps();

            // Índices
            $table->unique(['plan_id', 'feature_id']);
            $table->index('plan_id');
            $table->index('feature_id');
            $table->index('is_enabled');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_features');
    }
};
