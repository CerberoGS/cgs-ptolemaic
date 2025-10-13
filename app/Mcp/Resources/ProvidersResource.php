<?php

namespace App\Mcp\Resources;

use App\Enums\ProviderType;
use App\Mcp\Support\ProviderSnapshot;
use Illuminate\Validation\Rule;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Resource;

class ProvidersResource extends Resource
{
    protected string $name = 'providers';

    protected string $title = 'Registered Providers';

    protected string $mimeType = 'application/json';

    protected string $description = <<<'MARKDOWN'
        Lists registered providers across all categories. Optional filters:
        - `type`: one of `ai`, `market_data`, `news`, `trading`.
        - `status`: provider status (`active`, `inactive`, `deprecated`).
        - `search`: string contained in the slug or display name.
        - `limit`: number of items to return (max 50, default 25).
    MARKDOWN;

    public function __construct(protected ProviderSnapshot $snapshot) {}

    public function handle(Request $request): Response
    {
        $filters = $request->validate([
            'type' => ['sometimes', Rule::in(array_map(static fn (ProviderType $case) => $case->value, ProviderType::cases()))],
            'status' => ['sometimes', 'string', Rule::in(['active', 'inactive', 'deprecated'])],
            'search' => ['sometimes', 'string', 'max:255'],
            'limit' => ['sometimes', 'integer', 'min:1', 'max:50'],
        ]);

        $providers = $this->snapshot->list($filters);

        return Response::json([
            'filters' => [
                'type' => $filters['type'] ?? null,
                'status' => $filters['status'] ?? null,
                'search' => $filters['search'] ?? null,
                'limit' => (int) ($filters['limit'] ?? 25),
            ],
            'count' => $providers->count(),
            'providers' => $providers,
        ]);
    }
}
