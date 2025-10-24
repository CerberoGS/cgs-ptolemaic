<?php

namespace App\Filament\Resources\Referrals\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ReferralForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('affiliate_user_id')
                    ->relationship('affiliateUser', 'name')
                    ->required(),
                Select::make('referred_user_id')
                    ->relationship('referredUser', 'name')
                    ->required(),
                TextInput::make('affiliate_code')
                    ->required(),
                TextInput::make('referred_plan')
                    ->required()
                    ->default('free'),
                TextInput::make('status')
                    ->required()
                    ->default('active'),
                TextInput::make('monthly_analysis_bonus')
                    ->required()
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->required(),
                DateTimePicker::make('last_reward_at'),
            ]);
    }
}
