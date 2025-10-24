<?php

namespace App\Filament\Resources\MarketDataProviders\Pages;

use App\Filament\Resources\MarketDataProviders\MarketDataProviderResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListMarketDataProviders extends ListRecords
{
    protected static string $resource = MarketDataProviderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
