<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureLocaleTrailingSlash
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $path = $request->path();
        $supportedLocales = config('app.supported_locales', ['es', 'en']);

        // Check if path starts with a supported locale but doesn't have trailing slash
        foreach ($supportedLocales as $locale) {
            if ($path === $locale && ! str_ends_with($request->getRequestUri(), '/')) {
                // Redirect to the same URL with trailing slash
                return redirect($request->url().'/'.($request->getQueryString() ? '?'.$request->getQueryString() : ''), 301);
            }
        }

        return $next($request);
    }
}
