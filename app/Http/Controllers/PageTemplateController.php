<?php

namespace App\Http\Controllers;

use App\Http\Requests\TemplateStoreRequest;
use App\Models\PageTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageTemplateController extends Controller
{
    /**
     * Display a listing of templates.
     */
    public function index()
    {
        $templates = PageTemplate::orderBy('is_system', 'desc')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($template) {
                return [
                    'id' => $template->id,
                    'name' => $template->name,
                    'slug' => $template->slug,
                    'description' => $template->description,
                    'thumbnail_url' => $template->thumbnail_url,
                    'is_system' => $template->is_system,
                    'created_at' => $template->created_at->format('Y-m-d'),
                ];
            });

        return Inertia::render('templates/Index', [
            'templates' => $templates,
        ]);
    }

    /**
     * Store a new user-created template.
     */
    public function store(TemplateStoreRequest $request)
    {
        $validated = $request->validated();

        // Auto-generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = PageTemplate::generateUniqueSlug($validated['name']);
        }

        // User-created templates are not system templates
        $validated['is_system'] = false;

        $template = PageTemplate::create($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Template saved successfully.',
                'template' => [
                    'id' => $template->id,
                    'name' => $template->name,
                    'slug' => $template->slug,
                ],
            ]);
        }

        return redirect()->route('templates.index')->with('success', 'Template saved successfully.');
    }
}
