<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Services\AffiliateService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class TrackAffiliateReferral
{
    public function __construct(
        private AffiliateService $affiliateService
    ) {}

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check for affiliate code in URL parameter
        $affiliateCode = $request->query('ref');
        
        if ($affiliateCode) {
            // Store affiliate code in session for later processing
            Session::put('affiliate_code', $affiliateCode);
            
            // Also store in cookie for longer persistence
            cookie()->queue('affiliate_code', $affiliateCode, 60 * 24 * 30); // 30 days
        }

        // Check for affiliate code in cookie if not in URL
        if (!$affiliateCode && $request->hasCookie('affiliate_code')) {
            $affiliateCode = $request->cookie('affiliate_code');
            Session::put('affiliate_code', $affiliateCode);
        }

        return $next($request);
    }
}
