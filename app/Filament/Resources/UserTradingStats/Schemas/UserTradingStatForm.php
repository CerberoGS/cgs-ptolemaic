<?php

namespace App\Filament\Resources\UserTradingStats\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class UserTradingStatForm
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
                    ->preload()
                    ->columnSpanFull(),
                TextInput::make('total_trades')
                    ->label('Total de Operaciones')
                    ->numeric()
                    ->default(0)
                    ->required(),
                TextInput::make('winning_trades')
                    ->label('Operaciones Ganadoras')
                    ->numeric()
                    ->default(0)
                    ->required(),
                TextInput::make('losing_trades')
                    ->label('Operaciones Perdedoras')
                    ->numeric()
                    ->default(0)
                    ->required(),
                TextInput::make('current_streak')
                    ->label('Racha Actual')
                    ->numeric()
                    ->default(0)
                    ->required(),
                TextInput::make('best_streak')
                    ->label('Mejor Racha')
                    ->numeric()
                    ->default(0)
                    ->required(),
                TextInput::make('current_losing_streak')
                    ->label('Racha Perdedora Actual')
                    ->numeric()
                    ->default(0)
                    ->required(),
                TextInput::make('worst_losing_streak')
                    ->label('Peor Racha Perdedora')
                    ->numeric()
                    ->default(0)
                    ->required(),
                TextInput::make('total_pnl')
                    ->label('P&L Total')
                    ->numeric()
                    ->step(0.01)
                    ->default(0)
                    ->prefix('$')
                    ->required(),
                TextInput::make('best_trade_pnl')
                    ->label('Mejor Operación (P&L)')
                    ->numeric()
                    ->step(0.01)
                    ->default(0)
                    ->prefix('$')
                    ->required(),
                TextInput::make('worst_trade_pnl')
                    ->label('Peor Operación (P&L)')
                    ->numeric()
                    ->step(0.01)
                    ->default(0)
                    ->prefix('$')
                    ->required(),
                TextInput::make('total_points')
                    ->label('Puntos Totales')
                    ->numeric()
                    ->default(0)
                    ->required(),
                TextInput::make('level')
                    ->label('Nivel')
                    ->default('Novice')
                    ->disabled()
                    ->helperText('El nivel se actualiza automáticamente según los puntos'),
            ]);
    }
}
