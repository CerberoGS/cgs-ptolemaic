<?php

namespace App\Filament\Resources\AiProviderModels\Pages;

use App\Filament\Resources\AiProviderModels\AiProviderModelResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAiProviderModels extends ListRecords
{
    protected static string $resource = AiProviderModelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
