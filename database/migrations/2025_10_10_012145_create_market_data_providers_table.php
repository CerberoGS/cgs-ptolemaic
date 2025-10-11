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
        Schema::create('market_data_providers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('provider_category_id')->constrained()->cascadeOnDelete();
            $table->string('slug')->unique();
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->string('base_url')->nullable();
            $table->string('docs_url')->nullable();
            $table->string('verification_endpoint')->nullable();
            $table->string('data_frequency')->nullable();
            $table->unsignedSmallInteger('rate_limit_per_minute')->nullable();
            $table->boolean('supports_historical')->default(false);
            $table->enum('status', ['active', 'inactive', 'deprecated'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('market_data_providers');
    }
};
