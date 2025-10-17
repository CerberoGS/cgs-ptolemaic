<?php

namespace App\Models;

use App\Enums\PlanType;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, HasRoles, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'google_id',
        'plan',
        'plan_started_at',
        'plan_expires_at',
        'trial_ends_at',
        'card_added_at',
        'plan_metadata',
        'affiliate_code',
        'referred_by_code',
        'monthly_analysis_bonus',
        'affiliate_discount_percentage',
        'affiliate_discount_expires_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'phone_verified_at' => 'datetime',
            'password' => 'hashed',
            'plan' => PlanType::class,
            'plan_started_at' => 'datetime',
            'plan_expires_at' => 'datetime',
            'trial_ends_at' => 'datetime',
            'card_added_at' => 'datetime',
            'plan_metadata' => 'array',
        ];
    }

    /**
     * Get the password attribute.
     * Return null if password is null (for OAuth users)
     */
    public function getAuthPassword()
    {
        return $this->password;
    }

    public function defaultProviderSetting(): HasOne
    {
        return $this->hasOne(UserDefaultProviderSetting::class);
    }

    public function aiProviderKeys(): HasMany
    {
        return $this->hasMany(AiProviderKey::class);
    }

    public function marketDataProviderKeys(): HasMany
    {
        return $this->hasMany(MarketDataProviderKey::class);
    }

    public function newsProviderKeys(): HasMany
    {
        return $this->hasMany(NewsProviderKey::class);
    }

    public function tradingProviderKeys(): HasMany
    {
        return $this->hasMany(TradingProviderKey::class);
    }

    public function planChanges(): HasMany
    {
        return $this->hasMany(PlanChange::class);
    }

    public function journalEntries(): HasMany
    {
        return $this->hasMany(JournalEntry::class);
    }

    public function tradingStats(): HasOne
    {
        return $this->hasOne(UserTradingStats::class);
    }

    public function achievements(): BelongsToMany
    {
        return $this->belongsToMany(Achievement::class, 'user_achievements')
            ->withTimestamps()
            ->withPivot('unlocked_at');
    }

    // Affiliate System Relations
    public function affiliateCode(): HasOne
    {
        return $this->hasOne(AffiliateCode::class);
    }

    public function referrals(): HasMany
    {
        return $this->hasMany(Referral::class, 'affiliate_user_id');
    }

    public function activeReferrals(): HasMany
    {
        return $this->hasMany(Referral::class, 'affiliate_user_id')
            ->where('status', 'active');
    }

    public function referredBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'referred_by_code', 'affiliate_code');
    }

    public function affiliateRewards(): HasMany
    {
        return $this->hasMany(AffiliateReward::class);
    }

    public function activeAffiliateRewards(): HasMany
    {
        return $this->hasMany(AffiliateReward::class)
            ->where('status', 'active')
            ->where(function($query) {
                $query->whereNull('expires_at')
                      ->orWhere('expires_at', '>', now());
            });
    }

    public function waitlistEntries(): HasMany
    {
        return $this->hasMany(WaitlistEntry::class);
    }

    public function activeWaitlistEntries(): HasMany
    {
        return $this->hasMany(WaitlistEntry::class)
            ->where('status', 'active');
    }

    public function hasPlan(PlanType $plan): bool
    {
        return $this->plan === $plan;
    }

    public function planOrDefault(): PlanType
    {
        return $this->plan ?? PlanType::default();
    }

    public function isOnTrial(): bool
    {
        // Trial is active if trial_ends_at is set and not expired
        if ($this->trial_ends_at === null) {
            return false;
        }

        // Only Managed and Pro plans can be on trial
        if (! in_array($this->plan, [PlanType::Managed, PlanType::Pro], true)) {
            return false;
        }

        return now()->lessThanOrEqualTo($this->trial_ends_at);
    }

    public function canAccessProviderIntegrations(): bool
    {
        return $this->planOrDefault()->canAccessIntegrations();
    }

    public function canManageProviderKeys(): bool
    {
        return $this->planOrDefault()->canManageProviderKeys();
    }

    public function usesManagedProviderKeys(): bool
    {
        return $this->planOrDefault()->usesManagedKeys();
    }

    public function managedDailyLimit(): ?int
    {
        return $this->planOrDefault()->dailyUsageLimit();
    }

    public function managedMonthlyLimit(): ?int
    {
        return $this->planOrDefault()->monthlyUsageLimit();
    }

    /**
     * @return array<int, string>
     */
    public function planFeatures(): array
    {
        return $this->planOrDefault()->availableFeatures();
    }

    public function canUseFeature(string $feature): bool
    {
        return $this->planOrDefault()->allowsFeature($feature);
    }

    /**
     * Start trial for a specific plan (Managed or Pro)
     */
    public function startTrial(PlanType $plan): bool
    {
        if (! $this->hasPlan(PlanType::Free)) {
            return false;
        }

        if (! in_array($plan, [PlanType::Managed, PlanType::Pro], true)) {
            return false;
        }

        $this->update([
            'plan' => $plan,
            'plan_started_at' => now(),
            'trial_ends_at' => now()->addDays(30),
        ]);

        return true;
    }

    public function canStartTrial(): bool
    {
        return $this->hasPlan(PlanType::Free) && $this->trial_ends_at === null;
    }

    /**
     * Add card and extend trial by 30 days (only for Pro trial users)
     */
    public function addCardAndExtendTrial(): bool
    {
        if ($this->plan !== PlanType::Pro || ! $this->isOnTrial()) {
            return false;
        }

        if ($this->card_added_at !== null) {
            return false;
        }

        $this->update([
            'card_added_at' => now(),
            'trial_ends_at' => $this->trial_ends_at?->addDays(30) ?? now()->addDays(30),
        ]);

        return true;
    }

    /**
     * Check if user can add card to extend trial
     */
    public function canAddCardToExtendTrial(): bool
    {
        return $this->plan === PlanType::Pro
            && $this->isOnTrial()
            && $this->card_added_at === null;
    }

    /**
     * Check if trial has expired
     */
    public function hasTrialExpired(): bool
    {
        if ($this->trial_ends_at === null) {
            return false;
        }

        return now()->greaterThan($this->trial_ends_at);
    }

    /**
     * Get days remaining in trial
     */
    public function trialDaysRemaining(): int
    {
        if (! $this->isOnTrial() || $this->trial_ends_at === null) {
            return 0;
        }

        $days = now()->diffInDays($this->trial_ends_at, false);

        return max(0, (int) ceil($days));
    }

    /**
     * Downgrade user to Free plan after trial expires
     * Note: We keep trial_ends_at to track that they already used their trial
     */
    public function downgradeToFree(): void
    {
        $this->update([
            'plan' => PlanType::Free,
            'plan_started_at' => now(),
        ]);
    }

    public function ensureDefaultRole(): void
    {
        if ($this->roles()->exists()) {
            return;
        }

        $defaultRole = Role::query()->firstOrCreate(
            ['name' => 'User'],
            ['guard_name' => 'web']
        );

        $this->assignRole($defaultRole);
    }

    /**
     * Get or create trading stats for user.
     */
    public function getOrCreateStats(): UserTradingStats
    {
        return $this->tradingStats ?? $this->tradingStats()->create([
            'user_id' => $this->id,
        ]);
    }

    /**
     * Check if user has unlocked an achievement.
     */
    public function hasAchievement(string $achievementKey): bool
    {
        return $this->achievements()->where('key', $achievementKey)->exists();
    }

    /**
     * Unlock an achievement for the user.
     */
    public function unlockAchievement(Achievement $achievement): void
    {
        if (! $this->hasAchievement($achievement->key)) {
            $this->achievements()->attach($achievement->id, [
                'unlocked_at' => now(),
            ]);

            $stats = $this->getOrCreateStats();
            $stats->total_points += $achievement->points;
            $stats->updateLevel();
            $stats->save();
        }
    }

    /**
     * Check if the user's email is verified.
     */
    public function isEmailVerified(): bool
    {
        return $this->email_verified_at !== null;
    }

    /**
     * Check if the user's phone is verified.
     */
    public function isPhoneVerified(): bool
    {
        return $this->phone_verified_at !== null;
    }

    /**
     * Check if the user has a phone number.
     */
    public function hasPhone(): bool
    {
        return ! empty($this->phone);
    }

    /**
     * Get formatted phone number.
     */
    public function getFormattedPhone(): ?string
    {
        if (! $this->hasPhone()) {
            return null;
        }

        // Simple formatting - you can enhance this based on your needs
        return $this->phone;
    }

    // Affiliate System Methods
    public function generateAffiliateCode(): string
    {
        if ($this->affiliate_code) {
            return $this->affiliate_code;
        }

        $code = strtoupper(substr($this->name, 0, 3) . substr($this->id, -3));
        
        // Ensure uniqueness
        $counter = 1;
        $originalCode = $code;
        while (User::where('affiliate_code', $code)->exists()) {
            $code = $originalCode . $counter;
            $counter++;
        }

        $this->update(['affiliate_code' => $code]);

        // Create AffiliateCode record only if it doesn't exist
        if (!$this->affiliateCode) {
            AffiliateCode::create([
                'user_id' => $this->id,
                'code' => $code,
            ]);
        }

        return $code;
    }

    public function getAffiliateLink(): string
    {
        $code = $this->affiliate_code ?? $this->generateAffiliateCode();
        return url("/ref/{$code}");
    }

    public function getTotalAnalysisBonus(): int
    {
        $referralBonus = $this->activeReferrals()->sum('monthly_analysis_bonus');
        $rewardBonus = $this->activeAffiliateRewards()
            ->where('reward_type', 'analysis_bonus')
            ->sum('analysis_bonus');
        
        return $referralBonus + $rewardBonus + $this->monthly_analysis_bonus;
    }

    public function getTotalDiscountPercentage(): float
    {
        $rewardDiscount = $this->activeAffiliateRewards()
            ->where('reward_type', 'discount_percentage')
            ->max('discount_percentage') ?? 0;
        
        return max($rewardDiscount, $this->affiliate_discount_percentage);
    }

    public function canRedeemDiscount(): bool
    {
        return $this->activeReferrals()->count() >= 10 && 
               $this->getTotalDiscountPercentage() === 0;
    }

    public function redeemDiscount(): bool
    {
        if (!$this->canRedeemDiscount()) {
            return false;
        }

        $referralsCount = $this->activeReferrals()->count();
        $discountPercentage = min(($referralsCount / 10) * 10, 50); // Max 50%

        AffiliateReward::create([
            'user_id' => $this->id,
            'reward_type' => 'discount_percentage',
            'discount_percentage' => $discountPercentage,
            'referrals_count' => $referralsCount,
            'status' => 'active',
            'notes' => "Canjeado por {$referralsCount} referidos activos",
        ]);

        return true;
    }
}
