<?php

namespace App\Filament\Resources\NewsProviders\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class NewsProviderForm
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
                TextInput::make('category_filters'),
                TextInput::make('language_support'),
                Toggle::make('webhook_support')
                    ->required(),
                TextInput::make('status')
                    ->required()
                    ->default('active'),
                TextInput::make('test_json'),
                TextInput::make('ops_json'),
            ]);
    }
}
