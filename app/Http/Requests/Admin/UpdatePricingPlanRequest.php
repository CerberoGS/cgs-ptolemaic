<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePricingPlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('pricing.manage');
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            // Normal prices
            'price_monthly' => ['required', 'numeric', 'min:0'],
            'price_yearly' => ['required', 'numeric', 'min:0'],

            // Offer prices
            'offer_price_monthly' => ['nullable', 'numeric', 'min:0'],
            'offer_price_yearly' => ['nullable', 'numeric', 'min:0'],

            // Offer management
            'offer_active' => ['boolean'],
            'offer_name' => ['nullable', 'string', 'max:100'],
            'offer_description' => ['nullable', 'string', 'max:500'],

            // Countdown timer
            'offer_starts_at' => ['nullable', 'date', 'after_or_equal:now'],
            'offer_ends_at' => ['nullable', 'date', 'after:offer_starts_at'],

            // Scarcity
            'scarcity_active' => ['boolean'],
            'scarcity_message' => ['nullable', 'string', 'max:200'],
            'scarcity_limit' => ['nullable', 'integer', 'min:1'],
            'scarcity_sold' => ['nullable', 'integer', 'min:0'],

            // Status
            'is_active' => ['boolean'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'price_monthly.required' => __('pricing.validation.price_monthly_required'),
            'price_monthly.numeric' => __('pricing.validation.price_monthly_numeric'),
            'price_monthly.min' => __('pricing.validation.price_monthly_min'),

            'price_yearly.required' => __('pricing.validation.price_yearly_required'),
            'price_yearly.numeric' => __('pricing.validation.price_yearly_numeric'),
            'price_yearly.min' => __('pricing.validation.price_yearly_min'),

            'offer_price_monthly.numeric' => __('pricing.validation.offer_price_monthly_numeric'),
            'offer_price_monthly.min' => __('pricing.validation.offer_price_monthly_min'),

            'offer_price_yearly.numeric' => __('pricing.validation.offer_price_yearly_numeric'),
            'offer_price_yearly.min' => __('pricing.validation.offer_price_yearly_min'),

            'offer_name.max' => __('pricing.validation.offer_name_max'),
            'offer_description.max' => __('pricing.validation.offer_description_max'),

            'offer_starts_at.date' => __('pricing.validation.offer_starts_at_date'),
            'offer_starts_at.after_or_equal' => __('pricing.validation.offer_starts_at_after_or_equal'),

            'offer_ends_at.date' => __('pricing.validation.offer_ends_at_date'),
            'offer_ends_at.after' => __('pricing.validation.offer_ends_at_after'),

            'scarcity_message.max' => __('pricing.validation.scarcity_message_max'),
            'scarcity_limit.integer' => __('pricing.validation.scarcity_limit_integer'),
            'scarcity_limit.min' => __('pricing.validation.scarcity_limit_min'),
            'scarcity_sold.integer' => __('pricing.validation.scarcity_sold_integer'),
            'scarcity_sold.min' => __('pricing.validation.scarcity_sold_min'),
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            // If offer is active, offer prices are required
            if ($this->boolean('offer_active')) {
                if (! $this->filled('offer_price_monthly')) {
                    $validator->errors()->add('offer_price_monthly', __('pricing.validation.offer_price_monthly_required_when_active'));
                }
                if (! $this->filled('offer_price_yearly')) {
                    $validator->errors()->add('offer_price_yearly', __('pricing.validation.offer_price_yearly_required_when_active'));
                }
            }

            // If scarcity is active, scarcity fields are required
            if ($this->boolean('scarcity_active')) {
                if (! $this->filled('scarcity_message')) {
                    $validator->errors()->add('scarcity_message', __('pricing.validation.scarcity_message_required_when_active'));
                }
                if (! $this->filled('scarcity_limit')) {
                    $validator->errors()->add('scarcity_limit', __('pricing.validation.scarcity_limit_required_when_active'));
                }
            }

            // Scarcity sold cannot exceed limit
            if ($this->filled('scarcity_sold') && $this->filled('scarcity_limit')) {
                if ($this->integer('scarcity_sold') > $this->integer('scarcity_limit')) {
                    $validator->errors()->add('scarcity_sold', __('pricing.validation.scarcity_sold_exceeds_limit'));
                }
            }
        });
    }
}
