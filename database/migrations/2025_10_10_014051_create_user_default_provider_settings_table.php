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
        Schema::create('user_default_provider_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignId('ai_provider_key_id')->nullable();
            $table->foreignId('ai_provider_model_id')->nullable();
            $table->foreignId('market_data_provider_key_id')->nullable();
            $table->foreignId('news_provider_key_id')->nullable();
            $table->foreignId('trading_provider_key_id')->nullable();
            $table->timestamps();

            $table->unique(['user_id'], 'user_defaults_user_unique');

            $table->foreign('ai_provider_key_id', 'user_defaults_ai_key_fk')
                ->references('id')
                ->on('ai_provider_keys')
                ->nullOnDelete();

            $table->foreign('ai_provider_model_id', 'user_defaults_ai_model_fk')
                ->references('id')
                ->on('ai_provider_models')
                ->nullOnDelete();

            $table->foreign('market_data_provider_key_id', 'user_defaults_md_key_fk')
                ->references('id')
                ->on('market_data_provider_keys')
                ->nullOnDelete();

            $table->foreign('news_provider_key_id', 'user_defaults_news_key_fk')
                ->references('id')
                ->on('news_provider_keys')
                ->nullOnDelete();

            $table->foreign('trading_provider_key_id', 'user_defaults_trading_key_fk')
                ->references('id')
                ->on('trading_provider_keys')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_default_provider_settings');
    }
};
