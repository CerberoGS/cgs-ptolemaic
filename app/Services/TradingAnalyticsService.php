<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Collection;

class TradingAnalyticsService
{
    /**
     * Calculate advanced trading metrics for a user.
     */
    public function calculateAdvancedMetrics(User $user): array
    {
        $trades = $user->journalEntries()->closed()->get();

        if ($trades->isEmpty()) {
            return $this->getEmptyMetrics();
        }

        return [
            'sharpe_ratio' => $this->calculateSharpeRatio($trades),
            'max_drawdown' => $this->calculateMaxDrawdown($trades),
            'avg_risk_reward' => $this->calculateAvgRiskReward($trades),
            'profit_factor' => $this->calculateProfitFactor($trades),
            'expectancy' => $this->calculateExpectancy($trades),
            'avg_hold_time' => $this->calculateAvgHoldTime($trades),
            'best_day' => $this->getBestDay($trades),
            'worst_day' => $this->getWorstDay($trades),
        ];
    }

    /**
     * Calculate Sharpe Ratio (assuming risk-free rate of 0).
     */
    protected function calculateSharpeRatio(Collection $trades): float
    {
        $returns = $trades->pluck('pnl_percentage')->filter()->values();

        if ($returns->isEmpty()) {
            return 0;
        }

        $avgReturn = $returns->avg();
        $stdDev = $this->calculateStdDev($returns);

        if ($stdDev == 0) {
            return 0;
        }

        return round($avgReturn / $stdDev, 2);
    }

    /**
     * Calculate Maximum Drawdown.
     */
    protected function calculateMaxDrawdown(Collection $trades): float
    {
        $equity = 0;
        $peak = 0;
        $maxDrawdown = 0;

        foreach ($trades->sortBy('trade_date') as $trade) {
            $equity += (float) $trade->pnl;
            $peak = max($peak, $equity);
            $drawdown = $peak - $equity;
            $maxDrawdown = max($maxDrawdown, $drawdown);
        }

        return round($maxDrawdown, 2);
    }

    /**
     * Calculate Average Risk/Reward ratio.
     */
    protected function calculateAvgRiskReward(Collection $trades): float
    {
        $rrTrades = $trades->filter(fn ($t) => ! is_null($t->actual_risk_reward));

        if ($rrTrades->isEmpty()) {
            return 0;
        }

        return round($rrTrades->avg('actual_risk_reward'), 2);
    }

    /**
     * Calculate Profit Factor (gross profit / gross loss).
     */
    protected function calculateProfitFactor(Collection $trades): float
    {
        $grossProfit = $trades->filter(fn ($t) => $t->pnl > 0)->sum('pnl');
        $grossLoss = abs($trades->filter(fn ($t) => $t->pnl < 0)->sum('pnl'));

        if ($grossLoss == 0) {
            return $grossProfit > 0 ? 999 : 0;
        }

        return round($grossProfit / $grossLoss, 2);
    }

    /**
     * Calculate Expectancy (average $ per trade).
     */
    protected function calculateExpectancy(Collection $trades): float
    {
        return round($trades->avg('pnl'), 2);
    }

    /**
     * Calculate Average Hold Time in hours.
     */
    protected function calculateAvgHoldTime(Collection $trades): float
    {
        $tradesWithTime = $trades->filter(fn ($t) => ! is_null($t->hold_time_minutes));

        if ($tradesWithTime->isEmpty()) {
            return 0;
        }

        return round($tradesWithTime->avg('hold_time_minutes') / 60, 2);
    }

    /**
     * Get best trading day.
     */
    protected function getBestDay(Collection $trades): array
    {
        $byDay = $trades->groupBy(fn ($t) => $t->trade_date->format('Y-m-d'));

        if ($byDay->isEmpty()) {
            return ['date' => null, 'pnl' => 0];
        }

        $best = $byDay->map(fn ($dayTrades) => [
            'date' => $dayTrades->first()->trade_date->format('Y-m-d'),
            'pnl' => $dayTrades->sum('pnl'),
        ])->sortByDesc('pnl')->first();

        return [
            'date' => $best['date'],
            'pnl' => round($best['pnl'], 2),
        ];
    }

