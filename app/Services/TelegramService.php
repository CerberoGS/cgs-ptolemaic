<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramService
{
    private ?string $botToken = null;
    private ?string $botUsername = null;
    private bool $isActive = false;

    public function __construct()
    {
        $this->loadConfig();
    }

    /**
     * Load Telegram configuration from database
     */
    private function loadConfig(): void
    {
        try {
            $config = \DB::table('telegram_config')->first();
            
            if ($config && $config->is_active) {
                $this->botToken = $config->bot_token;
                $this->botUsername = $config->bot_username;
                $this->isActive = true;
            }
        } catch (\Exception $e) {
            Log::warning('Failed to load Telegram config', [
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Check if Telegram is active and configured
     */
    public function isActive(): bool
    {
        return $this->isActive && $this->botToken;
    }

    /**
     * Send message to user's Telegram
     */
    public function sendMessage(User $user, string $message): bool
    {
        if (!$this->isActive() || !$user->telegram_chat_id || !$user->telegram_enabled) {
            return false;
        }

        try {
            $response = Http::post("https://api.telegram.org/bot{$this->botToken}/sendMessage", [
                'chat_id' => $user->telegram_chat_id,
                'text' => $message,
                'parse_mode' => 'HTML',
            ]);

            if ($response->successful()) {
                Log::info('Telegram message sent successfully', [
                    'user_id' => $user->id,
                    'chat_id' => $user->telegram_chat_id,
                ]);
                return true;
            } else {
                Log::error('Failed to send Telegram message', [
                    'user_id' => $user->id,
                    'response' => $response->body(),
                ]);
                return false;
            }
        } catch (\Exception $e) {
            Log::error('Telegram service error', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
            ]);
            return false;
        }
    }

    /**
     * Send security alert to Telegram
     */
    public function sendSecurityAlert(User $user, string $event, array $data): bool
    {
        $message = $this->formatSecurityMessage($user, $event, $data);
        return $this->sendMessage($user, $message);
    }

    /**
     * Format security message for Telegram
     */
    private function formatSecurityMessage(User $user, string $event, array $data): string
    {
        $timestamp = now()->format('d/m H:i');
        $ip = $data['ip_address'] ?? 'Desconocida';

        $message = "🔐 <b>CGS Ptolemaic - Alerta de Seguridad</b>\n\n";
        $message .= "Hola {$user->name},\n\n";

        switch ($event) {
            case 'login_from_unknown_country':
                $country = $data['country'] ?? 'Desconocido';
                $message .= "🚨 <b>Acceso desde {$country}</b> ({$ip})\n";
                $message .= "📅 {$timestamp}\n\n";
                $message .= "Si no fuiste tú, contacta soporte YA.";
                break;
            case 'plan_change':
                $newPlan = $data['new_plan'] ?? 'Desconocido';
                $message .= "📋 <b>Plan cambiado a:</b> {$newPlan}\n";
                $message .= "📅 {$timestamp}\n\n";
                $message .= "¿Fuiste tú quien hizo este cambio?";
                break;
            case 'affiliate_operation_high_value':
                $amount = $data['amount'] ?? 'Desconocido';
                $message .= "💰 <b>Operación afiliado:</b> {$amount}\n";
                $message .= "📅 {$timestamp}\n\n";
                $message .= "Revisa tu cuenta si no reconoces esta operación.";
                break;
            case 'ip_blocked':
                $message .= "🚫 <b>IP bloqueada:</b> {$ip}\n";
                $message .= "📅 {$timestamp}\n\n";
                $message .= "Contacta soporte para desbloquear.";
                break;
            case 'new_session':
                $message .= "🔍 <b>Nueva sesión detectada</b>\n";
                $message .= "📅 {$timestamp}\n";
                $message .= "🌐 IP: {$ip}\n\n";
                $message .= "Si no fuiste tú, cambia tu contraseña.";
                break;
            default:
                $message .= "🔍 <b>Actividad sospechosa detectada</b>\n";
                $message .= "📅 {$timestamp}\n\n";
                $message .= "Revisa tu cuenta.";
        }

        return $message;
    }

    /**
     * Set webhook for Telegram bot
     */
    public function setWebhook(string $webhookUrl): bool
    {
        if (!$this->isActive()) {
            return false;
        }

        try {
            $response = Http::post("https://api.telegram.org/bot{$this->botToken}/setWebhook", [
                'url' => $webhookUrl,
            ]);

            if ($response->successful()) {
                // Update webhook URL in database
                \DB::table('telegram_config')->update(['webhook_url' => $webhookUrl]);
                
                Log::info('Telegram webhook set successfully', [
                    'webhook_url' => $webhookUrl,
                ]);
                return true;
            } else {
                Log::error('Failed to set Telegram webhook', [
                    'response' => $response->body(),
                ]);
                return false;
            }
        } catch (\Exception $e) {
            Log::error('Telegram webhook error', [
                'error' => $e->getMessage(),
            ]);
            return false;
        }
    }

    /**
     * Get bot information
     */
    public function getBotInfo(): ?array
    {
        if (!$this->isActive()) {
            return null;
        }

        try {
            $response = Http::get("https://api.telegram.org/bot{$this->botToken}/getMe");
            
            if ($response->successful()) {
                return $response->json()['result'] ?? null;
            }
        } catch (\Exception $e) {
            Log::error('Failed to get Telegram bot info', [
                'error' => $e->getMessage(),
            ]);
        }

        return null;
    }
}