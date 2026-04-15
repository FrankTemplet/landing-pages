import type { Editor } from 'grapesjs';

/**
 * SVG Icons for blocks
 */
const BLOCK_ICONS = {
  // Layout icons
  container: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`,
  columns2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/></svg>`,
  columns3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="3" width="5" height="18" rx="1"/><rect x="9.5" y="3" width="5" height="18" rx="1"/><rect x="17" y="3" width="5" height="18" rx="1"/></svg>`,
  grid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  
  // Component icons
  navbar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="4" rx="1"/></svg>`,
  hero: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 10h18M10 10v11"/></svg>`,
  card: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="5" y="4" width="14" height="16" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/></svg>`,
  button: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="9" width="12" height="6" rx="3"/></svg>`,
  text: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7h16M10 7v10M14 7v10M8 17h8"/></svg>`,
  image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`,
  video: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="4" width="20" height="16" rx="2"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
  form: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 10h8M8 14h5"/></svg>`,
  testimonial: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 9H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6m10-9h-6a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6"/></svg>`,
  stats: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3"/></svg>`,
  cta: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="m8 12 2 2 4-4"/></svg>`,
  faq: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"/></svg>`,
  footer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="16" width="18" height="4" rx="1"/></svg>`,
};

/**
 * ===================
 * LAYOUT BLOCKS
 * ===================
 */

export function addLayoutBlocks(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('container', {
    label: 'Container',
    category: 'Layout',
    media: BLOCK_ICONS.container,
    content: `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p class="text-gray-400 text-center">Container content</p>
      </div>
    `,
  });

  bm.add('section', {
    label: 'Section',
    category: 'Layout',
    media: BLOCK_ICONS.container,
    content: `
      <section class="py-16 px-4">
        <div class="max-w-7xl mx-auto">
          <p class="text-gray-400 text-center">Section content</p>
        </div>
      </section>
    `,
  });

  bm.add('columns-2-equal', {
    label: '2 Columns (50/50)',
    category: 'Layout',
    media: BLOCK_ICONS.columns2,
    content: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Column 1</p>
        </div>
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Column 2</p>
        </div>
      </div>
    `,
  });

  bm.add('columns-2-asymmetric-left', {
    label: '2 Columns (66/33)',
    category: 'Layout',
    media: BLOCK_ICONS.columns2,
    content: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2 p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Wide Column (66%)</p>
        </div>
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Narrow (33%)</p>
        </div>
      </div>
    `,
  });

  bm.add('columns-2-asymmetric-right', {
    label: '2 Columns (33/66)',
    category: 'Layout',
    media: BLOCK_ICONS.columns2,
    content: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Narrow (33%)</p>
        </div>
        <div class="md:col-span-2 p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Wide Column (66%)</p>
        </div>
      </div>
    `,
  });

  bm.add('columns-3-equal', {
    label: '3 Columns',
    category: 'Layout',
    media: BLOCK_ICONS.columns3,
    content: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Column 1</p>
        </div>
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Column 2</p>
        </div>
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Column 3</p>
        </div>
      </div>
    `,
  });

  bm.add('columns-4-equal', {
    label: '4 Columns',
    category: 'Layout',
    media: BLOCK_ICONS.grid,
    content: `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Column 1</p>
        </div>
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Column 2</p>
        </div>
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Column 3</p>
        </div>
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Column 4</p>
        </div>
      </div>
    `,
  });

  bm.add('grid-2x2', {
    label: 'Grid 2x2',
    category: 'Layout',
    media: BLOCK_ICONS.grid,
    content: `
      <div class="grid grid-cols-2 gap-6">
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Cell 1</p>
        </div>
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Cell 2</p>
        </div>
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Cell 3</p>
        </div>
        <div class="p-6 bg-gray-50 rounded">
          <p class="text-gray-600">Cell 4</p>
        </div>
      </div>
    `,
  });
}

/**
 * ===================
 * NAVIGATION BLOCKS
 * ===================
 */

export function addNavigationBlocks(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('navbar-simple', {
    label: 'Navbar',
    category: 'Navigation',
    media: BLOCK_ICONS.navbar,
    content: `
      <nav class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex-shrink-0 font-bold text-xl">
              Logo
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="#" class="text-gray-700 hover:text-gray-900">Home</a>
              <a href="#" class="text-gray-700 hover:text-gray-900">About</a>
              <a href="#" class="text-gray-700 hover:text-gray-900">Services</a>
              <a href="#" class="text-gray-700 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </nav>
    `,
  });

  bm.add('footer-simple', {
    label: 'Footer',
    category: 'Navigation',
    media: BLOCK_ICONS.footer,
    content: `
      <footer class="bg-gray-100 border-t border-gray-200 py-8">
        <div class="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          © 2026 Company Name. All rights reserved.
        </div>
      </footer>
    `,
  });

  bm.add('footer-detailed', {
    label: 'Footer Detailed',
    category: 'Navigation',
    media: BLOCK_ICONS.footer,
    content: `
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 class="font-bold text-lg mb-4">Company</h3>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white">About Us</a></li>
                <li><a href="#" class="hover:text-white">Careers</a></li>
                <li><a href="#" class="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-lg mb-4">Product</h3>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white">Features</a></li>
                <li><a href="#" class="hover:text-white">Pricing</a></li>
                <li><a href="#" class="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-lg mb-4">Resources</h3>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white">Documentation</a></li>
                <li><a href="#" class="hover:text-white">Help Center</a></li>
                <li><a href="#" class="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 class="font-bold text-lg mb-4">Legal</h3>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white">Privacy</a></li>
                <li><a href="#" class="hover:text-white">Terms</a></li>
                <li><a href="#" class="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © 2026 Company Name. All rights reserved.
          </div>
        </div>
      </footer>
    `,
  });
}

/**
 * ===================
 * HERO BLOCKS
 * ===================
 */

export function addHeroBlocks(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('hero-centered', {
    label: 'Hero Centered',
    category: 'Heroes',
    media: BLOCK_ICONS.hero,
    content: `
      <section class="min-h-[500px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-500 to-purple-600 text-white py-20 px-5">
        <h1 class="text-5xl font-bold mb-4">Welcome to Your Site</h1>
        <p class="text-xl mb-8 opacity-90 max-w-2xl">Create amazing experiences with our platform</p>
        <a href="#" class="inline-block py-3 px-8 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
          Get Started
        </a>
      </section>
    `,
  });

  bm.add('hero-with-image', {
    label: 'Hero with Image',
    category: 'Heroes',
    media: BLOCK_ICONS.hero,
    content: `
      <section class="bg-gray-50 py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Build Something Amazing
              </h1>
              <p class="text-xl text-gray-600 mb-8">
                The ultimate platform for creating stunning websites without code
              </p>
              <div class="flex gap-4">
                <a href="#" class="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Start Free Trial
                </a>
                <a href="#" class="py-3 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors">
                  Learn More
                </a>
              </div>
            </div>
            <div class="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <span class="text-gray-400">Hero Image</span>
            </div>
          </div>
        </div>
      </section>
    `,
  });

  bm.add('hero-background-image', {
    label: 'Hero with Background',
    category: 'Heroes',
    media: BLOCK_ICONS.hero,
    content: {
      type: 'default',
      tagName: 'div',
      classes: ['relative', 'overflow-hidden', 'min-h-[600px]'],
      style: {
        'background-image': 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop")',
        'background-size': 'cover',
        'background-position': 'center',
      },
      components: [
        {
          type: 'default',
          tagName: 'div',
          classes: ['absolute', 'inset-0', 'bg-black/50', 'pointer-events-none'],
        },
        {
          type: 'default',
          tagName: 'div',
          classes: ['relative', 'z-10', 'max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-32', 'text-center'],
          components: [
            {
              type: 'text',
              tagName: 'h1',
              classes: ['text-4xl', 'md:text-6xl', 'font-bold', 'text-white', 'mb-6'],
              components: 'Your Headline Here',
            },
            {
              type: 'text',
              tagName: 'p',
              classes: ['text-xl', 'md:text-2xl', 'text-white/90', 'mb-8', 'max-w-3xl', 'mx-auto'],
              components: 'Compelling subheadline that explains your value proposition',
            },
            {
              type: 'link',
              tagName: 'a',
              classes: ['inline-block', 'py-4', 'px-8', 'bg-white', 'text-gray-900', 'font-bold', 'rounded-lg', 'hover:bg-gray-100', 'transition-colors'],
              attributes: { href: '#' },
              components: 'Call to Action',
            },
          ],
        },
      ],
    },
  });
}

/**
 * ===================
 * CONTENT BLOCKS
 * ===================
 */

export function addContentBlocks(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('feature-grid', {
    label: 'Features Grid',
    category: 'Content',
    media: BLOCK_ICONS.grid,
    content: `
      <section class="py-16 px-4">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Fast</h3>
              <p class="text-gray-600">Lightning-fast performance for the best user experience</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Reliable</h3>
              <p class="text-gray-600">Built for stability and consistent performance</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold mb-2">Secure</h3>
              <p class="text-gray-600">Enterprise-grade security to protect your data</p>
            </div>
          </div>
        </div>
      </section>
    `,
  });

  bm.add('cta-section', {
    label: 'CTA Section',
    category: 'Content',
    media: BLOCK_ICONS.cta,
    content: `
      <section class="bg-blue-600 py-16 px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p class="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers today
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" class="py-3 px-8 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Start Free Trial
            </a>
            <a href="#" class="py-3 px-8 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    `,
  });

  bm.add('testimonial-card', {
    label: 'Testimonial',
    category: 'Content',
    media: BLOCK_ICONS.testimonial,
    content: `
      <div class="bg-white p-8 rounded-lg shadow-md">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <p class="font-semibold">John Doe</p>
            <p class="text-sm text-gray-600">CEO, Company</p>
          </div>
        </div>
        <p class="text-gray-700 italic">
          "This product has transformed the way we work. Highly recommended for anyone looking to improve their workflow."
        </p>
        <div class="flex mt-4 text-yellow-400">
          <span>★★★★★</span>
        </div>
      </div>
    `,
  });

  bm.add('stats-section', {
    label: 'Stats Section',
    category: 'Content',
    media: BLOCK_ICONS.stats,
    content: `
      <section class="bg-gray-900 text-white py-16 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p class="text-4xl font-bold mb-2">10K+</p>
              <p class="text-gray-400">Active Users</p>
            </div>
            <div>
              <p class="text-4xl font-bold mb-2">50+</p>
              <p class="text-gray-400">Countries</p>
            </div>
            <div>
              <p class="text-4xl font-bold mb-2">99.9%</p>
              <p class="text-gray-400">Uptime</p>
            </div>
            <div>
              <p class="text-4xl font-bold mb-2">24/7</p>
              <p class="text-gray-400">Support</p>
            </div>
          </div>
        </div>
      </section>
    `,
  });

  bm.add('faq-section', {
    label: 'FAQ Section',
    category: 'Content',
    media: BLOCK_ICONS.faq,
    content: `
      <section class="py-16 px-4">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div class="space-y-4">
            <details class="bg-white p-6 rounded-lg shadow-sm">
              <summary class="font-semibold cursor-pointer">What is your refund policy?</summary>
              <p class="mt-4 text-gray-600">We offer a 30-day money-back guarantee for all our products.</p>
            </details>
            <details class="bg-white p-6 rounded-lg shadow-sm">
              <summary class="font-semibold cursor-pointer">How do I get started?</summary>
              <p class="mt-4 text-gray-600">Simply sign up for an account and follow our getting started guide.</p>
            </details>
            <details class="bg-white p-6 rounded-lg shadow-sm">
              <summary class="font-semibold cursor-pointer">Do you offer customer support?</summary>
              <p class="mt-4 text-gray-600">Yes, we provide 24/7 customer support via email and chat.</p>
            </details>
          </div>
        </div>
      </section>
    `,
  });
}

