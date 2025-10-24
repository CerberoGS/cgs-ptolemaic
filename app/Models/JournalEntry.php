<?php

namespace App\Models;

use App\Jobs\ProcessAIAnalysis;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JournalEntry extends Model
{
    use HasFactory;

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::created(function (JournalEntry $entry) {
            // Dispatch AI analysis job when a new entry is created
            if (config('prism.queue.enabled', true)) {
                ProcessAIAnalysis::dispatch($entry);
            }
        });
    }

    protected $fillable = [
        'user_id',
        'symbol',
        'direction',
        'asset_type',
        'entry_price',
        'exit_price',
        'stop_loss',
        'take_profit',
        'risk_reward_ratio',
        'account_risk_percent',
        'actual_risk_reward',
        'quantity',
        'pnl',
        'pnl_percentage',
        'setup_type',
        'notes',
        'tags',
        'images',
        'emotion',
        'trade_date',
        'entry_time',
        'exit_time',
        'hold_time_minutes',
        'followed_plan',
        'mistakes',
        'lessons_learned',
        // AI Analysis fields
        'ai_analysis',
        'analyzed_at',
        'analyzed_by_provider',
        'analysis_tokens_used',
        'analysis_failed_at',
        'analysis_error',
    ];

    protected function casts(): array
    {
        return [
            'entry_price' => 'decimal:8',
            'exit_price' => 'decimal:8',
            'stop_loss' => 'decimal:8',
            'take_profit' => 'decimal:8',
            'risk_reward_ratio' => 'decimal:2',
            'account_risk_percent' => 'decimal:2',
            'actual_risk_reward' => 'decimal:2',
            'quantity' => 'decimal:4',
            'pnl' => 'decimal:2',
            'pnl_percentage' => 'decimal:4',
            'tags' => 'array',
            'images' => 'array',
            'emotion' => 'integer',
            'trade_date' => 'datetime',
            'entry_time' => 'datetime',
            'exit_time' => 'datetime',
            'hold_time_minutes' => 'integer',
            'followed_plan' => 'boolean',
            // AI Analysis timestamps
            'analyzed_at' => 'datetime',
            'analysis_failed_at' => 'datetime',
        ];
    }

    /**
     * Get the user that owns the journal entry.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Calculate P&L automatically based on entry/exit prices.
     */
    public function calculatePnL(): void
    {
        if ($this->entry_price && $this->exit_price && $this->quantity) {
            $priceDiff = $this->direction === 'long'
                ? $this->exit_price - $this->entry_price
                : $this->entry_price - $this->exit_price;

            $this->pnl = $priceDiff * $this->quantity;
            $this->pnl_percentage = ($priceDiff / $this->entry_price) * 100;
        }
    }

    /**
     * Check if trade is closed (has exit price).
     */
    public function isClosed(): bool
    {
        return ! is_null($this->exit_price);
    }

    /**
     * Check if trade is profitable.
     */
    public function isProfitable(): bool
    {
        return $this->pnl > 0;
    }

    /**
     * Get hold time in minutes.
     */
    public function getHoldTimeInMinutes(): ?int
    {
        if ($this->entry_time && $this->exit_time) {
            return $this->entry_time->diffInMinutes($this->exit_time);
        }

        return null;
    }

    /**
     * Get formatted hold time.
     */
    public function getFormattedHoldTime(): ?string
    {
        $minutes = $this->getHoldTimeInMinutes();

        if (! $minutes) {
            return null;
        }

        if ($minutes < 60) {
            return "{$minutes}m";
        }

        $hours = floor($minutes / 60);
        $remainingMinutes = $minutes % 60;

        return "{$hours}h {$remainingMinutes}m";
    }

    /**
     * Scope for filtering by asset type.
     */
    public function scopeOfAssetType($query, string $assetType)
    {
        return $query->where('asset_type', $assetType);
    }

    /**
     * Scope for filtering by setup type.
     */
    public function scopeOfSetupType($query, string $setupType)
    {
        return $query->where('setup_type', $setupType);
    }

    /**
     * Scope for profitable trades only.
     */
    public function scopeProfitable($query)
    {
        return $query->where('pnl', '>', 0);
    }

    /**
     * Scope for losing trades only.
     */
    public function scopeLosing($query)
    {
        return $query->where('pnl', '<', 0);
    }

    /**
     * Scope for closed trades only.
     */
    public function scopeClosed($query)
    {
        return $query->whereNotNull('exit_price');
    }

    /**
     * Scope for open trades only.
     */
    public function scopeOpen($query)
    {
        return $query->whereNull('exit_price');
    }

    /**
     * Scope for date range.
     */
    public function scopeDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('trade_date', [$startDate, $endDate]);
    }

    /**
     * Calculate actual Risk/Reward ratio based on exit.
     */
    public function calculateActualRiskReward(): void
    {
        if ($this->isClosed() && $this->stop_loss && $this->entry_price) {
            $risk = abs($this->entry_price - $this->stop_loss);
            $reward = abs($this->exit_price - $this->entry_price);

            if ($risk > 0) {
                $this->actual_risk_reward = round($reward / $risk, 2);
            }
        }
    }

    /**
     * Calculate and update hold time in minutes.
     */
    public function calculateHoldTime(): void
    {
        if ($this->entry_time && $this->exit_time) {
            $this->hold_time_minutes = $this->entry_time->diffInMinutes($this->exit_time);
        }
    }

    /**
     * Update all calculated fields.
     */
    public function updateCalculatedFields(): void
    {
        $this->calculatePnL();
        $this->calculateActualRiskReward();
        $this->calculateHoldTime();
    }

    /**
     * Check if stop loss was hit.
     */
    public function wasStopLossHit(): bool
    {
        if (! $this->stop_loss || ! $this->exit_price) {
            return false;
        }

        if ($this->direction === 'long') {
            return $this->exit_price <= $this->stop_loss;
        }

        return $this->exit_price >= $this->stop_loss;
    }

    /**
     * Check if take profit was hit.
     */
    public function wasTakeProfitHit(): bool
    {
        if (! $this->take_profit || ! $this->exit_price) {
            return false;
        }

        if ($this->direction === 'long') {
            return $this->exit_price >= $this->take_profit;
        }

        return $this->exit_price <= $this->take_profit;
    }
}
