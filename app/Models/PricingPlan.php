<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Cache;
use Spatie\Permission\Models\Role;

class PricingPlan extends Model
{
    protected $fillable = [
        'slug',
        'name_key',
        'tagline_key',
        'description_key',
        'emoji',
        'accent_color',
        'icon_url',
        'offer_description_key',
        'scarcity_message_key',
        'is_active',
        'is_public',
        'is_featured',
        'display_order',
        'role_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_public' => 'boolean',
        'is_featured' => 'boolean',
        'display_order' => 'integer',
    ];

    // ==================== RELACIONES ====================

    /**
     * Spatie role for permissions
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Features que tiene este plan
     */
    public function features(): BelongsToMany
    {
        return $this->belongsToMany(Feature::class, 'plan_features', 'plan_id', 'feature_id')
            ->withPivot('is_enabled', 'limit_value', 'string_value', 'json_value', 'config')
            ->withTimestamps();
    }

    /**
     * Billing options for this plan
     */
    public function billingOptions(): HasMany
    {
        return $this->hasMany(PlanBillingOption::class, 'plan_id');
    }

    /**
     * Active billing options ordered by display order
     */
    public function activeBillingOptions(): HasMany
    {
        return $this->billingOptions()
            ->where('is_active', true)
            ->orderBy('display_order');
    }

    /**
     * Get the default billing option for this plan
     */
    public function defaultBillingOption(): ?PlanBillingOption
    {
        return $this->billingOptions()
            ->where('is_active', true)
            ->where('is_default', true)
            ->first();
    }

    // ==================== TRADUCCIÓN ====================

    /**
     * Get translated plan name
     */
    public function name(): string
    {
        return __($this->name_key);
    }

    /**
     * Get translated tagline
     */
    public function tagline(): string
    {
        return __($this->tagline_key);
    }

    /**
     * Get translated description
     */
    public function description(): string
    {
        return __($this->description_key);
    }

    // ==================== FEATURES (con caché) ====================

    /**
     * Check if plan has a specific feature enabled
     */
    public function hasFeature(string $featureKey): bool
    {
        return Cache::remember(
            "plan.{$this->id}.feature.{$featureKey}",
            now()->addHours(6),
            fn () => $this->features()
                ->where('key', $featureKey)
                ->wherePivot('is_enabled', true)
                ->exists()
        );
    }

    /**
     * Get feature limit value (for integer features)
     */
    public function getFeatureLimit(string $featureKey): ?int
    {
        return Cache::remember(
            "plan.{$this->id}.limit.{$featureKey}",
            now()->addHours(6),
            function () use ($featureKey) {
                $feature = $this->features()
                    ->where('key', $featureKey)
                    ->wherePivot('is_enabled', true)
                    ->first();

                return $feature?->pivot->limit_value;
            }
        );
    }

    /**
     * Get feature value (generic)
     */
    public function getFeatureValue(string $featureKey, string $type = 'limit')
    {
        return Cache::remember(
            "plan.{$this->id}.value.{$featureKey}.{$type}",
            now()->addHours(6),
            function () use ($featureKey, $type) {
                $feature = $this->features()
                    ->where('key', $featureKey)
                    ->wherePivot('is_enabled', true)
                    ->first();

                if (! $feature) {
                    return null;
                }

                return match ($type) {
                    'limit' => $feature->pivot->limit_value,
                    'string' => $feature->pivot->string_value,
                    'json' => $feature->pivot->json_value,
                    'config' => $feature->pivot->config,
                    default => null,
                };
            }
        );
    }

    // ==================== PERMISOS (delegado a Spatie) ====================

    /**
     * Get all permissions from Spatie role
     */
    public function permissions(): array
    {
        return Cache::remember(
            "plan.{$this->id}.permissions",
            now()->addHours(6),
            fn () => $this->role?->permissions->pluck('name')->toArray() ?? []
        );
    }

    // ==================== HELPERS (delegated to billing options) ====================

    /**
     * Get default monthly billing option
     *
     * @deprecated Use billingOptions relationship directly
     */
    public function getDefaultMonthlyOption(): ?PlanBillingOption
    {
        return $this->billingOptions()
            ->where('billing_cycle_slug', 'monthly')
            ->where('is_active', true)
            ->first() ?? $this->defaultBillingOption();
    }

    // ==================== SCOPES ====================

    /**
     * Scope: active plans
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: public plans
     */
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    /**
     * Scope: ordered by display_order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('id');
    }

    /**
     * Clear all cache for this plan
     */
    public function clearCache(): void
    {
        $keys = [
            "plan.{$this->id}.permissions",
        ];

        // Clear feature caches (pattern matching)
        $features = $this->features()->pluck('key');
        foreach ($features as $featureKey) {
            $keys[] = "plan.{$this->id}.feature.{$featureKey}";
            $keys[] = "plan.{$this->id}.limit.{$featureKey}";
            $keys[] = "plan.{$this->id}.value.{$featureKey}.limit";
            $keys[] = "plan.{$this->id}.value.{$featureKey}.string";
            $keys[] = "plan.{$this->id}.value.{$featureKey}.json";
            $keys[] = "plan.{$this->id}.value.{$featureKey}.config";
        }

        foreach ($keys as $key) {
            Cache::forget($key);
        }
    }
}
