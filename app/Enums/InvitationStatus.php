<?php

namespace App\Enums;

enum InvitationStatus: string
{
    case Active = 'active';
    case Expired = 'expired';
    case Disabled = 'disabled';

    public function label(): string
    {
        return __('invitations.status.'.$this->value);
    }

    public function color(): string
    {
        return match ($this) {
            self::Active => 'green',
            self::Expired => 'gray',
            self::Disabled => 'red',
        };
    }
}
