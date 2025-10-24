<?php

namespace App\Filament\Resources\AiProviderModels\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AiProviderModelsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('provider.display_name')
                    ->label('Proveedor')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('slug')
                    ->label('Identificador')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('display_name')
                    ->label('Nombre')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('context_window')
                    ->label('Context Window')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('availability')
                    ->label('Disponibilidad')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'general' => 'success',
                        'limited' => 'warning',
                        'deprecated' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),
                IconColumn::make('is_default')
                    ->label('Por Defecto')
                    ->boolean()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Creado')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
