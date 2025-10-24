<?php

namespace App\Filament\Resources\AffiliateRewards\Pages;

use App\Filament\Resources\AffiliateRewards\AffiliateRewardResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListAffiliateRewards extends ListRecords
{
    protected static string $resource = AffiliateRewardResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
