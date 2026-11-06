# Historial de Cambios y Novedades (Changelog)

Todas las mejoras notables, adiciones funcionales y optimizaciones de este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

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
