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
        Schema::create('referrals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('affiliate_user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('referred_user_id')->constrained('users')->onDelete('cascade');
            $table->string('affiliate_code', 20);
            $table->enum('referred_plan', ['free', 'managed', 'pro', 'enterprise'])->default('free');
            $table->enum('status', ['active', 'inactive', 'cancelled'])->default('active');
            $table->integer('monthly_analysis_bonus')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_reward_at')->nullable();
            $table->timestamps();
            
            $table->unique(['affiliate_user_id', 'referred_user_id']);
            $table->index(['affiliate_code', 'status']);
            $table->index(['referred_plan', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('referrals');
    }
};
