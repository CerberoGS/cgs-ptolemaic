<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Check if user is authenticated and has Admin or Manager role
        if (! $user || ! $user->hasAnyRole(['Admin', 'Manager'])) {
            abort(403, 'You do not have permission to access the admin panel.');
        }

        return $next($request);
    }
}
