import type { MainDepartment, FandomCategory, SubCategory } from '../types';

export type PromoBadgeStyle =
  | 'halloween'
  | 'kawaii'
  | 'event'
  | 'mystery'
  | 'christmas'
  | 'gold'
  | 'ruby'
  | 'dark';

export interface CardColorPreset {
  id: PromoBadgeStyle;
  name: string;
  dotColor: string;
  badgeClasses: string;
  accentBorder: string;
}

export const PROMO_COLOR_PRESETS: CardColorPreset[] = [
  {
    id: 'halloween',
    name: '🎃 Naranja Otoño / Halloween',
    dotColor: '#F59E0B',
    badgeClasses: 'bg-amber-500 text-stone-950 font-black ring-1 ring-amber-300',
    accentBorder: 'border-amber-300'
  },
  {
    id: 'kawaii',
    name: '🌸 Rosa Pastel / Kawaii',
    dotColor: '#F43F5E',
    badgeClasses: 'bg-rose-500 text-white font-black ring-1 ring-rose-300',
    accentBorder: 'border-rose-300'
  },
  {
    id: 'event',
    name: '🌊 Azul Océano / Ferias',
    dotColor: '#0891B2',
    badgeClasses: 'bg-cyan-600 text-white font-black ring-1 ring-cyan-300',
    accentBorder: 'border-cyan-300'
  },
  {
    id: 'mystery',
    name: '🔮 Púrpura Mágico / Taller',
    dotColor: '#9333EA',
    badgeClasses: 'bg-[#9333EA] text-white font-black ring-1 ring-purple-300',
    accentBorder: 'border-purple-300'
  },
  {
    id: 'christmas',
    name: '🌲 Verde Bosque / Navidad',
    dotColor: '#059669',
    badgeClasses: 'bg-emerald-600 text-white font-black ring-1 ring-emerald-300',
    accentBorder: 'border-emerald-300'
  },
  {
    id: 'gold',
    name: '⭐ Dorado Vintage / Edición',
    dotColor: '#D97706',
    badgeClasses: 'bg-amber-600 text-amber-50 font-black ring-1 ring-amber-400',
    accentBorder: 'border-amber-400'
  },
  {
    id: 'ruby',
    name: '🍓 Rojo Rubí / San Valentín',
    dotColor: '#DC2626',
    badgeClasses: 'bg-red-600 text-white font-black ring-1 ring-red-300',
    accentBorder: 'border-red-300'
  },
  {
    id: 'dark',
    name: '🖤 Negro Noche / Dark Fantasy',
    dotColor: '#1C1917',
    badgeClasses: 'bg-stone-900 text-stone-100 font-black ring-1 ring-stone-600',
    accentBorder: 'border-stone-400'
  }
];

export const getPromoBadgeClasses = (style?: string) => {
  const found = PROMO_COLOR_PRESETS.find(p => p.id === style);
  return found ? found.badgeClasses : 'bg-[#9333EA] text-white font-black ring-1 ring-purple-300';
};

export interface EditorialFeature {
  id: string;
  category: 'TEMPORADA' | 'EVENTO' | 'COLECCIÓN CÁPSULA' | 'DIARIO DE TALLER' | string;
  badgeText: string;
  badgeStyle: PromoBadgeStyle | string;
  dateLabel: string;
  title: string;
  subtitle: string;
  story: string;
  includedItemsSummary: string[];
  itemCountLabel: string;
  images: {
    url: string;
    caption: string;
  }[];
  ctaText: string;
  targetAction: 'filter' | 'locator' | 'box';
  targetFilter?: {
    department?: MainDepartment;
    fandom?: FandomCategory;
    subCategory?: SubCategory;
  };
}

