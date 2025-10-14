<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $achievements = [
            // Bronze Tier
            [
                'key' => 'first_trade',
                'name' => __('achievements.first_trade.name'),
                'description' => __('achievements.first_trade.description'),
                'icon' => '🎯',
                'tier' => 'bronze',
                'points' => 10,
                'criteria' => ['min_trades' => 1],
            ],
            [
                'key' => 'first_win',
                'name' => __('achievements.first_win.name'),
                'description' => __('achievements.first_win.description'),
                'icon' => '💰',
                'tier' => 'bronze',
                'points' => 20,
                'criteria' => ['min_winning_trades' => 1],
            ],
            [
                'key' => 'five_trades',
                'name' => __('achievements.five_trades.name'),
                'description' => __('achievements.five_trades.description'),
                'icon' => '📊',
                'tier' => 'bronze',
                'points' => 25,
                'criteria' => ['min_trades' => 5],
            ],

            // Silver Tier
            [
                'key' => 'ten_trades',
                'name' => __('achievements.ten_trades.name'),
                'description' => __('achievements.ten_trades.description'),
                'icon' => '📈',
                'tier' => 'silver',
                'points' => 50,
                'criteria' => ['min_trades' => 10],
            ],
            [
                'key' => 'win_streak_3',
                'name' => __('achievements.win_streak_3.name'),
                'description' => __('achievements.win_streak_3.description'),
                'icon' => '🔥',
                'tier' => 'silver',
                'points' => 75,
                'criteria' => ['min_streak' => 3],
            ],
            [
                'key' => 'profitable_week',
                'name' => __('achievements.profitable_week.name'),
                'description' => __('achievements.profitable_week.description'),
                'icon' => '📅',
                'tier' => 'silver',
                'points' => 100,
                'criteria' => ['type' => 'weekly_pnl'],
            ],

            // Gold Tier
            [
                'key' => 'fifty_trades',
                'name' => __('achievements.fifty_trades.name'),
                'description' => __('achievements.fifty_trades.description'),
                'icon' => '⭐',
                'tier' => 'gold',
                'points' => 150,
                'criteria' => ['min_trades' => 50],
            ],
            [
                'key' => 'win_rate_60',
                'name' => __('achievements.win_rate_60.name'),
                'description' => __('achievements.win_rate_60.description'),
                'icon' => '🏆',
                'tier' => 'gold',
                'points' => 200,
                'criteria' => ['min_win_rate' => 60, 'min_trades' => 20],
            ],
            [
                'key' => 'win_streak_5',
                'name' => __('achievements.win_streak_5.name'),
                'description' => __('achievements.win_streak_5.description'),
                'icon' => '⚡',
                'tier' => 'gold',
                'points' => 250,
                'criteria' => ['min_streak' => 5],
            ],

            // Platinum Tier
            [
                'key' => 'hundred_trades',
                'name' => __('achievements.hundred_trades.name'),
                'description' => __('achievements.hundred_trades.description'),
                'icon' => '💎',
                'tier' => 'platinum',
                'points' => 500,
                'criteria' => ['min_trades' => 100],
            ],
            [
                'key' => 'profitable_month',
                'name' => __('achievements.profitable_month.name'),
                'description' => __('achievements.profitable_month.description'),
                'icon' => '🌟',
                'tier' => 'platinum',
                'points' => 500,
                'criteria' => ['type' => 'monthly_pnl'],
            ],
            [
                'key' => 'disciplined_trader',
                'name' => __('achievements.disciplined_trader.name'),
                'description' => __('achievements.disciplined_trader.description'),
                'icon' => '🎖️',
                'tier' => 'platinum',
                'points' => 750,
                'criteria' => ['min_followed_plan' => 20],
            ],
            [
                'key' => 'win_streak_10',
                'name' => __('achievements.win_streak_10.name'),
                'description' => __('achievements.win_streak_10.description'),
                'icon' => '👑',
                'tier' => 'platinum',
                'points' => 1000,
                'criteria' => ['min_streak' => 10],
            ],
        ];

        foreach ($achievements as $achievement) {
            Achievement::query()->updateOrCreate(
                ['key' => $achievement['key']],
                $achievement
            );
        }
    }
}
