<?php

namespace App\Http\Requests\Admin;

use App\Enums\PlanType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ChangePlanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasRole('Admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'plan' => ['required', Rule::enum(PlanType::class)],
            'trial_ends_at' => ['nullable', 'date', 'after:today'],
            'reason' => ['nullable', 'string', 'max:500'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'plan.required' => __('The plan field is required.'),
            'plan.enum' => __('The selected plan is invalid.'),
            'trial_ends_at.date' => __('The trial end date must be a valid date.'),
            'trial_ends_at.after' => __('The trial end date must be after today.'),
            'reason.max' => __('The reason must not exceed :max characters.', ['max' => 500]),
        ];
    }
}
