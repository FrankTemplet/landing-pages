<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class TemplateStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'regex:/^[a-z0-9-]+$/', 'unique:page_templates,slug'],
            'description' => ['nullable', 'string', 'max:1000'],
            'thumbnail_url' => ['nullable', 'url', 'max:500'],
            'content_json' => ['required', 'array'],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'slug.regex' => 'The slug may only contain lowercase letters, numbers, and hyphens.',
        ];
    }
}
