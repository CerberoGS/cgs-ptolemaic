<?php

declare(strict_types=1);

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Services\AffiliateService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AffiliateController extends Controller
{
    public function __construct(
        private AffiliateService $affiliateService
    ) {}

    /**
     * Display the affiliate dashboard
     */
    public function index(): Response
    {
        $user = Auth::user();
        
        // Ensure user has affiliate code
        if (!$user->affiliate_code) {
            $user->generateAffiliateCode();
        }

        $stats = $this->affiliateService->getAffiliateStats($user);

        return Inertia::render('settings/affiliate/index', [
            'affiliateCode' => $user->affiliate_code,
            'affiliateLink' => $user->getAffiliateLink(),
            'stats' => $stats,
            'rewardConfig' => $this->affiliateService->getRewardConfig(),
        ]);
    }

    /**
     * Redeem discount reward
     */
    public function redeemDiscount(Request $request): RedirectResponse
    {
        $user = Auth::user();
        
        if ($this->affiliateService->redeemDiscount($user)) {
            return back()->with('success', __('Discount redeemed successfully!'));
        }

        return back()->with('error', __('Unable to redeem discount. Check requirements.'));
    }

    /**
     * Copy affiliate link to clipboard
     */
    public function copyLink(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $link = $user->getAffiliateLink();
        
        return back()->with('success', __('Affiliate link copied to clipboard!'));
    }
}
