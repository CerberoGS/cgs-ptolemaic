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
        Schema::create('affiliate_rewards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('reward_type', ['analysis_bonus', 'discount_percentage']);
            $table->integer('analysis_bonus')->nullable();
            $table->decimal('discount_percentage', 5, 2)->nullable();
            $table->integer('referrals_count')->default(0);
            $table->enum('status', ['active', 'redeemed', 'expired'])->default('active');
            $table->timestamp('expires_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index(['reward_type', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliate_rewards');
    }
};
