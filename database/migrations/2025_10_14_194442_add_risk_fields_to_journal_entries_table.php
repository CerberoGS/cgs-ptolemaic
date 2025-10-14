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
        Schema::table('journal_entries', function (Blueprint $table) {
            // Risk Management Fields
            $table->decimal('stop_loss', 10, 4)->nullable()->after('exit_price');
            $table->decimal('take_profit', 10, 4)->nullable()->after('stop_loss');
            $table->decimal('risk_reward_ratio', 10, 2)->nullable()->after('take_profit');
            $table->decimal('account_risk_percent', 5, 2)->nullable()->after('risk_reward_ratio');
            $table->decimal('actual_risk_reward', 10, 2)->nullable()->after('account_risk_percent');

            // Additional Analytics Fields
            $table->integer('hold_time_minutes')->nullable()->after('exit_time');
            $table->boolean('followed_plan')->default(true)->after('hold_time_minutes');
            $table->text('mistakes')->nullable()->after('followed_plan');
            $table->text('lessons_learned')->nullable()->after('mistakes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('journal_entries', function (Blueprint $table) {
            $table->dropColumn([
                'stop_loss',
                'take_profit',
                'risk_reward_ratio',
                'account_risk_percent',
                'actual_risk_reward',
                'hold_time_minutes',
                'followed_plan',
                'mistakes',
                'lessons_learned',
            ]);
        });
    }
};
