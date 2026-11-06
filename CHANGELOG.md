# Historial de Cambios y Novedades (Changelog)

Todas las mejoras notables, adiciones funcionales y optimizaciones de este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [1.2.8] - 2026-11-06

### 📱 Anclaje Matemático y Proporción Móvil Perfecta en la Cabecera (`BrandIntroAnimation`)
- **Bloqueo Relativo al Contenedor Real del Logotipo**:
  - Se estructuró el stage como un `inline-flex` que adopta exactamente las dimensiones reales de la imagen del logotipo, garantizando que el origen y las coordenadas sean independientes del ancho de pantalla del móvil.
- **Eliminación de la Desconfiguración en Smartphones**:
  - Sustituida la interpolación basada en píxeles fijos por un sistema de coordenadas porcentuales (`left: -6%` a `110%` y `top: 65%`).
  - El bolígrafo Legami recorre con precisión milimétrica la palabra "Martenscrap" tanto en pantallas ultracompactas (iPhone SE, Galaxy Fold) como en monitores 4K.
  - Redimensionada la mano en móvil a escala proporcional (`w-24` / 96px frente a los 80px del logo), evitando que cubra toda la pantalla o se desplace hacia zonas vacías.
- **Sincronización de Purpurina, Niebla y Tinta**:
  - Los destellos de purpurina (`top: 98.2%`, `left: 14.3%`) y la revelación por `clip-path` están 100% coordinados con la punta del bolígrafo.

---

## [1.2.7] - 2026-11-06

### ✨ Perfeccionamiento & Fluidez de la Animación de Cabecera Martenscrap
- **Reaparición y Calibración Real de la Mano con Bolígrafo Legami (`BrandIntroAnimation` & `index.css`)**:
  - Corregido el desfase vertical (`translate3d`) que desplazaba la mano fuera del viewport.
  - Anclaje matemático de la punta del bolígrafo (`14.3% X`, `98.2% Y`) con la línea base del logotipo para trazar con precisión de izquierda a derecha sobre cada letra ("M" -> "artenscrap").
  - Escala fluida y responsiva con keyframes adaptados para dispositivos móviles (`@media (max-width: 640px)`).
- **Erradicación del Recuadro Rectangular y Fusión Natural**:
  - Reemplazado `overflow-hidden rounded-3xl` en el contenedor del logotipo por `overflow-visible`, eliminando los cortes bruscos en los bordes de la niebla y de la imagen.
  - La nube de niebla atmosférica y los destellos de purpurina (`nebulaCloudLinger`) se expanden y disuelven de forma 100% orgánica y continua en el fondo general, sin ningún marco visible.
- **Efecto de Escritura Reveladora Progresiva (`clip-path`)**:
  - El logotipo original se va desvelando letra por letra al paso del bolígrafo mediante `clip-path: inset(...)`, transicionando al finalizar a una suave levitación permanente (`floatingLogoGentle`).

---

## [1.2.6] - 2026-11-06

### 📐 Optimización de Longitud y Compactación Visual de la Página
- **Catálogo de Artículos Paginado (`ProductCatalog`)**:
  - Limitada la carga inicial a 8 artículos (exactamente 2 filas en pantallas de escritorio o 4 filas en móvil), reduciendo la longitud de la página en más de un 60%.
  - Añadido botón interactivo y ergonómico *"Cargar más artículos (+8)"* con indicador visual de progreso (`Mostrando X de Y artículos`) y mensaje al explorar el catálogo completo.
- **Cilindro Giratorio 3D de Puntos de Venta (`StoreLocator`)**:
  - Sustituida la cuadrícula vertical de 10 tarjetas por un elegante **cilindro giratorio tridimensional** en una sola línea.
  - Implementados los 3 modos de interacción simultáneos solicitados:
    1. **Autodesplazamiento (Autoplay)**: Giro automático suave cada 3,4 segundos que se pausa al interactuar o pasar el cursor.
    2. **Arrastre interactivo y giro táctil (Drag & Swipe)**: Capacidad de girar el cilindro arrastrando con el ratón o deslizando con el dedo en pantallas táctiles con inercia.
    3. **Flechas de control directas**: Botones laterales (*anterior/siguiente*) con dianas táctiles accesibles.
    4. Perspectiva espacial `perspective: 1100px`, curvatura angular `rotateY(-18deg / 18deg)`, escalado dinámico en profundidad y selector de dots.
