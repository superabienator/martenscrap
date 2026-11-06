# 📚 Martenscrap | E-Commerce Artesanal & Taller de Autor

<p align="center">
  <img src="public/apple-touch-icon.png" alt="Martenscrap Logo" width="96" height="96" style="border-radius: 20px; box-shadow: 0 10px 25px rgba(147, 51, 234, 0.25);" />
</p>

<p align="center">
  <strong>Plataforma de comercio electrónico de alta conversión y experiencia inmersiva para piezas artesanales, marcapáginas magnéticos, papelería kawaii e impresión 3D.</strong><br>
  <em>Creado con mimo para el taller de Marta Pastor Escribano en Valencia.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Three.js-0.187-black?logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Deploy-Vercel_Ready-000000?logo=vercel&logoColor=white" alt="Vercel Ready" />
  <img src="https://img.shields.io/badge/License-MIT-purple" alt="License MIT" />
</p>

---

## 🌟 Resumen del Proyecto

**Martenscrap** es una plataforma web desarrollada a medida que combina la calidez y autenticidad del trabajo manual con ingeniería web de vanguardia. Diseñada a partir de una rigurosa auditoría de **CRO (Conversion Rate Optimization)** y **UX Research**, elimina la fricción habitual de compra y resuelve las necesidades operativas de un taller artesanal real:

* **Alma de taller vs. plantilla fría:** Cada detalle transmite el oficio de la autora (fotografías reales, texturas, tiempos de confección, sellos de lacre y dedicatorias).
* **Experiencia sensorial e inmersiva:** Simulador 3D interactivo con Three.js, baraja desplegable tridimensional y sonido háptico de chasquido magnético (*Web Audio API*).
* **Simplicidad total para la artesana:** Panel de gestión privado sin jerga informática, con subida directa de fotos desde el móvil, activación de stock con un clic y persistencia automática.

---

## ✨ Características Principales

### 1. 🃏 Baraja Desplegable Tridimensional (`FeaturedPromotionsDeck`)
- Ubicada en la zona noble justo tras la cabecera, presenta las 4 novedades editoriales o eventos clave.
- **Micro-carruseles fotográficos:** Cada carta rota automáticamente de 2 a 3 fotografías con ritmo suave y no intrusivo.
- **Gama cromática de 8 tonos temáticos:** Selector de color con alto contraste accesible (Otoño/Halloween, Kawaii/Pastel, Ferias/Azul, Taller/Púrpura, Navidad/Verde, Dorado Vintage, Rubí/San Valentín y Negro Gótico).
- **Acciones directas:** Enlaza automáticamente con filtrado por fandoms, puntos de venta físicos o el configurador de regalos.

### 2. 🎨 Visor y Simulador 3D de Taller (`Viewer3D` & `Asset3DStudioModal`)
- Renderizado WebGL en tiempo real con **Three.js**.
- Permite rotar en 360°, hacer zoom e inspeccionar piezas 3D (dragones articulados, pulsadores *clickers*, *standees* literarios y marcapáginas).
- Carga dinámica de texturas personalizadas y simulación de materiales mates, satinados o nacarados.

### 3. 🛍️ Ficha de Producto y Galería Multivariación (`ProductModal`)
- **Hasta 20 fotografías por artículo:** Sin límites artificiales; ideal para bolígrafos borrables Legami con más de 4 colores o figuras 3D multicolor.
- **Sincronización instantánea:** Al hacer clic sobre cualquier variante de color o modelo, la imagen principal cambia de inmediato al color pulsado.
- **Ficha técnica transparente:** Dimensiones exactas en centímetros, materiales sostenibles y consejos de conservación.
- **Estimación dinámica de envío:** Fechas de entrega calculadas en tiempo real según si la pieza está en stock (*"🟢 Listo para enviar 24-48h"*) o se hace por encargo (*"🟣 Confeccionado bajo pedido 2-4 días"*).
- **Opciones de regalo:** Empaquetado artesanal para regalo (+1,50 €) y dedicatoria manuscrita gratuita.

