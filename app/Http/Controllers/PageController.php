<?php

namespace App\Http\Controllers;

use App\Actions\GeneratePageHtml;
use App\Http\Requests\PageStoreRequest;
use App\Http\Requests\PageUpdateRequest;
use App\Models\Page;
use App\Models\PageTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pages = Page::orderBy('updated_at', 'desc')->get()->map(function ($page) {
            return [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'status' => $page->status,
                'published_at' => $page->published_at?->format('Y-m-d H:i'),
                'updated_at' => $page->updated_at->format('Y-m-d H:i'),
            ];
        });

        return Inertia::render('pages/Index', [
            'pages' => $pages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pages/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PageStoreRequest $request)
    {
        $validated = $request->validated();

        // Auto-generate slug if not provided
        if (empty($validated['slug'])) {
            $validated['slug'] = Page::generateUniqueSlug($validated['title']);
        }

        // Initialize with empty structure
        if (empty($validated['content_json'])) {
            $validated['content_json'] = [];
        }

        $page = Page::create($validated);

        return redirect()->route('pages.edit', $page)->with('success', 'Page created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        return Inertia::render('pages/Edit', [
            'page' => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'status' => $page->status,
                'content_json' => $page->content_json,
                'meta_title' => $page->meta_title,
                'meta_description' => $page->meta_description,
                'og_image_url' => $page->og_image_url,
                'custom_meta' => $page->custom_meta,
                'published_at' => $page->published_at,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PageUpdateRequest $request, Page $page)
    {
        $validated = $request->validated();

        // Clear cache if slug changes
        if (isset($validated['slug']) && $validated['slug'] !== $page->slug) {
            Cache::forget("page:{$page->slug}");
        }

        $page->update($validated);

        // Clear new slug cache too
        if (isset($validated['slug'])) {
            Cache::forget("page:{$validated['slug']}");
        }

        return back()->with('success', 'Page updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        $slug = $page->slug;
        $page->delete();

        // Clear cache
        Cache::forget("page:{$slug}");

        return redirect()->route('pages.index')->with('success', 'Page deleted successfully.');
    }

    /**
     * Autosave page content (for GrapesJS storage manager).
     */
    public function autosave(Request $request, Page $page)
    {
        $validated = $request->validate([
            'content_json' => ['required', 'array'],
        ]);

        $page->update([
            'content_json' => $validated['content_json'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Page autosaved successfully.',
        ]);
    }

    /**
     * Load page data for GrapesJS editor.
     */
    public function loadEditor(Page $page)
    {
        return response()->json([
            'content_json' => $page->content_json ?? [],
        ]);
    }

    /**
     * Publish a page (generate HTML and set status).
     */
    public function publish(Page $page)
    {
        $htmlGenerator = new GeneratePageHtml();
        $html = $htmlGenerator->execute($page);

        $page->update([
            'content_html' => $html,
            'status' => 'published',
            'published_at' => now(),
        ]);

        // Clear cache
        Cache::forget("page:{$page->slug}");

        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Page published successfully!',
                'redirect_url' => route('page.public', $page->slug),
            ]);
        }

        return redirect()->route('page.public', $page->slug)->with('success', 'Page published successfully!');
    }

    /**
     * Unpublish a page (set status to draft).
     */
    public function unpublish(Page $page)
    {
        $page->update([
            'status' => 'draft',
        ]);

        // Clear cache
        Cache::forget("page:{$page->slug}");

        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Page unpublished successfully',
            ]);
        }

        return back()->with('success', 'Page unpublished successfully.');
    }

    /**
     * Duplicate an existing page.
     */
    public function duplicate(Page $page)
    {
        $newPage = $page->replicate();
        $newPage->title = $page->title . ' (Copy)';
        $newPage->slug = Page::generateUniqueSlug($page->slug . '-copy');
        $newPage->status = 'draft';
        $newPage->published_at = null;
        $newPage->content_html = null;
        $newPage->save();

        return redirect()->route('pages.edit', $newPage)->with('success', 'Page duplicated successfully.');
    }

    /**
     * Create a page from a template.
     */
    public function createFromTemplate(PageTemplate $template)
    {
        $page = Page::create([
            'title' => 'New Page from ' . $template->name,
            'slug' => Page::generateUniqueSlug('new-page-' . time()),
            'content_json' => $template->content_json,
            'status' => 'draft',
        ]);

        return redirect()->route('pages.edit', $page)->with('success', 'Page created from template successfully.');
    }
}
