<?php

namespace App\Filament\Resources\AiProviderModels\Pages;

use App\Filament\Resources\AiProviderModels\AiProviderModelResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAiProviderModel extends EditRecord
{
    protected static string $resource = AiProviderModelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
