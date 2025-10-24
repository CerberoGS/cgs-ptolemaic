<?php

namespace App\Filament\Resources\AiProviderModels;

use App\Filament\Navigation\AdminNavigationGroup;
use App\Filament\Resources\AiProviderModels\Pages\CreateAiProviderModel;
use App\Filament\Resources\AiProviderModels\Pages\EditAiProviderModel;
use App\Filament\Resources\AiProviderModels\Pages\ListAiProviderModels;
use App\Filament\Resources\AiProviderModels\Schemas\AiProviderModelForm;
use App\Filament\Resources\AiProviderModels\Tables\AiProviderModelsTable;
use App\Models\AiProviderModel;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class AiProviderModelResource extends Resource
{
    protected static ?string $model = AiProviderModel::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $navigationLabel = 'Modelos IA';

    protected static string|UnitEnum|null $navigationGroup = AdminNavigationGroup::ProviderConfiguration;

    protected static ?int $navigationSort = 32;

    public static function form(Schema $schema): Schema
    {
        return AiProviderModelForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return AiProviderModelsTable::configure($table);
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
            'index' => ListAiProviderModels::route('/'),
            'create' => CreateAiProviderModel::route('/create'),
            'edit' => EditAiProviderModel::route('/{record}/edit'),
        ];
    }
}
