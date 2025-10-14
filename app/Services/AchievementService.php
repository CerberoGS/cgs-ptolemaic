<?php

namespace App\Services;

use App\Models\Achievement;
use App\Models\JournalEntry;
use App\Models\User;

class AchievementService
{
    /**
     * Check and unlock achievements for a user after completing a trade.
     */
    public function checkAchievementsForTrade(User $user, JournalEntry $trade): array
    {
        $unlockedAchievements = [];
        $stats = $user->getOrCreateStats();

        // Update stats with the new trade
        $stats->updateWithTrade($trade);

        // Get all achievements
        $achievements = Achievement::all();

        foreach ($achievements as $achievement) {
            if ($user->hasAchievement($achievement->key)) {
                continue; // Already unlocked
            }

            if ($this->checkCriteria($user, $stats, $achievement)) {
                $user->unlockAchievement($achievement);
                $unlockedAchievements[] = $achievement;
            }
        }

        return $unlockedAchievements;
    }

    /**
     * Check if user meets the criteria for an achievement.
     */
    protected function checkCriteria(User $user, $stats, Achievement $achievement): bool
    {
        $criteria = $achievement->criteria ?? [];

        // Check minimum trades
        if (isset($criteria['min_trades']) && $stats->total_trades < $criteria['min_trades']) {
            return false;
        }

        // Check minimum winning trades
        if (isset($criteria['min_winning_trades']) && $stats->winning_trades < $criteria['min_winning_trades']) {
            return false;
        }

        // Check win streak
        if (isset($criteria['min_streak'])) {
            if ($stats->best_streak < $criteria['min_streak']) {
                return false;
            }
        }

        // Check win rate
        if (isset($criteria['min_win_rate'])) {
            $minTrades = $criteria['min_trades'] ?? 1;
            if ($stats->total_trades < $minTrades) {
                return false;
            }
            if ($stats->win_rate < $criteria['min_win_rate']) {
                return false;
            }
        }

        // Check followed plan trades
        if (isset($criteria['min_followed_plan'])) {
            $followedPlanCount = $user->journalEntries()
                ->where('followed_plan', true)
                ->count();

            if ($followedPlanCount < $criteria['min_followed_plan']) {
                return false;
            }
        }

        // Check weekly P&L
        if (isset($criteria['type']) && $criteria['type'] === 'weekly_pnl') {
            $weeklyPnl = $user->journalEntries()
                ->whereBetween('trade_date', [now()->startOfWeek(), now()->endOfWeek()])
                ->sum('pnl');

            if ($weeklyPnl <= 0) {
                return false;
            }
        }

        // Check monthly P&L
        if (isset($criteria['type']) && $criteria['type'] === 'monthly_pnl') {
            $monthlyPnl = $user->journalEntries()
                ->whereBetween('trade_date', [now()->startOfMonth(), now()->endOfMonth()])
                ->sum('pnl');

            if ($monthlyPnl <= 0) {
                return false;
            }
        }

        return true;
    }

    /**
     * Get user's progress towards achievements.
     */
    public function getUserProgress(User $user): array
    {
        $stats = $user->getOrCreateStats();
        $allAchievements = Achievement::all();
        $unlockedIds = $user->achievements()->pluck('achievements.id')->toArray();

        $progress = [];

        foreach ($allAchievements as $achievement) {
            $isUnlocked = in_array($achievement->id, $unlockedIds);
            $progressPercent = 0;

            if (! $isUnlocked) {
                $progressPercent = $this->calculateProgress($user, $stats, $achievement);
            }

            $progress[] = [
                'achievement' => $achievement,
                'unlocked' => $isUnlocked,
                'progress' => $isUnlocked ? 100 : $progressPercent,
            ];
        }

        return $progress;
    }

    /**
     * Calculate progress percentage towards an achievement.
     */
    protected function calculateProgress(User $user, $stats, Achievement $achievement): int
    {
        $criteria = $achievement->criteria ?? [];

        if (isset($criteria['min_trades'])) {
            return min(100, (int) (($stats->total_trades / $criteria['min_trades']) * 100));
        }

        if (isset($criteria['min_winning_trades'])) {
            return min(100, (int) (($stats->winning_trades / $criteria['min_winning_trades']) * 100));
        }

        if (isset($criteria['min_streak'])) {
            return min(100, (int) (($stats->best_streak / $criteria['min_streak']) * 100));
        }

        if (isset($criteria['min_win_rate'])) {
            $minTrades = $criteria['min_trades'] ?? 1;
            if ($stats->total_trades < $minTrades) {
                return (int) (($stats->total_trades / $minTrades) * 50);
            }

            return min(100, (int) (($stats->win_rate / $criteria['min_win_rate']) * 100));
        }

        return 0;
    }
}
