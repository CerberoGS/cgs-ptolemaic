<?php

namespace App\Models;

use App\Enums\PlanType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class PricingPlan extends Model
{
    protected $fillable = [
        'plan_type',
        'price_monthly',
        'price_yearly',
        'offer_price_monthly',
        'offer_price_yearly',
        'offer_active',
        'offer_name',
        'offer_description',
        'offer_starts_at',
        'offer_ends_at',
        'scarcity_active',
        'scarcity_message',
        'scarcity_limit',
        'scarcity_sold',
        'is_active',
    ];

    protected $casts = [
        'offer_starts_at' => 'datetime',
        'offer_ends_at' => 'datetime',
        'offer_active' => 'boolean',
        'scarcity_active' => 'boolean',
        'is_active' => 'boolean',
        'price_monthly' => 'decimal:2',
        'price_yearly' => 'decimal:2',
        'offer_price_monthly' => 'decimal:2',
        'offer_price_yearly' => 'decimal:2',
    ];

    /**
     * Check if offer is currently active
     */
    public function isOfferActive(): bool
    {
        if (! $this->offer_active) {
            return false;
        }

        $now = now();

        // Check if offer has started
        if ($this->offer_starts_at && $now->isBefore($this->offer_starts_at)) {
            return false;
        }

        // Check if offer has ended
        if ($this->offer_ends_at && $now->isAfter($this->offer_ends_at)) {
            return false;
        }

        return true;
    }

    /**
     * Get current price for a specific period
     */
    public function getCurrentPrice(string $period): float
    {
        if ($this->isOfferActive()) {
            return $period === 'yearly'
                ? (float) $this->offer_price_yearly
                : (float) $this->offer_price_monthly;
        }

        return $period === 'yearly'
            ? (float) $this->price_yearly
            : (float) $this->price_monthly;
    }

    /**
     * Calculate discount percentage
     */
    public function getDiscountPercentage(): int
    {
        if (! $this->isOfferActive()) {
            return 0;
        }

        $originalPrice = (float) $this->price_monthly;
        $offerPrice = (float) $this->offer_price_monthly;

        if ($originalPrice <= 0) {
            return 0;
        }

        return (int) round((($originalPrice - $offerPrice) / $originalPrice) * 100);
    }

    /**
     * Get time remaining for offer
     */
    public function getTimeRemaining(): ?Carbon
    {
        if (! $this->isOfferActive() || ! $this->offer_ends_at) {
            return null;
        }

        return $this->offer_ends_at;
    }

    /**
     * Get scarcity message
     */
    public function getScarcityMessage(): ?string
    {
        if (! $this->scarcity_active || ! $this->scarcity_message) {
            return null;
        }

        return $this->scarcity_message;
    }

    /**
     * Check if scarcity should be shown
     */
    public function canShowScarcity(): bool
    {
        if (! $this->scarcity_active) {
            return false;
        }

        if (! $this->scarcity_limit || ! $this->scarcity_message) {
            return false;
        }

        return $this->scarcity_sold < $this->scarcity_limit;
    }

    /**
     * Get scarcity percentage
     */
    public function getScarcityPercentage(): int
    {
        if (! $this->scarcity_active || ! $this->scarcity_limit) {
            return 0;
        }

        return (int) round(($this->scarcity_sold / $this->scarcity_limit) * 100);
    }

    /**
     * Get remaining scarcity slots
     */
    public function getRemainingSlots(): int
    {
        if (! $this->scarcity_active || ! $this->scarcity_limit) {
            return 0;
        }

        return max(0, $this->scarcity_limit - $this->scarcity_sold);
    }

    /**
     * Get plan type enum
     */
    public function getPlanTypeEnum(): PlanType
    {
        return PlanType::from($this->plan_type);
    }

    /**
     * Scope for active plans
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for plans with active offers
     */
    public function scopeWithActiveOffers($query)
    {
        return $query->where('offer_active', true)
            ->where(function ($q) {
                $q->whereNull('offer_starts_at')
                    ->orWhere('offer_starts_at', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('offer_ends_at')
                    ->orWhere('offer_ends_at', '>', now());
            });
    }

    /**
     * Scope for plans with scarcity
     */
    public function scopeWithScarcity($query)
    {
        return $query->where('scarcity_active', true)
            ->whereRaw('scarcity_sold < scarcity_limit');
    }
}
