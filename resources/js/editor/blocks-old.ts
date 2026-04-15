import type { Editor } from 'grapesjs';

/**
 * SVG Icons for blocks (extracted from lucide-react)
 */
const ICONS = {
  barChart3: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  piggyBank: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"/><path d="M2 9v1c0 1.1.9 2 2 2h1"/><path d="M16 11h0"/></svg>`,
  briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
};

/**
 * =======================
 * NEW BLOCKS - Escala 24x7 Landing
 * =======================
 */

export function addNavbarBlock(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('navbar-escala', {
    label: 'Navbar',
    category: 'Navigation',
    content: `
      <nav class="bg-white border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <div class="flex-shrink-0 flex items-center">
              <div class="flex items-center gap-2">
                <img
                  src="https://media.templet.io/ib/3NxftKLPwx.png"
                  alt="Logo"
                  class="h-10 w-auto"
                />
              </div>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <!-- Optional: Add phone/CTA buttons here -->
            </div>
          </div>
        </div>
      </nav>
    `,
  });
}

export function addHeroEscalaBlock(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('hero-escala', {
    label: 'Hero Escala',
    category: 'Heroes',
    content: `
      <div class="relative bg-[#020B16] overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img
            src="https://media.templet.io/ib/HjoAeKx92r.png"
            alt="Background"
            class="w-full h-full object-cover"
          />
        </div>
        
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 text-left">
          <h1 class="text-4xl md:text-5xl lg:text-[3.5rem] leading-tight font-bold text-white max-w-4xl tracking-tight">
            Las plataformas tecnológicas <br class="hidden md:block" />
            atraviesan un punto de inflexión.
          </h1>
          <p class="mt-6 text-xl md:text-2xl text-white font-normal max-w-3xl leading-relaxed">
            Migrar y modernizar abre la puerta a <br class="hidden md:block" />
            la próxima etapa digital.
          </p>
        </div>
      </div>
    `,
  });
}

export function addStatCardBlock(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('stat-card', {
    label: 'Stat Card',
    category: 'Cards',
    content: `
      <div class="flex items-start p-5 bg-white rounded-lg border border-gray-100 shadow-sm">
        <div class="flex-shrink-0 mr-4 mt-1">
          <div class="h-6 w-6 text-[#00c7b1]">
            ${ICONS.barChart3}
          </div>
        </div>
        <div>
          <p class="font-bold text-gray-900 text-xl leading-none mb-1">
            479%
          </p>
          <p class="font-normal text-gray-600 text-sm leading-snug">
            de retorno de inversión en 5 años
          </p>
        </div>
      </div>
    `,
  });
}

