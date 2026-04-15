<?php

namespace Database\Seeders;

use App\Models\PageTemplate;
use Illuminate\Database\Seeder;

class FormImageTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $html = $this->getTemplateHtml();
        $css = $this->getTemplateCss();

        PageTemplate::updateOrCreate(
            ['slug' => 'form-image'],
            [
                'name' => 'Form / Image',
                'slug' => 'form-image',
                'description' => 'Two-column landing page with a lead capture form on the left and a full-height hero image on the right. Includes floating labels, social links, and a responsive layout.',
                'is_system' => true,
                'thumbnail_url' => null,
                'content_json' => [
                    'html' => $html,
                    'css' => $css,
                    'components' => [],
                    'styles' => [],
                ],
            ]
        );
    }

    private function getTemplateHtml(): string
    {
        return <<<'HTML'
<div class="fi-page">
  <main class="fi-main">
    <div class="fi-container">
      <div class="fi-row">

        <!-- Left Column: Form & Content -->
        <div class="fi-col-left">
          <div class="fi-wrapper">

            <header class="fi-header">
              <div class="fi-logo">
                <img src="https://media.templet.io/ib/GFV7ZFJnni.png" alt="logo" class="fi-logo-img">
              </div>
              <h1 class="fi-title">
                Déjenos sus datos y nos pondremos en contacto con usted
              </h1>
              <div class="fi-subtitle">
                Descubre cómo SASE está revolucionando la seguridad empresarial y la conectividad en la era del trabajo híbrido.
              </div>
            </header>

            <!-- Form -->
            <div class="fi-form-wrapper">
              <form id="webinarForm" class="fi-form">
                <!-- First Name -->
                <div class="fi-field">
                  <div class="fi-floating">
                    <input type="text" id="first_name" name="first_name" placeholder=" " required class="fi-input" />
                    <label for="first_name" class="fi-label">Nombre</label>
                  </div>
                </div>

                <!-- Last Name -->
                <div class="fi-field">
                  <div class="fi-floating">
                    <input type="text" id="last_name" name="last_name" placeholder=" " required class="fi-input" />
                    <label for="last_name" class="fi-label">Apellido</label>
                  </div>
                </div>

                <!-- Corporate Email -->
                <div class="fi-field">
                  <div class="fi-floating">
                    <input type="email" id="corporate_email" name="corporate_email" placeholder=" " required class="fi-input" />
                    <label for="corporate_email" class="fi-label">Email Corporativo</label>
                  </div>
                </div>

                <!-- Mobile Phone -->
                <div class="fi-field">
                  <div class="fi-floating">
                    <input type="tel" id="mobile_phone" name="mobile_phone" placeholder=" " required maxlength="14" class="fi-input" />
                    <label for="mobile_phone" class="fi-label">Celular</label>
                  </div>
                </div>

                <!-- Company -->
                <div class="fi-field">
                  <div class="fi-floating">
                    <input type="text" id="company" name="company" placeholder=" " required class="fi-input" />
                    <label for="company" class="fi-label">Empresa</label>
                  </div>
                </div>

                <!-- Country -->
                <div class="fi-field">
                  <div class="fi-floating">
                    <select id="country" name="country" required class="fi-select">
                      <option value="" disabled selected></option>
                      <option value="Argentina">Argentina</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Brasil">Brasil</option>
                      <option value="Chile">Chile</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Honduras">Honduras</option>
                      <option value="México">México</option>
                      <option value="Nicaragua">Nicaragua</option>
                      <option value="Panamá">Panamá</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Perú">Perú</option>
                      <option value="República Dominicana">República Dominicana</option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="España">España</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="Otro">Otro</option>
                    </select>
                    <label for="country" class="fi-label">País</label>
                  </div>
                </div>

                <!-- Job Title -->
                <div class="fi-field">
                  <div class="fi-floating">
                    <input type="text" id="job_title" name="job_title" placeholder=" " required class="fi-input" />
                    <label for="job_title" class="fi-label">Puesto de Trabajo</label>
                  </div>
                </div>

                <div class="fi-submit-wrapper">
                  <button type="submit" id="submitButton" class="fi-submit-btn">
                    Registrarme
                  </button>
                </div>
              </form>

              <!-- Success Message -->
              <div id="successMessage" class="fi-success fi-hidden">
                <h2 class="fi-success-title">Gracias</h2>
                <p class="fi-success-text">Sus datos han sido ingresados con exito.</p>
              </div>
            </div>

            <footer class="fi-footer">
              <p class="fi-follow-text">Siguenos:</p>
              <div class="fi-social">
                <a href="https://www.facebook.com/" target="_blank" class="fi-social-link" title="Facebook">
                  <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://www.linkedin.com/" target="_blank" class="fi-social-link" title="LinkedIn">
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://www.instagram.com/" target="_blank" class="fi-social-link" title="Instagram">
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </div>
              <p class="fi-copyright">
                Copyright &copy; 2025 Empresa | All rights reserved.
              </p>
            </footer>

          </div>
        </div>

        <!-- Right Column: Hero Image -->
        <div class="fi-col-right">
          <div class="fi-hero-image" style="background-image: url('https://media.templet.io/ib/6KVKA5xdDK.png?v=3');"></div>
        </div>

      </div>
    </div>
  </main>
</div>
HTML;
    }

    private function getTemplateCss(): string
    {
        return <<<'CSS'
/* ========================================
   Form / Image Template
   ======================================== */

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  color: #656668;
  line-height: 1.5;
}

