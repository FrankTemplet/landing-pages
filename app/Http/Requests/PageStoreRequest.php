<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PageStoreRequest extends FormRequest
{
    /**
     * Reserved slugs that cannot be used for pages.
     */
    protected const RESERVED_SLUGS = [
        'login',
        'register',
        'logout',
        'dashboard',
        'settings',
        'profile',
        'security',
        'appearance',
        'pages',
        'templates',
        'forgot-password',
        'reset-password',
        'verify-email',
        'two-factor-challenge',
        'user',
        'api',
        'admin',
        'assets',
    ];

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
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[a-z0-9-]+$/',
                'unique:pages,slug',
                Rule::notIn(self::RESERVED_SLUGS),
            ],
            'content_json' => ['nullable', 'array'],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string', 'max:1000'],
            'og_image_url' => ['nullable', 'url', 'max:500'],
            'custom_meta' => ['nullable', 'array'],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'slug.regex' => 'The slug may only contain lowercase letters, numbers, and hyphens.',
            'slug.not_in' => 'This slug is reserved and cannot be used.',
        ];
    }
}
