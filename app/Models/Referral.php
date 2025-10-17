<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Referral extends Model
{
    protected $fillable = [
        'affiliate_user_id',
        'referred_user_id',
        'affiliate_code',
        'referred_plan',
        'status',
        'monthly_analysis_bonus',
        'is_active',
        'last_reward_at',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'last_reward_at' => 'datetime',
        ];
    }

    public function affiliateUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'affiliate_user_id');
    }

    public function referredUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'referred_user_id');
    }

    public function affiliateCode(): BelongsTo
    {
        return $this->belongsTo(AffiliateCode::class, 'affiliate_code', 'code');
    }

    public function getPlanLabelAttribute(): string
    {
        return match($this->referred_plan) {
            'free' => 'Observador',
            'managed' => 'Cosmógrafo',
            'pro' => 'Astrónomo',
            'enterprise' => 'Heliópolis',
            default => 'Desconocido',
        };
    }

    public function getPlanIconAttribute(): string
    {
        return match($this->referred_plan) {
            'free' => '👁️',
            'managed' => '🧭',
            'pro' => '🔭',
            'enterprise' => '☀️',
            default => '❓',
        };
    }
}