export function addContentSectionBlock(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('content-section-escala', {
    label: 'Content + Form Section',
    category: 'Content',
    content: `
      <div class="bg-gray-50 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <!-- Left Column - Content -->
            <div class="lg:col-span-7 space-y-8">
              <div>
                <p class="text-gray-600 mb-2 font-medium uppercase tracking-wide text-sm">Migración y Modernización en la nube</p>
                <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6 mt-1">
                  El paso clave hacia <br />
                  la nueva generación <br />
                  <span class="text-[#00c7b1]">de aplicaciones y datos</span>
                </h2>

                <div class="prose text-gray-600 leading-relaxed mb-6">
                  <p class="mb-4">
                    Las organizaciones que continúan operando sobre infraestructuras heredadas enfrentan una presión creciente por optimizar costos, mantener control operativo y responder a nuevas exigencias de seguridad y cumplimiento.
                  </p>
                  <ul class="list-disc pl-5 space-y-1 mb-6 text-gray-700">
                    <li>Costos operativos cada vez más altos</li>
                    <li>Entornos tecnológicos fragmentados</li>
                    <li>Mayor exposición a interrupciones o fallas</li>
                    <li>Limitaciones para innovar y escalar</li>
                  </ul>
                  <p>
                    Sin embargo, con el enfoque adecuado, las organizaciones pueden obtener resultados tangibles en plazos relativamente cortos.
                  </p>
                </div>

                <div class="space-y-4 mt-8">
                  <!-- Stat Cards -->
                  <div class="flex items-start p-5 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div class="flex-shrink-0 mr-4 mt-1">
                      <div class="h-6 w-6 text-[#00c7b1]">${ICONS.barChart3}</div>
                    </div>
                    <div>
                      <p class="font-bold text-gray-900 text-xl leading-none mb-1">479%</p>
                      <p class="font-normal text-gray-600 text-sm leading-snug">de retorno de inversión en 5 años</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start p-5 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div class="flex-shrink-0 mr-4 mt-1">
                      <div class="h-6 w-6 text-[#00c7b1]">${ICONS.calendar}</div>
                    </div>
                    <div>
                      <p class="font-bold text-gray-900 text-xl leading-none mb-1">5 a 6 meses</p>
                      <p class="font-normal text-gray-600 text-sm leading-snug">para recuperar su inversión</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start p-5 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div class="flex-shrink-0 mr-4 mt-1">
                      <div class="h-6 w-6 text-[#00c7b1]">${ICONS.piggyBank}</div>
                    </div>
                    <div>
                      <p class="font-bold text-gray-900 text-xl leading-none mb-1">76% menos</p>
                      <p class="font-normal text-gray-600 text-sm leading-snug">costos asociados a inactividad no planificada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Form -->
            <div class="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none">
              <div class="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                <div class="bg-[#0B1117] p-6 text-white text-left">
                  <h3 class="text-lg font-bold mb-3 leading-snug">Accede a nuestra guía gratuita de migración y modernización</h3>
                  <p class="text-xs text-gray-300 leading-relaxed font-light">
                    Comparte tus datos y da el primer paso para desmitificar la migración a la nube con información clara y cifras verificadas.
                  </p>
                </div>

                <div class="p-6 md:p-8">
                  <form class="space-y-4" onsubmit="handleFormSubmit(event)">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="space-y-1">
                        <label class="text-xs font-semibold text-gray-600 block">Nombre*</label>
                        <input type="text" name="firstName" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#00c7b1] focus:ring-1 focus:ring-[#00c7b1] outline-none" required />
                      </div>
                      <div class="space-y-1">
                        <label class="text-xs font-semibold text-gray-600 block">Apellidos*</label>
                        <input type="text" name="lastName" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#00c7b1] focus:ring-1 focus:ring-[#00c7b1] outline-none" required />
                      </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="space-y-1">
                        <label class="text-xs font-semibold text-gray-600 block">Email*</label>
                        <input type="email" name="email" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#00c7b1] focus:ring-1 focus:ring-[#00c7b1] outline-none" required pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" />
                      </div>
                      <div class="space-y-1">
                        <label class="text-xs font-semibold text-gray-600 block">Teléfono*</label>
                        <input type="tel" name="phone" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#00c7b1] focus:ring-1 focus:ring-[#00c7b1] outline-none" required pattern="[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}" />
                      </div>
                    </div>

                    <div class="space-y-1">
                      <label class="text-xs font-semibold text-gray-600 block">Empresa*</label>
                      <input type="text" name="company" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#00c7b1] focus:ring-1 focus:ring-[#00c7b1] outline-none" required />
                    </div>

                    <div class="space-y-1">
                      <label class="text-xs font-semibold text-gray-600 block">Sector*</label>
                      <select name="sector" class="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-[#00c7b1] focus:ring-1 focus:ring-[#00c7b1] outline-none">
                        <option value="">Seleccione...</option>
                        <option value="tech">Tecnología</option>
                        <option value="fin">Finanzas</option>
                        <option value="other">Otro</option>
                      </select>
                    </div>

                    <div class="space-y-1">
                      <label class="text-xs font-semibold text-gray-600 block">Título*</label>
                      <select name="title" class="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-[#00c7b1] focus:ring-1 focus:ring-[#00c7b1] outline-none">
                        <option value="">Seleccione...</option>
                        <option value="manager">Gerente</option>
                        <option value="c-level">Director</option>
                        <option value="other">Otro</option>
                      </select>
                    </div>

                    <button type="submit" class="w-full bg-[#00c7b1] hover:bg-[#00b09b] text-white font-bold py-3 px-4 rounded transition-colors text-sm mt-2">
                      Descarga ahora
                    </button>

                    <p class="text-xs text-gray-500 mt-4 leading-normal">
                      La nube no es solo una mejora tecnológica.<br/>
                      Es la base para operar con agilidad, resiliencia y control.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        function handleFormSubmit(event) {
          event.preventDefault();
          const formData = new FormData(event.target);
          
          const data = {
            nombre: formData.get('firstName'),
            apellidos: formData.get('lastName'),
            email: formData.get('email'),
            telefono: formData.get('phone'),
            empresa: formData.get('company'),
            sector: formData.get('sector'),
            titulo: formData.get('title')
          };
          
          // Send to Power Automate webhook
          const WEBHOOK_URL = 'https://29ebd59cc6bc46b6a6784856a9b69e.b9.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/8823290e425f4c0b870422ba78f4c3ec/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HXYG0odUZ9kC2JnoCOnUtLW5JABQgduDOdsUppDgJbM';
          
          fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then(response => {
            if (response.ok) {
              console.log('Datos enviados correctamente');
            } else {
              console.error('Error en la respuesta del servidor');
            }
          }).catch(err => console.error('Error enviando datos:', err));
          
          // Download PDF
          const link = document.createElement('a');
          link.href = 'file.pdf';
          link.setAttribute('download', 'file.pdf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          alert('Gracias por registrarte. Tu descarga comenzará en breve.');
        }
      </script>
    `,
  });
}

