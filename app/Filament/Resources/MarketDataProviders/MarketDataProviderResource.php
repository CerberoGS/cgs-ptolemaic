<?php

namespace App\Filament\Resources\MarketDataProviders;

use App\Filament\Navigation\AdminNavigationGroup;
use App\Filament\Resources\MarketDataProviders\Pages\CreateMarketDataProvider;
use App\Filament\Resources\MarketDataProviders\Pages\EditMarketDataProvider;
use App\Filament\Resources\MarketDataProviders\Pages\ListMarketDataProviders;
use App\Filament\Resources\MarketDataProviders\RelationManagers\KeysRelationManager;
use App\Filament\Resources\MarketDataProviders\Schemas\MarketDataProviderForm;
use App\Filament\Resources\MarketDataProviders\Tables\MarketDataProvidersTable;
use App\Models\MarketDataProvider;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class MarketDataProviderResource extends Resource
{
    protected static ?string $model = MarketDataProvider::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $navigationLabel = 'Proveedores Market Data';

    protected static string|UnitEnum|null $navigationGroup = AdminNavigationGroup::ProviderConfiguration;

    protected static ?int $navigationSort = 28;

    public static function form(Schema $schema): Schema
    {
        return MarketDataProviderForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return MarketDataProvidersTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            KeysRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListMarketDataProviders::route('/'),
            'create' => CreateMarketDataProvider::route('/create'),
            'edit' => EditMarketDataProvider::route('/{record}/edit'),
        ];
    }
}
