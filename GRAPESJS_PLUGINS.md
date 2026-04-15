# GrapesJS Plugins Recomendados

## Plugins Oficiales

### 1. **grapesjs-custom-code** ⭐ RECOMENDADO
- **Descripción**: Permite insertar código HTML/JavaScript personalizado directamente
- **Ideal para**: Widgets de terceros, scripts de analytics, forms embebidos
- **Instalación**: `npm install grapesjs-custom-code`
- **Uso en Edit.vue**:
```typescript
import gjsCustomCode from 'grapesjs-custom-code';

editor.Plugins.add('gjs-custom-code', gjsCustomCode);
```

### 2. **grapesjs-tabs** ⭐ RECOMENDADO
- **Descripción**: Componente de tabs/pestañas
- **Ideal para**: FAQ, secciones de contenido organizado, features
- **Instalación**: `npm install grapesjs-tabs`
- **Uso**: Similar al anterior

### 3. **grapesjs-tooltip**
- **Descripción**: Tooltips CSS-only (sin JavaScript)
- **Ideal para**: Help text, iconos con descripciones
- **Instalación**: `npm install grapesjs-tooltip`

### 4. **grapesjs-component-countdown** ⭐ RECOMENDADO
- **Descripción**: Contador regresivo con fecha específica
- **Ideal para**: Lanzamientos, eventos, ofertas limitadas
- **Instalación**: `npm install grapesjs-component-countdown`

### 5. **grapesjs-lory-slider**
- **Descripción**: Carrusel/slider de imágenes
- **Ideal para**: Testimonios, portfolio, features showcase
- **Instalación**: `npm install grapesjs-lory-slider`
- **Nota**: Requiere biblioteca Lory

### 6. **grapesjs-blocks-basic** 
- **Descripción**: Bloques básicos predefinidos
- **Nota**: Ya tienes bloques custom mejores, probablemente no necesario

## Plugins de Comunidad

### 1. **grapesjs-symbols** ⭐ RECOMENDADO
- **Descripción**: Crea símbolos/componentes reutilizables (como React components)
- **Ideal para**: Headers, footers, CTAs que se repiten
- **GitHub**: https://github.com/olivmonnier/grapesjs-symbols
- **Instalación**: `npm install grapesjs-symbols`

### 2. **grapesjs-ui-suggest-classes**
- **Descripción**: Autocompletado de clases CSS (útil para Tailwind)
- **Ideal para**: Mejorar UX cuando editan clases Tailwind
- **GitHub**: https://github.com/silexlabs/grapesjs-ui-suggest-classes

### 3. **grapesjs-fonts**
- **Descripción**: Gestor de fuentes de Google Fonts
- **Ideal para**: Permitir cambiar tipografías fácilmente

## Recomendación de Implementación

### Paso 1: Instalar plugins prioritarios
```bash
npm install grapesjs-custom-code grapesjs-tabs grapesjs-component-countdown grapesjs-symbols
```

### Paso 2: Actualizar Edit.vue
```typescript
// Agregar imports
import gjsCustomCode from 'grapesjs-custom-code';
import gjsTabs from 'grapesjs-tabs';
import gjsCountdown from 'grapesjs-component-countdown';
import gjsSymbols from 'grapesjs-symbols';

// En la configuración de GrapesJS:
const editor = grapesjs.init({
  // ... resto de config
  plugins: [
    gjsCustomCode,
    gjsTabs,
    gjsCountdown,
    gjsSymbols,
  ],
  pluginsOpts: {
    'gjs-custom-code': {},
    'gjs-tabs': {},
    'gjs-component-countdown': {},
    'gjs-symbols': {},
  }
});
```

## Plugins que NO recomiendo

❌ **grapesjs-plugin-forms** - Ya tienes forms custom con Tailwind  
❌ **grapesjs-navbar** - Ya tienes navbar custom mejor  
❌ **grapesjs-blocks-flexbox** - Tailwind maneja esto mejor  
❌ **grapesjs-style-gradient** - Tailwind tiene gradientes

## Testing de Plugins

**Importante**: Probar cada plugin individualmente para verificar que no cause freezing como el problema anterior. Los plugins lightweight (tabs, custom-code, countdown) son seguros.

## Próximos Pasos

1. Instalar los 4 plugins recomendados
2. Probar en desarrollo que no cause freezing
3. Verificar que funcionan con Tailwind CSS
4. Documentar uso para usuarios del editor
