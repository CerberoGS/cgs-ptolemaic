<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePlanAllowsIntegrations
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user === null || ! $user->canAccessProviderIntegrations()) {
            if ($request->expectsJson()) {
                abort(Response::HTTP_FORBIDDEN);
            }

            return redirect()
                ->route('settings.plan.show')
                ->with('flash', [
                    'type' => 'warning',
                    'message' => __('You need to upgrade your plan to access provider integrations.'),
                ]);
        }

        return $next($request);
    }
}
