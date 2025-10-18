<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Vonage\Client;
use Vonage\Client\Credentials\Basic;
use App\Services\TelegramService;

class SecurityNotificationService
{
    private ?Client $vonageClient = null;
    private TelegramService $telegramService;

    public function __construct()
    {
        $this->initializeVonageClient();
        $this->telegramService = app(TelegramService::class);
    }

    /**
     * Initialize Vonage client for WhatsApp/SMS
     */
    private function initializeVonageClient(): void
    {
        $apiKey = config('services.vonage.key');
        $apiSecret = config('services.vonage.secret');

        if ($apiKey && $apiSecret) {
            $this->vonageClient = new Client(new Basic($apiKey, $apiSecret));
        }
    }

    /**
     * Send critical security alert via email and WhatsApp
     */
    public function sendCriticalAlert(User $user, string $event, array $data): void
    {
        // Always send email alert
        $this->sendEmailAlert($user, $event, $data);

        // Send Telegram alert for critical events (if enabled by admin)
        if ($this->isCriticalEvent($event) && $this->telegramService->isActive()) {
            $this->telegramService->sendSecurityAlert($user, $event, $data);
        }

        // Send WhatsApp alert for critical events (if Vonage is configured)
        if ($this->isCriticalEvent($event) && $this->vonageClient) {
            $this->sendWhatsAppAlert($user, $event, $data);
        }

        // Log the alert
        $this->logSecurityAlert($user, $event, $data);
    }