- **Preguntas Frecuentes Retraídas por Defecto (`FAQSection`)**:
  - Modificado el estado inicial para que todas las preguntas frecuentes aparezcan retraídas (cerradas) al cargar la página, ahorrando espacio vertical y permitiendo al usuario abrir solo la respuesta de su interés.
- **Corrección Tipográfica y Erradicación de Cortes (`ContactSection` & `index.css`)**:
  - Corregido el solapamiento de la letra "g" en *"¿Tienes una duda o quieres un encargo personalizado?"*.
  - Añadido espaciado seguro y margen vertical en el encabezado.
  - Reforzada la clase `.text-iridescent` con `padding-bottom: 0.16em` y `margin-bottom: -0.16em` para evitar que los caracteres con trazos descendentes (`g`, `y`, `p`, `q`, `j`) sean recortados por el degradado o solapados por bloques contiguos.

---

## [1.2.5] - 2026-11-06

### 📱 Auditoría Senior UI/UX & Rediseño Fluido Integral (Mobile-First)
- **Erradicación Total de Desbordamientos Horizontales (Overflow-X Leakage)**:
  - Blindaje estructural en `html`, `body`, `#root`, `<main>` y en cada sección individual (`Hero`, `BrandIntroAnimation`, `FeaturedPromotionsDeck`, `ProductCatalog`, `AboutSection`, `FAQSection`, `StoreLocator`, `ContactSection`, `Footer`).
  - Encapsulación de capas decorativas absolutas y halos difuminados con `overflow-hidden w-full max-w-full`.
- **Tipografía Fluida y Resiliente (`clamp` / Escala Adaptativa)**:
  - Títulos principales en `Hero`, `FeaturedPromotionsDeck`, `AboutSection`, `StoreLocator` y `ContactSection` recalibrados con tipografía adaptativa para evitar saltos de línea forzados o solapamientos en dispositivos de 320px a 420px (iPhone SE, Galaxy Fold, Pixel).
- **Zonas Táctiles Accesibles (Tap Targets ≥ 44×44px)**:
  - Todos los botones de acción principal, botones de cierre en modales (`LegalModal`, `ProductModal`, `CustomBoxBuilder`, `SearchModal`, `AuthModal`), flechas de navegación, puntos de carrusel y conmutadores cumplen con el estándar WCAG/Apple HIG de al menos 44×44 píxeles táctiles.
- **Modales y Diálogos Táctiles Optimizados**:
  - `LegalModal`: Tabs con scroll horizontal continuo táctil (`overflow-x-auto scrollbar-none flex-nowrap sm:flex-wrap`), botón de cierre táctil y márgenes seguros `p-2.5 sm:p-4`.
  - `CustomBoxBuilder`, `ProductModal`, `CartDrawer`, `WishlistDrawer`, `SearchModal` y `AuthModal`: adaptados con paddings móviles ergonómicos para maximizar el área útil de interacción táctil.
- **Rendimiento GPU a 60 FPS en Dispositivos Móviles**:
  - Reemplazo de reflows costosos en `index.css` por `translate3d` por GPU.
  - Aligerado dinámico de partículas y sombras WebGL en Three.js con `touch-action: none`.

---

## [1.2.4] - 2026-11-06

### 📱 Optimización Móvil Integral (Responsive UX / UI)
- **Malla de productos en 2 columnas en móviles (`ProductCatalog` & `ProductCard`)**:
  - Sustituida la cuadrícula vertical unicolumna (`grid-cols-1`) por una distribución ágil de 2 columnas (`grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`).
  - Tarjetas de producto adaptadas (`ProductCard`): paddings compactos (`p-2.5 sm:p-4`), insignias reducidas, botón de compra rápido optimizado y alturas equilibradas para ver de 4 a 6 artículos cómodamente en cada scroll de pantalla.
- **Menú y cabecera táctil rediseñados (`Navbar`)**:
  - Panel móvil desplegable ampliado y táctil (objetivos mínimos de toque de 48px según directrices Apple/Google).
  - Bloque directo de bienvenida/cuenta de usuario y tarjetas destacadas de acceso rápido (*Arma tu Caja Regalo*, *Laboratorio 3D* y *Puntos de Venta*).
  - Grid de departamentos y píldoras de fandoms con tipografía legible y cómoda.
  - Ajustes rápidos integrados (Modo Velas / Día, Sonido táctil y selector de idioma con banderas grandes).
  - Despejada la botonera superior en móvil: acceso directo a Búsqueda, Favoritos con contador y Carrito sin apelotonamiento.
