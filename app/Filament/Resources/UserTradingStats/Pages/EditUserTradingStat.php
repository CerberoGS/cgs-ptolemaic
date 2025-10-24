<?php

namespace App\Filament\Resources\UserTradingStats\Pages;

use App\Filament\Resources\UserTradingStats\UserTradingStatResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditUserTradingStat extends EditRecord
{
    protected static string $resource = UserTradingStatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
