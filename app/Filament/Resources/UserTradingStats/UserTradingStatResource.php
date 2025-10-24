<?php

namespace App\Filament\Resources\UserTradingStats;

use App\Filament\Navigation\AdminNavigationGroup;
use App\Filament\Resources\UserTradingStats\Pages\CreateUserTradingStat;
use App\Filament\Resources\UserTradingStats\Pages\EditUserTradingStat;
use App\Filament\Resources\UserTradingStats\Pages\ListUserTradingStats;
use App\Filament\Resources\UserTradingStats\Schemas\UserTradingStatForm;
use App\Filament\Resources\UserTradingStats\Tables\UserTradingStatsTable;
use App\Models\UserTradingStats;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class UserTradingStatResource extends Resource
{
    protected static ?string $model = UserTradingStats::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $navigationLabel = 'Estadísticas Trading';

    protected static string|UnitEnum|null $navigationGroup = AdminNavigationGroup::Trading;

    protected static ?int $navigationSort = 62;

    public static function form(Schema $schema): Schema
    {
        return UserTradingStatForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return UserTradingStatsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListUserTradingStats::route('/'),
            'create' => CreateUserTradingStat::route('/create'),
            'edit' => EditUserTradingStat::route('/{record}/edit'),
        ];
    }
}
