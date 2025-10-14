<?php

namespace App\Http\Controllers;

use App\Services\TradingAnalyticsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsDashboardController extends Controller
{
    public function __construct(protected TradingAnalyticsService $analyticsService) {}

    /**
     * Display the analytics dashboard.
     */
    public function index(Request $request, string $locale): Response
    {
        $user = $request->user();

        $advancedMetrics = $this->analyticsService->calculateAdvancedMetrics($user);
        $setupAnalysis = $this->analyticsService->analyzeBySetupType($user);
        $emotionAnalysis = $this->analyticsService->analyzeByEmotion($user);
        $heatmapData = $this->analyticsService->getHeatmapData($user);

        return Inertia::render('analytics/index', [
            'metrics' => $advancedMetrics,
            'setupAnalysis' => $setupAnalysis,
            'emotionAnalysis' => $emotionAnalysis,
            'heatmapData' => $heatmapData,
        ]);
    }
}
