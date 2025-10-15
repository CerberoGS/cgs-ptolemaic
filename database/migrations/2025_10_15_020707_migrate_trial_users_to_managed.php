<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Migrate all users with plan = 'trial' to 'managed'
        DB::table('users')
            ->where('plan', 'trial')
            ->update(['plan' => 'managed']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Rollback: convert managed back to trial
        DB::table('users')
            ->where('plan', 'managed')
            ->whereNotNull('trial_ends_at')
            ->update(['plan' => 'trial']);
    }
};
