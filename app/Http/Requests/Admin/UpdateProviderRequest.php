<?php

namespace App\Http\Requests\Admin;

use App\Enums\ProviderType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProviderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('providers.manage') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $type = ProviderType::tryFrom($this->route('type') ?? $this->input('type', ProviderType::Ai->value));
        $table = $type?->table() ?? ProviderType::Ai->table();
        $providerId = $this->route('provider');

        $baseRules = [
            'type' => ['required', 'string', Rule::in(array_map(static fn (ProviderType $case) => $case->value, ProviderType::cases()))],
            'slug' => ['required', 'string', 'max:255', Rule::unique($table, 'slug')->ignore($providerId)],
            'display_name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'base_url' => ['nullable', 'url'],
            'docs_url' => ['nullable', 'url'],
            'verification_endpoint' => ['nullable', 'url'],
            'test_json' => ['nullable', 'array'],
            'ops_json' => ['nullable', 'array'],
            'status' => ['nullable', 'string', Rule::in(['active', 'inactive', 'deprecated'])],
            'requires_organization' => ['sometimes', 'boolean'],
            'data_frequency' => ['sometimes', 'nullable', 'string', 'max:255'],
            'rate_limit_per_minute' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'supports_historical' => ['sometimes', 'boolean'],
            'category_filters' => ['sometimes', 'array'],
            'category_filters.*' => ['string', 'max:255'],
            'language_support' => ['sometimes', 'array'],
            'language_support.*' => ['string', 'max:10'],
            'webhook_support' => ['sometimes', 'boolean'],
            'supports_paper_trading' => ['sometimes', 'boolean'],
            'market_types' => ['sometimes', 'array'],
            'market_types.*' => ['string', 'max:255'],
            'requires_two_factor' => ['sometimes', 'boolean'],
        ];

        return $baseRules;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'type' => $this->route('type', $this->input('type')),
        ]);

        foreach (['test_json', 'ops_json', 'category_filters', 'language_support', 'market_types'] as $field) {
            if ($this->filled($field)) {
                $this->merge([
                    $field => $this->decodeJsonField($field),
                ]);
            }
        }
    }

    /**
     * @return array<int, mixed>|null|string
     */
    protected function decodeJsonField(string $key)
    {
        $value = $this->input($key);

        if (is_array($value) || $value === null) {
            return $value;
        }

        if (is_string($value) && $value !== '') {
            $decoded = json_decode($value, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                return $decoded;
            }
        }

        return $value;
    }
}
