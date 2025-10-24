<?php

namespace App\Filament\Resources\UserTradingStats\Pages;

use App\Filament\Resources\UserTradingStats\UserTradingStatResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListUserTradingStats extends ListRecords
{
    protected static string $resource = UserTradingStatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
