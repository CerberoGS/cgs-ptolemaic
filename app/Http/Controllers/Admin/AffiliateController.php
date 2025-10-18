<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AffiliateCode;
use App\Models\AffiliateReward;
use App\Models\Referral;
use App\Models\User;
use App\Services\AffiliateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AffiliateController extends Controller
{
    public function __construct(
        private AffiliateService $affiliateService
    ) {}

    /**
     * Display affiliate system overview
     */
    public function index(): Response
    {
        $stats = [
            'total_affiliates' => User::whereNotNull('affiliate_code')->count(),
            'total_referrals' => Referral::count(),
            'active_referrals' => Referral::where('status', 'active')->count(),
            'total_rewards_given' => AffiliateReward::count(),
            'active_rewards' => AffiliateReward::where('status', 'active')->count(),
        ];

        $recentReferrals = Referral::with(['affiliateUser', 'referredUser'])
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($referral) {
                return [
                    'id' => $referral->id,
                    'affiliate_name' => $referral->affiliateUser->name,
                    'referred_name' => $referral->referredUser->name,
                    'plan' => $referral->plan_label,
                    'plan_icon' => $referral->plan_icon,
                    'analysis_bonus' => $referral->monthly_analysis_bonus,
                    'created_at' => $referral->created_at,
                ];
            });

        $topAffiliates = User::whereNotNull('affiliate_code')
            ->withCount(['activeReferrals'])
            ->orderBy('active_referrals_count', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'affiliate_code' => $user->affiliate_code,
                    'active_referrals_count' => $user->active_referrals_count,
                    'monthly_analysis_bonus' => $user->getTotalAnalysisBonus(),
                    'discount_percentage' => $user->getTotalDiscountPercentage(),
                ];
            });

        return Inertia::render('admin/affiliate/index', [
            'stats' => $stats,
            'recentReferrals' => $recentReferrals,
            'topAffiliates' => $topAffiliates,
            'rewardConfig' => $this->affiliateService->getRewardConfig(),
        ]);
    }

    /**
     * Display affiliate codes management
     */
    public function codes(): Response
    {
        $codes = AffiliateCode::with('user')
            ->latest()
            ->paginate(20)
            ->through(function ($code) {
                return [
                    'id' => $code->id,
                    'code' => $code->code,
                    'user_name' => $code->user->name,
                    'user_email' => $code->user->email,
                    'is_active' => $code->is_active,
                    'total_referrals' => $code->total_referrals,
                    'active_referrals' => $code->active_referrals,
                    'total_earnings' => $code->total_earnings,
                    'created_at' => $code->created_at,
                ];
            });

        // Calculate stats
        $stats = [
            'total_codes' => AffiliateCode::count(),
            'active_codes' => AffiliateCode::where('is_active', true)->count(),
            'inactive_codes' => AffiliateCode::where('is_active', false)->count(),
            'total_earnings' => AffiliateCode::sum('total_earnings') ?? 0,
        ];

        return Inertia::render('admin/affiliate/codes', [
            'codes' => $codes,
            'stats' => $stats,
        ]);
    }

    /**
     * Display referrals management
     */
    public function referrals(): Response
    {
        $referrals = Referral::with(['affiliateUser', 'referredUser'])
            ->latest()
            ->paginate(20)
            ->through(function ($referral) {
                return [
                    'id' => $referral->id,
                    'affiliate_name' => $referral->affiliateUser->name,
                    'affiliate_email' => $referral->affiliateUser->email,
                    'referred_name' => $referral->referredUser->name,
                    'referred_email' => $referral->referredUser->email,
                    'affiliate_code' => $referral->affiliate_code,
                    'plan' => $referral->plan_label,
                    'plan_icon' => $referral->plan_icon,
                    'status' => $referral->status,
                    'analysis_bonus' => $referral->monthly_analysis_bonus,
                    'created_at' => $referral->created_at,
                ];
            });

        return Inertia::render('admin/affiliate/referrals', [
            'referrals' => $referrals,
        ]);
    }

    /**
     * Display rewards management
     */
    public function rewards(): Response
    {
        $rewards = AffiliateReward::with('user')
            ->latest()
            ->paginate(20)
            ->through(function ($reward) {
                return [
                    'id' => $reward->id,
                    'user_name' => $reward->user->name,
                    'user_email' => $reward->user->email,
                    'reward_type' => $reward->reward_type,
                    'analysis_bonus' => $reward->analysis_bonus,
                    'discount_percentage' => $reward->discount_percentage,
                    'referrals_count' => $reward->referrals_count,
                    'status' => $reward->status,
                    'expires_at' => $reward->expires_at,
                    'notes' => $reward->notes,
                    'created_at' => $reward->created_at,
                ];
            });

        return Inertia::render('admin/affiliate/rewards', [
            'rewards' => $rewards,
        ]);
    }

    /**
     * Update reward configuration
     */
    public function updateRewardConfig(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'free' => ['required', 'integer', 'min:0', 'max:100'],
            'managed' => ['required', 'integer', 'min:0', 'max:100'],
            'pro' => ['required', 'integer', 'min:0', 'max:100'],
            'enterprise' => ['required', 'integer', 'min:0', 'max:100'],
        ]);

        $this->affiliateService->updateRewardConfig($validated);

        return back()->with('success', __('Reward configuration updated successfully!'));
    }

    /**
     * Toggle affiliate code status
     */
    public function toggleCodeStatus(string $locale, $affiliateCode): RedirectResponse
    {
        // Handle both model binding and manual ID resolution
        if (is_string($affiliateCode) || is_numeric($affiliateCode)) {
            $affiliateCode = AffiliateCode::findOrFail($affiliateCode);
        }

        $affiliateCode->update(['is_active' => ! $affiliateCode->is_active]);

        $status = $affiliateCode->is_active ? 'activated' : 'deactivated';

        return back()->with('success', __("Affiliate code {$status} successfully!"));
    }

    /**
     * Update referral status
     */
    public function updateReferralStatus(Request $request, string $locale, $referral): RedirectResponse
    {
        // Handle both model binding and manual ID resolution
        if (is_string($referral) || is_numeric($referral)) {
            $referral = Referral::findOrFail($referral);
        }

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:active,inactive,cancelled'],
        ]);

        $referral->update($validated);

        return back()->with('success', __('Referral status updated successfully!'));
    }

    /**
     * Update reward status
     */
    public function updateRewardStatus(Request $request, string $locale, $reward): RedirectResponse
    {
        // Handle both model binding and manual ID resolution
        if (is_string($reward) || is_numeric($reward)) {
            $reward = AffiliateReward::findOrFail($reward);
        }

        $validated = $request->validate([
            'status' => ['required', 'string', 'in:active,redeemed,expired'],
        ]);

        $reward->update($validated);

        return back()->with('success', __('Reward status updated successfully!'));
    }
}