- **Eliminación del desbordamiento horizontal y espacios en blanco**:
  - Bloqueo estricto de overflow en `html`, `body`, `#root` y contenedores principales (`overflow-x-hidden w-full max-w-full`).
  - Encapsuladas las esferas de desenfoque ambiental y la animación de la pluma/mano de cabecera (`BrandIntroAnimation`) para evitar que sobresalgan del ancho visible del dispositivo.
  - Carrusel horizontal de la baraja móvil (`FeaturedPromotionsDeck`) encuadrado de extremo a extremo sin márgenes fantasmas.

### ⚡ Rendimiento & Fluidez (60 FPS en Móviles)
- **Aislamiento táctil en el Visor 3D (`Viewer3D`)**:
  - Asignado `touch-action: none` directamente sobre el canvas WebGL y el contenedor de montaje.
  - Eventos táctiles no pasivos (`passive: false`) con `e.preventDefault()`, impidiendo que el scroll vertical de la página web interfiera o compita al rotar en 360° con un dedo o pellizcar para hacer zoom con dos dedos.
  - Optimización GPU para móviles: resolución de sombras adaptada a 512×512, mapa de sombras básico y limitación del ratio de píxeles (`Math.min(devicePixelRatio, 1.5)`) para eliminar tirones al orbitar.
  - Selector de modelos 3D con desplazamiento horizontal suave (`overflow-x-auto`) sin saltos de línea antiestéticos.
- **Eliminación de tirones en la animación de cabecera (`BrandIntroAnimation` & CSS)**:
  - Sustituidas las animaciones basadas en propiedades lentas de maquetación (`left`, `top`, `filter: blur(...)`) por transformaciones por aceleración hardware (`transform: translate3d(...) scale(...)`, `will-change: transform`).
  - Reducción dinámica de partículas y niebla en dispositivos móviles en `SandFogCanvas` (de 140 a 32 partículas y de 16 a 4 nubes), liberando drásticamente el consumo de GPU.

---

## [1.2.3] - 2026-11-06

### 🎨 Identidad de Marca & Favicon Oficial
- **Favicon oficial "M" de Martenscrap con recorte y transparencia idénticos a la pestaña original**:
  - Extraído el monograma original "M" de Martenscrap a partir del archivo maestro en alta resolución (512×512) con fondo 100% transparente y anti-aliasing suave.
  - Generado `favicon.ico` multi-resolución (16×16, 32×32, 48×48) compatible con todos los navegadores de escritorio (Chrome, Edge, Firefox, Safari).
  - Generados `favicon.svg` (vectorial / alta resolución), `favicon-32x32.png`, `favicon-16x16.png`, `android-chrome-192x192.png` y `apple-touch-icon.png` (180×180).
  - Eliminado cualquier recuadro o fondo blanco: la "M" queda limpia y flotante directamente sobre la pestaña del navegador, exactamente igual que en la tienda de referencia.

### ✍️ Redacción & Tono Comercial Equilibrado
- **Eliminación del uso redundante de las palabras "artesano", "artesanal" y "taller" en toda la plataforma**:
  - **Traducciones (ES, CA, EN, FR)**: Se sustituyó *"ARTESANAL"* y *"Artesanía de Autor"* por expresiones más acordes al amplio catálogo de la tienda: *"DISEÑO PROPIO"*, *"Selección Destacada"*, *"Colección de Temporada"*, *"Modelos 3D y papelería kawaii"* y *"Diseño Original & Calidad"*.
  - **Aviso Legal y RGPD (`LegalModal`)**: Redacción legal limpia reflejando la actividad de venta de papelería, marcapáginas magnéticos, artículos de regalo, papelería Legami e impresión 3D.
  - **Carrito y Conversión (`CartDrawer`)**: Cambio de frases forzadas como *"Completa tu pedido artesano"* por *"Completa tu pedido y ahorra el envío"* y agradecimiento comercial natural (*"¡Gracias por tu pedido!"*).
  - **Ficha de Producto (`ProductModal`)**: Especificación de *"Materiales seleccionados de primera calidad"* y *"Marca & Diseño: Creación original de Marta Pastor Escribano"*.
  - **Sección Sobre Nosotros (`AboutSection`), Footer y FAQ**: Enfoque moderno de tienda creativa y especializada para amantes de la lectura, manteniendo la calidez sin sobrecargar el lenguaje.

