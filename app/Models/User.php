<?php

namespace App\Models;

use App\Enums\PlanType;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
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
        'google_id',
        'plan',
        'plan_started_at',
        'plan_expires_at',
        'trial_ends_at',
        'plan_metadata',
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
            'password' => 'hashed',
            'plan' => PlanType::class,
            'plan_started_at' => 'datetime',
            'plan_expires_at' => 'datetime',
            'trial_ends_at' => 'datetime',
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
        if (! $this->planOrDefault()->isTrial()) {
            return false;
        }

        if ($this->trial_ends_at === null) {
            return true;
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

    public function startTrial(): bool
    {
        if (! $this->hasPlan(PlanType::Free)) {
            return false;
        }

        $this->update([
            'plan' => PlanType::Trial->value,
            'plan_started_at' => now(),
            'trial_ends_at' => now()->addDays(30),
        ]);

        return true;
    }

    public function canStartTrial(): bool
    {
        return $this->hasPlan(PlanType::Free) && $this->trial_ends_at === null;
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
}
