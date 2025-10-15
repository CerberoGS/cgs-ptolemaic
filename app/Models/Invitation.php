<?php

namespace App\Models;

use App\Enums\InvitationStatus;
use App\Enums\PlanType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'target_plan',
        'price_monthly',
        'discount_percent',
        'trial_duration_days',
        'usage_limit',
        'usage_count',
        'expires_at',
        'status',
        'created_by',
        'referred_by',
    ];

    protected function casts(): array
    {
        return [
            'price_monthly' => 'decimal:2',
            'discount_percent' => 'integer',
            'trial_duration_days' => 'integer',
            'usage_limit' => 'integer',
            'usage_count' => 'integer',
            'expires_at' => 'datetime',
            'status' => InvitationStatus::class,
            'target_plan' => PlanType::class,
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function redemptions(): HasMany
    {
        return $this->hasMany(InvitationRedemption::class);
    }

    /**
     * Check if invitation is valid and can be redeemed
     */
    public function isValid(): bool
    {
        if ($this->status !== InvitationStatus::Active) {
            return false;
        }

        if ($this->expires_at !== null && now()->greaterThan($this->expires_at)) {
            return false;
        }

        if ($this->usage_limit !== null && $this->usage_count >= $this->usage_limit) {
            return false;
        }

        return true;
    }

    /**
     * Check if user can redeem this invitation
     */
    public function canBeRedeemedBy(User $user): bool
    {
        if (! $this->isValid()) {
            return false;
        }

        return ! $this->redemptions()->where('user_id', $user->id)->exists();
    }

    /**
     * Redeem invitation for user
     */
    public function redeemFor(User $user, ?string $ipAddress = null, ?string $userAgent = null): InvitationRedemption
    {
        $this->increment('usage_count');

        return $this->redemptions()->create([
            'user_id' => $user->id,
            'user_email' => $user->email,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
        ]);
    }

    /**
     * Get available redemptions count
     */
    public function availableRedemptions(): int|string
    {
        if ($this->usage_limit === null) {
            return '∞';
        }

        return max(0, $this->usage_limit - $this->usage_count);
    }

    /**
     * Generate unique invitation code
     */
    public static function generateUniqueCode(): string
    {
        do {
            $code = Str::upper(Str::random(8));
        } while (self::where('code', $code)->exists());

        return $code;
    }

    /**
     * Disable invitation
     */
    public function disable(): void
    {
        $this->update(['status' => InvitationStatus::Disabled]);
    }

    /**
     * Mark as expired
     */
    public function markAsExpired(): void
    {
        $this->update(['status' => InvitationStatus::Expired]);
    }
}