---

## [1.2.2] - 2026-11-06

### ✨ Motor 3D & Presentación Visual
- **Diseños e ilustraciones de autor predefinidos en todos los modelos 3D (`Viewer3D`)**:
  - **🧲 Marcapáginas Magnético:** Ilustración celestial *"Aquelarre Literario"* en azul medianoche y pan de oro con luna creciente, constelaciones, pila de libros antiguos y sellos de taller en relieve.
  - **🐉 Dragón Articulado 3D:** Modelado orgánico en filamento seda zafiro y oro iridiscente, con cuernos dorados curvados, ojos de reptil brillantes, crestas espinosas dorsales en cada vértebra y punta de cola en flecha.
  - **🔘 Fidget Clicker Antiestrés:** Tecla mecánica artesanal kawaii texturizada con huella de gato (*cat paw*), vástago mecánico azul visible, carcasa Galaxy Black y anilla metálica de llavero cromada.
  - **✨ Standee Acrílico:** Panel de metacrilato óptico cortado a láser con ilustración original a todo color (simpático dragón chibi lector sobre tomos antiguos con destellos mágicos).
  - **📖 Contador de Lecturas:** Madera de abedul grabada a láser con motivos botánicos y diales giratorios concéntricos de latón envejecido marcados del 0 al 9.
  - Generador procedural de texturas nítidas en Canvas sin latencia de red ni dependencias externas ([`src/utils/canvasTextures.ts`](./src/utils/canvasTextures.ts)).
  - Añadido selector directo para el 5º modelo (Contador de Lectura) en la botonera del visor 3D.

---

## [1.2.1] - 2026-11-06

### 🎨 Experiencia de Usuario (UX)
- **Simplificación y apertura directa de crónicas en la baraja**:
  - Eliminado el botón redundante "Crónica" del pie de cada carta.
  - Ahora cualquier clic o pulsación sobre el cuerpo de la carta (imagen, título, etiquetas o relato) abre directamente la ventana modal con la crónica completa.
  - El botón principal de llamada a la acción (CTA) ocupa ahora todo el ancho inferior, ofreciendo una apariencia mucho más limpia, equilibrada y fácil de pulsar en pantallas táctiles y ratón.
  - Actualizadas las guías e indicaciones en todos los idiomas (ES, CA, EN, FR) a *"Pasa el cursor o pulsa cualquier carta para abrir su crónica en detalle"*.

---

## [1.2.0] - 2026-11-06

### ✨ Añadido
- **Gama cromática de 8 tonos temáticos para la baraja desplegable (`FeaturedPromotionsDeck`)**:
  - Selección de estilos con alto contraste: Naranja Otoño (Halloween), Rosa Pastel (Kawaii), Azul Océano (Ferias), Púrpura Mágico (Taller), Verde Bosque (Navidad), Dorado Vintage (Edición), Rojo Rubí (San Valentín) y Negro Noche (Dark Fantasy).
  - Selector visual con muestras circulares en el panel del taller y previsualización de etiqueta en tiempo real.
  - Sincronización completa del color en versiones de escritorio, móvil y en la ventana modal de lectura de crónicas.
- **Galería dinámica de hasta 20 fotos por producto**:
  - Eliminación de la limitación previa de 4 fotos para piezas con múltiples variantes.
  - Asociación visual y automática de cada fotografía con su variante de color correspondiente (ej. Bolígrafo Legami en Panda/Negro, Corgi/Azul, Gatito/Rosa, Jirafa/Amarillo, Dinosaurio/Verde, Koala/Rojo).
  - Sincronización interactiva en la ficha de producto (`ProductModal`): al pulsar sobre un color, la imagen principal cambia instantáneamente al color seleccionado.
  - Galería de miniaturas con desplazamiento horizontal suave (`overflow-x-auto`) apto para pantallas táctiles y escritorio.
