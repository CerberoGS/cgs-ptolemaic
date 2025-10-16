<?php

namespace App\Jobs;

use App\Models\PricingPlan;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class UpdateScarcityCountJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $scarcityPlans = PricingPlan::where('scarcity_active', true)
            ->whereRaw('scarcity_sold < scarcity_limit')
            ->get();

        foreach ($scarcityPlans as $plan) {
            // Simulate sales for demo purposes
            // In production, this would be based on actual sales data
            $chanceOfSale = 5; // 5% chance of a sale

            if (rand(1, 100) <= $chanceOfSale) {
                $newSoldCount = min($plan->scarcity_sold + 1, $plan->scarcity_limit);
                $plan->update(['scarcity_sold' => $newSoldCount]);

                Log::info("Scarcity count updated for plan {$plan->plan_type}", [
                    'plan_id' => $plan->id,
                    'plan_type' => $plan->plan_type,
                    'old_count' => $plan->scarcity_sold - 1,
                    'new_count' => $newSoldCount,
                    'limit' => $plan->scarcity_limit,
                ]);

                // If we've reached the limit, deactivate scarcity
                if ($newSoldCount >= $plan->scarcity_limit) {
                    $plan->update(['scarcity_active' => false]);

                    Log::info("Scarcity limit reached for plan {$plan->plan_type}, deactivating", [
                        'plan_id' => $plan->id,
                        'plan_type' => $plan->plan_type,
                        'final_count' => $newSoldCount,
                    ]);
                }
            }
        }
    }
}
