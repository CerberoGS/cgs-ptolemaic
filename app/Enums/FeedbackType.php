<?php

namespace App\Enums;

enum FeedbackType: string
{
    case Bug = 'bug';
    case Suggestion = 'suggestion';
    case Question = 'question';
    case Praise = 'praise';
    case DataIssue = 'data_issue';

    public function label(): string
    {
        return __('feedback.types.'.$this->value);
    }

    public function icon(): string
    {
        return match ($this) {
            self::Bug => '🐛',
            self::Suggestion => '💡',
            self::Question => '❓',
            self::Praise => '⭐',
            self::DataIssue => '📊',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Bug => 'red',
            self::Suggestion => 'blue',
            self::Question => 'yellow',
            self::Praise => 'green',
            self::DataIssue => 'orange',
        };
    }
}
