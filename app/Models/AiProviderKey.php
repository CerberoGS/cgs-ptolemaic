<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AiProviderKey extends Model
{
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'ai_provider_id',
        'ai_provider_model_id',
        'label',
        'secret_encrypted',
        'scopes',
        'metadata',
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
            'scopes' => 'array',
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
        return $this->belongsTo(AiProvider::class, 'ai_provider_id');
    }

    public function model(): BelongsTo
    {
        return $this->belongsTo(AiProviderModel::class, 'ai_provider_model_id');
    }

    public function verifications(): HasMany
    {
        return $this->hasMany(AiProviderKeyVerification::class);
    }
}
