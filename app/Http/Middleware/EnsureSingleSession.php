<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class EnsureSingleSession
{
    /**
     * Handle an incoming request.
     *
     * Este middleware solo registra actividades de sesión para auditoría.
     * El control de sesiones únicas se maneja en el Event Listener.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        // Logging de actividad de sesión
        $user = Auth::user();
        if ($user) {
            $this->logSessionActivity($user, $request);
        }

        return $response;
    }

    /**
     * Log session activity for audit purposes
     */
    private function logSessionActivity($user, Request $request): void
    {
        // Solo loggear cada 5 minutos para evitar spam
        $lastLogKey = "session_log_{$user->id}";
        $lastLogTime = cache()->get($lastLogKey, 0);
        
        if (now()->timestamp - $lastLogTime > 300) { // 5 minutos
            Log::channel('security')->info('User session activity', [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'session_id' => $request->session()->getId(),
                'ip_address' => $request->ip(),
                'user_agent' => $this->getBrowserInfo($request->userAgent()),
                'path' => $request->path(),
                'timestamp' => now()->toISOString(),
            ]);
            
            cache()->put($lastLogKey, now()->timestamp, 300);
        }
    }

    /**
     * Get browser information from user agent
     */
    private function getBrowserInfo(string $userAgent): string
    {
        if (str_contains($userAgent, 'Chrome') && !str_contains($userAgent, 'Edg')) {
            return 'Chrome';
        } elseif (str_contains($userAgent, 'Firefox')) {
            return 'Firefox';
        } elseif (str_contains($userAgent, 'Safari') && !str_contains($userAgent, 'Chrome')) {
            return 'Safari';
        } elseif (str_contains($userAgent, 'Edg')) {
            return 'Edge';
        } else {
            return 'Unknown Browser';
        }
    }
}
