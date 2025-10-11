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
        Schema::create('market_data_provider_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignId('market_data_provider_id')->constrained()->cascadeOnDelete();
            $table->string('label');
            $table->text('secret_encrypted');
            $table->json('scopes')->nullable();
            $table->json('metadata')->nullable();
            $table->string('default_symbol')->nullable();
            $table->string('region')->nullable();
            $table->boolean('sandbox')->default(false);
            $table->enum('verification_status', ['pending', 'passed', 'failed'])->default('pending');
            $table->timestamp('last_verified_at')->nullable();
            $table->timestamps();

            $table->unique(
                ['user_id', 'market_data_provider_id'],
                'md_keys_user_provider_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('market_data_provider_keys');
    }
};