export function addFooterBlock(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('footer-simple', {
    label: 'Footer',
    category: 'Navigation',
    content: `
      <footer class="bg-gray-200 py-8 border-t border-gray-300">
        <div class="max-w-7xl mx-auto px-4 text-center text-xs text-gray-600">
          © Copyright 2026. Escala 24x7™ Cloud Done Right ®. All rights reserved.
        </div>
      </footer>
    `,
  });
}

/**
 * =======================
 * UPDATED BLOCKS - Existing blocks migrated to Tailwind
 * =======================
 */

export function addHeroSectionBlock(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('hero-section', {
    label: 'Hero Section (Generic)',
    category: 'Heroes',
    content: `
      <section class="min-h-[400px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-500 to-purple-700 text-white py-20 px-5">
        <h1 class="text-5xl font-bold mb-4">Welcome to Your Page</h1>
        <p class="text-xl mb-8 opacity-90">Create amazing landing pages with ease</p>
        <a href="#" class="inline-block py-4 px-12 bg-white text-purple-600 no-underline rounded-lg font-semibold hover:bg-gray-100 transition-colors">Get Started</a>
      </section>
    `,
  });
}

export function addFeatureCardBlock(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('feature-card', {
    label: 'Feature Card',
    category: 'Cards',
    content: `
      <div class="p-8 rounded-xl shadow-md text-center bg-white border border-gray-100">
        <h3 class="text-2xl mb-4 text-gray-900">Feature Title</h3>
        <p class="text-gray-600 leading-relaxed">Feature description goes here. Explain the benefits.</p>
      </div>
    `,
  });
}

export function addPricingCardBlock(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('pricing-card', {
    label: 'Pricing Card',
    category: 'Cards',
    content: `
      <div class="py-10 px-8 rounded-xl shadow-lg text-center bg-white border-2 border-gray-200">
        <h3 class="text-xl font-semibold mb-2 text-gray-900">Basic Plan</h3>
        <div class="text-5xl font-bold my-5 text-purple-600">
          $9<span class="text-base text-gray-600">/mo</span>
        </div>
        <ul class="list-none p-0 my-5 text-left space-y-2">
          <li class="py-2 text-gray-600">✓ Feature 1</li>
          <li class="py-2 text-gray-600">✓ Feature 2</li>
          <li class="py-2 text-gray-600">✓ Feature 3</li>
        </ul>
        <a href="#" class="block py-3 bg-purple-600 text-white no-underline rounded-md font-semibold mt-5 hover:bg-purple-700 transition-colors">Choose Plan</a>
      </div>
    `,
  });
}

/**
 * =======================
 * FORM FIELD BLOCKS
 * =======================
 */

export function addFormFieldBlocks(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('form-input', {
    label: 'Text Input',
    category: 'Forms',
    content: `
      <div class="space-y-1">
        <label class="text-xs font-semibold text-gray-600 block">Label*</label>
        <input type="text" name="field" class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#00c7b1] focus:ring-1 focus:ring-[#00c7b1] outline-none" required />
      </div>
    `,
  });
  
  bm.add('form-select', {
    label: 'Select Dropdown',
    category: 'Forms',
    content: `
      <div class="space-y-1">
        <label class="text-xs font-semibold text-gray-600 block">Label*</label>
        <select name="field" class="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:border-[#00c7b1] focus:ring-1 focus:ring-[#00c7b1] outline-none">
          <option value="">Select...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>
    `,
  });
  
  bm.add('form-button', {
    label: 'Submit Button',
    category: 'Forms',
    content: `
      <button type="submit" class="w-full bg-[#00c7b1] hover:bg-[#00b09b] text-white font-bold py-3 px-4 rounded transition-colors text-sm">
        Submit
      </button>
    `,
  });
}

