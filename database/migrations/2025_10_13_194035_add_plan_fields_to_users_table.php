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
            $table->string('plan')->default('free')->after('remember_token');
            $table->timestamp('plan_started_at')->nullable()->after('plan');
            $table->timestamp('plan_expires_at')->nullable()->after('plan_started_at');
            $table->timestamp('trial_ends_at')->nullable()->after('plan_expires_at');
            $table->json('plan_metadata')->nullable()->after('trial_ends_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'plan',
                'plan_started_at',
                'plan_expires_at',
                'trial_ends_at',
                'plan_metadata',
            ]);
        });
    }
};
