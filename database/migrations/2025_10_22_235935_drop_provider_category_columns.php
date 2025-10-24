<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ai_providers', function (Blueprint $table) {
            $table->dropConstrainedForeignId('provider_category_id');
        });

        Schema::table('trading_providers', function (Blueprint $table) {
            $table->dropConstrainedForeignId('provider_category_id');
        });

        Schema::table('news_providers', function (Blueprint $table) {
            $table->dropConstrainedForeignId('provider_category_id');
        });

        Schema::table('market_data_providers', function (Blueprint $table) {
            $table->dropConstrainedForeignId('provider_category_id');
        });
    }

    public function down(): void
    {
        Schema::table('ai_providers', function (Blueprint $table) {
            $table->foreignId('provider_category_id')->nullable()->constrained()->nullOnDelete();
        });

        Schema::table('trading_providers', function (Blueprint $table) {
            $table->foreignId('provider_category_id')->nullable()->constrained()->nullOnDelete();
        });

        Schema::table('news_providers', function (Blueprint $table) {
            $table->foreignId('provider_category_id')->nullable()->constrained()->nullOnDelete();
        });

        Schema::table('market_data_providers', function (Blueprint $table) {
            $table->foreignId('provider_category_id')->nullable()->constrained()->nullOnDelete();
        });
    }
};
