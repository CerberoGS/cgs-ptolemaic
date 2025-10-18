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
        Schema::table('users', function (Blueprint $table) {
            $table->text('google2fa_secret')->nullable()->after('two_factor_recovery_codes');
            $table->boolean('google2fa_enabled')->default(false)->after('google2fa_secret');
            $table->string('telegram_chat_id')->nullable()->after('google2fa_enabled');
            $table->boolean('telegram_enabled')->default(false)->after('telegram_chat_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'google2fa_secret',
                'google2fa_enabled',
                'telegram_chat_id',
                'telegram_enabled',
            ]);
        });
    }
};