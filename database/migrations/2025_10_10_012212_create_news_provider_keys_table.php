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
        Schema::create('news_provider_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignId('news_provider_id')->constrained()->cascadeOnDelete();
            $table->string('label');
            $table->text('secret_encrypted');
            $table->json('scopes')->nullable();
            $table->json('metadata')->nullable();
            $table->string('preferred_language')->nullable();
            $table->boolean('sandbox')->default(false);
            $table->enum('verification_status', ['pending', 'passed', 'failed'])->default('pending');
            $table->timestamp('last_verified_at')->nullable();
            $table->timestamps();

            $table->unique(
                ['user_id', 'news_provider_id'],
                'news_keys_user_provider_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news_provider_keys');
    }
};
