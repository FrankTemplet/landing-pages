<template>
  <div class="grapes-editor-wrapper">
    <div style="display: none">
      <div class="gjs-logo-cont">
      </div>
    </div>

    <!-- Notification toast -->
    <div v-if="notification.show" :class="['editor-notification', notification.type]">
      {{ notification.message }}
    </div>

    <!-- Status bar -->
    <div class="editor-status-bar">
      <span v-if="!editingTitle" class="status-title" @click="editingTitle = true">{{ pageTitle }} <svg class="title-pencil" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg></span>
      <form v-else class="title-edit-form" @submit.prevent="updateTitle">
        <input
          v-model="titleInput"
          class="title-input"
          type="text"
          @keydown.escape="editingTitle = false; titleInput = pageTitle"
          @blur="updateTitle"
          @vue:mounted="($event: any) => $event.el.focus()"
        />
      </form>
      <span v-if="!editingSlug" class="status-slug" @click="editingSlug = true">/{{ pageSlug }} <svg class="slug-pencil" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg></span>
      <form v-else class="slug-edit-form" @submit.prevent="updateSlug">
        <span class="slug-prefix">/</span>
        <input
          v-model="slugInput"
          class="slug-input"
          type="text"
          pattern="[a-z0-9-]+"
          @keydown.escape="editingSlug = false; slugInput = pageSlug"
          @blur="updateSlug"
          ref="slugInputEl"
          @vue:mounted="($event: any) => $event.el.focus()"
        />
      </form>
      <span :class="['status-badge', pageStatus]">{{ pageStatus }}</span>
      <span v-if="lastSaved" class="status-saved">Last saved: {{ lastSaved.toLocaleTimeString() }}</span>
      <span v-if="saving" class="status-saving">Saving...</span>
      <div class="status-actions">
        <button class="btn-template" @click="saveAsTemplate" :disabled="saving">Save as template</button>
        <button class="btn-save" @click="manualSave" :disabled="saving">Save</button>
        <button v-if="pageStatus !== 'published'" class="btn-publish" @click="publish" :disabled="saving">Publish</button>
        <button v-else class="btn-unpublish" @click="unpublishPage" :disabled="saving">Unpublish</button>
      </div>
    </div>

    <!-- Contenedor principal del editor -->
    <div ref="gjsContainer" id="gjs" style="height: 0px; overflow: hidden">
    </div>
  </div>
</template>

<script setup lang="ts">
import { router } from '@inertiajs/vue3'
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { registerAllBlocks } from '@/editor/blocks';
import { autosave as pagesAutosave, update as pagesUpdate, index as pagesIndex } from '@/routes/pages'
import { publish as pagesPublish } from '@/routes/pages'
import { unpublish as pagesUnpublish } from '@/routes/pages'
import { store as templatesStore } from '@/routes/templates'

// ---------------------------------------------------------------------------
// Props & Page data from Inertia
// ---------------------------------------------------------------------------
interface PageData {
  id: number
  title: string
  slug: string
  status: string
  content_json: Record<string, any> | null
  meta_title: string | null
  meta_description: string | null
  og_image_url: string | null
  custom_meta: Record<string, any> | null
  published_at: string | null
}

const props = defineProps<{
  page: PageData
}>()

// Reactive state
const saving = ref(false)
const lastSaved = ref<Date | null>(null)
const pageStatus = ref(props.page.status)
const pagePublishedAt = ref(props.page.published_at)
const pageSlug = ref(props.page.slug)
const editingSlug = ref(false)
const slugInput = ref(props.page.slug)
const pageTitle = ref(props.page.title)
const editingTitle = ref(false)
const titleInput = ref(props.page.title)
const hasUnsavedChanges = ref(false)
const notification = reactive({ show: false, type: 'success', message: '' })
let autosaveInterval: ReturnType<typeof setInterval> | null = null
let ignoreUpdateEvents = true

const showNotification = (type: 'success' | 'error', message: string) => {
  notification.show = true
  notification.type = type
  notification.message = message

  setTimeout(() => {
    notification.show = false
  }, 3000)
}

