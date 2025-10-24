<?php

namespace App\Filament\Resources\Feedback\Schemas;

use App\Enums\FeedbackPriority;
use App\Enums\FeedbackStatus;
use App\Enums\FeedbackType;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class FeedbackForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name'),
                Select::make('type')
                    ->options(FeedbackType::class)
                    ->required(),
                TextInput::make('subject')
                    ->required(),
                Textarea::make('message')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('screenshot'),
                TextInput::make('url')
                    ->url(),
                Textarea::make('user_agent')
                    ->columnSpanFull(),
                Select::make('status')
                    ->options(FeedbackStatus::class)
                    ->default('new')
                    ->required(),
                Textarea::make('admin_notes')
                    ->columnSpanFull(),
                Select::make('priority')
                    ->options(FeedbackPriority::class)
                    ->default('medium')
                    ->required(),
            ]);
    }
}
