<?php

namespace App\Filament\Resources\PlanChanges\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PlanChangesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Usuario')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('old_plan')
                    ->label('Plan Anterior')
                    ->badge()
                    ->sortable(),
                TextColumn::make('new_plan')
                    ->label('Nuevo Plan')
                    ->badge()
                    ->sortable(),
                TextColumn::make('changedBy.name')
                    ->label('Cambiado Por')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('reason')
                    ->label('Razón')
                    ->limit(50)
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('created_at')
                    ->label('Fecha del Cambio')
                    ->dateTime()
                    ->sortable(),
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
            ])
            ->defaultSort('created_at', 'desc');
    }
}
