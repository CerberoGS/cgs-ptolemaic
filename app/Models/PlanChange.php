<?php

namespace App\Models;

use App\Enums\PlanType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlanChange extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'changed_by_user_id',
        'old_plan',
        'new_plan',
        'old_trial_ends_at',
        'new_trial_ends_at',
        'reason',
    ];

    protected function casts(): array
    {
        return [
            'old_plan' => PlanType::class,
            'new_plan' => PlanType::class,
            'old_trial_ends_at' => 'datetime',
            'new_trial_ends_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function changedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by_user_id');
    }
}
