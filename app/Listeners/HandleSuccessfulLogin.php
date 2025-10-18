<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Services\SecurityNotificationService;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class HandleSuccessfulLogin
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
        $user = $event->user;
        $request = request();

        // Esperar un momento para que Laravel termine de crear la nueva sesión
        sleep(2);

        // Invalidar todas las sesiones anteriores del usuario
        $this->invalidatePreviousSessions($user, $request);
        
        // Forzar cierre de sesiones anteriores en el navegador
        $this->forceSessionClosure($user, $request);
    }

    /**
     * Invalidate previous sessions and send security alert
     */
    private function invalidatePreviousSessions($user, $request): void
    {
        $currentSessionId = $request->session()->getId();

        // Buscar TODAS las sesiones del usuario (incluyendo la actual)
        $allSessions = DB::table('sessions')
            ->where('user_id', $user->id)
            ->get();

        // Filtrar para obtener solo las sesiones anteriores (excluyendo la actual)
        $previousSessions = $allSessions->filter(function ($session) use ($currentSessionId) {
            return $session->id !== $currentSessionId;
        });

        if ($previousSessions->isNotEmpty()) {
            Log::info('Found previous sessions to invalidate', [
                'user_id' => $user->id,
                'current_session' => $currentSessionId,
                'previous_sessions_count' => $previousSessions->count(),
                'all_sessions' => $allSessions->pluck('id')->toArray(),
            ]);

            // Invalidar sesiones anteriores
            foreach ($previousSessions as $session) {
                DB::table('sessions')->where('id', $session->id)->delete();

                Log::warning('Session invalidated due to new login', [
                    'user_id' => $user->id,
                    'user_email' => $user->email,
                    'invalidated_session_id' => $session->id,
                    'new_session_id' => $currentSessionId,
                    'ip_address' => $request->ip(),
                    'user_agent' => $this->getBrowserInfo($request->userAgent()),
                    'timestamp' => now()->toISOString(),
                ]);
            }

            // Enviar alerta de seguridad
            $this->sendSecurityAlert($user, $request, $previousSessions->count());
        } else {
            Log::info('No previous sessions found for user', [
                'user_id' => $user->id,
                'current_session' => $currentSessionId,
                'total_sessions' => $allSessions->count(),
            ]);
        }
    }

    /**
     * Force session closure in browser by updating session data
     */
    private function forceSessionClosure($user, $request): void
    {
        try {
            // Buscar todas las sesiones del usuario
            $allSessions = DB::table('sessions')
                ->where('user_id', $user->id)
                ->get();

            $currentSessionId = $request->session()->getId();

            foreach ($allSessions as $session) {
                // Solo procesar sesiones que no sean la actual
                if ($session->id !== $currentSessionId) {
                    // Decodificar el payload de la sesión
                    $payload = unserialize(base64_decode($session->payload));
                    
                    // Agregar flag de sesión expirada
                    $payload['session_expired'] = true;
                    $payload['expired_at'] = now()->toISOString();
                    $payload['expired_reason'] = 'new_login_detected';
                    
                    // Actualizar la sesión con el flag de expiración
                    DB::table('sessions')
                        ->where('id', $session->id)
                        ->update([
                            'payload' => base64_encode(serialize($payload)),
                            'last_activity' => time() - 3600, // Hacer que expire hace 1 hora
                        ]);

                    Log::info('Session flagged for expiration', [
                        'session_id' => $session->id,
                        'user_id' => $user->id,
                        'expired_at' => now()->toISOString(),
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::error('Failed to force session closure', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Send security alert for new login
     */
    private function sendSecurityAlert($user, $request, int $invalidatedCount): void
    {
        try {
            $securityService = app(SecurityNotificationService::class);

            $data = [
                'ip_address' => $request->ip(),
                'user_agent' => $this->getBrowserInfo($request->userAgent()),
                'invalidated_sessions_count' => $invalidatedCount,
                'session_id' => $request->session()->getId(),
            ];

            $securityService->sendCriticalAlert($user, 'new_session', $data);

            Log::info('Security alert sent for new login', [
                'user_id' => $user->id,
                'invalidated_sessions' => $invalidatedCount,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send security alert for new login', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);
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