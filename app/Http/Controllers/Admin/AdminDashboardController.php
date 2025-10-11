<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AiProvider;
use App\Models\MarketDataProvider;
use App\Models\NewsProvider;
use App\Models\ProviderCategory;
use App\Models\TradingProvider;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $categories = ProviderCategory::query()
            ->orderBy('display_name')
            ->get(['id', 'name', 'display_name']);

        $providerCounts = [
            'ai' => AiProvider::count(),
            'market_data' => MarketDataProvider::count(),
            'news' => NewsProvider::count(),
            'trading' => TradingProvider::count(),
        ];

        $usersCount = User::count();
        $adminCount = User::role('Admin')->count();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'categories' => $categories,
                'providers' => $providerCounts,
                'users' => [
                    'total' => $usersCount,
                    'admins' => $adminCount,
                ],
            ],
        ]);
    }
}
