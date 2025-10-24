<?php

namespace App\Filament\Resources\AiProviders\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class AiProviderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required(),
                TextInput::make('display_name')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('base_url')
                    ->url(),
                TextInput::make('docs_url')
                    ->url(),
                TextInput::make('verification_endpoint'),
                Toggle::make('requires_organization')
                    ->required(),
                TextInput::make('status')
                    ->required()
                    ->default('active'),
                TextInput::make('test_json'),
                TextInput::make('ops_json'),
                Repeater::make('models')
                    ->relationship('models')
                    ->label('Modelos disponibles')
                    ->createItemButtonLabel('Agregar modelo')
                    ->collapsed()
                    ->collapsible()
                    ->grid(2)
                    ->schema([
                        TextInput::make('slug')
                            ->label('Identificador')
                            ->required()
                            ->maxLength(100),
                        TextInput::make('display_name')
                            ->label('Nombre visible')
                            ->required()
                            ->maxLength(150),
                        Textarea::make('description')
                            ->rows(2)
                            ->columnSpanFull(),
                        TextInput::make('context_window')
                            ->numeric()
                            ->minValue(1)
                            ->label('Context window')
                            ->placeholder('Ej. 128000'),
                        Select::make('availability')
                            ->options([
                                'general' => 'General',
                                'limited' => 'Limitado',
                                'deprecated' => 'Deprecado',
                            ])
                            ->default('general')
                            ->label('Disponibilidad'),
                        Toggle::make('is_default')
                            ->label('Modelo por defecto')
                            ->default(false)
                            ->inline(false),
                    ])
                    ->maxItems(10),
            ]);
    }
}
