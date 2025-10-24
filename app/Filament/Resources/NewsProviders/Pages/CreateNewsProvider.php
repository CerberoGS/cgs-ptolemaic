<?php

namespace App\Filament\Resources\NewsProviders\Pages;

use App\Filament\Resources\NewsProviders\NewsProviderResource;
use Filament\Resources\Pages\CreateRecord;

class CreateNewsProvider extends CreateRecord
{
    protected static string $resource = NewsProviderResource::class;
}
