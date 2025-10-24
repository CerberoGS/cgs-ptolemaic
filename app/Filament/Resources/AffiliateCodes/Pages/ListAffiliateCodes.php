<?php

namespace App\Filament\Resources\AffiliateCodes\Pages;

use App\Filament\Resources\AffiliateCodes\AffiliateCodeResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAffiliateCodes extends ListRecords
{
    protected static string $resource = AffiliateCodeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
