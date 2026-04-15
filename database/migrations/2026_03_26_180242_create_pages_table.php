<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->json('content_json'); // GrapesJS state - source of truth
            $table->longText('content_html')->nullable(); // Pre-generated HTML on publish
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('og_image_url')->nullable();
            $table->json('custom_meta')->nullable(); // Additional meta tags as key-value
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            
            $table->index('slug');
            $table->index('status');
            $table->index('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