// CSS del editor — importa en main.js o aquí mismo
// import 'grapesjs/dist/css/grapes.min.css'
// import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css'


// ---------------------------------------------------------------------------
// Editor
// ---------------------------------------------------------------------------
const gjsContainer = ref(null)
let editor: any = null

const images = [
  'example/img/team1.jpg',
  'example/img/team2.jpg',
  'example/img/team3.jpg',
  'https://via.placeholder.com/350x250/78c5d6/fff',
  'https://via.placeholder.com/350x250/459ba8/fff',
  'https://via.placeholder.com/350x250/79c267/fff',
  'https://via.placeholder.com/350x250/c5d647/fff',
  'https://via.placeholder.com/350x250/f28c33/fff',
  'https://via.placeholder.com/350x250/e868a2/fff',
  'https://via.placeholder.com/350x250/cc4360/fff',
  'example/img/work-desk.jpg',
  'example/img/phone-app.png',
  'example/img/bg-gr-v.png',
]

onMounted(async () => {
  const [
    { default: grapesjs },
    { default: gjsBlocksBasic },
    { default: gjsComponentCountdown },
    { default: gjsCustomCode },
    { default: gjsParserPostcss },
    { default: gjsPluginExport },
    { default: gjsPluginForms },
    { default: gjsPresetWebpage },
    { default: gjsStyleBg },
    { default: gjsTabs },
    { default: gjsTooltip },
    { default: gjsTouch },
    { default: gjsTuiImageEditor },
    { default: gjsTyped },
  ] = await Promise.all([
    import('grapesjs'),
    import('grapesjs-blocks-basic'),
    import('grapesjs-component-countdown'),
    import('grapesjs-custom-code'),
    import('grapesjs-parser-postcss'),
    import('grapesjs-plugin-export'),
    import('grapesjs-plugin-forms'),
    import('grapesjs-preset-webpage'),
    import('grapesjs-style-bg'),
    import('grapesjs-tabs'),
    import('grapesjs-tooltip'),
    import('grapesjs-touch'),
    import('grapesjs-tui-image-editor'),
    import('grapesjs-typed'),
  ])

  editor = grapesjs.init({
    height: '100%',
    container: '#gjs',
    fromElement: true,
    showOffsets: true,
    assetManager: {
      embedAsBase64: true,
      assets: images,
    },
    selectorManager: { componentFirst: true },
    styleManager: {
      sectors: [
        {
          name: 'General',
          properties: [
            {
              extend: 'float',
              type: 'radio',
              default: 'none',
              options: [
                { value: 'none', className: 'fa fa-times' },
                { value: 'left', className: 'fa fa-align-left' },
                { value: 'right', className: 'fa fa-align-right' },
              ],
            },
            'display',
            { extend: 'position', type: 'select' },
            'top',
            'right',
            'left',
            'bottom',
          ],
        },
        {
          name: 'Dimension',
          open: false,
          properties: [
            'width',
            {
              id: 'flex-width',
              type: 'integer',
              name: 'Width',
              units: ['px', '%'],
              property: 'flex-basis',
              toRequire: 1,
            },
            'height',
            'max-width',
            'min-height',
            'margin',
            'padding',
          ],
        },
        {
          name: 'Typography',
          open: false,
          properties: [
            'font-family',
            'font-size',
            'font-weight',
            'letter-spacing',
            'color',
            'line-height',
            {
              extend: 'text-align',
              options: [
                { id: 'left', label: 'Left', className: 'fa fa-align-left' },
                { id: 'center', label: 'Center', className: 'fa fa-align-center' },
                { id: 'right', label: 'Right', className: 'fa fa-align-right' },
                { id: 'justify', label: 'Justify', className: 'fa fa-align-justify' },
              ],
            },
            {
              property: 'text-decoration',
              type: 'radio',
              default: 'none',
              options: [
                { id: 'none', label: 'None', className: 'fa fa-times' },
                { id: 'underline', label: 'Underline', className: 'fa fa-underline' },
                { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough' },
              ],
            },
            'text-shadow',
          ],
        },
        {
          name: 'Decorations',
          open: false,
          properties: ['opacity', 'border-radius', 'border', 'box-shadow', 'background'],
        },
        {
          name: 'Extra',
          open: false,
          buildProps: ['transition', 'perspective', 'transform'],
        },
        {
          name: 'Flex',
          open: false,
          properties: [
            {
              name: 'Flex Container',
              property: 'display',
              type: 'select',
              defaults: 'block',
              list: [
                { value: 'block', name: 'Disable' },
                { value: 'flex', name: 'Enable' },
              ],
            },
            { name: 'Flex Parent', property: 'label-parent-flex', type: 'integer' },
            {
              name: 'Direction',
              property: 'flex-direction',
              type: 'radio',
              defaults: 'row',
              list: [
                { value: 'row', name: 'Row', className: 'icons-flex icon-dir-row', title: 'Row' },
                {
                  value: 'row-reverse',
                  name: 'Row reverse',
                  className: 'icons-flex icon-dir-row-rev',
                  title: 'Row reverse',
                },
                {
                  value: 'column',
                  name: 'Column',
                  title: 'Column',
                  className: 'icons-flex icon-dir-col',
                },
                {
                  value: 'column-reverse',
                  name: 'Column reverse',
                  title: 'Column reverse',
                  className: 'icons-flex icon-dir-col-rev',
                },
              ],
            },
            {
              name: 'Justify',
              property: 'justify-content',
              type: 'radio',
              defaults: 'flex-start',
              list: [
                { value: 'flex-start', className: 'icons-flex icon-just-start', title: 'Start' },
                { value: 'flex-end', title: 'End', className: 'icons-flex icon-just-end' },
                {
                  value: 'space-between',
                  title: 'Space between',
                  className: 'icons-flex icon-just-sp-bet',
                },
                {
                  value: 'space-around',
                  title: 'Space around',
                  className: 'icons-flex icon-just-sp-ar',
                },
                { value: 'center', title: 'Center', className: 'icons-flex icon-just-sp-cent' },
              ],
            },
            {
              name: 'Align',
              property: 'align-items',
              type: 'radio',
              defaults: 'center',
              list: [
                {
                  value: 'flex-start',
                  title: 'Start',
                  className: 'icons-flex icon-al-start',
                },
                { value: 'flex-end', title: 'End', className: 'icons-flex icon-al-end' },
                { value: 'stretch', title: 'Stretch', className: 'icons-flex icon-al-str' },
                { value: 'center', title: 'Center', className: 'icons-flex icon-al-center' },
              ],
            },
            { name: 'Flex Children', property: 'label-parent-flex', type: 'integer' },
            { name: 'Order', property: 'order', type: 'integer', defaults: 0, min: 0 },
            {
              name: 'Flex',
              property: 'flex',
              type: 'composite',
              properties: [
                { name: 'Grow', property: 'flex-grow', type: 'integer', defaults: 0, min: 0 },
                { name: 'Shrink', property: 'flex-shrink', type: 'integer', defaults: 0, min: 0 },
                {
                  name: 'Basis',
                  property: 'flex-basis',
                  type: 'integer',
                  units: ['px', '%', ''],
                  unit: '',
                  defaults: 'auto',
                },
              ],
            },
            {
              name: 'Align Self',
              property: 'align-self',
              type: 'radio',
              defaults: 'auto',
              list: [
                { value: 'auto', name: 'Auto' },
                { value: 'flex-start', title: 'Start', className: 'icons-flex icon-al-start' },
                { value: 'flex-end', title: 'End', className: 'icons-flex icon-al-end' },
                { value: 'stretch', title: 'Stretch', className: 'icons-flex icon-al-str' },
                { value: 'center', title: 'Center', className: 'icons-flex icon-al-center' },
              ],
            },
          ],
        },
      ],
    },
    plugins: [
      gjsBlocksBasic,
      gjsPluginForms,
      gjsComponentCountdown,
      gjsPluginExport,
      gjsTabs,
      gjsCustomCode,
      gjsTouch,
      gjsParserPostcss,
      gjsTooltip,
      gjsTuiImageEditor,
      gjsTyped,
      gjsStyleBg,
      gjsPresetWebpage,
    ],
    canvas: {
        styles: [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
        ],
        scripts:[
            'https://cdn.tailwindcss.com',
        ]
    },
    pluginsOpts: {
      [gjsBlocksBasic]: { flexGrid: true },
      [gjsTuiImageEditor]: {
        script: [
          'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
          'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
          'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js',
        ],
        style: [
          'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
          'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css',
        ],
      },
      [gjsTabs]: { tabsBlock: { category: 'Extra' } },
      [gjsTyped]: {
        block: {
          category: 'Extra',
          content: {
            type: 'typed',
            'type-speed': 40,
            strings: ['Text row one', 'Text row two', 'Text row three'],
          },
        },
      },
      [gjsPresetWebpage]: {
        modalImportTitle: 'Import Template',
        modalImportLabel:
          '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
        modalImportContent: (ed) => ed.getHtml() + '<style>' + ed.getCss() + '</style>',
      },
    },
    storageManager: false,
  })
  registerAllBlocks(editor);

  editor.on('update', () => {
    if (!ignoreUpdateEvents) {
      hasUnsavedChanges.value = true
    }
  })

  // Prevent clicks/submits in the iframe
  const frameEl = editor.Canvas.getFrameEl()

  if (frameEl) {
    frameEl.addEventListener('load', () => {
      const frameDocument = frameEl.contentDocument

      if (frameDocument) {
        frameDocument.addEventListener('click', (e: Event) => {
          const target = e.target as HTMLElement

          if (target.tagName === 'BUTTON' || (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'submit')) {
            e.preventDefault();
            e.stopPropagation();
          }
        }, true);
        frameDocument.addEventListener('submit', (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
        }, true);
      }
    });
  }

  // Autosave every 20 seconds
  autosaveInterval = setInterval(() => {
    if (editor) {
      doAutosave();
    }
  }, 20000);

  console.log('Editor initialized successfully');


    // Traducciones i18n
  editor.I18n.addMessages({
    en: {
      styleManager: {
        properties: {
          'background-repeat': 'Repeat',
          'background-position': 'Position',
          'background-attachment': 'Attachment',
          'background-size': 'Size',
        },
      },
    },
  })

  const pn = editor.Panels
  const modal = editor.Modal
  const cmdm = editor.Commands

  // Comando: limpiar canvas
  cmdm.add('canvas-clear', () => {
    if (confirm('Are you sure to clean the canvas?')) {
      editor.runCommand('core:canvas-clear')
      setTimeout(() => localStorage.clear(), 0)
    }
  })

  // Comando: panel de info
  const mdlClass = 'gjs-mdl-dialog-sm'
  const infoContainer = document.getElementById('info-panel')

  cmdm.add('open-info', () => {
    const mdlDialog = document.querySelector('.gjs-mdl-dialog')
    mdlDialog.className += ' ' + mdlClass
    infoContainer.style.display = 'block'
    modal.setTitle('About this demo')
    modal.setContent(infoContainer)
    modal.open()
    modal.getModel().once('change:open', () => {
      mdlDialog.className = mdlDialog.className.replace(mdlClass, '')
    })
  })

  pn.addButton('options', {
    id: 'open-info',
    className: 'fa fa-question-circle',
    command: () => editor.runCommand('open-info'),
    attributes: { title: 'About', 'data-tooltip-pos': 'bottom' },
  })

  // Tooltips
  ;[
    ['sw-visibility', 'Show Borders'],
    ['preview', 'Preview'],
    ['fullscreen', 'Fullscreen'],
    ['export-template', 'Export'],
    ['undo', 'Undo'],
    ['redo', 'Redo'],
    ['gjs-open-import-webpage', 'Import'],
    ['canvas-clear', 'Clear canvas'],
  ].forEach(([id, title]) => {
    pn.getButton('options', id)?.set('attributes', { title, 'data-tooltip-pos': 'bottom' })
  })
  ;[
    ['open-sm', 'Style Manager'],
    ['open-layers', 'Layers'],
    ['open-blocks', 'Blocks'],
  ].forEach(([id, title]) => {
    pn.getButton('views', id)?.set('attributes', { title, 'data-tooltip-pos': 'bottom' })
  })

  // Reemplaza title por data-tooltip en todos los elementos
  document.querySelectorAll('*[title]').forEach((el) => {
    const title = el.getAttribute('title')?.trim()

    if (!title) {
return
}

    el.setAttribute('data-tooltip', title)
    el.setAttribute('title', '')
  })

  // Storage events
  editor.on('storage:load', (e) => console.log('Loaded', e))
  editor.on('storage:store', (e) => console.log('Stored', e))

  // Post-load
  editor.on('load', () => {
    // ---------------------------------------------------------------------------
    // Load saved content from Inertia props (must run after canvas is ready)
    // ---------------------------------------------------------------------------
    if (props.page.content_json && Object.keys(props.page.content_json).length > 0) {
      try {
        const data = props.page.content_json;

        // Hybrid format: components + styles (preferred)
        if (data.components && Array.isArray(data.components) && data.components.length > 0) {
          editor.setComponents(data.components)

          if (data.styles && Array.isArray(data.styles)) {
            editor.setStyle(data.styles)
          }

          console.log('Content loaded successfully (hybrid format with components)')
        } else if (data.html) {
          // Fallback: html/css (template format)
          editor.setComponents(data.html)

          if (data.css) {
            editor.setStyle(data.css)
          }

          console.log('Content loaded successfully (template html/css format)')
        } else if (data['gjs-html']) {
          // Fallback: legacy format with gjs-html
          editor.setComponents(data['gjs-html'])

          if (data['gjs-css']) {
            editor.setStyle(data['gjs-css'])
          }

          console.log('Content loaded successfully (legacy format)')
        }
      } catch (error) {
        console.error('Failed to load content, starting blank:', error);
      }
    }

    // Mostrar borders por defecto
    pn.getButton('options', 'sw-visibility')?.set({
      command: 'core:component-outline',
      active: true,
    })

    // Versión en logo
    const logoCont = document.querySelector('.gjs-logo-cont')
    const versionEl = document.querySelector('.gjs-logo-version')

    if (versionEl) {
versionEl.innerHTML = 'v' + grapesjs.version
}

    const logoPanel = document.querySelector('.gjs-pn-commands')

    if (logoPanel && logoCont) {
logoPanel.appendChild(logoCont)
}

    // Activar style manager y trait manager
    pn.getButton('views', 'open-tm')?.set('active', 1)
    pn.getButton('views', 'open-sm')?.set('active', 1)
    pn.removeButton('views', 'open-tm')

    // Sector de Settings con traits
    const $ = grapesjs.$
    const traitsSector = $(
      '<div class="gjs-sm-sector no-select">' +
        '<div class="gjs-sm-sector-title"><span class="icon-settings fa fa-cog"></span> <span class="gjs-sm-sector-label">Settings</span></div>' +
        '<div class="gjs-sm-properties" style="display: none;"></div></div>',
    )
    const traitsProps = traitsSector.find('.gjs-sm-properties')
    traitsProps.append($('.gjs-traits-cs'))
    $('.gjs-sm-sectors').before(traitsSector)
    traitsSector.find('.gjs-sm-sector-title').on('click', function () {
      const traitsStyle = traitsProps.get(0).style
      traitsStyle.display = traitsStyle.display === 'none' ? 'block' : 'none'
    })

    // Abrir block manager
    pn.getButton('views', 'open-blocks')?.set('active', 1)

    // Mover ad-cont al canvas
    $('#gjs').append($('.ad-cont'))

    // Ignore initial updates fired by startup and initial content load.
    setTimeout(() => {
      ignoreUpdateEvents = false
      hasUnsavedChanges.value = false
    }, 0)
  })

  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)

  if (autosaveInterval) {
    clearInterval(autosaveInterval);
  }

  editor?.destroy()
})