.fi-page {
  font-family: 'Roboto', sans-serif;
  color: #656668;
}

.fi-main {
  min-height: 100vh;
}

.fi-container {
  margin: 0 auto;
  padding: 0;
}

.fi-row {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
}

/* Left Column */
.fi-col-left {
  width: 41.666%;
  padding: 0 3rem;
  background: #fff;
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
}

.fi-wrapper {
  padding: 0 2rem;
  max-width: 36rem;
  margin: 0 auto 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}

/* Header */
.fi-header {
  margin-bottom: 1rem;
  margin-top: 0.75rem;
}

.fi-logo {
  padding-bottom: 1rem;
  margin-bottom: 0.75rem;
}

.fi-logo-img {
  height: 2.5rem;
}

.fi-title {
  color: #041B36;
  font-weight: 700;
  font-size: 2.125rem;
  line-height: 1.1;
  margin-bottom: 0.75rem;
  font-family: 'Roboto', sans-serif;
}

.fi-subtitle {
  color: #656668;
  font-size: 1rem;
  margin-bottom: 1rem;
  font-family: 'Roboto', sans-serif;
}

/* Form */
.fi-form-wrapper {
  width: 100%;
}

.fi-form {
  width: 100%;
}

.fi-field {
  margin-bottom: 0.75rem;
  position: relative;
}

/* Floating Labels */
.fi-floating {
  position: relative;
}

.fi-input,
.fi-select {
  display: block;
  width: 100%;
  height: 58px;
  padding: 1.625rem 0.75rem 0.625rem;
  font-size: 1rem;
  color: #656668;
  background-color: #fff;
  border: 1px solid #DADCDE;
  border-radius: 5px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: none;
  font-family: 'Roboto', sans-serif;
}

.fi-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
}

.fi-input:focus,
.fi-select:focus {
  border-color: #00B0D3;
  box-shadow: 0 0 0 1px #00B0D3;
}

.fi-label {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: 1rem 0.75rem;
  color: #656668;
  pointer-events: none;
  border: 1px solid transparent;
  transform-origin: 0 0;
  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  font-family: 'Roboto', sans-serif;
}

.fi-input:focus ~ .fi-label,
.fi-input:not(:placeholder-shown) ~ .fi-label,
.fi-select:focus ~ .fi-label,
.fi-select.fi-has-value ~ .fi-label {
  opacity: 0.65;
  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
}

/* Hidden utility */
.fi-hidden {
  display: none;
}

/* Submit */
.fi-submit-wrapper {
  margin-top: 1rem;
}

.fi-submit-btn {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 0.625rem 1.75rem;
  font-size: 1rem;
  line-height: 1.5;
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  background-color: #00B0D3;
  transition: background-color 0.15s ease-in-out, color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  font-family: 'Roboto', sans-serif;
}

.fi-submit-btn:hover {
  background-color: #fff;
  color: #00B0D3;
  border-color: #00B0D3;
}

/* Success Message */
.fi-success {
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
}

.fi-success-title {
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #041B36;
}

.fi-success-text {
  color: #656668;
}

/* Footer */
.fi-footer {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.fi-follow-text {
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  color: #656668;
}

.fi-social {
  display: flex;
  margin-bottom: 1rem;
}

.fi-social-link {
  margin-right: 1rem;
  color: #656668;
  font-size: 1.25rem;
  text-decoration: none;
  transition: color 0.2s;
}

.fi-social-link:hover {
  color: #00B0D3;
}

.fi-copyright {
  font-size: 0.75rem;
  color: #656668;
  margin-top: 0.75rem;
}

/* Right Column */
.fi-col-right {
  width: 58.333%;
  position: relative;
  min-height: 50vh;
  display: flex;
  justify-content: flex-end;
  padding: 0;
}

.fi-hero-image {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* ========================================
   Responsive
   ======================================== */
@media (max-width: 768px) {
  .fi-row {
    flex-direction: column;
  }

  .fi-col-left {
    width: 100%;
    padding: 3rem 1.5rem;
    order: 2;
  }

  .fi-col-right {
    width: 100%;
    min-height: 50vh;
    order: 1;
  }

  .fi-wrapper {
    padding: 0 0.5rem;
    min-height: auto;
  }

  .fi-title {
    font-size: 1.75rem;
  }
}
CSS;
    }
}
