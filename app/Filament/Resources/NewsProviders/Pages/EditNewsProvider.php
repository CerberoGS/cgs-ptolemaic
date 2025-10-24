<?php

namespace App\Filament\Resources\NewsProviders\Pages;

use App\Filament\Resources\NewsProviders\NewsProviderResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditNewsProvider extends EditRecord
{
    protected static string $resource = NewsProviderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
