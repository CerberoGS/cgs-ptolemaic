<?php

namespace App\Filament\Resources\MarketDataProviders\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class MarketDataProviderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('slug')
                    ->required(),
                TextInput::make('display_name')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('base_url')
                    ->url(),
                TextInput::make('docs_url')
                    ->url(),
                TextInput::make('verification_endpoint'),
                TextInput::make('data_frequency'),
                TextInput::make('rate_limit_per_minute')
                    ->numeric(),
                Toggle::make('supports_historical')
                    ->required(),
                TextInput::make('status')
                    ->required()
                    ->default('active'),
                TextInput::make('test_json'),
                TextInput::make('ops_json'),
            ]);
    }
}
