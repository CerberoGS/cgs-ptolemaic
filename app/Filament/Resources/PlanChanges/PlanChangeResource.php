<?php

namespace App\Filament\Resources\PlanChanges;

use App\Filament\Navigation\AdminNavigationGroup;
use App\Filament\Resources\PlanChanges\Pages\CreatePlanChange;
use App\Filament\Resources\PlanChanges\Pages\EditPlanChange;
use App\Filament\Resources\PlanChanges\Pages\ListPlanChanges;
use App\Filament\Resources\PlanChanges\Schemas\PlanChangeForm;
use App\Filament\Resources\PlanChanges\Tables\PlanChangesTable;
use App\Models\PlanChange;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class PlanChangeResource extends Resource
{
    protected static ?string $model = PlanChange::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $navigationLabel = 'Historial de Planes';

    protected static string|UnitEnum|null $navigationGroup = AdminNavigationGroup::PlansBilling;

    protected static ?int $navigationSort = 52;

    public static function form(Schema $schema): Schema
    {
        return PlanChangeForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PlanChangesTable::configure($table);
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
            'index' => ListPlanChanges::route('/'),
            'create' => CreatePlanChange::route('/create'),
            'edit' => EditPlanChange::route('/{record}/edit'),
        ];
    }
}
