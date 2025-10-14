<?php

namespace App\Http\Controllers;

use App\Services\AchievementService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function __construct(protected AchievementService $achievementService) {}

    /**
     * Display user's achievements and progress.
     */
    public function index(Request $request, string $locale): Response
    {
        $user = $request->user();
        $stats = $user->getOrCreateStats();
        $progress = $this->achievementService->getUserProgress($user);

        // Group achievements by tier
        $achievementsByTier = collect($progress)->groupBy(function ($item) {
            return $item['achievement']->tier;
        });

        return Inertia::render('achievements/index', [
            'stats' => [
                'level' => $stats->level,
                'total_points' => $stats->total_points,
                'total_trades' => $stats->total_trades,
                'winning_trades' => $stats->winning_trades,
                'win_rate' => $stats->win_rate,
                'current_streak' => $stats->current_streak,
                'best_streak' => $stats->best_streak,
            ],
            'achievementsByTier' => [
                'platinum' => $achievementsByTier->get('platinum', collect())->map(fn ($item) => [
                    'id' => $item['achievement']->id,
                    'name' => $item['achievement']->name,
                    'description' => $item['achievement']->description,
                    'icon' => $item['achievement']->icon,
                    'points' => $item['achievement']->points,
                    'unlocked' => $item['unlocked'],
                    'progress' => $item['progress'],
                ])->values(),
                'gold' => $achievementsByTier->get('gold', collect())->map(fn ($item) => [
                    'id' => $item['achievement']->id,
                    'name' => $item['achievement']->name,
                    'description' => $item['achievement']->description,
                    'icon' => $item['achievement']->icon,
                    'points' => $item['achievement']->points,
                    'unlocked' => $item['unlocked'],
                    'progress' => $item['progress'],
                ])->values(),
                'silver' => $achievementsByTier->get('silver', collect())->map(fn ($item) => [
                    'id' => $item['achievement']->id,
                    'name' => $item['achievement']->name,
                    'description' => $item['achievement']->description,
                    'icon' => $item['achievement']->icon,
                    'points' => $item['achievement']->points,
                    'unlocked' => $item['unlocked'],
                    'progress' => $item['progress'],
                ])->values(),
                'bronze' => $achievementsByTier->get('bronze', collect())->map(fn ($item) => [
                    'id' => $item['achievement']->id,
                    'name' => $item['achievement']->name,
                    'description' => $item['achievement']->description,
                    'icon' => $item['achievement']->icon,
                    'points' => $item['achievement']->points,
                    'unlocked' => $item['unlocked'],
                    'progress' => $item['progress'],
                ])->values(),
            ],
        ]);
    }
}