// ---------------------------------------------------------------------------
// Save / Publish helpers
// ---------------------------------------------------------------------------
const buildContentPayload = () => {
  if (!editor) {
    return null
  }

  const html = editor.getHtml()
  const css = editor.getCss()
  const components = editor.getComponents()
  const styles = editor.getStyle()

  return {
    html,
    css,
    components: components.map((c: any) => c.toJSON()),
    styles: styles.map((s: any) => s.toJSON()),
  }
}

const getCsrfToken = () => {
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/)

  if (match) {
    return decodeURIComponent(match[1])
  }

  return document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
}

const jsonHeaders = () => ({
  'Content-Type': 'application/json',
  'X-XSRF-TOKEN': getCsrfToken(),
  'Accept': 'application/json',
});

const csrfFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  options.credentials = 'same-origin'
  const response = await fetch(url, options)

  if (response.status === 419) {
    const retryHeaders = { ...options.headers as Record<string, string>, 'X-XSRF-TOKEN': getCsrfToken() }

    return fetch(url, { ...options, headers: retryHeaders })
  }

  return response
};

const updateTitle = async () => {
  const newTitle = titleInput.value.trim()

  if (!newTitle || newTitle === pageTitle.value) {
    titleInput.value = pageTitle.value
    editingTitle.value = false

    return
  }

  try {
    const response = await csrfFetch(pagesUpdate({ page: props.page.id }).url, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ _method: 'PUT', title: newTitle }),
    })

    if (response.ok) {
      pageTitle.value = newTitle
      titleInput.value = newTitle
      showNotification('success', 'Titulo actualizado correctamente')
    } else {
      const data = await response.json()
      showNotification('error', data.errors?.title?.[0] || 'Error al actualizar el titulo')
      titleInput.value = pageTitle.value
    }
  } catch (error) {
    console.error('Title update failed:', error)
    showNotification('error', 'Error al actualizar el titulo')
    titleInput.value = pageTitle.value
  } finally {
    editingTitle.value = false
  }
}