### 4. 🛒 Carrito Inteligente y Cajón de Deseos (`CartDrawer` & `WishlistDrawer`)
- **Barra de progreso hacia envío gratuito:** Cálculo en vivo del importe restante para alcanzar el umbral de 45 € con Correos Express.
- **Persistencia en sesión:** Los artículos en el carrito y en la lista de deseos se guardan localmente para no perderse al recargar.

### 5. 🎁 Configurador "Arma tu Caja Literaria" (`CustomBoxBuilder`)
- Asistente interactivo paso a paso para confeccionar cajas sorpresa personalizadas con marcapáginas, dragón 3D, fundas de libros y carta manuscrita sellada a la cera.

### 6. 🔒 El Taller de Marta (Backoffice Privado de Administración)
- **Acceso exclusivo y protegido:** Oculto a clientes comunes. Accesible mediante URL privada con hash (`/#taller`, `/#admin`, `?modo=taller`) o atajo de teclado (`Ctrl + Shift + M` / `Alt + T`).
- **Seguridad por PIN:** Código numérico de acceso (`2026`).
- **Control integral:**
  - Crear, editar y alternar stock de productos.
  - Subida de imágenes locales mediante `FileReader` directo (sin necesidad de servidores externos ni bases de datos complejas).
  - Editor visual de la baraja desplegable con previsualización en vivo de etiquetas y colores.
  - Gestor de preguntas frecuentes (FAQs).
  - Configuración del mensaje de cabecera y número de WhatsApp de soporte directo.

---

## 🛠️ Tecnologías Empleadas

