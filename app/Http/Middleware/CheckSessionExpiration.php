<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CheckSessionExpiration
{
    /**
     * Handle an incoming request.
     *
     * Este middleware verifica si la sesión está marcada como expirada.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        if ($user) {
            $sessionId = $request->session()->getId();
            
            // Verificar si la sesión está marcada como expirada
            if ($this->isSessionExpired($sessionId)) {
                Log::info('Session expired due to new login', [
                    'user_id' => $user->id,
                    'session_id' => $sessionId,
                    'ip_address' => $request->ip(),
                ]);
                
                // Cerrar sesión y redirigir al login
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                
                return redirect()->route('login')->with('message', 'Tu sesión ha expirado debido a un nuevo inicio de sesión en otro dispositivo.');
            }
        }

        return $next($request);
    }

    /**
     * Check if session is marked as expired
     */
    private function isSessionExpired(string $sessionId): bool
    {
        try {
            $session = \DB::table('sessions')->where('id', $sessionId)->first();
            
            if (!$session) {
                return true; // Sesión no existe, considerarla expirada
            }
            
            // Decodificar el payload de la sesión
            $payload = unserialize(base64_decode($session->payload));
            
            // Verificar si está marcada como expirada
            return isset($payload['session_expired']) && $payload['session_expired'] === true;
            
        } catch (\Exception $e) {
            Log::error('Error checking session expiration', [
                'session_id' => $sessionId,
                'error' => $e->getMessage(),
            ]);
            
            return false; // En caso de error, no expirar la sesión
        }
    }
}

