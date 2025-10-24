<?php

namespace App\Filament\Resources\JournalEntries\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class JournalEntriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->searchable(),
                TextColumn::make('symbol')
                    ->searchable(),
                TextColumn::make('direction')
                    ->searchable(),
                TextColumn::make('asset_type')
                    ->searchable(),
                TextColumn::make('entry_price')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('exit_price')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('quantity')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('pnl')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('pnl_percentage')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('setup_type')
                    ->searchable(),
                TextColumn::make('emotion')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('trade_date')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('entry_time')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('exit_time')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('stop_loss')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('take_profit')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('risk_reward_ratio')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('account_risk_percent')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('actual_risk_reward')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('hold_time_minutes')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('followed_plan')
                    ->boolean(),
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
