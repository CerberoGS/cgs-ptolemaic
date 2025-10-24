<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogFilamentPerformance
{
    /**
     * Log request duration and memory usage for Filament admin routes.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $startedAt = microtime(true);
        $initialMemory = memory_get_usage(true);

        $response = $next($request);

        $durationMs = round((microtime(true) - $startedAt) * 1000, 2);
        $memoryPeakMb = round((memory_get_peak_usage(true) - $initialMemory) / 1024 / 1024, 2);

        logger()->info('filament.performance', [
            'path' => $request->path(),
            'method' => $request->method(),
            'status' => $response->getStatusCode(),
            'duration_ms' => $durationMs,
            'memory_peak_mb' => $memoryPeakMb,
            'user_id' => optional($request->user())->id,
        ]);

        return $response;
    }
}
