<?php

namespace App\Filament\Resources\TradingProviders\Pages;

use App\Filament\Resources\TradingProviders\TradingProviderResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTradingProviders extends ListRecords
{
    protected static string $resource = TradingProviderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