/**
 * ===================
 * CARD BLOCKS
 * ===================
 */

export function addCardBlocks(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('feature-card', {
    label: 'Feature Card',
    category: 'Cards',
    media: BLOCK_ICONS.card,
    content: `
      <div class="p-8 rounded-xl shadow-md text-center bg-white border border-gray-100">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2 text-gray-900">Feature Title</h3>
        <p class="text-gray-600 leading-relaxed">Feature description goes here. Explain the benefits.</p>
      </div>
    `,
  });

  bm.add('pricing-card', {
    label: 'Pricing Card',
    category: 'Cards',
    media: BLOCK_ICONS.card,
    content: `
      <div class="py-10 px-8 rounded-xl shadow-lg text-center bg-white border-2 border-gray-200 hover:border-blue-500 transition-colors">
        <h3 class="text-xl font-semibold mb-2 text-gray-900">Basic Plan</h3>
        <div class="text-5xl font-bold my-5 text-blue-600">
          $9<span class="text-base text-gray-600">/mo</span>
        </div>
        <ul class="list-none p-0 my-5 text-left space-y-2">
          <li class="text-gray-600">✓ Feature 1</li>
          <li class="text-gray-600">✓ Feature 2</li>
          <li class="text-gray-600">✓ Feature 3</li>
        </ul>
        <a href="#" class="block py-3 bg-blue-600 text-white font-semibold rounded-md mt-5 hover:bg-blue-700 transition-colors">
          Choose Plan
        </a>
      </div>
    `,
  });

  bm.add('team-card', {
    label: 'Team Member Card',
    category: 'Cards',
    media: BLOCK_ICONS.card,
    content: `
      <div class="bg-white rounded-lg shadow-md overflow-hidden text-center">
        <div class="h-48 bg-gray-300"></div>
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-1">John Doe</h3>
          <p class="text-gray-600 text-sm mb-4">CEO & Founder</p>
          <div class="flex justify-center space-x-4">
            <a href="#" class="text-blue-600 hover:text-blue-700">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="text-blue-600 hover:text-blue-700">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </div>
    `,
  });
}

