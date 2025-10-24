<?php

namespace App\Filament\Resources\AffiliateRewards\Pages;

use App\Filament\Resources\AffiliateRewards\AffiliateRewardResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAffiliateReward extends EditRecord
{
    protected static string $resource = AffiliateRewardResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
