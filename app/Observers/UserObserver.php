<?php

declare(strict_types=1);

namespace App\Observers;

use App\Enums\PlanType;
use App\Models\User;
use App\Services\AffiliateService;
use Illuminate\Support\Facades\Session;

class UserObserver
{
    public function __construct(
        private AffiliateService $affiliateService
    ) {}

    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        $this->assignPlanByRole($user);
        $this->processAffiliateReferral($user);
        $this->generateAffiliateCode($user);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        $this->assignPlanByRole($user);
        $this->processPlanUpgrade($user);
    }

    /**
     * Assign plan based on user role.
     */
    protected function assignPlanByRole(User $user): void
    {
        // Admin gets Internal plan automatically
        if ($user->hasRole('Admin') && $user->plan !== PlanType::Internal) {
            $user->updateQuietly(['plan' => PlanType::Internal]);

            return;
        }

        // Manager gets Staff plan automatically
        if ($user->hasRole('Manager') && ! $user->plan->isInternal()) {
            $user->updateQuietly(['plan' => PlanType::Staff]);

            return;
        }
    }

    /**
     * Process affiliate referral if user was referred.
     */
    protected function processAffiliateReferral(User $user): void
    {
        $affiliateCode = Session::get('affiliate_code');
        
        if ($affiliateCode) {
            $this->affiliateService->processReferral($user, $affiliateCode);
            
            // Clear the session after processing
            Session::forget('affiliate_code');
        }
    }

    /**
     * Generate affiliate code for new user.
     */
    protected function generateAffiliateCode(User $user): void
    {
        // Only generate for non-internal users
        if (!$user->plan->isInternal()) {
            $user->generateAffiliateCode();
        }
    }

    /**
     * Process plan upgrade for affiliate rewards.
     */
    protected function processPlanUpgrade(User $user): void
    {
        if ($user->wasChanged('plan')) {
            $this->affiliateService->updateReferralPlan($user, $user->plan->value);
        }
    }
}
