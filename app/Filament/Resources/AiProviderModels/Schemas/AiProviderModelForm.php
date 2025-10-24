<?php

namespace App\Filament\Resources\AiProviderModels\Schemas;

use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class AiProviderModelForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('ai_provider_id')
                    ->label('Proveedor de IA')
                    ->relationship('provider', 'display_name')
                    ->searchable()
                    ->required()
                    ->preload()
                    ->columnSpanFull(),
                TextInput::make('slug')
                    ->label('Identificador')
                    ->required()
                    ->maxLength(100)
                    ->helperText('Identificador único del modelo (ej: gpt-4, claude-3-sonnet)'),
                TextInput::make('display_name')
                    ->label('Nombre Visible')
                    ->required()
                    ->maxLength(150),
                Textarea::make('description')
                    ->label('Descripción')
                    ->rows(3)
                    ->columnSpanFull(),
                TextInput::make('context_window')
                    ->label('Ventana de Contexto')
                    ->numeric()
                    ->minValue(1)
                    ->helperText('Número de tokens que el modelo puede procesar'),
                Select::make('availability')
                    ->label('Disponibilidad')
                    ->options([
                        'general' => 'General',
                        'limited' => 'Limitado',
                        'deprecated' => 'Deprecado',
                    ])
                    ->default('general')
                    ->required(),
                Toggle::make('is_default')
                    ->label('Modelo por Defecto')
                    ->default(false)
                    ->inline(false),
                KeyValue::make('capabilities')
                    ->label('Capacidades')
                    ->keyLabel('Capacidad')
                    ->valueLabel('Valor')
                    ->helperText('Define las capacidades del modelo (ej: vision: true, function_calling: true)')
                    ->columnSpanFull(),
                KeyValue::make('pricing')
                    ->label('Precios')
                    ->keyLabel('Tipo')
                    ->valueLabel('Precio')
                    ->helperText('Define los precios del modelo (ej: input_per_1k: 0.01, output_per_1k: 0.03)')
                    ->columnSpanFull(),
            ]);
    }
}
