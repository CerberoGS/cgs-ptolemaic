<?php

namespace App\Mcp\Resources;

use App\Mcp\Support\ProviderSnapshot;
use App\Models\User;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Resource;

class AppStatusResource extends Resource
{
    protected string $name = 'app-status';

    protected string $title = 'Application Status Overview';

    protected string $mimeType = 'application/json';

    protected string $description = <<<'MARKDOWN'
        High-level operational snapshot of the application, including user and provider totals, status breakdowns, and recent activity.
    MARKDOWN;

    public function __construct(protected ProviderSnapshot $snapshot) {}

    public function handle(Request $request): Response
    {
        $totalUsers = User::query()->count();
        $verifiedUsers = User::query()->whereNotNull('email_verified_at')->count();
        $oauthUsers = User::query()->whereNotNull('google_id')->count();

        $recentUsers = User::query()
            ->select(['id', 'name', 'email', 'created_at'])
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(fn (User $user): array => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => optional($user->created_at)->toIso8601String(),
            ]);

        $providerSnapshots = $this->snapshot->counts();
        $recentProviders = $this->snapshot->list(['limit' => 5]);

        return Response::json([
            'generated_at' => now()->toIso8601String(),
            'app' => [
                'name' => config('app.name'),
                'environment' => config('app.env'),
                'locale' => config('app.locale'),
                'fallback_locale' => config('app.fallback_locale'),
                'url' => config('app.url'),
            ],
            'users' => [
                'totals' => [
                    'total' => $totalUsers,
                    'verified' => $verifiedUsers,
                    'unverified' => max($totalUsers - $verifiedUsers, 0),
                    'oauth' => $oauthUsers,
                ],
                'recent' => $recentUsers,
            ],
            'providers' => [
                'totals' => $providerSnapshots,
                'recent' => $recentProviders,
            ],
        ]);
    }
}
