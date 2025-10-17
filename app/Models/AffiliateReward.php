<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AffiliateReward extends Model
{
    protected $fillable = [
        'user_id',
        'reward_type',
        'analysis_bonus',
        'discount_percentage',
        'referrals_count',
        'status',
        'expires_at',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'discount_percentage' => 'decimal:2',
            'expires_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active' && 
               ($this->expires_at === null || $this->expires_at->isFuture());
    }

    public function isExpired(): bool
    {
        return $this->expires_at !== null && $this->expires_at->isPast();
    }

    public function getRewardDescriptionAttribute(): string
    {
        return match($this->reward_type) {
            'analysis_bonus' => "+{$this->analysis_bonus} análisis mensuales",
            'discount_percentage' => "{$this->discount_percentage}% descuento permanente",
            default => 'Recompensa desconocida',
        };
    }
}
