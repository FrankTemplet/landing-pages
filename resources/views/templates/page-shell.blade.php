<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $metaTitle }}</title>
    
    @if($metaDescription)
        <meta name="description" content="{{ $metaDescription }}">
    @endif
    
    @if($ogImage)
        <meta property="og:image" content="{{ $ogImage }}">
        <meta property="og:title" content="{{ $metaTitle }}">
        @if($metaDescription)
            <meta property="og:description" content="{{ $metaDescription }}">
        @endif
    @endif
    
    @if(!empty($customMeta))
        @foreach($customMeta as $key => $value)
            <meta name="{{ $key }}" content="{{ $value }}">
        @endforeach
    @endif
    
    <!-- Tailwind CSS CDN for published pages -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>{!! $css !!}</style>
</head>
<body>
    {!! $html !!}
</body>
</html>
