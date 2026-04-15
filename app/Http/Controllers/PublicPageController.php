<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Support\Facades\Cache;

class PublicPageController extends Controller
{
    /**
     * Display a published page by slug.
     */
    public function show(string $slug)
    {
        // Cache for 1 hour (3600 seconds)
        $html = Cache::remember("page:{$slug}", 3600, function () use ($slug) {
            $page = Page::where('slug', $slug)
                ->where('status', 'published')
                ->firstOrFail();

            return $page->content_html;
        });

        return response($html)
            ->header('Content-Type', 'text/html')
            ->header('Cache-Control', 'public, max-age=3600');
    }
}