const updateSlug = async () => {
  const newSlug = slugInput.value.toLowerCase().replace(/[^a-z0-9-]/g, '').trim()

  if (!newSlug || newSlug === pageSlug.value) {
    slugInput.value = pageSlug.value
    editingSlug.value = false

    return
  }

  try {
    const response = await csrfFetch(pagesUpdate({ page: props.page.id }).url, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ _method: 'PUT', slug: newSlug }),
    })

    if (response.ok) {
      pageSlug.value = newSlug
      slugInput.value = newSlug
      showNotification('success', 'URL actualizada correctamente')
    } else {
      const data = await response.json()
      showNotification('error', data.errors?.slug?.[0] || 'Error al actualizar la URL')
      slugInput.value = pageSlug.value
    }
  } catch (error) {
    console.error('Slug update failed:', error)
    showNotification('error', 'Error al actualizar la URL')
    slugInput.value = pageSlug.value
  } finally {
    editingSlug.value = false
  }
}

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (!hasUnsavedChanges.value || saving.value) {
    return
  }

  event.preventDefault()
  event.returnValue = ''
}

const doAutosave = async () => {
  if (!editor || saving.value) {
    return
  }

  saving.value = true

  try {
    const lightweightData = buildContentPayload()

    if (!lightweightData?.html && !lightweightData?.components.length) {
      console.warn('No content to save')

      return
    }

    const response = await csrfFetch(pagesAutosave({ page: props.page.id }).url, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ content_json: lightweightData }),
    })

    if (response.ok) {
      lastSaved.value = new Date()
      hasUnsavedChanges.value = false
      console.log('Autosave successful')
    } else {
      console.error('Autosave failed:', await response.text())
    }
  } catch (error) {
    console.error('Autosave failed:', error)
  } finally {
    saving.value = false
  }
}

