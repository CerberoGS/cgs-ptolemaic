<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AffiliateCode extends Model
{
    protected $fillable = [
        'user_id',
        'code',
        'is_active',
        'total_referrals',
        'active_referrals',
        'total_earnings',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'total_earnings' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function referrals(): HasMany
    {
        return $this->hasMany(Referral::class, 'affiliate_code', 'code');
    }

    public function activeReferrals(): HasMany
    {
        return $this->hasMany(Referral::class, 'affiliate_code', 'code')
            ->where('status', 'active');
    }

    public function getAffiliateLinkAttribute(): string
    {
        return url("/ref/{$this->code}");
    }

    public function getTotalAnalysisBonusAttribute(): int
    {
        return $this->activeReferrals()->sum('monthly_analysis_bonus');
    }
}
