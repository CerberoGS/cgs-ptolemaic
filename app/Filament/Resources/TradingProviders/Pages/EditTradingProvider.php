<?php

namespace App\Filament\Resources\TradingProviders\Pages;

use App\Filament\Resources\TradingProviders\TradingProviderResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditTradingProvider extends EditRecord
{
    protected static string $resource = TradingProviderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