/**
 * =======================
 * LAYOUT BLOCKS
 * =======================
 */

export function addLayoutBlocks(editor: Editor) {
  const bm = editor.BlockManager;
  
  // Container - Centered content with max-width
  bm.add('container', {
    label: 'Container',
    category: 'Layout',
    content: `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-gray-500 text-center py-8">Drop content here</p>
      </div>
    `,
  });

  // Section - Full width section with padding
  bm.add('section', {
    label: 'Section',
    category: 'Layout',
    content: `
      <section class="py-16 px-4">
        <div class="max-w-7xl mx-auto">
          <p class="text-gray-500 text-center">Section content</p>
        </div>
      </section>
    `,
  });

  // 2 Columns - Equal (50/50)
  bm.add('columns-2-equal', {
    label: '2 Columns (50/50)',
    category: 'Layout',
    content: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Column 1</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Column 2</p>
        </div>
      </div>
    `,
  });

  // 2 Columns - Asymmetric (66/33)
  bm.add('columns-2-asymmetric-left', {
    label: '2 Columns (66/33)',
    category: 'Layout',
    content: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Wide Column (66%)</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Narrow Column (33%)</p>
        </div>
      </div>
    `,
  });

  // 2 Columns - Asymmetric (33/66)
  bm.add('columns-2-asymmetric-right', {
    label: '2 Columns (33/66)',
    category: 'Layout',
    content: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Narrow Column (33%)</p>
        </div>
        <div class="md:col-span-2 p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Wide Column (66%)</p>
        </div>
      </div>
    `,
  });

  // 3 Columns - Equal (33/33/33)
  bm.add('columns-3-equal', {
    label: '3 Columns',
    category: 'Layout',
    content: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Column 1</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Column 2</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Column 3</p>
        </div>
      </div>
    `,
  });

  // 4 Columns - Equal (25/25/25/25)
  bm.add('columns-4-equal', {
    label: '4 Columns',
    category: 'Layout',
    content: `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Column 1</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Column 2</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Column 3</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Column 4</p>
        </div>
      </div>
    `,
  });

  // Grid 2x2
  bm.add('grid-2x2', {
    label: 'Grid 2x2',
    category: 'Layout',
    content: `
      <div class="grid grid-cols-2 gap-6">
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Cell 1</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Cell 2</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Cell 3</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Cell 4</p>
        </div>
      </div>
    `,
  });

  // Flex Row with space between
  bm.add('flex-row-space-between', {
    label: 'Flex Row (Space Between)',
    category: 'Layout',
    content: `
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="p-4 border border-dashed border-gray-300 rounded flex-1 w-full">
          <p class="text-gray-500 text-center">Left</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded flex-1 w-full">
          <p class="text-gray-500 text-center">Right</p>
        </div>
      </div>
    `,
  });

  // Flex Row centered
  bm.add('flex-row-center', {
    label: 'Flex Row (Centered)',
    category: 'Layout',
    content: `
      <div class="flex flex-col md:flex-row justify-center items-center gap-6">
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Item 1</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Item 2</p>
        </div>
        <div class="p-4 border border-dashed border-gray-300 rounded">
          <p class="text-gray-500 text-center">Item 3</p>
        </div>
      </div>
    `,
  });
}

/**
 * =======================
 * REGISTER ALL BLOCKS
 * =======================
 */

export function registerAllBlocks(editor: Editor) {
  // Layout blocks
  addLayoutBlocks(editor);
  
  // New Escala 24x7 blocks
  addNavbarBlock(editor);
  addHeroEscalaBlock(editor);
  addStatCardBlock(editor);
  addContentSectionBlock(editor);
  addFooterBlock(editor);
  
  // Updated existing blocks with Tailwind
  addHeroSectionBlock(editor);
  addFeatureCardBlock(editor);
  addPricingCardBlock(editor);
  
  // Form field blocks
  addFormFieldBlocks(editor);
}