| Área | Tecnología | Versión | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework** | [React](https://react.dev/) | `^19.3.1` | Interfaz de usuario reactiva y basada en componentes |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) | `~7.0.2` | Tipado estático estricto y prevención de errores |
| **Bundler** | [Vite](https://vite.dev/) | `^8.3.6` | Servidor de desarrollo ultra rápido y compilación Rollup optimizada |
| **Estilos** | [Tailwind CSS](https://tailwindcss.com/) | `^4.3.4` | Diseño utility-first moderno con compilador nativo `@tailwindcss/vite` |
| **3D Graphics** | [Three.js](https://threejs.org/) | `^0.187.0` | Renderizado WebGL de modelos 3D y simulador de texturas |
| **Iconografía** | [Lucide React](https://lucide.dev/) | `^1.70.0` | Iconos vectoriales limpios y consistentes |
| **Efectos** | [Canvas Confetti](https://github.com/catdad/canvas-confetti) | `^1.9.4` | Celebración visual en conversiones y pedidos |
| **Hosting** | [Vercel](https://vercel.com/) | Production | Despliegue continuo con reescrituras SPA y cabeceras de seguridad |

---

## 📁 Estructura del Proyecto

```text
Martens/
├── public/                       # Archivos estáticos públicos
│   ├── favicon.ico               # Favicon multi-resolución oficial
│   ├── favicon.png               # Monograma clásico "M" rasterizado en alta definición
│   ├── favicon-32x32.png         # Icono para pestañas del navegador
│   └── apple-touch-icon.png      # Icono para dispositivos iOS y móviles
├── src/
│   ├── components/               # Componentes modulares de interfaz
│   │   ├── ArtisanWorkshopModal.tsx # Panel privado de gestión para la artesana
│   │   ├── Asset3DStudioModal.tsx   # Estudio de simulación de texturas 3D
│   │   ├── BrandIntroAnimation.tsx  # Firma visual animada y logotipo flotante
│   │   ├── CartDrawer.tsx           # Carrito lateral con barra de progreso
│   │   ├── CustomBoxBuilder.tsx     # Configurador interactivo "Arma tu Caja"
│   │   ├── FAQSection.tsx           # Preguntas frecuentes con acordeón
│   │   ├── FeaturedPromotionsDeck.tsx# Baraja desplegable con paleta cromática
│   │   ├── Hero.tsx                 # Sección de bienvenida principal
│   │   ├── Navbar.tsx               # Barra de navegación con accesos rápidos
│   │   ├── ProductCatalog.tsx       # Catálogo con filtros por categoría y fandom
│   │   ├── ProductModal.tsx         # Ficha detallada con sincronización de fotos
│   │   ├── StoreLocator.tsx         # Localizador de tiendas físicas y ferias
│   │   ├── Viewer3D.tsx             # Motor Three.js para previsualización 3D
│   │   └── WhatsAppFloatingButton.tsx# Botón de asistencia directa por WhatsApp
│   ├── data/                     # Colecciones de datos tipados y mock inicial
│   │   ├── mockData.ts              # Catálogo de productos, tiendas y categorías
│   │   └── promotionsData.ts        # Tarjetas de la baraja y paleta de color
│   ├── i18n/                     # Internacionalización
│   │   └── translations.ts          # Textos en Español, Català e Inglés
│   ├── utils/                    # Utilidades y motores de apoyo
│   │   └── audio.ts                 # Motor sonoro con Web Audio API
│   ├── types/                    # Definiciones de tipos TypeScript globales
│   │   └── index.ts
│   ├── App.tsx                   # Componente raíz y orquestador de estado
│   ├── main.tsx                  # Punto de entrada de la aplicación
│   └── index.css                 # Configuración de estilos globales y temas
├── .env.example                  # Plantilla de variables de entorno
├── .gitignore                    # Reglas estrictas de exclusión para Git
├── CHANGELOG.md                  # Historial detallado de versiones y mejoras
├── package.json                  # Dependencias y scripts del proyecto
├── tsconfig.json                 # Configuración de compilación TypeScript
├── vercel.json                   # Configuración para despliegue en Vercel
└── vite.config.ts                # Configuración de Vite con separación de chunks
```

---

## 🚀 Puesta en Marcha en Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
- [npm](https://www.npmjs.com/) o gestor equivalente.

### 1. Clonar el repositorio
```bash
git clone https://github.com/superabienator/martenscrap.git
cd martenscrap
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el entorno de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

### 4. Compilación para producción y comprobación de tipos
```bash
npm run build
```
Genera la compilación optimizada en la carpeta `dist/` tras validar que no existan errores de TypeScript.

---

## ☁️ Despliegue en Vercel

El proyecto está 100% preparado para ser desplegado en **Vercel** en menos de 2 minutos:

1. **Inicia sesión en [Vercel](https://vercel.com/)** con tu cuenta de GitHub.
2. Haz clic en **"Add New..."** → **"Project"**.
3. Selecciona el repositorio **`martenscrap`**.
4. Vercel detectará automáticamente que es un proyecto **Vite**:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Pulsa en **"Deploy"**.
6. ¡Listo! Cada vez que hagas `git push` a la rama `main`, Vercel compilará y actualizará la web automáticamente en producción.

El archivo [`vercel.json`](./vercel.json) incluido se encarga de gestionar las rutas SPA y aplicar las cabeceras de seguridad y caché.

---

## 👩‍🎨 Guía de Uso para la Artesana (Gestión Diaria)

Para acceder al panel privado de administración sin que los clientes lo vean:

1. **Cómo entrar:**
   - Escribe en la barra del navegador: `tudominio.com/#taller` (o `http://localhost:5173/#taller` en local).
   - O bien pulsa la combinación de teclas: `Ctrl + Shift + M` (o `Alt + T` en Mac).
2. **Introduce el código PIN:**
   - Por defecto: `2026`.
3. **Qué puedes hacer:**
   - **Añadir o editar productos:** Sube fotos desde tu móvil/ordenador, define precio, medidas, materiales y selecciona si está listo para enviar o se hace bajo pedido.
   - **Variaciones de color:** Añade hasta 20 fotos por artículo (ej. cada color de un bolígrafo Legami) y la web las vinculará automáticamente.
   - **Editar la Baraja de Portada:** Cambia las fotos, el texto, el enlace y elige entre los 8 colores temáticos disponibles.
   - **Preguntas Frecuentes:** Añade o modifica dudas frecuentes de tus clientes.
   - **Barra de Anuncios:** Modifica el texto superior de ofertas o envíos gratis.
   - **WhatsApp:** Configura tu número de teléfono para recibir consultas directamente.

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más información.

---

<p align="center">
  Confeccionado con pasión por los detalles y la artesanía.<br>
  <strong>Martenscrap © 2026 • Marta Pastor Escribano</strong>
</p>
