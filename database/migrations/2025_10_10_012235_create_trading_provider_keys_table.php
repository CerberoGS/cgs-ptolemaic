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
        Schema::create('trading_provider_keys', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignId('trading_provider_id')->constrained()->cascadeOnDelete();
            $table->string('label');
            $table->text('api_key_encrypted');
            $table->text('api_secret_encrypted');
            $table->text('passphrase_encrypted')->nullable();
            $table->json('metadata')->nullable();
            $table->enum('account_type', ['live', 'paper'])->default('live');
            $table->boolean('sandbox')->default(false);
            $table->enum('verification_status', ['pending', 'passed', 'failed'])->default('pending');
            $table->timestamp('last_verified_at')->nullable();
            $table->timestamps();

            $table->unique(
                ['user_id', 'trading_provider_id', 'account_type'],
                'tp_keys_user_provider_account_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trading_provider_keys');
    }
};
