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
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique()->index();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('target_plan'); // free, trial, managed, pro, enterprise
            $table->decimal('price_monthly', 10, 2)->nullable();
            $table->integer('discount_percent')->default(0);
            $table->integer('trial_duration_days')->nullable();
            $table->integer('usage_limit')->nullable(); // null = unlimited
            $table->integer('usage_count')->default(0);
            $table->timestamp('expires_at')->nullable();
            $table->string('status')->default('active'); // active, expired, disabled
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->string('referred_by')->nullable();
            $table->timestamps();

            $table->index(['status', 'expires_at']);
            $table->index('created_by');
        });

        Schema::create('invitation_redemptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('user_email');
            $table->ipAddress('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();

            $table->index(['invitation_id', 'user_id']);
            $table->index('user_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitation_redemptions');
        Schema::dropIfExists('invitations');
    }
};
