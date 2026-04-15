<?php

use App\Http\Controllers\AssetController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PageTemplateController;
use App\Http\Controllers\PublicPageController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'Welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'Dashboard')->name('dashboard');

    // Page Management Routes
    Route::resource('pages', PageController::class)->except(['show']);
    Route::post('pages/{page}/publish', [PageController::class, 'publish'])->name('pages.publish');
    Route::post('pages/{page}/unpublish', [PageController::class, 'unpublish'])->name('pages.unpublish');
    Route::post('pages/{page}/autosave', [PageController::class, 'autosave'])->name('pages.autosave');
    Route::get('pages/{page}/load', [PageController::class, 'loadEditor'])->name('pages.load');
    Route::post('pages/{page}/duplicate', [PageController::class, 'duplicate'])->name('pages.duplicate');
    Route::post('pages/from-template/{template}', [PageController::class, 'createFromTemplate'])->name('pages.from-template');

    // Template Management Routes
    Route::get('templates', [PageTemplateController::class, 'index'])->name('templates.index');
    Route::post('templates', [PageTemplateController::class, 'store'])->name('templates.store');

    // Asset Upload Routes
    Route::post('assets/presigned-url', [AssetController::class, 'presignedUrl'])->name('assets.presigned-url');
});

require __DIR__.'/settings.php';

// Public Page Routes (MUST BE LAST to avoid shadowing app routes)
Route::get('{slug}', [PublicPageController::class, 'show'])
    ->where('slug', '[a-z0-9-]+')
    ->name('page.public');
