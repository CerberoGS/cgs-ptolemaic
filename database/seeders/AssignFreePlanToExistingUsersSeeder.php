<?php

namespace Database\Seeders;

use App\Enums\PlanType;
use App\Models\User;
use Illuminate\Database\Seeder;

class AssignFreePlanToExistingUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()
            ->whereNull('plan')
            ->orWhere('plan', '')
            ->update([
                'plan' => PlanType::Free->value,
                'plan_started_at' => now(),
            ]);

        $this->command->info('Plan Free asignado a usuarios sin plan.');
    }
}