    /**
     * Send email alert using Google SMTP
     */
    private function sendEmailAlert(User $user, string $event, array $data): void
    {
        try {
            $subject = $this->getEmailSubject($event);
            $message = $this->getEmailMessage($user, $event, $data);

            Mail::raw($message, function ($mail) use ($user, $subject) {
                $mail->to($user->email)
                    ->subject($subject);
            });

            Log::info('Security email alert sent', [
                'user_id' => $user->id,
                'event' => $event,
                'email' => $user->email,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send security email alert', [
                'user_id' => $user->id,
                'event' => $event,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Send WhatsApp alert via Vonage
     */
    private function sendWhatsAppAlert(User $user, string $event, array $data): void
    {
        if (! $this->vonageClient) {
            Log::warning('Vonage client not initialized, skipping WhatsApp alert');

            return;
        }

        try {
            $message = $this->getWhatsAppMessage($user, $event, $data);
            $fromNumber = config('services.vonage.from');

            if (! $fromNumber) {
                Log::warning('Vonage from number not configured');

                return;
            }

            $sms = new SMS($fromNumber, $user->phone ?? $user->email, $message);
            $this->vonageClient->sms()->send($sms);

            Log::info('Security WhatsApp alert sent', [
                'user_id' => $user->id,
                'event' => $event,
                'phone' => $user->phone ?? 'email_fallback',
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send security WhatsApp alert', [
                'user_id' => $user->id,
                'event' => $event,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Check if event is critical enough for WhatsApp alert
     */
    private function isCriticalEvent(string $event): bool
    {
        $criticalEvents = [
            'login_from_unknown_country',
            'plan_change',
            'affiliate_operation_high_value',
            'ip_blocked',
            'multiple_failed_logins',
            'suspicious_activity',
        ];

        return in_array($event, $criticalEvents);
    }

    /**
     * Get email subject based on event
     */
    private function getEmailSubject(string $event): string
    {
        $subjects = [
            'new_session' => '🔐 Nueva sesión detectada - CGS Ptolemaic',
            'login_from_unknown_country' => '🚨 Acceso desde país desconocido - CGS Ptolemaic',
            'plan_change' => '📋 Cambio de plan detectado - CGS Ptolemaic',
            'affiliate_operation_high_value' => '💰 Operación de afiliado de alto valor - CGS Ptolemaic',
            'ip_blocked' => '🚫 IP bloqueada automáticamente - CGS Ptolemaic',
            'multiple_failed_logins' => '⚠️ Múltiples intentos de login fallidos - CGS Ptolemaic',
            'suspicious_activity' => '🔍 Actividad sospechosa detectada - CGS Ptolemaic',
        ];

        return $subjects[$event] ?? '🔔 Alerta de seguridad - CGS Ptolemaic';
    }

    /**
     * Get email message content
     */
    private function getEmailMessage(User $user, string $event, array $data): string
    {
        $timestamp = now()->format('d/m/Y H:i:s');
        $ip = $data['ip_address'] ?? 'Desconocida';
        $userAgent = $data['user_agent'] ?? 'Desconocido';

        $baseMessage = "Hola {$user->name},\n\n";
        $baseMessage .= "Se ha detectado una actividad en tu cuenta de CGS Ptolemaic:\n\n";
        $baseMessage .= "📅 Fecha y hora: {$timestamp}\n";
        $baseMessage .= "🌐 Dirección IP: {$ip}\n";
        $baseMessage .= "💻 Navegador: {$userAgent}\n\n";

        switch ($event) {
            case 'new_session':
                $baseMessage .= "Se ha iniciado una nueva sesión en tu cuenta. Si no fuiste tú, cambia tu contraseña inmediatamente.\n";
                break;
            case 'login_from_unknown_country':
                $country = $data['country'] ?? 'Desconocido';
                $baseMessage .= "Se ha detectado un acceso desde {$country}. Si no fuiste tú, contacta soporte inmediatamente.\n";
                break;
            case 'plan_change':
                $oldPlan = $data['old_plan'] ?? 'Desconocido';
                $newPlan = $data['new_plan'] ?? 'Desconocido';
                $baseMessage .= "Tu plan ha cambiado de {$oldPlan} a {$newPlan}.\n";
                break;
            case 'affiliate_operation_high_value':
                $amount = $data['amount'] ?? 'Desconocido';
                $baseMessage .= "Se ha realizado una operación de afiliado por valor de {$amount}.\n";
                break;
            case 'ip_blocked':
                $baseMessage .= "Tu IP ha sido bloqueada automáticamente por actividad sospechosa.\n";
                break;
            case 'multiple_failed_logins':
                $attempts = $data['attempts'] ?? 'Múltiples';
                $baseMessage .= "Se han detectado {$attempts} intentos de login fallidos.\n";
                break;
            default:
                $baseMessage .= "Se ha detectado actividad sospechosa en tu cuenta.\n";
        }

        $baseMessage .= "\nSi no reconoces esta actividad, contacta soporte inmediatamente.\n\n";
        $baseMessage .= "Saludos,\nEquipo de CGS Ptolemaic";

        return $baseMessage;
    }

    /**
     * Get WhatsApp message content
     */
    private function getWhatsAppMessage(User $user, string $event, array $data): string
    {
        $timestamp = now()->format('d/m H:i');
        $ip = $data['ip_address'] ?? 'Desconocida';

        $message = "🔐 CGS Ptolemaic - Alerta de Seguridad\n\n";
        $message .= "Hola {$user->name},\n\n";

        switch ($event) {
            case 'login_from_unknown_country':
                $country = $data['country'] ?? 'Desconocido';
                $message .= "🚨 Acceso desde {$country} ({$ip})\n";
                $message .= "📅 {$timestamp}\n\n";
                $message .= 'Si no fuiste tú, contacta soporte YA.';
                break;
            case 'plan_change':
                $newPlan = $data['new_plan'] ?? 'Desconocido';
                $message .= "📋 Plan cambiado a: {$newPlan}\n";
                $message .= "📅 {$timestamp}\n\n";
                $message .= '¿Fuiste tú quien hizo este cambio?';
                break;
            case 'affiliate_operation_high_value':
                $amount = $data['amount'] ?? 'Desconocido';
                $message .= "💰 Operación afiliado: {$amount}\n";
                $message .= "📅 {$timestamp}\n\n";
                $message .= 'Revisa tu cuenta si no reconoces esta operación.';
                break;
            case 'ip_blocked':
                $message .= "🚫 IP bloqueada: {$ip}\n";
                $message .= "📅 {$timestamp}\n\n";
                $message .= 'Contacta soporte para desbloquear.';
                break;
            default:
                $message .= "🔍 Actividad sospechosa detectada\n";
                $message .= "📅 {$timestamp}\n\n";
                $message .= 'Revisa tu cuenta.';
        }

        return $message;
    }

    /**
     * Log security alert
     */
    private function logSecurityAlert(User $user, string $event, array $data): void
    {
        Log::info('Security alert processed', [
            'user_id' => $user->id,
            'user_email' => $user->email,
            'event' => $event,
            'data' => $data,
            'timestamp' => now()->toISOString(),
        ]);
    }
}
