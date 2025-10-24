<?php

namespace App\Http\Controllers\Settings;

use App\Enums\ProviderType;
use App\Http\Controllers\Controller;
use App\Mcp\Support\ProviderSnapshot;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class IntegrationsController extends Controller
{
    public function index(Request $request, ProviderSnapshot $providerSnapshot): Response
    {
        $user = $request->user();
        $planSlug = $user?->planOrDefault() ?? 'free';
        $planModel = $user?->currentPlan();

        $providers = collect(ProviderType::cases())->map(
            fn (ProviderType $type): array => [
                'type' => $type->value,
                'label' => Str::headline(str_replace('_', ' ', $type->value)),
                'items' => $providerSnapshot->list([
                    'type' => $type->value,
                    'limit' => 12,
                ])->all(),
            ]
        )->values();

        if ($user !== null) {
            $user->loadCount([
                'aiProviderKeys',
                'marketDataProviderKeys',
                'newsProviderKeys',
                'tradingProviderKeys',
            ]);
        }

        $keyCounts = [
            'ai' => $user?->ai_provider_keys_count ?? 0,
            'market_data' => $user?->market_data_provider_keys_count ?? 0,
            'news' => $user?->news_provider_keys_count ?? 0,
            'trading' => $user?->trading_provider_keys_count ?? 0,
        ];

        $dailyLimit = $user?->managedDailyLimit();
        $monthlyLimit = $user?->managedMonthlyLimit();

        return Inertia::render('settings/integrations', [
            'plan' => [
                'type' => $planSlug,
                'label' => $planModel?->name() ?? ucfirst($planSlug),
                'summary' => $planModel?->tagline() ?? '',
                'description' => $planModel?->description() ?? '',
                'canManageProviderKeys' => $user?->canManageProviderKeys() ?? false,
                'usesManagedKeys' => $user?->usesManagedProviderKeys() ?? false,
                'hasUsageLimits' => $dailyLimit !== null || $monthlyLimit !== null,
                'limits' => [
                    'daily' => $dailyLimit,
                    'monthly' => $monthlyLimit,
                ],
            ],
            'providers' => $providers,
            'keyCounts' => $keyCounts,
        ]);
    }
}
