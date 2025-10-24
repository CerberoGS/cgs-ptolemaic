<?php

namespace App\Filament\Resources\PlanChanges\Schemas;

use App\Enums\PlanType;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class PlanChangeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Usuario')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->required()
                    ->preload(),
                Select::make('changed_by_user_id')
                    ->label('Cambiado Por')
                    ->relationship('changedBy', 'name')
                    ->searchable()
                    ->preload()
                    ->helperText('Usuario administrador que realizó el cambio'),
                Select::make('old_plan')
                    ->label('Plan Anterior')
                    ->options(PlanType::class)
                    ->required(),
                Select::make('new_plan')
                    ->label('Nuevo Plan')
                    ->options(PlanType::class)
                    ->required(),
                DateTimePicker::make('old_trial_ends_at')
                    ->label('Prueba Anterior (Finaliza)')
                    ->seconds(false),
                DateTimePicker::make('new_trial_ends_at')
                    ->label('Nueva Prueba (Finaliza)')
                    ->seconds(false),
                Textarea::make('reason')
                    ->label('Razón del Cambio')
                    ->rows(3)
                    ->columnSpanFull()
                    ->helperText('Opcional: describe por qué se realizó este cambio de plan'),
            ]);
    }
}
