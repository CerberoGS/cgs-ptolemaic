<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AiProvider extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'provider_category_id',
        'slug',
        'display_name',
        'description',
        'base_url',
        'docs_url',
        'verification_endpoint',
        'test_json',
        'ops_json',
        'requires_organization',
        'status',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'requires_organization' => 'boolean',
            'test_json' => 'array',
            'ops_json' => 'array',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(ProviderCategory::class, 'provider_category_id');
    }

    public function models(): HasMany
    {
        return $this->hasMany(AiProviderModel::class);
    }

    public function keys(): HasMany
    {
        return $this->hasMany(AiProviderKey::class);
    }
}
