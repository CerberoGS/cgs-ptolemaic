<?php

namespace App\Filament\Resources\PlanChanges\Pages;

use App\Filament\Resources\PlanChanges\PlanChangeResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPlanChanges extends ListRecords
{
    protected static string $resource = PlanChangeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
