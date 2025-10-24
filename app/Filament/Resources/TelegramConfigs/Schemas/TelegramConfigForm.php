<?php

namespace App\Filament\Resources\TelegramConfigs\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class TelegramConfigForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('bot_token')
                    ->label('Token del Bot')
                    ->required()
                    ->password()
                    ->revealable()
                    ->maxLength(255)
                    ->helperText('Token proporcionado por @BotFather')
                    ->columnSpanFull(),
                TextInput::make('chat_id')
                    ->label('Chat ID')
                    ->maxLength(255)
                    ->helperText('ID del chat o canal donde el bot enviará mensajes'),
                TextInput::make('webhook_url')
                    ->label('URL del Webhook')
                    ->url()
                    ->maxLength(255)
                    ->helperText('URL donde Telegram enviará las actualizaciones'),
                Toggle::make('is_active')
                    ->label('Activo')
                    ->default(true)
                    ->inline(false)
                    ->helperText('Activar o desactivar la integración de Telegram'),
            ]);
    }
}
