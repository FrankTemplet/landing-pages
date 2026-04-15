<?php

namespace Database\Seeders;

use App\Models\PageTemplate;
use Illuminate\Database\Seeder;

class Escala24x7TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $html = $this->getTemplateHtml();
        $css = $this->getTemplateCss();

        PageTemplate::updateOrCreate(
            ['slug' => 'escala-24x7'],
            [
                'name' => 'Escala 24x7 - Cloud Migration',
                'slug' => 'escala-24x7',
                'description' => 'Professional cloud migration landing page with hero section, stats cards, content grid, and lead generation form. Fully responsive with Tailwind CSS.',
                'is_system' => true,
                'thumbnail_url' => null,
                'content_json' => [
                    // New hybrid format: html/css for publishing, components/styles for editing
                    'html' => $html,
                    'css' => $css,
                    'components' => [], // Will be populated by GrapesJS when user edits
                    'styles' => [],     // Will be populated by GrapesJS when user edits
                ],
            ]
        );
    }

    private function getTemplateHtml(): string
    {
        return <<<'HTML'
<nav class="bg-white border-b border-gray-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-20">
      <div class="flex-shrink-0 flex items-center">
        <div class="flex items-center gap-2">
          <img src="https://media.templet.io/ib/3NxftKLPwx.png" alt="Logo" class="h-10 w-auto" />
        </div>
      </div>
      <div class="hidden md:flex items-center space-x-8"></div>
    </div>
  </div>
</nav>

<div class="relative overflow-hidden min-h-[500px] bg-[#020B16]">
  <div class="absolute inset-0 pointer-events-none">
    <img src="https://media.templet.io/ib/HjoAeKx92r.png" alt="Background" class="w-full h-full object-cover opacity-80" />
  </div>
  
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 text-left">
    <h1 class="text-4xl md:text-5xl lg:text-6xl leading-tight font-bold text-white max-w-4xl tracking-tight">
      Las plataformas tecnológicas atraviesan un punto de inflexión.
    </h1>
    <p class="mt-6 text-xl md:text-2xl text-white font-normal max-w-3xl leading-relaxed">
      Migrar y modernizar abre la puerta a la próxima etapa digital.
    </p>
  </div>
</div>

<div class="bg-gray-50 py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      
      <div class="space-y-8">
        <div>
          <p class="text-gray-600 mb-2 font-medium uppercase tracking-wide text-sm">Migración y Modernización en la nube</p>
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            El paso clave hacia la nueva generación de aplicaciones y datos
          </h2>

          <p class="text-gray-600 leading-relaxed mb-4">
            Las organizaciones que continúan operando sobre infraestructuras heredadas enfrentan una presión creciente por optimizar costos, mantener control operativo y responder a nuevas exigencias de seguridad y cumplimiento.
          </p>
          
          <ul class="list-disc pl-5 space-y-1 mb-6 text-gray-700">
            <li>Costos operativos cada vez más altos</li>
            <li>Entornos tecnológicos fragmentados</li>
            <li>Mayor exposición a interrupciones o fallas</li>
            <li>Limitaciones para innovar y escalar</li>
          </ul>
        </div>

        <div class="space-y-4">
          <div class="flex items-start p-5 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div class="flex-shrink-0 mr-4">
              <div class="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl">
                479%
              </div>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-lg">Retorno de inversión</p>
              <p class="text-gray-600 text-sm">en 5 años</p>
            </div>
          </div>
          
          <div class="flex items-start p-5 bg-white rounded-lg border border-gray-100 shadow-sm">
            <div class="flex-shrink-0 mr-4">
              <div class="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                5-6m
              </div>
            </div>
            <div>
              <p class="font-bold text-gray-900 text-lg">Recuperación rápida</p>
              <p class="text-gray-600 text-sm">para recuperar su inversión</p>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full">
        <div class="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
          <div class="bg-gray-900 p-6 text-white">
            <h3 class="text-xl font-bold mb-2">Descarga nuestra guía gratuita</h3>
            <p class="text-sm text-gray-300">
              Accede a información clara sobre migración a la nube
            </p>
          </div>

          <div class="p-6 md:p-8">
            <form class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input type="text" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                  <input type="text" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                <input type="text" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>

              <button type="submit" class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-md transition-colors">
                Descarga ahora
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<footer class="bg-gray-200 py-8 border-t border-gray-300">
  <div class="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
    © 2026 Escala 24x7. All rights reserved.
  </div>
</footer>
HTML;
    }

    private function getTemplateCss(): string
    {
        return <<<'CSS'
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
CSS;
    }
}
