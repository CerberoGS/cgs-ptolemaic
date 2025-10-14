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
        Schema::create('plan_changes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('changed_by_user_id')->constrained('users')->cascadeOnDelete();
            $table->string('old_plan');
            $table->string('new_plan');
            $table->timestamp('old_trial_ends_at')->nullable();
            $table->timestamp('new_trial_ends_at')->nullable();
            $table->text('reason')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'created_at']);
            $table->index('changed_by_user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_changes');
    }
};
