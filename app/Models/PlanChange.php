<?php

namespace App\Models;

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

    /**
     * Get the old plan label
     */
    public function oldPlanLabel(): string
    {
        $plan = PricingPlan::where('slug', $this->old_plan)->first();

        return $plan?->name() ?? ucfirst($this->old_plan);
    }

    /**
     * Get the new plan label
     */
    public function newPlanLabel(): string
    {
        $plan = PricingPlan::where('slug', $this->new_plan)->first();

        return $plan?->name() ?? ucfirst($this->new_plan);
    }
}
