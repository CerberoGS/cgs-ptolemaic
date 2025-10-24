<?php

namespace App\Filament\Resources\Invitations\Schemas;

use App\Enums\InvitationStatus;
use App\Enums\PlanType;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class InvitationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('code')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                Select::make('target_plan')
                    ->options(PlanType::class)
                    ->required(),
                TextInput::make('price_monthly')
                    ->numeric(),
                TextInput::make('discount_percent')
                    ->required()
                    ->numeric()
                    ->default(0),
                TextInput::make('trial_duration_days')
                    ->numeric(),
                TextInput::make('usage_limit')
                    ->numeric(),
                TextInput::make('usage_count')
                    ->required()
                    ->numeric()
                    ->default(0),
                DateTimePicker::make('expires_at'),
                Select::make('status')
                    ->options(InvitationStatus::class)
                    ->default('active')
                    ->required(),
                TextInput::make('created_by')
                    ->numeric(),
                TextInput::make('referred_by'),
            ]);
    }
}
