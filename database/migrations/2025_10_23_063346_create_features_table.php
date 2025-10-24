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
        // Drop table if exists to clean any partial migration
        Schema::dropIfExists('features');

        Schema::create('features', function (Blueprint $table) {
            $table->id();
            $table->string('key', 100)->unique()->comment('Feature unique identifier');

            // Presentación (i18n keys)
            $table->string('name_key', 255)->comment('Translation key for feature name');
            $table->string('description_key', 255)->nullable()->comment('Translation key for description');
            $table->string('category', 50)->nullable()->comment('Feature category: analytics, limits, integrations, etc');

            // Tipo de valor
            $table->enum('value_type', ['boolean', 'integer', 'string', 'json'])->comment('Type of value this feature holds');
            $table->text('default_value')->nullable()->comment('Default value serialized');

            // Metadata para presentación
            $table->boolean('is_visible')->default(true)->comment('Show in pricing table');
            $table->integer('display_order')->default(0)->comment('Order for display');
            $table->string('icon', 255)->nullable()->comment('Icon identifier');

            $table->timestamps();

            // Índices
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('features');
    }
};
