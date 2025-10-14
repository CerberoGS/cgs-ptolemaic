<?php

namespace App\Enums;

enum FeedbackStatus: string
{
    case New = 'new';
    case InReview = 'in_review';
    case Resolved = 'resolved';
    case Closed = 'closed';

    public function label(): string
    {
        return __('feedback.statuses.'.$this->value);
    }

    public function color(): string
    {
        return match ($this) {
            self::New => 'blue',
            self::InReview => 'yellow',
            self::Resolved => 'green',
            self::Closed => 'gray',
        };
    }
}
