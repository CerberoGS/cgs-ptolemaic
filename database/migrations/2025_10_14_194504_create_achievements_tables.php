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
        // Achievements catalog
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique(); // e.g., 'first_win', 'ten_trade_streak'
            $table->string('name');
            $table->text('description');
            $table->string('icon')->nullable(); // emoji or icon class
            $table->string('tier')->default('bronze'); // bronze, silver, gold, platinum
            $table->integer('points')->default(10);
            $table->json('criteria')->nullable(); // JSON with unlock criteria
            $table->timestamps();
        });

        // User achievements (pivot)
        Schema::create('user_achievements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('achievement_id')->constrained()->onDelete('cascade');
            $table->timestamp('unlocked_at');
            $table->timestamps();

            $table->unique(['user_id', 'achievement_id']);
            $table->index(['user_id', 'unlocked_at']);
        });

        // User stats for gamification
        Schema::create('user_trading_stats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');
            $table->integer('total_trades')->default(0);
            $table->integer('winning_trades')->default(0);
            $table->integer('losing_trades')->default(0);
            $table->integer('current_streak')->default(0);
            $table->integer('best_streak')->default(0);
            $table->integer('current_losing_streak')->default(0);
            $table->integer('worst_losing_streak')->default(0);
            $table->decimal('total_pnl', 15, 2)->default(0);
            $table->decimal('best_trade_pnl', 15, 2)->nullable();
            $table->decimal('worst_trade_pnl', 15, 2)->nullable();
            $table->integer('total_points')->default(0); // Gamification points
            $table->string('level')->default('Novice'); // Novice, Intermediate, Advanced, Expert, Master
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_trading_stats');
        Schema::dropIfExists('user_achievements');
        Schema::dropIfExists('achievements');
    }
};
