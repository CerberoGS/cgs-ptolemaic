<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserTradingStats extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_trades',
        'winning_trades',
        'losing_trades',
        'current_streak',
        'best_streak',
        'current_losing_streak',
        'worst_losing_streak',
        'total_pnl',
        'best_trade_pnl',
        'worst_trade_pnl',
        'total_points',
        'level',
    ];

    protected function casts(): array
    {
        return [
            'total_trades' => 'integer',
            'winning_trades' => 'integer',
            'losing_trades' => 'integer',
            'current_streak' => 'integer',
            'best_streak' => 'integer',
            'current_losing_streak' => 'integer',
            'worst_losing_streak' => 'integer',
            'total_pnl' => 'decimal:2',
            'best_trade_pnl' => 'decimal:2',
            'worst_trade_pnl' => 'decimal:2',
            'total_points' => 'integer',
        ];
    }

    /**
     * Get the user that owns the stats.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Update stats based on a new trade.
     */
    public function updateWithTrade(JournalEntry $trade): void
    {
        if (! $trade->isClosed()) {
            return;
        }

        $this->total_trades++;

        if ($trade->isProfitable()) {
            $this->winning_trades++;
            $this->current_streak++;
            $this->current_losing_streak = 0;
            $this->best_streak = max($this->best_streak, $this->current_streak);
        } else {
            $this->losing_trades++;
            $this->current_losing_streak++;
            $this->current_streak = 0;
            $this->worst_losing_streak = max($this->worst_losing_streak, $this->current_losing_streak);
        }

        $this->total_pnl += (float) $trade->pnl;

        if ($this->best_trade_pnl === null || $trade->pnl > $this->best_trade_pnl) {
            $this->best_trade_pnl = $trade->pnl;
        }

        if ($this->worst_trade_pnl === null || $trade->pnl < $this->worst_trade_pnl) {
            $this->worst_trade_pnl = $trade->pnl;
        }

        $this->updateLevel();
        $this->save();
    }

    /**
     * Update user level based on total points.
     */
    public function updateLevel(): void
    {
        $this->level = match (true) {
            $this->total_points >= 5000 => 'Master',
            $this->total_points >= 2000 => 'Expert',
            $this->total_points >= 500 => 'Advanced',
            $this->total_points >= 100 => 'Intermediate',
            default => 'Novice',
        };
    }

    /**
     * Get win rate percentage.
     */
    public function getWinRateAttribute(): float
    {
        if ($this->total_trades === 0) {
            return 0;
        }

        return round(($this->winning_trades / $this->total_trades) * 100, 2);
    }
}
