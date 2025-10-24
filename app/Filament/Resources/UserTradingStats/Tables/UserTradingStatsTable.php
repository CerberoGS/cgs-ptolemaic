<?php

namespace App\Filament\Resources\UserTradingStats\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class UserTradingStatsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Usuario')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('total_trades')
                    ->label('Total Operaciones')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('winning_trades')
                    ->label('Ganadoras')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('losing_trades')
                    ->label('Perdedoras')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('total_pnl')
                    ->label('P&L Total')
                    ->money('USD')
                    ->sortable(),
                TextColumn::make('level')
                    ->label('Nivel')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Novice' => 'gray',
                        'Intermediate' => 'info',
                        'Advanced' => 'warning',
                        'Expert' => 'success',
                        'Master' => 'danger',
                        default => 'gray',
                    })
                    ->sortable(),
                TextColumn::make('total_points')
                    ->label('Puntos')
                    ->numeric()
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
            ]);
    }
}
