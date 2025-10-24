<?php

namespace App\Filament\Resources\NewsProviders\Pages;

use App\Filament\Resources\NewsProviders\NewsProviderResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListNewsProviders extends ListRecords
{
    protected static string $resource = NewsProviderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
