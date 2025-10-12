<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ProviderType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProviderRequest;
use App\Http\Requests\Admin\UpdateProviderRequest;
use App\Models\AiProvider;
use App\Models\MarketDataProvider;
use App\Models\NewsProvider;
use App\Models\ProviderCategory;
use App\Models\TradingProvider;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AdminProviderController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = ProviderCategory::query()
            ->orderBy('display_name')
            ->get();

        $providers = collect([
            ProviderType::Ai->value => AiProvider::query()
                ->withCount('models')
                ->orderBy('display_name')
                ->get(),
            ProviderType::MarketData->value => MarketDataProvider::query()
                ->orderBy('display_name')
                ->get(),
            ProviderType::News->value => NewsProvider::query()
                ->orderBy('display_name')
                ->get(),
            ProviderType::Trading->value => TradingProvider::query()
                ->orderBy('display_name')
                ->get(),
        ])->flatMap(function ($collection, $type) {
            $providerType = ProviderType::from($type);

            return $collection->map(fn (Model $provider) => $this->transformProvider($provider, $providerType));
        })->values();

        return Inertia::render('admin/providers/index', [
            'categories' => $categories->map(fn (ProviderCategory $category) => [
                'id' => $category->id,
                'name' => $category->name,
                'display_name' => $category->display_name,
                'description' => $category->description,
            ]),
            'providers' => $providers,
            'meta' => [
                'statuses' => ['active', 'inactive', 'deprecated'],
            ],
        ]);
    }

    public function store(StoreProviderRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $type = ProviderType::from($data['type']);
        $category = ProviderCategory::query()
            ->where('name', $type->categoryName())
            ->firstOrFail();

        $modelClass = $type->modelClass();
        /** @var \Illuminate\Database\Eloquent\Model $provider */
        $provider = $modelClass::create(
            $this->buildPayload($type, $data, $category->id)
        );

        return redirect()
            ->back()
            ->with('success', __('Provider :name created successfully.', ['name' => $provider->display_name]));
    }

    public function update(UpdateProviderRequest $request, string $locale, string $type, string $provider): RedirectResponse
    {
        $providerType = $this->resolveType($type);
        $modelClass = $providerType->modelClass();

        /** @var \Illuminate\Database\Eloquent\Model $record */
        $record = $modelClass::query()->findOrFail((int) $provider);

        $record->update($this->buildPayload($providerType, $request->validated(), $record->provider_category_id));

        return redirect()
            ->back()
            ->with('success', __('Provider :name updated successfully.', ['name' => $record->display_name]));
    }

    public function destroy(string $locale, string $type, string $provider): RedirectResponse
    {
        $providerType = $this->resolveType($type);
        $modelClass = $providerType->modelClass();

        /** @var \Illuminate\Database\Eloquent\Model $record */
        $record = $modelClass::query()->findOrFail((int) $provider);
        $name = $record->display_name ?? $record->slug;
        $record->delete();

        return redirect()
            ->back()
            ->with('success', __('Provider :name deleted successfully.', ['name' => $name]));
    }

    protected function transformProvider(Model $provider, ProviderType $type): array
    {
        $attributes = $provider->only([
            'id',
            'provider_category_id',
            'slug',
            'display_name',
            'description',
            'base_url',
            'docs_url',
            'verification_endpoint',
            'test_json',
            'ops_json',
            'requires_organization',
            'status',
            'data_frequency',
            'rate_limit_per_minute',
            'supports_historical',
            'category_filters',
            'language_support',
            'webhook_support',
            'supports_paper_trading',
            'market_types',
            'requires_two_factor',
        ]);

        if ($provider->relationLoaded('models')) {
            $attributes['models_count'] = $provider->models_count;
        }

        return [
            ...$attributes,
            'type' => $type->value,
        ];
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function buildPayload(ProviderType $type, array $data, int $categoryId): array
    {
        $payload = [
            'provider_category_id' => $categoryId,
            'status' => $data['status'] ?? 'active',
        ];

        $booleans = [
            'requires_organization',
            'supports_historical',
            'webhook_support',
            'supports_paper_trading',
            'requires_two_factor',
        ];

        $arrays = [
            'test_json',
            'ops_json',
            'category_filters',
            'language_support',
            'market_types',
        ];

        foreach ($type->fillableAttributes() as $attribute) {
            if ($attribute === 'provider_category_id') {
                $payload['provider_category_id'] = $categoryId;

                continue;
            }

            if (! array_key_exists($attribute, $data)) {
                if (in_array($attribute, $booleans, true)) {
                    $payload[$attribute] = false;
                }

                continue;
            }

            if (in_array($attribute, $booleans, true)) {
                $payload[$attribute] = filter_var($data[$attribute], FILTER_VALIDATE_BOOLEAN);

                continue;
            }

            if (in_array($attribute, $arrays, true)) {
                $payload[$attribute] = $data[$attribute] ?? [];

                continue;
            }

            if (in_array($attribute, ['rate_limit_per_minute', 'data_frequency'], true)) {
                if ($data[$attribute] === null || $data[$attribute] === '') {
                    $payload[$attribute] = null;

                    continue;
                }

                if ($attribute === 'rate_limit_per_minute') {
                    $payload[$attribute] = is_numeric($data[$attribute])
                        ? (int) $data[$attribute]
                        : null;

                    continue;
                }

                $payload[$attribute] = $data[$attribute];

                continue;
            }

            $payload[$attribute] = $data[$attribute];
        }

        return $payload;
    }

    protected function resolveType(string $type): ProviderType
    {
        $providerType = ProviderType::tryFrom($type);

        if (! $providerType) {
            throw ValidationException::withMessages([
                'type' => __('Unsupported provider type :type', ['type' => $type]),
            ]);
        }

        return $providerType;
    }
}
