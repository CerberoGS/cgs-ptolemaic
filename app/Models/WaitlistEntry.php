<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WaitlistEntry extends Model
{
    protected $fillable = [
        'user_id',
        'plan_type',
        'status',
        'notes',
        'contacted_at',
        'converted_at',
    ];

    protected function casts(): array
    {
        return [
            'contacted_at' => 'datetime',
            'converted_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getPlanLabelAttribute(): string
    {
        return match($this->plan_type) {
            'managed' => 'Cosmógrafo',
            'pro' => 'Astrónomo',
            'enterprise' => 'Heliópolis',
            default => 'Desconocido',
        };
    }

    public function getPlanIconAttribute(): string
    {
        return match($this->plan_type) {
            'managed' => '🧭',
            'pro' => '🔭',
            'enterprise' => '☀️',
            default => '❓',
        };
    }

    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'active' => 'Activo',
            'contacted' => 'Contactado',
            'converted' => 'Convertido',
            'cancelled' => 'Cancelado',
            default => 'Desconocido',
        };
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function markAsContacted(): void
    {
        $this->update([
            'status' => 'contacted',
            'contacted_at' => now(),
        ]);
    }

    public function markAsConverted(): void
    {
        $this->update([
            'status' => 'converted',
            'converted_at' => now(),
        ]);
    }

    public function cancel(): void
    {
        $this->update(['status' => 'cancelled']);
    }
}