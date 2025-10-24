<?php

namespace App\Filament\Resources\PlanChanges\Pages;

use App\Filament\Resources\PlanChanges\PlanChangeResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPlanChange extends EditRecord
{
    protected static string $resource = PlanChangeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
