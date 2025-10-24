<?php

namespace App\Filament\Resources\AffiliateCodes;

use App\Filament\Navigation\AdminNavigationGroup;
use App\Filament\Resources\AffiliateCodes\Pages\CreateAffiliateCode;
use App\Filament\Resources\AffiliateCodes\Pages\EditAffiliateCode;
use App\Filament\Resources\AffiliateCodes\Pages\ListAffiliateCodes;
use App\Filament\Resources\AffiliateCodes\Schemas\AffiliateCodeForm;
use App\Filament\Resources\AffiliateCodes\Tables\AffiliateCodesTable;
use App\Models\AffiliateCode;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class AffiliateCodeResource extends Resource
{
    protected static ?string $model = AffiliateCode::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $navigationLabel = 'Códigos de Afiliado';

    protected static string|UnitEnum|null $navigationGroup = AdminNavigationGroup::Affiliate;

    protected static ?int $navigationSort = 40;

    public static function form(Schema $schema): Schema
    {
        return AffiliateCodeForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AffiliateCodesTable::configure($table);
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
            'index' => ListAffiliateCodes::route('/'),
            'create' => CreateAffiliateCode::route('/create'),
            'edit' => EditAffiliateCode::route('/{record}/edit'),
        ];
    }
}
