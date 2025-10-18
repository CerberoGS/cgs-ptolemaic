<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TelegramConfig;
use App\Services\TelegramService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class TelegramConfigController extends Controller
{
    public function __construct(
        private TelegramService $telegramService
    ) {
        //
    }

    /**
     * Show Telegram configuration page
     */
    public function index(): Response
    {
        $config = TelegramConfig::firstOrCreate([]);

        return Inertia::render('admin/TelegramConfig/Index', [
            'config' => $config,
        ]);
    }

    /**
     * Update Telegram configuration
     */
    public function update(Request $request)
    {
        $request->validate([
            'bot_token' => 'required|string|min:10',
            'bot_username' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        try {
            // Test the bot token
            $testResponse = $this->testBotToken($request->bot_token);
            
            if (!$testResponse['success']) {
                return back()->withErrors([
                    'bot_token' => 'Token de bot inválido: ' . $testResponse['error'],
                ]);
            }

            // Update or create configuration
            DB::table('telegram_config')->updateOrInsert(
                ['id' => 1],
                [
                    'bot_token' => $request->bot_token,
                    'bot_username' => $request->bot_username ?: $testResponse['username'],
                    'is_active' => $request->boolean('is_active'),
                    'updated_at' => now(),
                ]
            );

            // Reload Telegram service configuration
            $this->telegramService = app(TelegramService::class);

            // Set webhook if active
            if ($request->boolean('is_active')) {
                $webhookUrl = route('telegram.webhook');
                $this->telegramService->setWebhook($webhookUrl);
            }

            Log::info('Telegram configuration updated', [
                'user_id' => auth()->id(),
                'is_active' => $request->boolean('is_active'),
            ]);

            return back()->with('success', 'Configuración de Telegram actualizada correctamente.');

        } catch (\Exception $e) {
            Log::error('Failed to update Telegram configuration', [
                'user_id' => auth()->id(),
                'error' => $e->getMessage(),
            ]);

            return back()->withErrors([
                'general' => 'Error al actualizar la configuración: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Test bot token
     */
    public function test(Request $request)
    {
        $request->validate([
            'bot_token' => 'required|string',
        ]);

        $result = $this->testBotToken($request->bot_token);

        return response()->json($result);
    }

    /**
     * Test bot token validity
     */
    private function testBotToken(string $botToken): array
    {
        try {
            $response = \Http::get("https://api.telegram.org/bot{$botToken}/getMe");
            
            if ($response->successful()) {
                $data = $response->json();
                return [
                    'success' => true,
                    'username' => $data['result']['username'] ?? null,
                    'first_name' => $data['result']['first_name'] ?? null,
                ];
            } else {
                return [
                    'success' => false,
                    'error' => 'Token inválido o bot no encontrado',
                ];
            }
        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Handle Telegram webhook
     */
    public function webhook(Request $request)
    {
        try {
            $update = $request->all();
            
            // Log webhook for debugging
            Log::info('Telegram webhook received', [
                'update_id' => $update['update_id'] ?? null,
                'message_type' => $update['message']['text'] ?? 'unknown',
            ]);

            // Handle different types of updates
            if (isset($update['message'])) {
                $this->handleMessage($update['message']);
            }

            return response()->json(['ok' => true]);

        } catch (\Exception $e) {
            Log::error('Telegram webhook error', [
                'error' => $e->getMessage(),
                'request' => $request->all(),
            ]);

            return response()->json(['ok' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Handle incoming messages
     */
    private function handleMessage(array $message): void
    {
        $chatId = $message['chat']['id'];
        $text = $message['text'] ?? '';
        $from = $message['from'] ?? [];

        // Handle /start command
        if ($text === '/start') {
            $this->handleStartCommand($chatId, $from);
        }
        // Handle /link command for linking account
        elseif (str_starts_with($text, '/link ')) {
            $this->handleLinkCommand($chatId, $text, $from);
        }
    }

    /**
     * Handle /start command
     */
    private function handleStartCommand(int $chatId, array $from): void
    {
        $message = "¡Hola! 👋\n\n";
        $message .= "Soy el bot de seguridad de CGS Ptolemaic.\n";
        $message .= "Para vincular tu cuenta, usa el comando:\n";
        $message .= "/link TU_CODIGO_DE_VINCULACION\n\n";
        $message .= "Puedes obtener tu código en la configuración de seguridad de tu cuenta.";

        $this->sendTelegramMessage($chatId, $message);
    }

    /**
     * Handle /link command
     */
    private function handleLinkCommand(int $chatId, string $text, array $from): void
    {
        $code = trim(substr($text, 6)); // Remove '/link ' prefix
        
        if (empty($code)) {
            $this->sendTelegramMessage($chatId, "Por favor proporciona un código de vinculación válido.");
            return;
        }

        // Find user by linking code (you'll need to implement this)
        $user = \App\Models\User::where('telegram_linking_code', $code)->first();
        
        if (!$user) {
            $this->sendTelegramMessage($chatId, "Código de vinculación inválido o expirado.");
            return;
        }

        // Link the account
        $user->update([
            'telegram_chat_id' => $chatId,
            'telegram_enabled' => true,
            'telegram_linking_code' => null, // Clear the code
        ]);

        $this->sendTelegramMessage($chatId, "¡Cuenta vinculada correctamente! 🎉\n\nAhora recibirás alertas de seguridad importantes.");
    }

    /**
     * Send message to Telegram chat
     */
    private function sendTelegramMessage(int $chatId, string $message): void
    {
        try {
            $config = DB::table('telegram_config')->first();
            
            if (!$config || !$config->is_active) {
                return;
            }

            \Http::post("https://api.telegram.org/bot{$config->bot_token}/sendMessage", [
                'chat_id' => $chatId,
                'text' => $message,
                'parse_mode' => 'HTML',
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to send Telegram message', [
                'chat_id' => $chatId,
                'error' => $e->getMessage(),
            ]);
        }
    }
}