    /**
     * Get worst trading day.
     */
    protected function getWorstDay(Collection $trades): array
    {
        $byDay = $trades->groupBy(fn ($t) => $t->trade_date->format('Y-m-d'));

        if ($byDay->isEmpty()) {
            return ['date' => null, 'pnl' => 0];
        }

        $worst = $byDay->map(fn ($dayTrades) => [
            'date' => $dayTrades->first()->trade_date->format('Y-m-d'),
            'pnl' => $dayTrades->sum('pnl'),
        ])->sortBy('pnl')->first();

        return [
            'date' => $worst['date'],
            'pnl' => round($worst['pnl'], 2),
        ];
    }

    /**
     * Calculate standard deviation.
     */
    protected function calculateStdDev(Collection $values): float
    {
        $mean = $values->avg();
        $variance = $values->map(fn ($val) => pow($val - $mean, 2))->avg();

        return sqrt($variance);
    }

    /**
     * Get analysis by setup type.
     */
    public function analyzeBySetupType(User $user): array
    {
        $trades = $user->journalEntries()->closed()->get();

        return $trades->groupBy('setup_type')->map(function ($setupTrades, $setupType) {
            $winners = $setupTrades->filter(fn ($t) => $t->isProfitable())->count();
            $total = $setupTrades->count();

            return [
                'setup' => $setupType ?? 'Unknown',
                'total_trades' => $total,
                'win_rate' => $total > 0 ? round(($winners / $total) * 100, 2) : 0,
                'total_pnl' => round($setupTrades->sum('pnl'), 2),
                'avg_pnl' => round($setupTrades->avg('pnl'), 2),
            ];
        })->values()->toArray();
    }

    /**
     * Get emotional analysis.
     */
    public function analyzeByEmotion(User $user): array
    {
        $trades = $user->journalEntries()->closed()->whereNotNull('emotion')->get();

        return $trades->groupBy('emotion')->map(function ($emotionTrades, $emotion) {
            $winners = $emotionTrades->filter(fn ($t) => $t->isProfitable())->count();
            $total = $emotionTrades->count();

            return [
                'emotion' => (int) $emotion,
                'emotion_label' => $this->getEmotionLabel((int) $emotion),
                'total_trades' => $total,
                'win_rate' => $total > 0 ? round(($winners / $total) * 100, 2) : 0,
                'avg_pnl' => round($emotionTrades->avg('pnl'), 2),
            ];
        })->values()->toArray();
    }

    /**
     * Get heatmap data (day of week + hour).
     */
    public function getHeatmapData(User $user): array
    {
        $trades = $user->journalEntries()
            ->closed()
            ->whereNotNull('entry_time')
            ->get();

        $heatmap = [];

        foreach ($trades as $trade) {
            $dayOfWeek = $trade->entry_time->dayOfWeek; // 0 = Sunday, 6 = Saturday
            $hour = $trade->entry_time->hour;

            $key = "{$dayOfWeek}-{$hour}";

            if (! isset($heatmap[$key])) {
                $heatmap[$key] = [
                    'day' => $dayOfWeek,
                    'hour' => $hour,
                    'trades' => 0,
                    'pnl' => 0,
                ];
            }

            $heatmap[$key]['trades']++;
            $heatmap[$key]['pnl'] += (float) $trade->pnl;
        }

        return array_values($heatmap);
    }

    /**
     * Get emotion label.
     */
    protected function getEmotionLabel(int $emotion): string
    {
        return match ($emotion) {
            1 => 'Very Fearful',
            2 => 'Fearful',
            3 => 'Neutral',
            4 => 'Confident',
            5 => 'Very Confident',
            default => 'Unknown',
        };
    }

    /**
     * Get empty metrics for users with no trades.
     */
    protected function getEmptyMetrics(): array
    {
        return [
            'sharpe_ratio' => 0,
            'max_drawdown' => 0,
            'avg_risk_reward' => 0,
            'profit_factor' => 0,
            'expectancy' => 0,
            'avg_hold_time' => 0,
            'best_day' => ['date' => null, 'pnl' => 0],
            'worst_day' => ['date' => null, 'pnl' => 0],
        ];
    }
}
