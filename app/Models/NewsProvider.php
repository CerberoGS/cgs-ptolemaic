<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NewsProvider extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'slug',
        'display_name',
        'description',
        'base_url',
        'docs_url',
        'verification_endpoint',
        'test_json',
        'ops_json',
        'category_filters',
        'language_support',
        'webhook_support',
        'status',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'category_filters' => 'array',
            'language_support' => 'array',
            'webhook_support' => 'boolean',
            'test_json' => 'array',
            'ops_json' => 'array',
        ];
    }

    public function keys(): HasMany
    {
        return $this->hasMany(NewsProviderKey::class);
    }
}
