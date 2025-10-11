<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TradingProviderKey extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'trading_provider_id',
        'label',
        'api_key_encrypted',
        'api_secret_encrypted',
        'passphrase_encrypted',
        'metadata',
        'account_type',
        'sandbox',
        'verification_status',
        'last_verified_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'sandbox' => 'boolean',
            'last_verified_at' => 'datetime',
        ];
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function provider(): BelongsTo
    {
        return $this->belongsTo(TradingProvider::class, 'trading_provider_id');
    }

    public function verifications(): HasMany
    {
        return $this->hasMany(TradingProviderKeyVerification::class);
    }
}
