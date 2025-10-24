<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TradingProvider extends Model
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
        'supports_paper_trading',
        'market_types',
        'requires_two_factor',
        'status',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'supports_paper_trading' => 'boolean',
            'requires_two_factor' => 'boolean',
            'market_types' => 'array',
            'test_json' => 'array',
            'ops_json' => 'array',
        ];
    }

    public function keys(): HasMany
    {
        return $this->hasMany(TradingProviderKey::class);
    }
}
