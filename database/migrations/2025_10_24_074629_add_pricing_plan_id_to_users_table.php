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
            $table->foreignId('pricing_plan_id')
                ->nullable()
                ->after('remember_token')
                ->constrained('pricing_plans')
                ->onDelete('set null');
        });

        // Migrate existing plan data from legacy string column to new FK
        $this->migrateExistingPlans();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['pricing_plan_id']);
            $table->dropColumn('pricing_plan_id');
        });
    }

    /**
     * Migrate existing plan data from legacy column to new FK
     */
    protected function migrateExistingPlans(): void
    {
        $planMapping = \DB::table('pricing_plans')
            ->select('id', 'slug')
            ->get()
            ->pluck('id', 'slug')
            ->toArray();

        \DB::table('users')
            ->whereNotNull('plan')
            ->orderBy('id')
            ->chunk(100, function ($users) use ($planMapping) {
                foreach ($users as $user) {
                    $planId = $planMapping[$user->plan] ?? $planMapping['free'] ?? null;

                    if ($planId) {
                        \DB::table('users')
                            ->where('id', $user->id)
                            ->update(['pricing_plan_id' => $planId]);
                    }
                }
            });
    }
};
