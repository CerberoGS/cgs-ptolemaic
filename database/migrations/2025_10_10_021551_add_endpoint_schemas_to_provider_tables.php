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
        Schema::table('ai_providers', function (Blueprint $table) {
            $table->json('test_json')->nullable()->after('verification_endpoint');
            $table->json('ops_json')->nullable()->after('test_json');
        });

        Schema::table('market_data_providers', function (Blueprint $table) {
            $table->json('test_json')->nullable()->after('verification_endpoint');
            $table->json('ops_json')->nullable()->after('test_json');
        });

        Schema::table('news_providers', function (Blueprint $table) {
            $table->json('test_json')->nullable()->after('verification_endpoint');
            $table->json('ops_json')->nullable()->after('test_json');
        });

        Schema::table('trading_providers', function (Blueprint $table) {
            $table->json('test_json')->nullable()->after('verification_endpoint');
            $table->json('ops_json')->nullable()->after('test_json');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ai_providers', function (Blueprint $table) {
            $table->dropColumn(['test_json', 'ops_json']);
        });

        Schema::table('market_data_providers', function (Blueprint $table) {
            $table->dropColumn(['test_json', 'ops_json']);
        });

        Schema::table('news_providers', function (Blueprint $table) {
            $table->dropColumn(['test_json', 'ops_json']);
        });

        Schema::table('trading_providers', function (Blueprint $table) {
            $table->dropColumn(['test_json', 'ops_json']);
        });
    }
};
