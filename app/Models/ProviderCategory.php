<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $name
 * @property string $display_name
 */
class ProviderCategory extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'display_name',
        'description',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [];
    }

    public function aiProviders(): HasMany
    {
        return $this->hasMany(AiProvider::class);
    }

    public function marketDataProviders(): HasMany
    {
        return $this->hasMany(MarketDataProvider::class);
    }

    public function newsProviders(): HasMany
    {
        return $this->hasMany(NewsProvider::class);
    }

    public function tradingProviders(): HasMany
    {
        return $this->hasMany(TradingProvider::class);
    }
}