export const EDITORIAL_FEATURES: EditorialFeature[] = [
  {
    id: 'feat-halloween',
    category: 'TEMPORADA',
    badgeText: '🎃 ESPECIAL HALLOWEEN',
    badgeStyle: 'halloween',
    dateLabel: 'Campaña de Otoño • Edición Limitada',
    title: 'Aquelarre Literario & Criaturas Oscuras',
    subtitle: 'Brujitas magnéticas, dragones negros 3D y velas de calabaza especiada',
    story: 'Inspirada en el folclore gótico y la fantasía oscura. Este mes el taller se llena de marcapáginas con foil holográfico, dragones articulados en filamento mate Dark Obsidian y fundas acolchadas en terciopelo noche.',
    includedItemsSummary: [
      'Marcapáginas magnéticos de Brujitas',
      'Dragón Articulado Dark Obsidian 3D',
      'Funda de libros aterciopelada Corte Nocturna',
      'Velas de soja artesanal Calabaza & Canela'
    ],
    itemCountLabel: '+14 piezas artesanales',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
        caption: 'Ambiente otoñal y lectura entre calabazas de taller'
      },
      {
        url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
        caption: 'Dragones 3D Dark Obsidian con vértebras articuladas'
      },
      {
        url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
        caption: 'Mesa de lectura a la luz de las velas'
      }
    ],
    ctaText: 'Ver Colección Halloween',
    targetAction: 'filter',
    targetFilter: {
      fandom: 'HALLOWEEN'
    }
  },
  {
    id: 'feat-legami-kawaii',
    category: 'COLECCIÓN CÁPSULA',
    badgeText: '🌸 REMESA KAWAII 2026',
    badgeStyle: 'kawaii',
    dateLabel: 'Novedades de Milán en Taller',
    title: 'Legami Manía: Bolis Borrables & Papelería Pastel',
    subtitle: 'La ternura italiana combinada con libretas y complementos artesanales',
    story: 'Llega la nueva tirada de bolígrafos borrables térmicos de animales Legami (Panda, Corgi, Koala y Osito), junto a libretas cosidas a mano con guardas florales y pegatinas exclusivas de Marta Pastor.',
    includedItemsSummary: [
      'Bolis borrables termosensibles Legami',
      'Diarios de lectura encuadernados a mano',
      'Gomas desmontables Sweet Treats',
      'Planners semanales tonos pastel'
    ],
    itemCountLabel: '+18 novedades kawaii',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
        caption: 'Bolis Legami y organización de escritorio pastel'
      },
      {
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
        caption: 'Gomas kawaii y complementos de lectura'
      },
      {
        url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
        caption: 'Diario de lecturas y caligrafía artesanal'
      }
    ],
    ctaText: 'Explorar Universo Legami',
    targetAction: 'filter',
    targetFilter: {
      department: 'LEGAMI'
    }
  },
  {
    id: 'feat-ferias-evento',
    category: 'EVENTO',
    badgeText: '📍 ENCUENTROS DE AUTOR',
    badgeStyle: 'event',
    dateLabel: 'Valencia • Madrid • Barcelona',
    title: 'Gira de Ferias & Firmas en Directo',
    subtitle: 'Conoce a Marta Pastor, descubre el proceso 3D y llévate tu dedicatoria',
    story: 'Este trimestre nos desplazamos a ferias del libro y eventos de fantasía. Llevaremos muestras en directo del modelado 3D de dragones, marcapáginas conmemorativos de edición limitada y dedicatorias personalizadas.',
    includedItemsSummary: [
      'Marcapáginas conmemorativo de feria',
      'Demostración de impresión 3D en vivo',
      'Dedicatoria caligráfica y packaging exclusivo',
      'Muestrario de texturas y metacrilatos'
    ],
    itemCountLabel: 'Próxima parada: 15 de Noviembre',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
        caption: 'Puesto artesanal de taller y libros de autor'
      },
      {
        url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        caption: 'Dedicatorias y marcapáginas firmados en persona'
      },
      {
        url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
        caption: 'Álbumes archivadores para coleccionistas'
      }
    ],
    ctaText: 'Ver Puntos & Tiendas Físicas',
    targetAction: 'locator'
  },
  {
    id: 'feat-mystery-boxes',
    category: 'DIARIO DE TALLER',
    badgeText: '🎁 EXPERIENCIA DE AUTOR',
    badgeStyle: 'mystery',
    dateLabel: 'Servicio Artesanal Permanente',
    title: 'Cajas Literarias & Experiencia "Arma tu Caja"',
    subtitle: 'Cajas sorpresa temáticas con lacre tradicional, lazo de raso y selección sorpresa',
    story: 'Un unboxing inolvidable concebido para lectores empedernidos. Cada caja se prepara a mano en Valencia: combinamos figura 3D, marcapáginas magnéticos, funda de libro y carta manuscrita sellada a la cera.',
    includedItemsSummary: [
      '1 Dragón o pieza 3D a elección',
      'Funda de libro acolchada de autor',
      '2 Marcapáginas magnéticos de neodimio',
      'Carta de bienvenida con sello de lacre'
    ],
    itemCountLabel: 'Personalización al 100%',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
        caption: 'Caja de regalo artesanal con cinta de raso'
      },
      {
        url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
        caption: 'Detalles y sorpresas envueltas a mano'
      },
      {
        url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
        caption: 'Sello lacrado y presentación lista para regalar'
      }
    ],
    ctaText: 'Configurar Mi Caja Regalo',
    targetAction: 'box'
  }
];
