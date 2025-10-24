<?php

namespace App\Filament\Resources\MarketDataProviders\Pages;

use App\Filament\Resources\MarketDataProviders\MarketDataProviderResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditMarketDataProvider extends EditRecord
{
    protected static string $resource = MarketDataProviderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
