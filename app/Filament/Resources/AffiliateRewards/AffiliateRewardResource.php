<?php

namespace App\Filament\Resources\AffiliateRewards;

use App\Filament\Navigation\AdminNavigationGroup;
use App\Filament\Resources\AffiliateRewards\Pages\CreateAffiliateReward;
use App\Filament\Resources\AffiliateRewards\Pages\EditAffiliateReward;
use App\Filament\Resources\AffiliateRewards\Pages\ListAffiliateRewards;
use App\Filament\Resources\AffiliateRewards\Schemas\AffiliateRewardForm;
use App\Filament\Resources\AffiliateRewards\Tables\AffiliateRewardsTable;
use App\Models\AffiliateReward;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class AffiliateRewardResource extends Resource
{
    protected static ?string $model = AffiliateReward::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $navigationLabel = 'Recompensas de Afiliado';

    protected static string|UnitEnum|null $navigationGroup = AdminNavigationGroup::Affiliate;

    protected static ?int $navigationSort = 42;

    public static function form(Schema $schema): Schema
    {
        return AffiliateRewardForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AffiliateRewardsTable::configure($table);
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
            'index' => ListAffiliateRewards::route('/'),
            'create' => CreateAffiliateReward::route('/create'),
            'edit' => EditAffiliateReward::route('/{record}/edit'),
        ];
    }
}