const manualSave = async () => {
  await doAutosave()

  if (lastSaved.value) {
    showNotification('success', 'Página guardada correctamente')
  } else {
    showNotification('error', 'Error al guardar la página')
  }
}

const publish = async () => {
  if (!editor) {
    return
  }

  saving.value = true

  try {
    const lightweightData = buildContentPayload()

    if (!lightweightData?.html && !lightweightData?.components.length) {
      console.warn('No content to publish')

      return
    }

    // Save first
    const saveResponse = await csrfFetch(pagesAutosave({ page: props.page.id }).url, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ content_json: lightweightData }),
    })

    if (!saveResponse.ok) {
      showNotification('error', 'Error al guardar antes de publicar')
      console.error('Save before publish failed:', await saveResponse.text())

      return
    }

    lastSaved.value = new Date()
    hasUnsavedChanges.value = false

    // Then publish
    const publishResponse = await csrfFetch(pagesPublish({ page: props.page.id }).url, {
      method: 'POST',
      headers: jsonHeaders(),
    })

    if (publishResponse.ok) {
      hasUnsavedChanges.value = false
      router.visit(pagesIndex().url)

      return
    } else {
      showNotification('error', 'Error al publicar la página');
    }
  } catch (error) {
    console.error('Publish failed:', error);
    showNotification('error', 'Error al publicar la página');
  } finally {
    saving.value = false;
  }
};

