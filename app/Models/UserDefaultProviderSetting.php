<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserDefaultProviderSetting extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'ai_provider_key_id',
        'ai_provider_model_id',
        'market_data_provider_key_id',
        'news_provider_key_id',
        'trading_provider_key_id',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function aiProviderKey(): BelongsTo
    {
        return $this->belongsTo(AiProviderKey::class);
    }

    public function aiProviderModel(): BelongsTo
    {
        return $this->belongsTo(AiProviderModel::class);
    }

    public function marketDataProviderKey(): BelongsTo
    {
        return $this->belongsTo(MarketDataProviderKey::class);
    }

    public function newsProviderKey(): BelongsTo
    {
        return $this->belongsTo(NewsProviderKey::class);
    }

    public function tradingProviderKey(): BelongsTo
    {
        return $this->belongsTo(TradingProviderKey::class);
    }
}
