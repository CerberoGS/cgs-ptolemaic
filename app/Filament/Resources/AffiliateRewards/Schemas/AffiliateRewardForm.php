<?php

namespace App\Filament\Resources\AffiliateRewards\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AffiliateRewardForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                TextInput::make('reward_type')
                    ->required(),
                TextInput::make('analysis_bonus')
                    ->numeric(),
                TextInput::make('discount_percentage')
                    ->numeric(),
                TextInput::make('referrals_count')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('status')
                    ->required()
                    ->default('active'),
                DateTimePicker::make('expires_at'),
                Textarea::make('notes')
                    ->columnSpanFull(),
            ]);
    }
}