/**
 * ===================
 * MEDIA BLOCKS
 * ===================
 */

export function addMediaBlocks(editor: Editor) {
  const bm = editor.BlockManager;
  
  bm.add('image-simple', {
    label: 'Image',
    category: 'Media',
    media: BLOCK_ICONS.image,
    content: `
      <div class="w-full">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop" alt="Image" class="w-full h-auto rounded-lg" />
      </div>
    `,
  });

  bm.add('image-with-caption', {
    label: 'Image with Caption',
    category: 'Media',
    media: BLOCK_ICONS.image,
    content: `
      <figure class="text-center">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop" alt="Image" class="w-full h-auto rounded-lg mb-3" />
        <figcaption class="text-sm text-gray-600 italic">Image caption goes here</figcaption>
      </figure>
    `,
  });

  bm.add('image-split-content', {
    label: 'Image + Text Split',
    category: 'Media',
    media: BLOCK_ICONS.image,
    content: `
      <section class="py-16 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop" alt="Feature" class="w-full h-auto rounded-lg shadow-lg" />
            </div>
            <div>
              <h2 class="text-3xl font-bold mb-4 text-gray-900">Your Heading Here</h2>
              <p class="text-gray-600 text-lg mb-6">
                Write your compelling content here. Explain the benefits and features of your product or service.
              </p>
              <a href="#" class="inline-block py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    `,
  });

  bm.add('image-gallery', {
    label: 'Image Gallery',
    category: 'Media',
    media: BLOCK_ICONS.grid,
    content: `
      <section class="py-16 px-4">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-12">Gallery</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop" alt="Gallery 1" class="w-full h-64 object-cover hover:scale-110 transition-transform duration-300" />
            </div>
            <div class="overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=300&fit=crop" alt="Gallery 2" class="w-full h-64 object-cover hover:scale-110 transition-transform duration-300" />
            </div>
            <div class="overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400&h=300&fit=crop" alt="Gallery 3" class="w-full h-64 object-cover hover:scale-110 transition-transform duration-300" />
            </div>
            <div class="overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=300&fit=crop" alt="Gallery 4" class="w-full h-64 object-cover hover:scale-110 transition-transform duration-300" />
            </div>
            <div class="overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop" alt="Gallery 5" class="w-full h-64 object-cover hover:scale-110 transition-transform duration-300" />
            </div>
            <div class="overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=400&h=300&fit=crop" alt="Gallery 6" class="w-full h-64 object-cover hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>
    `,
  });

  bm.add('logo-grid', {
    label: 'Logo Grid',
    category: 'Media',
    media: BLOCK_ICONS.grid,
    content: `
      <section class="py-16 px-4 bg-gray-50">
        <div class="max-w-7xl mx-auto">
          <h3 class="text-center text-sm font-semibold text-gray-600 uppercase tracking-wide mb-8">
            Trusted by leading companies
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            <div class="flex items-center justify-center">
              <img src="https://via.placeholder.com/150x50/e5e7eb/6b7280?text=Logo+1" alt="Logo 1" class="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
            </div>
            <div class="flex items-center justify-center">
              <img src="https://via.placeholder.com/150x50/e5e7eb/6b7280?text=Logo+2" alt="Logo 2" class="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
            </div>
            <div class="flex items-center justify-center">
              <img src="https://via.placeholder.com/150x50/e5e7eb/6b7280?text=Logo+3" alt="Logo 3" class="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
            </div>
            <div class="flex items-center justify-center">
              <img src="https://via.placeholder.com/150x50/e5e7eb/6b7280?text=Logo+4" alt="Logo 4" class="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
            </div>
            <div class="flex items-center justify-center">
              <img src="https://via.placeholder.com/150x50/e5e7eb/6b7280?text=Logo+5" alt="Logo 5" class="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
            </div>
            <div class="flex items-center justify-center">
              <img src="https://via.placeholder.com/150x50/e5e7eb/6b7280?text=Logo+6" alt="Logo 6" class="h-12 w-auto grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </section>
    `,
  });

  bm.add('video-embed', {
    label: 'Video Embed',
    category: 'Media',
    media: BLOCK_ICONS.video,
    content: `
      <div class="max-w-4xl mx-auto px-4">
        <div class="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
          <iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    `,
  });
}

