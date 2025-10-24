<?php

namespace App\Filament\Resources\Achievements\Schemas;

use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AchievementForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('key')
                    ->label('Clave Única')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(100)
                    ->helperText('Identificador único del logro (ej: first_trade, win_streak_10)'),
                TextInput::make('name')
                    ->label('Nombre')
                    ->required()
                    ->maxLength(255),
                Textarea::make('description')
                    ->label('Descripción')
                    ->required()
                    ->rows(3)
                    ->columnSpanFull(),
                TextInput::make('icon')
                    ->label('Icono')
                    ->maxLength(50)
                    ->helperText('Nombre del icono o emoji'),
                Select::make('tier')
                    ->label('Nivel')
                    ->options([
                        'bronze' => 'Bronce',
                        'silver' => 'Plata',
                        'gold' => 'Oro',
                        'platinum' => 'Platino',
                        'diamond' => 'Diamante',
                    ])
                    ->required()
                    ->default('bronze'),
                TextInput::make('points')
                    ->label('Puntos')
                    ->numeric()
                    ->required()
                    ->default(10)
                    ->minValue(0),
                KeyValue::make('criteria')
                    ->label('Criterios de Desbloqueo')
                    ->keyLabel('Criterio')
                    ->valueLabel('Valor')
                    ->helperText('Define los criterios que deben cumplirse para desbloquear este logro')
                    ->columnSpanFull(),
            ]);
    }
}
