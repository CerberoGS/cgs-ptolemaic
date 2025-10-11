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
        Schema::create('ai_provider_models', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ai_provider_id')->constrained()->cascadeOnDelete();
            $table->string('slug');
            $table->string('display_name');
            $table->text('description')->nullable();
            $table->unsignedInteger('context_window')->nullable();
            $table->json('capabilities')->nullable();
            $table->json('pricing')->nullable();
            $table->boolean('is_default')->default(false);
            $table->enum('availability', ['general', 'limited', 'deprecated'])->default('general');
            $table->timestamps();

            $table->unique(['ai_provider_id', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_provider_models');
    }
};
