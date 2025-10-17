<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\AffiliateCode;
use App\Models\AffiliateReward;
use App\Models\Referral;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AffiliateService
{
    /**
     * Configuration for affiliate rewards by plan
     */
    private const REWARD_CONFIG = [
        'free' => 5,      // Observador
        'managed' => 10,  // Cosmógrafo
        'pro' => 15,      // Astrónomo
        'enterprise' => 20, // Heliópolis
    ];

    /**
     * Process a new referral when a user registers
     */
    public function processReferral(User $referredUser, string $affiliateCode): bool
    {
        // Find the affiliate user by code
        $affiliateUser = User::where('affiliate_code', $affiliateCode)->first();
        
        if (!$affiliateUser) {
            return false;
        }

        // Prevent self-referral
        if ($affiliateUser->id === $referredUser->id) {
            return false;
        }

        // Check if referral already exists
        if (Referral::where('affiliate_user_id', $affiliateUser->id)
            ->where('referred_user_id', $referredUser->id)
            ->exists()) {
            return false;
        }

        DB::transaction(function () use ($affiliateUser, $referredUser, $affiliateCode) {
            // Create referral record
            $referral = Referral::create([
                'affiliate_user_id' => $affiliateUser->id,
                'referred_user_id' => $referredUser->id,
                'affiliate_code' => $affiliateCode,
                'referred_plan' => $referredUser->plan ?? 'free',
                'monthly_analysis_bonus' => self::REWARD_CONFIG[$referredUser->plan ?? 'free'],
                'status' => 'active',
            ]);

            // Update affiliate code stats
            $affiliateCodeRecord = $affiliateUser->affiliateCode;
            if ($affiliateCodeRecord) {
                $affiliateCodeRecord->increment('total_referrals');
                $affiliateCodeRecord->increment('active_referrals');
            }

            // Update referred user
            $referredUser->update(['referred_by_code' => $affiliateCode]);

            // Update affiliate user's monthly bonus
            $this->updateAffiliateAnalysisBonus($affiliateUser);
        });

        return true;
    }

    /**
     * Update referral when user upgrades their plan
     */
    public function updateReferralPlan(User $user, string $newPlan): void
    {
        $referral = Referral::where('referred_user_id', $user->id)->first();
        
        if (!$referral) {
            return;
        }

        $oldBonus = $referral->monthly_analysis_bonus;
        $newBonus = self::REWARD_CONFIG[$newPlan];

        if ($newBonus > $oldBonus) {
            DB::transaction(function () use ($referral, $newPlan, $newBonus) {
                $referral->update([
                    'referred_plan' => $newPlan,
                    'monthly_analysis_bonus' => $newBonus,
                ]);

                // Update affiliate user's bonus
                $this->updateAffiliateAnalysisBonus($referral->affiliateUser);
            });
        }
    }

    /**
     * Update affiliate user's total analysis bonus
     */
    private function updateAffiliateAnalysisBonus(User $affiliateUser): void
    {
        $totalBonus = $affiliateUser->activeReferrals()->sum('monthly_analysis_bonus');
        $affiliateUser->update(['monthly_analysis_bonus' => $totalBonus]);
    }

    /**
     * Get affiliate statistics for a user
     */
    public function getAffiliateStats(User $user): array
    {
        $referrals = $user->activeReferrals()->with('referredUser')->get();
        
        return [
            'total_referrals' => $user->referrals()->count(),
            'active_referrals' => $referrals->count(),
            'monthly_analysis_bonus' => $user->getTotalAnalysisBonus(),
            'discount_percentage' => $user->getTotalDiscountPercentage(),
            'can_redeem_discount' => $user->canRedeemDiscount(),
            'referrals_by_plan' => $referrals->groupBy('referred_plan')->map->count(),
            'referrals' => $referrals->map(function ($referral) {
                return [
                    'id' => $referral->id,
                    'user_name' => $referral->referredUser->name,
                    'user_email' => $referral->referredUser->email,
                    'plan' => $referral->plan_label,
                    'plan_icon' => $referral->plan_icon,
                    'analysis_bonus' => $referral->monthly_analysis_bonus,
                    'created_at' => $referral->created_at,
                ];
            }),
        ];
    }

    /**
     * Redeem discount reward
     */
    public function redeemDiscount(User $user): bool
    {
        return $user->redeemDiscount();
    }

    /**
     * Get reward configuration (for admin panel)
     */
    public function getRewardConfig(): array
    {
        return self::REWARD_CONFIG;
    }

    /**
     * Update reward configuration (for admin panel)
     */
    public function updateRewardConfig(array $config): void
    {
        // This would typically be stored in a config table or cache
        // For now, we'll use a simple approach
        foreach ($config as $plan => $bonus) {
            if (isset(self::REWARD_CONFIG[$plan])) {
                // Update existing referrals with new bonus
                Referral::where('referred_plan', $plan)
                    ->update(['monthly_analysis_bonus' => $bonus]);
            }
        }
    }
}
