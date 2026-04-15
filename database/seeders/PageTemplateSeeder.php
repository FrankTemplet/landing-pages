<?php

namespace Database\Seeders;

use App\Models\PageTemplate;
use Illuminate\Database\Seeder;

class PageTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $templates = [
            [
                'name' => 'Blank Page',
                'slug' => 'blank',
                'description' => 'Start from scratch with a completely blank canvas.',
                'is_system' => true,
                'content_json' => [
                    'gjs-assets' => [],
                    'gjs-css' => 'body { margin: 0; padding: 0; font-family: sans-serif; }',
                    'gjs-html' => '',
                    'gjs-components' => [],
                    'gjs-styles' => [],
                ],
            ],
            [
                'name' => 'Hero + CTA',
                'slug' => 'hero-cta',
                'description' => 'A simple hero section with a call-to-action button.',
                'is_system' => true,
                'content_json' => [
                    'gjs-assets' => [],
                    'gjs-css' => 'body { margin: 0; padding: 0; font-family: sans-serif; } .hero { min-height: 600px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; } .hero h1 { font-size: 3rem; margin-bottom: 1rem; font-weight: bold; } .hero p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; } .cta-button { display: inline-block; padding: 16px 48px; background: white; color: #667eea; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 1.1rem; transition: transform 0.2s; } .cta-button:hover { transform: translateY(-2px); }',
                    'gjs-html' => '<div class="hero"><h1>Welcome to Your Landing Page</h1><p>Build beautiful pages with our drag-and-drop editor</p><a href="#" class="cta-button">Get Started</a></div>',
                    'gjs-components' => [],
                    'gjs-styles' => [],
                ],
            ],
            [
                'name' => 'Features Section',
                'slug' => 'features',
                'description' => 'Showcase your product features in a grid layout.',
                'is_system' => true,
                'content_json' => [
                    'gjs-assets' => [],
                    'gjs-css' => 'body { margin: 0; padding: 0; font-family: sans-serif; } .features { padding: 80px 20px; max-width: 1200px; margin: 0 auto; } .features h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; } .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; } .feature-card { text-align: center; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s; } .feature-card:hover { transform: translateY(-8px); } .feature-card h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #333; } .feature-card p { color: #666; line-height: 1.6; }',
                    'gjs-html' => '<div class="features"><h2>Amazing Features</h2><div class="feature-grid"><div class="feature-card"><h3>Fast Performance</h3><p>Lightning-fast load times for the best user experience.</p></div><div class="feature-card"><h3>Easy to Use</h3><p>Intuitive interface that anyone can master quickly.</p></div><div class="feature-card"><h3>Fully Responsive</h3><p>Looks perfect on any device, from mobile to desktop.</p></div></div></div>',
                    'gjs-components' => [],
                    'gjs-styles' => [],
                ],
            ],
            [
                'name' => 'Contact Form',
                'slug' => 'contact',
                'description' => 'A simple contact page with a form.',
                'is_system' => true,
                'content_json' => [
                    'gjs-assets' => [],
                    'gjs-css' => 'body { margin: 0; padding: 0; font-family: sans-serif; background: #f5f5f5; } .contact { max-width: 600px; margin: 80px auto; padding: 40px; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); } .contact h1 { font-size: 2rem; margin-bottom: 1rem; text-align: center; } .contact p { text-align: center; color: #666; margin-bottom: 2rem; } .form-group { margin-bottom: 1.5rem; } .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333; } .form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; } .form-group textarea { resize: vertical; min-height: 120px; } .submit-btn { width: 100%; padding: 14px; background: #667eea; color: white; border: none; border-radius: 6px; font-size: 1.1rem; font-weight: 600; cursor: pointer; } .submit-btn:hover { background: #5568d3; }',
                    'gjs-html' => '<div class="contact"><h1>Get in Touch</h1><p>We\'d love to hear from you</p><form><div class="form-group"><label>Name</label><input type="text" placeholder="Your name" /></div><div class="form-group"><label>Email</label><input type="email" placeholder="your@email.com" /></div><div class="form-group"><label>Message</label><textarea placeholder="Your message..."></textarea></div><button type="submit" class="submit-btn">Send Message</button></form></div>',
                    'gjs-components' => [],
                    'gjs-styles' => [],
                ],
            ],
            [
                'name' => 'Pricing Table',
                'slug' => 'pricing',
                'description' => 'Display your pricing plans in a clean layout. Clean and modern pricing table template with three plans: Starter, Professional, and Enterprise. Each plan highlights its features and pricing, with the Professional plan emphasized as the most popular choice.',
                'is_system' => true,
                'content_json' => [
                    'gjs-assets' => [],
                    'gjs-css' => 'body { margin: 0; padding: 0; font-family: sans-serif; background: #f8f9fa; } .pricing { padding: 80px 20px; max-width: 1200px; margin: 0 auto; } .pricing h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; } .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; } .pricing-card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; } .pricing-card.featured { border: 2px solid #667eea; transform: scale(1.05); } .plan-name { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; } .plan-price { font-size: 3rem; font-weight: bold; color: #667eea; margin-bottom: 0.5rem; } .plan-period { color: #666; margin-bottom: 2rem; } .plan-features { list-style: none; padding: 0; margin-bottom: 2rem; } .plan-features li { padding: 0.75rem 0; border-bottom: 1px solid #eee; } .plan-button { display: block; width: 100%; padding: 14px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; } .plan-button:hover { background: #5568d3; }',
                    'gjs-html' => '<div class="pricing"><h2>Choose Your Plan</h2><div class="pricing-grid"><div class="pricing-card"><div class="plan-name">Starter</div><div class="plan-price">$9</div><div class="plan-period">per month</div><ul class="plan-features"><li>5 Pages</li><li>Basic Support</li><li>1GB Storage</li></ul><a href="#" class="plan-button">Get Started</a></div><div class="pricing-card featured"><div class="plan-name">Professional</div><div class="plan-price">$29</div><div class="plan-period">per month</div><ul class="plan-features"><li>Unlimited Pages</li><li>Priority Support</li><li>10GB Storage</li><li>Custom Domain</li></ul><a href="#" class="plan-button">Get Started</a></div><div class="pricing-card"><div class="plan-name">Enterprise</div><div class="plan-price">$99</div><div class="plan-period">per month</div><ul class="plan-features"><li>Everything in Pro</li><li>24/7 Support</li><li>Unlimited Storage</li><li>White Label</li></ul><a href="#" class="plan-button">Contact Us</a></div></div></div>',
                    'gjs-components' => [],
                    'gjs-styles' => [],
                ],
            ],
        ];

        foreach ($templates as $template) {
            PageTemplate::updateOrCreate(
                ['slug' => $template['slug']],
                $template
            );
        }
    }
}
