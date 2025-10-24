<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Feature extends Model
{
    protected $fillable = [
        'key',
        'name_key',
        'description_key',
        'category',
        'value_type',
        'default_value',
        'is_visible',
        'display_order',
        'icon',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
        'display_order' => 'integer',
    ];

    /**
     * Plans that have this feature
     */
    public function plans(): BelongsToMany
    {
        return $this->belongsToMany(PricingPlan::class, 'plan_features', 'feature_id', 'plan_id')
            ->withPivot('is_enabled', 'limit_value', 'string_value', 'json_value', 'config')
            ->withTimestamps();
    }

    /**
     * Get translated name
     */
    public function name(): string
    {
        return __($this->name_key);
    }

    /**
     * Get translated description
     */
    public function description(): string
    {
        return __($this->description_key);
    }

    /**
     * Scope: only visible features
     */
    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    /**
     * Scope: by category
     */
    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope: ordered by display_order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('key');
    }
}