/**
 * ===================
 * FORM BLOCKS
 * ===================
 */

export function addFormBlocks(editor: Editor) {
  const bm = editor.BlockManager;
  
  // Definir tipo de componente personalizado para botones de formulario
  editor.DomComponents.addType('form-button-safe', {
    isComponent: (el) => el?.tagName === 'BUTTON' && el?.classList?.contains('gjs-form-button'),
    model: {
      defaults: {
        tagName: 'button',
        attributes: { type: 'button' }, // Importante: type="button" en lugar de "submit"
        draggable: true,
        droppable: false,
        stylable: true,
      },
    },
  });
  
  bm.add('form-input', {
    label: 'Text Input',
    category: 'Forms',
    media: BLOCK_ICONS.form,
    content: `
      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700">Label</label>
        <input type="text" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Enter text" />
      </div>
    `,
  });
  
  bm.add('form-textarea', {
    label: 'Textarea',
    category: 'Forms',
    media: BLOCK_ICONS.form,
    content: `
      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700">Message</label>
        <textarea class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" rows="4" placeholder="Enter message"></textarea>
      </div>
    `,
  });
  
  bm.add('form-select', {
    label: 'Select Dropdown',
    category: 'Forms',
    media: BLOCK_ICONS.form,
    content: `
      <div class="space-y-1">
        <label class="block text-sm font-medium text-gray-700">Select Option</label>
        <select class="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
          <option value="">Select...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
    `,
  });
  
  bm.add('form-button', {
    label: 'Button',
    category: 'Forms',
    media: BLOCK_ICONS.button,
    content: {
      type: 'form-button-safe',
      classes: ['gjs-form-button', 'w-full', 'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'font-semibold', 'py-3', 'px-6', 'rounded-md', 'transition-colors'],
      attributes: { type: 'button' },
      components: 'Submit',
    },
  });

  bm.add('form-contact', {
    label: 'Contact Form',
    category: 'Forms',
    media: BLOCK_ICONS.form,
    content: `
      <div class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6">Contact Us</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea class="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" rows="4"></textarea>
          </div>
          <button type="button" class="gjs-form-button w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors">
            Send Message
          </button>
        </div>
      </div>
    `,
  });
}

/**
 * ===================
 * REGISTER ALL BLOCKS
 * ===================
 */

export function registerAllBlocks(editor: Editor) {
  addLayoutBlocks(editor);
  addNavigationBlocks(editor);
  addHeroBlocks(editor);
  addContentBlocks(editor);
  addCardBlocks(editor);
  addMediaBlocks(editor);
  addFormBlocks(editor);
}
