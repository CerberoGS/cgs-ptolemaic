<?php

namespace App\Filament\Resources\NewsProviders;

use App\Filament\Navigation\AdminNavigationGroup;
use App\Filament\Resources\NewsProviders\Pages\CreateNewsProvider;
use App\Filament\Resources\NewsProviders\Pages\EditNewsProvider;
use App\Filament\Resources\NewsProviders\Pages\ListNewsProviders;
use App\Filament\Resources\NewsProviders\RelationManagers\KeysRelationManager;
use App\Filament\Resources\NewsProviders\Schemas\NewsProviderForm;
use App\Filament\Resources\NewsProviders\Tables\NewsProvidersTable;
use App\Models\NewsProvider;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class NewsProviderResource extends Resource
{
    protected static ?string $model = NewsProvider::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $navigationLabel = 'Proveedores Noticias';

    protected static string|UnitEnum|null $navigationGroup = AdminNavigationGroup::ProviderConfiguration;

    protected static ?int $navigationSort = 26;

    public static function form(Schema $schema): Schema
    {
        return NewsProviderForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return NewsProvidersTable::configure($table);
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
            'index' => ListNewsProviders::route('/'),
            'create' => CreateNewsProvider::route('/create'),
            'edit' => EditNewsProvider::route('/{record}/edit'),
        ];
    }
}
