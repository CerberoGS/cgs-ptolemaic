<?php

namespace App\Filament\Resources\AffiliateCodes\Pages;

use App\Filament\Resources\AffiliateCodes\AffiliateCodeResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditAffiliateCode extends EditRecord
{
    protected static string $resource = AffiliateCodeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
