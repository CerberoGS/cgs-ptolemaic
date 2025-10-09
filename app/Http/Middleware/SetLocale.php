<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Maneja la localización antes de atender la solicitud.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $supportedLocales = config('app.supported_locales', ['es', 'en']);
        $supportedLocales = array_values(array_unique($supportedLocales));

        $localeFromRoute = $request->route()?->parameter('locale');
        if ($localeFromRoute !== null && ! in_array($localeFromRoute, $supportedLocales, true)) {
            abort(404);
        }

        $cookieLocale = $request->cookie('locale');
        $preferredLocale = $request->getPreferredLanguage($supportedLocales);

        $locale = $localeFromRoute
            ?? (in_array($cookieLocale, $supportedLocales, true) ? $cookieLocale : null)
            ?? $preferredLocale
            ?? config('app.locale');

        if (! in_array($locale, $supportedLocales, true)) {
            $locale = config('app.locale');
        }

        app()->setLocale($locale);
        URL::defaults(['locale' => $locale]);

        if ($request->route() && $request->route()->parameter('locale') === null) {
            $request->route()->setParameter('locale', $locale);
        }

        if ($request->cookie('locale') !== $locale) {
            cookie()->queue('locale', $locale, 60 * 24 * 365);
        }

        return $next($request);
    }
}
