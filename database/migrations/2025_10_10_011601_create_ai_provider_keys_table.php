<?php

use App\Models\User;
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
        Schema::create('ai_provider_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignId('ai_provider_id')->constrained()->cascadeOnDelete();
            $table->foreignId('ai_provider_model_id')->nullable()->constrained()->nullOnDelete();
            $table->string('label');
            $table->text('secret_encrypted');
            $table->json('scopes')->nullable();
            $table->json('metadata')->nullable();
            $table->boolean('sandbox')->default(false);
            $table->enum('verification_status', ['pending', 'passed', 'failed'])->default('pending');
            $table->timestamp('last_verified_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'ai_provider_id'], 'ai_keys_user_provider_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_provider_keys');
    }
};
