<?php

namespace App\Jobs;

use App\Models\PricingPlan;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class CheckOfferExpirationJob implements ShouldQueue
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
        $expiredOffers = PricingPlan::where('offer_active', true)
            ->where('offer_ends_at', '<', now())
            ->get();

        foreach ($expiredOffers as $plan) {
            $plan->update(['offer_active' => false]);

            Log::info("Offer expired for plan {$plan->plan_type}", [
                'plan_id' => $plan->id,
                'plan_type' => $plan->plan_type,
                'offer_name' => $plan->offer_name,
                'expired_at' => now(),
            ]);
        }

        if ($expiredOffers->count() > 0) {
            Log::info("Expired {$expiredOffers->count()} offers automatically");
        }
    }
}