- **Acceso privado y discreto al Taller de la Artesana**:
  - Eliminación de accesos públicos en menús y pies de página para clientes comunes.
  - Apertura exclusiva mediante URL privada con hash (`/#taller`, `/#admin`, `?modo=taller`) o combinación secreta de teclado (`Ctrl + Shift + M` o `Alt + T`).
  - Barrera de seguridad con código PIN numérico (`2026`).
- **Favicon oficial de alta definición**:
  - Vectorización y rasterizado con transparencia alfa y anti-aliasing del monograma clásico "M" de Martenscrap en formatos `favicon.ico`, `favicon.png`, `favicon-32x32.png` y `apple-touch-icon.png`.
- **Preparación integral para Vercel**:
  - Creación de `vercel.json` con reescrituras para Single Page Application (SPA), cabeceras de seguridad estrictas (CSP, X-Frame-Options, XSS Protection) y políticas de caché inmutables para assets compilados.

### 🐛 Corregido
- Corregido el estilo estático morado en la vista móvil de la baraja desplegable, adaptándose ahora dinámicamente al color asignado.
- Corregido desbordamiento lateral de tarjetas en pantallas medianas y móviles.
- Limpieza de importaciones no utilizadas y advertencias de TypeScript (`tsc -b`).

---

## [1.1.0] - 2026-11-06

### ✨ Auditoría de Usabilidad y Conversión (CRO / UX)
- **Implementación de mejoras basadas en la evaluación de 7 perfiles hipercríticos**:
  - **Fricción cero en compra móvil**: Botones CTA al alcance del pulgar con efecto háptico y feedback sonoro instantáneo.
  - **Confianza y transparencia de taller**: Sellos de elaboración artesanal por Marta Pastor Escribano en Valencia, políticas de devolución y garantía visible.
  - **Estimador dinámico de entrega**: Cálculo en tiempo real de fechas de entrega ("Recíbelo entre el...") con transportista Correos Express con tracking.
  - **Doble estado de fabricación**: Distinción clara entre artículos *"🟢 Listo para enviar (24-48h)"* y piezas *"🟣 Hecho a mano bajo pedido (2-4 días)"*.
  - **Ficha de producto enriquecida con pestañas**:
    - Pestaña 1: Historia y descripción de la pieza.
    - Pestaña 2: Ficha técnica con dimensiones reales y materiales sostenibles empleados.
    - Pestaña 3: Recomendaciones de conservación y cuidados para maximizar su durabilidad.
  - **Opciones de empaquetado para regalo**:
    - Opción de envoltorio artesanal para regalo (+1,50 €) con lazo y dedicatoria manuscrita personalizada.
  - **Barra de progreso hacia envío gratis**:
    - Indicador visual dinámico en el carrito de compra que informa al cliente cuánto le falta para alcanzar el umbral de envío gratuito (45 €).
  - **Botón flotante discreto de WhatsApp**:
    - Asistencia directa con la artesana para dudas sobre pedidos y piezas a medida.

---

## [1.0.0] - 2026-11-06

### 🚀 Lanzamiento Inicial
- **Plataforma web artesanal Martenscrap**:
  - Catálogo interactivo por Departamentos (Impresión 3D, Legami, Marcapáginas, Papelería, Textil, Tazas, Complementos, Outlet) y Temáticas/Fandoms (Literario, Halloween, Disney, Anime, Harry Potter, etc.).
  - **Baraja Desplegable Tridimensional** (Editorial Fanning Deck) con micro-carruseles automáticos de fotos y relatos de taller.
  - **Visor 3D Interactivo** desarrollado con Three.js para previsualizar piezas 3D y marcapáginas con texturas simuladas.
  - **Efectos sonoros Web Audio API**: Chasquido de imanes de neodimio y clics mecánicos.
  - **Configurador de Cajas Literarias sorpresa ("Arma tu Caja")**: Selección paso a paso de piezas para regalo con cálculo en vivo.
  - **Localizador de puntos de venta físicos**: Mapa y lista de tiendas asociadas en Valencia, Pontevedra, Tarragona, Málaga y Tenerife.
  - **Soporte internacional de idiomas (i18n)**: Español, Català/Valencià e Inglés.
  - **Modo vela / noche (Candlelight theme)**: Atmósfera de lectura a la luz de las velas.
