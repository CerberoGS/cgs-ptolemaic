<?php

namespace App\Filament\Resources\TradingProviders\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class TradingProviderForm
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
                Toggle::make('supports_paper_trading')
                    ->required(),
                TextInput::make('market_types'),
                Toggle::make('requires_two_factor')
                    ->required(),
                TextInput::make('status')
                    ->required()
                    ->default('active'),
                TextInput::make('test_json'),
                TextInput::make('ops_json'),
            ]);
    }
}
