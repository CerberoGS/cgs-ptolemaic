<?php

namespace App\Mcp\Support;

use App\Enums\ProviderType;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class ProviderSnapshot
{
    /**
     * @param  array<string, mixed>  $filters
     * @return Collection<int, array<string, mixed>>
     */
    public function list(array $filters = []): Collection
    {
        $limit = (int) ($filters['limit'] ?? 25);
        $limit = $limit > 0 ? min($limit, 50) : 25;
        $search = isset($filters['search']) ? trim((string) $filters['search']) : null;
        $status = isset($filters['status']) ? trim((string) $filters['status']) : null;
        $typeFilter = isset($filters['type']) ? trim((string) $filters['type']) : null;

        $providers = collect();

        foreach (ProviderType::cases() as $providerType) {
            if ($typeFilter && $typeFilter !== $providerType->value) {
                continue;
            }

            $collection = $this->queryForType($providerType)
                ->when($status, fn ($query) => $query->where('status', $status))
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('display_name', 'like', "%{$search}%")
                            ->orWhere('slug', 'like', "%{$search}%");
                    });
                })
                ->orderBy('display_name')
                ->limit($limit)
                ->get();

            $providers = $providers->concat(
                $collection->map(fn (Model $provider) => $this->formatProvider($provider, $providerType->value))
            );
        }

        return $providers
            ->sortBy('display_name', SORT_NATURAL | SORT_FLAG_CASE)
            ->values()
            ->take($limit);
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    public function counts(): array
    {
        $totals = [];

        foreach (ProviderType::cases() as $providerType) {
            $query = $this->queryForType($providerType);

            $totals[$providerType->value] = [
                'total' => $query->count(),
                'by_status' => $this->statusBreakdown($providerType),
            ];
        }

        return $totals;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder<Model>
     */
    protected function queryForType(ProviderType $providerType)
    {
        $modelClass = $providerType->modelClass();

        return $modelClass::query();
    }

    /**
     * @return array<string, mixed>
     */
    protected function formatProvider(Model $provider, string $type): array
    {
        $category = $provider->category;

        return [
            'id' => $provider->getKey(),
            'type' => $type,
            'slug' => $provider->getAttribute('slug'),
            'display_name' => $provider->getAttribute('display_name'),
            'status' => $provider->getAttribute('status'),
            'category' => $category
                ? [
                    'id' => $category->getKey(),
                    'name' => $category->getAttribute('name'),
                    'display_name' => $category->getAttribute('display_name'),
                ]
                : null,
            'base_url' => $provider->getAttribute('base_url'),
            'docs_url' => $provider->getAttribute('docs_url'),
            'verification_endpoint' => $provider->getAttribute('verification_endpoint'),
            'requires_organization' => (bool) $provider->getAttribute('requires_organization'),
            'supports_historical' => (bool) $provider->getAttribute('supports_historical'),
            'webhook_support' => (bool) $provider->getAttribute('webhook_support'),
            'supports_paper_trading' => (bool) $provider->getAttribute('supports_paper_trading'),
            'requires_two_factor' => (bool) $provider->getAttribute('requires_two_factor'),
            'data_frequency' => $provider->getAttribute('data_frequency'),
            'rate_limit_per_minute' => $provider->getAttribute('rate_limit_per_minute'),
            'updated_at' => optional($provider->getAttribute('updated_at'))->toISOString(),
        ];
    }

    /**
     * @return array<string, int>
     */
    protected function statusBreakdown(ProviderType $providerType): array
    {
        /** @var EloquentCollection<int, Model> $statusCounts */
        $statusCounts = $this->queryForType($providerType)
            ->selectRaw('status, COUNT(*) as total')
            ->groupBy('status')
            ->get()
            ->mapWithKeys(fn (Model $row) => [$row->getAttribute('status') => (int) $row->getAttribute('total')]);

        return $statusCounts->all();
    }
}
