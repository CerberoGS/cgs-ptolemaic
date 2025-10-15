<?php

namespace App\Enums;

enum PlanType: string
{
    // Public plans
    case Free = 'free';
    case Managed = 'managed';  // Cosmógrafo
    case Pro = 'pro';          // Astrónomo
    case Enterprise = 'enterprise';

    // Internal plans
    case Staff = 'staff';
    case BetaTesting = 'beta_testing';
    case Internal = 'internal';

    public static function default(): self
    {
        return self::Free;
    }

    public function isPublic(): bool
    {
        return ! in_array($this, [
            self::Staff,
            self::BetaTesting,
            self::Internal,
        ], true);
    }

    public function isInternal(): bool
    {
        return ! $this->isPublic();
    }

    public function isStaffPlan(): bool
    {
        return in_array($this, [self::Staff, self::Internal], true);
    }

    public function label(): string
    {
        return __('plans.labels.'.$this->value);
    }

    public function description(): string
    {
        return __('plans.descriptions.'.$this->value);
    }

    public function emoji(): string
    {
        return match ($this) {
            self::Free => '👁️',
            self::Managed => '🧭',
            self::Pro => '🔭',
            self::Enterprise => '☀️',
            self::Staff => '🛡️',
            self::BetaTesting => '🧪',
            self::Internal => '👑',
        };
    }

    public function accentColor(): string
    {
        return match ($this) {
            self::Free => 'zinc',
            self::Managed => 'cyan',
            self::Pro => 'violet',
            self::Enterprise => 'amber',
            self::Staff => 'blue',
            self::BetaTesting => 'purple',
            self::Internal => 'rose',
        };
    }

    public function tagline(): string
    {
        return __('plans.taglines.'.$this->value);
    }

    public function price(): string
    {
        $price = (string) $this->catalogValue('price', '');

        return $price !== '' ? __($price) : $price;
    }

    public function summary(): string
    {
        $summary = (string) $this->catalogValue('summary', '');

        if ($summary === '') {
            return $this->description();
        }

        return __($summary);
    }

    /**
     * @return list<string>
     */
    public function features(): array
    {
        $features = $this->catalogValue('features', []);

        if (! is_array($features)) {
            return [];
        }

        return $features;
    }

    /**
     * @return list<string>
     */
    public function availableFeatures(): array
    {
        $features = config('plans.features.'.$this->value, []);

        return is_array($features) ? array_values($features) : [];
    }

    public function allowsFeature(string $feature): bool
    {
        return in_array($feature, $this->availableFeatures(), true);
    }

    public function canAccessIntegrations(): bool
    {
        // Internal plans have full access
        if ($this->isInternal()) {
            return true;
        }

        return $this !== self::Free;
    }

    public function canManageProviderKeys(): bool
    {
        // Internal plans can manage their own keys
        if ($this->isInternal()) {
            return true;
        }

        return in_array($this, [self::Pro, self::Enterprise], true);
    }

    public function usesManagedKeys(): bool
    {
        // Internal plans don't use managed keys
        if ($this->isInternal()) {
            return false;
        }

        return $this === self::Managed;
    }

    public function hasUsageLimits(): bool
    {
        // Internal plans don't have limits (except Staff has soft limits)
        if ($this === self::Internal || $this === self::BetaTesting) {
            return false;
        }

        return $this === self::Managed || $this === self::Staff;
    }

    public function dailyUsageLimit(): ?int
    {
        if (! $this->hasUsageLimits()) {
            return null;
        }

        if ($this === self::Staff) {
            return config('plans.limits.staff.daily', 500);
        }

        return config('plans.limits.managed.daily');
    }

    public function monthlyUsageLimit(): ?int
    {
        if (! $this->hasUsageLimits()) {
            return null;
        }

        if ($this === self::Staff) {
            return config('plans.limits.staff.monthly', 10000);
        }

        return config('plans.limits.managed.monthly');
    }

    public function isPaid(): bool
    {
        return $this !== self::Free;
    }

    protected function catalogValue(string $key, mixed $default = null): mixed
    {
        $catalog = config('plans.catalog.'.$this->value);

        if (is_array($catalog) && array_key_exists($key, $catalog)) {
            return $catalog[$key];
        }

        return $default;
    }
}
