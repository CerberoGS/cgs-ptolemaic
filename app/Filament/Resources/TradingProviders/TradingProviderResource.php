<?php

namespace App\Filament\Resources\TradingProviders;

use App\Filament\Navigation\AdminNavigationGroup;
use App\Filament\Resources\TradingProviders\Pages\CreateTradingProvider;
use App\Filament\Resources\TradingProviders\Pages\EditTradingProvider;
use App\Filament\Resources\TradingProviders\Pages\ListTradingProviders;
use App\Filament\Resources\TradingProviders\RelationManagers\KeysRelationManager;
use App\Filament\Resources\TradingProviders\Schemas\TradingProviderForm;
use App\Filament\Resources\TradingProviders\Tables\TradingProvidersTable;
use App\Models\TradingProvider;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class TradingProviderResource extends Resource
{
    protected static ?string $model = TradingProvider::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $navigationLabel = 'Proveedores Trading';

    protected static string|UnitEnum|null $navigationGroup = AdminNavigationGroup::ProviderConfiguration;

    protected static ?int $navigationSort = 24;

    public static function form(Schema $schema): Schema
    {
        return TradingProviderForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TradingProvidersTable::configure($table);
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
            'index' => ListTradingProviders::route('/'),
            'create' => CreateTradingProvider::route('/create'),
            'edit' => EditTradingProvider::route('/{record}/edit'),
        ];
    }
}
