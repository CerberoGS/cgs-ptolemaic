<?php

namespace App\Enums;

enum PlanType: string
{
    case Free = 'free';
    case Trial = 'trial';
    case Managed = 'managed';
    case Pro = 'pro';
    case Enterprise = 'enterprise';

    public static function default(): self
    {
        return self::Free;
    }

    public function label(): string
    {
        return __('plans.labels.'.$this->value);
    }

    public function description(): string
    {
        return __('plans.descriptions.'.$this->value);
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
        return $this !== self::Free;
    }

    public function canManageProviderKeys(): bool
    {
        return in_array($this, [self::Pro, self::Enterprise], true);
    }

    public function usesManagedKeys(): bool
    {
        return in_array($this, [self::Trial, self::Managed], true);
    }

    public function hasUsageLimits(): bool
    {
        return $this === self::Managed;
    }

    public function dailyUsageLimit(): ?int
    {
        if (! $this->hasUsageLimits()) {
            return null;
        }

        return config('plans.limits.managed.daily');
    }

    public function monthlyUsageLimit(): ?int
    {
        if (! $this->hasUsageLimits()) {
            return null;
        }

        return config('plans.limits.managed.monthly');
    }

    public function isTrial(): bool
    {
        return $this === self::Trial;
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
