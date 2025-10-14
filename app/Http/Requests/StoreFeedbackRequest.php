<?php

namespace App\Http\Requests;

use App\Enums\FeedbackType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreFeedbackRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Anyone can submit feedback
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => ['required', new Enum(FeedbackType::class)],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'screenshot' => ['nullable', 'image', 'max:2048'], // 2MB max
            'url' => ['nullable', 'string', 'max:500'],
        ];
    }

    /**
     * Get custom error messages.
     */
    public function messages(): array
    {
        return [
            'type.required' => __('Please select a feedback type.'),
            'subject.required' => __('Please provide a subject.'),
            'subject.max' => __('Subject must not exceed :max characters.', ['max' => 255]),
            'message.required' => __('Please provide a message.'),
            'message.max' => __('Message must not exceed :max characters.', ['max' => 5000]),
            'screenshot.image' => __('Screenshot must be an image file.'),
            'screenshot.max' => __('Screenshot must not exceed :max KB.', ['max' => 2048]),
        ];
    }
}