const unpublishPage = async () => {
  saving.value = true;

  try {
    const response = await csrfFetch(pagesUnpublish({ page: props.page.id }).url, {
      method: 'POST',
      headers: jsonHeaders(),
    });

    if (response.ok) {
      showNotification('success', 'Página despublicada correctamente')
      pageStatus.value = 'draft'
      pagePublishedAt.value = null
    } else {
      showNotification('error', 'Error al despublicar la página');
    }
  } catch (error) {
    console.error('Unpublish failed:', error);
    showNotification('error', 'Error al despublicar la página');
  } finally {
    saving.value = false;
  }
};

const saveAsTemplate = async () => {
  const name = window.prompt('Nombre de la plantilla')?.trim()

  if (!name) {
    return
  }

  const description = window.prompt('Descripción (opcional)')?.trim() || null
  const content = buildContentPayload()

  if (!content) {
    showNotification('error', 'No se pudo generar el contenido de la plantilla')

    return
  }

  saving.value = true

  try {
    const response = await csrfFetch(templatesStore().url, {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({
        name,
        description,
        content_json: content,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('Save template failed:', errorBody)
      showNotification('error', 'Error al guardar plantilla')

      return
    }

    showNotification('success', 'Plantilla guardada correctamente')
  } catch (error) {
    console.error('Save template failed:', error)
    showNotification('error', 'Error al guardar plantilla')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.grapes-editor-wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
}

.editor-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  padding: 10px 20px;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
}
.editor-notification.success {
  background: #22c55e;
}
.editor-notification.error {
  background: #ef4444;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.editor-status-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px;
  background: #1a1a2e;
  color: #ccc;
  font-size: 13px;
  border-bottom: 1px solid #333;
  z-index: 100;
  position: relative;
}
.status-title {
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.status-title:hover {
  background: rgba(255, 255, 255, 0.1);
}
.title-pencil {
  opacity: 0;
  transition: opacity 0.2s;
}
.status-title:hover .title-pencil {
  opacity: 1;
}
.title-edit-form {
  display: flex;
  align-items: center;
}
.title-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #555;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 2px 6px;
  outline: none;
  width: 200px;
}
.title-input:focus {
  border-color: #6366f1;
}
.status-slug {
  color: #888;
  font-size: 12px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background 0.2s, color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.status-slug:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.slug-pencil {
  opacity: 0;
  transition: opacity 0.2s;
}
.status-slug:hover .slug-pencil {
  opacity: 1;
}
.slug-edit-form {
  display: flex;
  align-items: center;
}
.slug-prefix {
  color: #888;
  font-size: 12px;
}
.slug-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #555;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  outline: none;
  width: 180px;
}
.slug-input:focus {
  border-color: #6366f1;
}
.status-badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
}
.status-badge.draft {
  background: #f59e0b;
  color: #000;
}
.status-badge.published {
  background: #22c55e;
  color: #fff;
}
.status-saved {
  color: #888;
  font-size: 12px;
}
.status-saving {
  color: #f59e0b;
  font-size: 12px;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
}
.status-actions button {
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}
.status-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-save {
  background: #3b82f6;
  color: #fff;
}
.btn-template {
  background: #0ea5e9;
  color: #fff;
}
.btn-publish {
  background: #22c55e;
  color: #fff;
}
.btn-unpublish {
  background: #f59e0b;
  color: #000;
}
</style>
