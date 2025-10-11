<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserDefaultProvidersRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('users.manage') ?? false;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $userId = $this->route('user') instanceof \App\Models\User
            ? $this->route('user')->getKey()
            : $this->route('user');

        return [
            'ai_provider_key_id' => [
                'nullable',
                'integer',
                Rule::exists('ai_provider_keys', 'id')->where('user_id', $userId),
            ],
            'ai_provider_model_id' => [
                'nullable',
                'integer',
                Rule::exists('ai_provider_models', 'id'),
            ],
            'market_data_provider_key_id' => [
                'nullable',
                'integer',
                Rule::exists('market_data_provider_keys', 'id')->where('user_id', $userId),
            ],
            'news_provider_key_id' => [
                'nullable',
                'integer',
                Rule::exists('news_provider_keys', 'id')->where('user_id', $userId),
            ],
            'trading_provider_key_id' => [
                'nullable',
                'integer',
                Rule::exists('trading_provider_keys', 'id')->where('user_id', $userId),
            ],
        ];
    }
}
