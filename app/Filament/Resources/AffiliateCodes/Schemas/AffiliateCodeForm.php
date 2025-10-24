<?php

namespace App\Filament\Resources\AffiliateCodes\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class AffiliateCodeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                TextInput::make('code')
                    ->required(),
                Toggle::make('is_active')
                    ->required(),
                TextInput::make('total_referrals')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('active_referrals')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('total_earnings')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
