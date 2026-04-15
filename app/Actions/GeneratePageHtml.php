<?php

namespace App\Actions;

use App\Models\Page;

class GeneratePageHtml
{
    /**
     * Generate HTML from GrapesJS JSON for a page.
     */
    public function execute(Page $page): string
    {
        $contentJson = $page->content_json ?? [];

        // Extract HTML and CSS from hybrid format (new) or legacy format (old)
        // New format: { html: '...', css: '...', components: [...], styles: [...] }
        // Legacy format: { 'gjs-html': '...', 'gjs-css': '...' }
        
        $html = $contentJson['html'] ?? $contentJson['gjs-html'] ?? '';
        $css = $contentJson['css'] ?? $contentJson['gjs-css'] ?? '';

        // Render using the page shell template
        return view('templates.page-shell', [
            'html' => $html,
            'css' => $css,
            'metaTitle' => $page->meta_title ?? $page->title,
            'metaDescription' => $page->meta_description,
            'ogImage' => $page->og_image_url,
            'customMeta' => $page->custom_meta ?? [],
        ])->render();
    }
}
