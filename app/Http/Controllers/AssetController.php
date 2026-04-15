<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AssetController extends Controller
{
    /**
     * Generate a presigned URL for uploading assets to S3/R2.
     */
    public function presignedUrl(Request $request)
    {
        $validated = $request->validate([
            'filename' => ['required', 'string', 'max:255'],
            'mime_type' => ['required', 'string', 'max:100'],
        ]);

        // Generate unique path with UUID
        $extension = pathinfo($validated['filename'], PATHINFO_EXTENSION);
        $filename = Str::slug(pathinfo($validated['filename'], PATHINFO_FILENAME));
        $path = 'pages/' . Str::uuid() . '/' . $filename . '.' . $extension;

        // Get the S3 disk
        $disk = Storage::disk(config('filesystems.default'));

        // Generate presigned URL (valid for 10 minutes)
        $presignedUrl = $disk->temporaryUrl(
            $path,
            now()->addMinutes(10)
        );

        // Get the public URL for the asset
        $publicUrl = $disk->url($path);

        return response()->json([
            'presigned_url' => $presignedUrl,
            'public_url' => $publicUrl,
            'path' => $path,
        ]);
    }
}
