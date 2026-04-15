<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\PageTemplate;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalPages = Page::count();
        $publishedPages = Page::published()->count();
        $draftPages = Page::draft()->count();
        $totalTemplates = PageTemplate::count();
        $totalUsers = User::count();

        $recentPages = Page::orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($page) => [
                'id' => $page->id,
                'title' => $page->title,
                'slug' => $page->slug,
                'status' => $page->status,
                'created_at' => $page->created_at->format('d/m/Y'),
            ]);

        $recentTemplates = PageTemplate::orderBy('created_at', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($template) {
                $json = $template->content_json ?? [];
                $html = $json['gjs-html'] ?? $json['html'] ?? '';
                $css  = $json['gjs-css']  ?? $json['css']  ?? '';
                $previewHtml = "<!DOCTYPE html><html><head><meta charset='utf-8'><style>*{box-sizing:border-box}body{margin:0;padding:0}{$css}</style></head><body>{$html}</body></html>";

                return [
                    'id'           => $template->id,
                    'name'         => $template->name,
                    'slug'         => $template->slug,
                    'description'  => $template->description,
                    'thumbnail_url'=> $template->thumbnail_url,
                    'is_system'    => $template->is_system,
                    'preview_html' => $previewHtml,
                ];
            });

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalPages' => $totalPages,
                'publishedPages' => $publishedPages,
                'draftPages' => $draftPages,
                'totalTemplates' => $totalTemplates,
                'totalUsers' => $totalUsers,
            ],
            'recentPages' => $recentPages,
            'recentTemplates' => $recentTemplates,
        ]);
    }
}
