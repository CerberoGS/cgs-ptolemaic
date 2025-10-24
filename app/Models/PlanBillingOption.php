<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlanBillingOption extends Model
{
    protected $fillable = [
        'plan_id',
        'billing_cycle_slug',
        'billing_cycle_name_key',
        'billing_months',
        'billing_days',
        'base_price',
        'currency',
        'has_autopay_discount',
        'autopay_discount_type',
        'autopay_discount_value',
        'upfront_discount_percentage',
        'setup_fee',
        'trial_days',
        'is_active',
        'is_default',
        'is_popular',
        'display_order',
        'description_key',
        'highlight_text_key',
    ];

    protected function casts(): array
    {
        return [
            'billing_months' => 'integer',
            'billing_days' => 'integer',
            'base_price' => 'decimal:2',
            'has_autopay_discount' => 'boolean',
            'autopay_discount_value' => 'decimal:2',
            'upfront_discount_percentage' => 'integer',
            'setup_fee' => 'decimal:2',
            'trial_days' => 'integer',
            'is_active' => 'boolean',
            'is_default' => 'boolean',
            'is_popular' => 'boolean',
            'display_order' => 'integer',
        ];
    }

    /**
     * Get the pricing plan this billing option belongs to
     */
    public function plan(): BelongsTo
    {
        return $this->belongsTo(PricingPlan::class, 'plan_id');
    }

    /**
     * Calculate the final price with all discounts applied
     *
     * Formula: base_price * (1 - upfront_discount/100) - autopay_discount
     */
    public function calculateFinalPrice(bool $withAutopay = false): float
    {
        $price = (float) $this->base_price;

        // Apply upfront discount (percentage)
        if ($this->upfront_discount_percentage > 0) {
            $price = $price * (1 - ($this->upfront_discount_percentage / 100));
        }

        // Apply autopay discount (fixed or percentage)
        if ($withAutopay && $this->has_autopay_discount && $this->autopay_discount_value > 0) {
            if ($this->autopay_discount_type === 'percentage') {
                $price = $price * (1 - ((float) $this->autopay_discount_value / 100));
            } elseif ($this->autopay_discount_type === 'fixed') {
                $price = $price - (float) $this->autopay_discount_value;
            }
        }

        return round(max(0, $price), 2);
    }

    /**
     * Calculate the monthly equivalent price
     */
    public function monthlyEquivalent(bool $withAutopay = false): float
    {
        $finalPrice = $this->calculateFinalPrice($withAutopay);

        if ($this->billing_months > 0) {
            return round($finalPrice / $this->billing_months, 2);
        }

        return $finalPrice;
    }

    /**
     * Calculate savings vs monthly price
     */
    public function savingsVsMonthly(float $monthlyPrice, bool $withAutopay = false): float
    {
        if ($this->billing_months <= 1) {
            return 0;
        }

        $totalMonthlyPrice = $monthlyPrice * $this->billing_months;
        $finalPrice = $this->calculateFinalPrice($withAutopay);

        return round(max(0, $totalMonthlyPrice - $finalPrice), 2);
    }

    /**
     * Calculate savings percentage vs monthly price
     */
    public function savingsPercentage(float $monthlyPrice, bool $withAutopay = false): int
    {
        if ($this->billing_months <= 1) {
            return 0;
        }

        $totalMonthlyPrice = $monthlyPrice * $this->billing_months;
        $savings = $this->savingsVsMonthly($monthlyPrice, $withAutopay);

        if ($totalMonthlyPrice <= 0) {
            return 0;
        }

        return (int) round(($savings / $totalMonthlyPrice) * 100);
    }

    /**
     * Get translated billing cycle name
     */
    public function name(): string
    {
        if ($this->billing_cycle_name_key) {
            $translated = __($this->billing_cycle_name_key);
            if ($translated !== $this->billing_cycle_name_key) {
                return $translated;
            }
        }

        // Fallback to slug
        return ucfirst(str_replace('_', ' ', $this->billing_cycle_slug));
    }

    /**
     * Get translated highlight text
     */
    public function highlightText(): ?string
    {
        if ($this->highlight_text_key) {
            $translated = __($this->highlight_text_key);
            if ($translated !== $this->highlight_text_key) {
                return $translated;
            }
        }

        return null;
    }

    /**
     * Get translated description
     */
    public function description(): ?string
    {
        if ($this->description_key) {
            $translated = __($this->description_key);
            if ($translated !== $this->description_key) {
                return $translated;
            }
        }

        return null;
    }

    /**
     * Calculate total discount percentage (upfront + autopay combined)
     */
    public function totalDiscountPercentage(bool $withAutopay = false): int
    {
        $basePrice = (float) $this->base_price;
        if ($basePrice <= 0) {
            return 0;
        }

        $finalPrice = $this->calculateFinalPrice($withAutopay);
        $totalDiscount = $basePrice - $finalPrice;

        return (int) round(($totalDiscount / $basePrice) * 100);
    }

    /**
     * Check if this option has any discount
     */
    public function hasAnyDiscount(): bool
    {
        return $this->upfront_discount_percentage > 0
            || ($this->has_autopay_discount && $this->autopay_discount_value > 0);
    }

    /**
     * Scope: only active options
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: ordered by display order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order');
    }

    /**
     * Scope: only default option
     */
    public function scopeDefault($query)
    {
        return $query->where('is_default', true);
    }

    /**
     * Scope: only popular options
     */
    public function scopePopular($query)
    {
        return $query->where('is_popular', true);
    }
}
