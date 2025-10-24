<?php

namespace App\Filament\Resources\JournalEntries\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class JournalEntryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                TextInput::make('symbol')
                    ->required(),
                TextInput::make('direction')
                    ->required(),
                TextInput::make('asset_type')
                    ->required()
                    ->default('stock'),
                TextInput::make('entry_price')
                    ->required()
                    ->numeric(),
                TextInput::make('exit_price')
                    ->numeric(),
                TextInput::make('quantity')
                    ->required()
                    ->numeric(),
                TextInput::make('pnl')
                    ->numeric(),
                TextInput::make('pnl_percentage')
                    ->numeric(),
                TextInput::make('setup_type'),
                Textarea::make('notes')
                    ->columnSpanFull(),
                TextInput::make('tags'),
                TextInput::make('images'),
                TextInput::make('emotion')
                    ->numeric(),
                DateTimePicker::make('trade_date')
                    ->required(),
                DateTimePicker::make('entry_time'),
                DateTimePicker::make('exit_time'),
                TextInput::make('stop_loss')
                    ->numeric(),
                TextInput::make('take_profit')
                    ->numeric(),
                TextInput::make('risk_reward_ratio')
                    ->numeric(),
                TextInput::make('account_risk_percent')
                    ->numeric(),
                TextInput::make('actual_risk_reward')
                    ->numeric(),
                TextInput::make('hold_time_minutes')
                    ->numeric(),
                Toggle::make('followed_plan')
                    ->required(),
                Textarea::make('mistakes')
                    ->columnSpanFull(),
                Textarea::make('lessons_learned')
                    ->columnSpanFull(),
            ]);
    }
}
