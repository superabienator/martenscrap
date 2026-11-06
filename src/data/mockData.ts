import type { Product, StoreLocation, MainDepartment, FandomCategory, SubCategory } from '../types';

export const MAIN_DEPARTMENTS: MainDepartment[] = [
  'TODOS',
  'IMPRESIÓN 3D',
  'LEGAMI',
  'MARCAPÁGINAS',
  'PAPELERÍA',
  'TEXTIL',
  'TAZAS Y BOTELLAS',
  'COMPLEMENTOS',
  'OUTLET'
];

export const FANDOM_CATEGORIES: FandomCategory[] = [
  'TODOS',
  'HARRY POTTER',
  'DISNEY',
  'ANIME / MANGA',
  'CINE - TV',
  'LITERARIO',
  'NAVIDAD',
  'HALLOWEEN',
  'OTROS'
];

export const SUB_CATEGORIES: Record<MainDepartment, SubCategory[]> = {
  'TODOS': ['TODOS'],
  'IMPRESIÓN 3D': ['TODOS', 'Dragones articulados', 'Objetos literarios 3D', 'Clikers', 'MiniFauna', 'Frikadas 3D'],
  'LEGAMI': ['TODOS', 'Bolígrafos borrables Legami', 'Papelería Legami', 'San Valentín', 'Complementos Legami'],
  'MARCAPÁGINAS': ['TODOS', 'Marcapáginas magnéticos', 'Marcapáginas tradicionales', 'Marcapáginas metálicos', 'Álbum de marcapáginas'],
  'PAPELERÍA': ['TODOS', 'Diario de lectura', 'Planner', 'Post it', 'Libretas', 'Stickers', 'Láminas', 'Washi Tape'],
  'TEXTIL': ['TODOS', 'Fundas de libros', 'Totebags', 'Estuches', 'Mantas'],
  'TAZAS Y BOTELLAS': ['TODOS', 'Tazas', 'Botellas de aluminio'],
  'COMPLEMENTOS': ['TODOS', 'Standee', 'Contador de libros', 'Llaveros', 'Velas aromáticas', 'Pendientes', 'Gamuzas', 'Alfombrillas', 'Imanes', 'Cajas de Regalo'],
  'OUTLET': ['TODOS']
};

export const PRODUCTS: Product[] = [
  // --- IMPRESIÓN 3D ---
  {
    id: 'prod-3d-1',
    name: 'Dragón Articulado de Cristal Iridiscente 3D',
    department: 'IMPRESIÓN 3D',
    subCategory: 'Dragones articulados',
    fandom: 'LITERARIO',
    price: 18.90,
    originalPrice: 22.00,
    images: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Dragón articulado de 45 cm fabricado en impresión 3D multicapa con filamento PLA de seda bicolor. Todas las vértebras son móviles e hipnotizantes.',
    features: [
      'Impresión print-in-place sin soportes',
      'Filamento biodegradable de base vegetal',
      'Tacto sedoso con reflejo arcoíris',
      'Excelente elemento antiestrés para escritorios'
    ],
    isNew: true,
    isBestseller: true,
    is3DPrint: true,
    rating: 5.0,
    reviewsCount: 34,
    inStock: true,
    model3dType: 'dragon',
    variations: ['Seda Esmeralda & Oro', 'Seda Amatista & Zafiro', 'Blanco Glaciar Luminiscente'],
    dimensions: '45 cm de longitud x 8.5 cm de envergadura',
    materials: 'Filamento PLA Silk biodegradable de base vegetal (maíz y caña)',
    careInstructions: 'Evitar exposición continua a temperaturas superiores a 55ºC (no dejar en el salpicadero del coche en verano). Limpiar con paño seco o ligeramente húmedo.',
    craftStatus: 'ready_to_ship',
    craftTimeDays: '24-48 horas'
  },
  {
    id: 'prod-3d-2',
    name: 'Sujetalibros de Pulgar Alado 3D "Wings of Reading"',
    department: 'IMPRESIÓN 3D',
    subCategory: 'Objetos literarios 3D',
    fandom: 'LITERARIO',
    price: 6.50,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Accesorio ergonómico con forma de alas de murciélago o dragón que te permite sujetar libros abiertos con una sola mano sin forzar el pulgar.',
    features: [
      'Apertura ergonómica para pulgar de 22 mm',
      'No marca ni dobla las hojas del libro',
      'Acabado mate aterciopelado',
      'Perfecto para leer en la cama o en transporte'
    ],
    isNew: true,
    isBestseller: true,
    is3DPrint: true,
    rating: 4.9,
    reviewsCount: 47,
    inStock: true,
    variations: ['Alas de Murciélago Negras', 'Alas de Dragón Carmesí', 'Alas de Hada Menta'],
    dimensions: '8.5 cm x 3.2 cm (hueco pulgar: 22 mm universal)',
    materials: 'PLA orgánico de alta densidad con acabado satinado',
    careInstructions: 'Apto para lavado a mano con agua tibia.',
    craftStatus: 'ready_to_ship',
    craftTimeDays: '24-48 horas'
  },
  {
    id: 'prod-3d-3',
    name: 'Clicker Mecánico Antiestrés 3D Fidget Switch',
    department: 'IMPRESIÓN 3D',
    subCategory: 'Clikers',
    fandom: 'OTROS',
    price: 5.90,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pulsador antiestrés con switch mecánico de teclado gamer auténtico montado en carcasa 3D con mosquetón para llavero. Sonido clicky adictivo.',
    features: [
      'Switch mecánico Cherry Blue de 50 millones de pulsaciones',
      'Carcasa impresa en 3D de alta densidad',
      'Mosquetón metálico para colgar en mochila'
    ],
    isNew: true,
    isBestseller: false,
    is3DPrint: true,
    rating: 4.8,
    reviewsCount: 19,
    inStock: true,
    model3dType: 'clicker',
    variations: ['Rosa Chicle', 'Negro Mate', 'Lila Lavanda', 'Verde Pastel'],
    dimensions: '2.8 cm x 2.8 cm x 3.5 cm (más mosquetón 4 cm)',
    materials: 'Switch mecánico Outemu Blue / Cherry MX + Carcasa PLA reforzada',
    careInstructions: 'Mecanismo seco libre de lubricantes grasos.',
    craftStatus: 'ready_to_ship',
    craftTimeDays: '24-48 horas'
  },

  // --- LEGAMI ---
  {
    id: 'prod-legami-1',
    name: 'Bolígrafo Borrable Legami Panda Tinta Negra',
    department: 'LEGAMI',
    subCategory: 'Bolígrafos borrables Legami',
    fandom: 'OTROS',
    price: 2.95,
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585336261026-7f0bc0179929?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'El auténtico bolígrafo borrable de Legami Milano con figuras adorables y tinta termosensible que desaparece limpiamente al frotar con la bola de silicona sin dañar el papel.',
    features: [
      'Producto 100% original Legami Milano',
      'Tinta termosensible recargable en múltiples colores',
      'Punta de 0.7 mm de trazo suave',
      'Borrador de silicona indestructible en el capuchón',
      'Coleccionable: cada personaje tiene su color de tinta característico'
    ],
    isNew: false,
    isBestseller: true,
    isLegami: true,
    rating: 5.0,
    reviewsCount: 112,
    inStock: true,
    variations: [
      'Panda (Tinta Negra)',
      'Corgi (Tinta Azul)',
      'Gatito (Tinta Rosa)',
      'Jirafa (Tinta Amarilla)',
      'Dinosaurio (Tinta Verde)',
      'Koala (Tinta Roja)'
    ],
    dimensions: 'Longitud: 15 cm | Punta: 0.7 mm',
    materials: 'Cuerpo plástico soft-touch con borrador de silicona termosensible',
    careInstructions: 'No dejar al sol directo para evitar que la tinta termosensible se aclare temporalmente.',
    craftStatus: 'ready_to_ship',
    craftTimeDays: '24 horas'
  },
  {
    id: 'prod-legami-2',
    name: 'Set Gomas de Borrar Kawaii Legami "Sweet Treats"',
    department: 'LEGAMI',
    subCategory: 'Papelería Legami',
    fandom: 'OTROS',
    price: 3.50,
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Set de gomas de borrar con formas de helados y cupcakes de Legami. Vienen en una cajita decorativa de regalo.',
    features: [
      'Libres de látex y tóxicos',
      'Piezas desmontables coleccionables',
      'Aroma sutil a vainilla'
    ],
    isNew: false,
    isBestseller: false,
    isLegami: true,
    rating: 4.8,
    reviewsCount: 22,
    inStock: true,
    dimensions: 'Caja expositora: 8 x 6 cm',
    materials: 'Goma sintética libre de ftalatos',
    careInstructions: 'Mantener en su estuche.',
    craftStatus: 'ready_to_ship',
    craftTimeDays: '24 horas'
  },

  // --- MARCAPÁGINAS ---
  {
    id: 'prod-bm-1',
    name: 'Marcapáginas magnéticos chicas Halloween',
    department: 'MARCAPÁGINAS',
    subCategory: 'Marcapáginas magnéticos',
    fandom: 'HALLOWEEN',
    price: 4.50,
    originalPrice: 5.50,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Marcapáginas magnético plegable con acabado laminado soft-touch anti-arañazos y doble imán de neodimio de fijación firme.',
    features: [
      '100% hecho a mano en taller propio',
      'Cierre magnético de precisión ultra-fino',
      'Laminado mate aterciopelado',
      'Ilustración original a doble cara'
    ],
    isNew: true,
    isBestseller: true,
    hasMagneticSnap: true,
    customizable: true,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    model3dType: 'bookmark',
    variations: ['Brujita Calabaza', 'Vampiretta Elegante', 'Gatita Negra Fantasma'],
    dimensions: 'Plegado: 6 x 4.5 cm | Desplegado: 12 x 4.5 cm',
    materials: 'Papel fotográfico satinado 300g, laminado mate aterciopelado soft-touch e imanes de neodimio N52',
    careInstructions: 'No sumergir en agua. Limpiar con un paño seco si se mancha.',
    craftStatus: 'made_to_order',
    craftTimeDays: '2-3 días laborables'
  },
  {
    id: 'prod-bm-2',
    name: 'Álbum Archivador de Marcapáginas (120 fundas)',
    department: 'MARCAPÁGINAS',
    subCategory: 'Álbum de marcapáginas',
    fandom: 'LITERARIO',
    price: 16.90,
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'El álbum definitivo para coleccionistas de marcapáginas. Fundas transparentes ultra-claras libres de ácido que conservan tus piezas intactas.',
    features: [
      'Capacidad para 120 marcapáginas estándar y magnéticos',
      'Plásticos libres de PVC que no amarillean',
      'Tapa dura decorada con estampación holográfica'
    ],
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviewsCount: 45,
    inStock: true,
    dimensions: '21 x 15 cm (A5) con bolsillos de 20 x 5.5 cm',
    materials: 'Tapa rígida laminada + fundas de polipropileno libre de ácido',
    careInstructions: 'Mantener en lugar seco alejado de la humedad directa.',
    craftStatus: 'ready_to_ship',
    craftTimeDays: '24-48 horas'
  },

  // --- TEXTIL ---
  {
    id: 'prod-tex-1',
    name: 'Funda de Libros Acolchada Book Sleeve "Corte de la Noche"',
    department: 'TEXTIL',
    subCategory: 'Fundas de libros',
    fandom: 'LITERARIO',
    price: 15.90,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Funda protectora acolchada con cremallera y bolsillo exterior para marcapáginas. Protege tus libros de golpes y esquinas dobladas dentro de la mochila.',
    features: [
      'Relleno de espuma viscoelástica de 5 mm antigolpes',
      'Forro interior de algodón suave impermeable',
      'Apta para libros de hasta 600 páginas y Kindle/e-reader',
      'Cierre con cremallera dorada anti-enganches'
    ],
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviewsCount: 68,
    inStock: true,
    variations: ['Corte de la Noche (Lila y Oro)', 'Flores Silvestres Vintage', 'Hogwarts Nocturno'],
    dimensions: '28 cm x 21 cm (Apta para libros tapa dura de hasta 24x17 cm)',
    materials: 'Loneta exterior 100% algodón estampada, guata viscoelástica 5mm y forro interior popelín',
    careInstructions: 'Lavado a mano o en programa delicado a máximo 30ºC. No usar secadora. Planchar a temperatura media con paño protector.',
    craftStatus: 'made_to_order',
    craftTimeDays: '3-4 días laborables'
  },
  {
    id: 'prod-tex-2',
    name: 'Totebag Ilustrada 100% Algodón "Un Libro y un Café"',
    department: 'TEXTIL',
    subCategory: 'Totebags',
    fandom: 'OTROS',
    price: 12.50,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bolsa de tela de alta densidad (220 g/m²) con asas largas reforzadas. Aguanta el peso de hasta 5 libros gruesos sin deformarse.',
    features: [
      '100% algodón orgánico certificado OEKO-TEX',
      'Asas con costura en X para máxima resistencia',
      'Bolsillo interior con cremallera para llaves y móvil'
    ],
    isNew: false,
    isBestseller: false,
    rating: 4.8,
    reviewsCount: 31,
    inStock: true
  },

  // --- TAZAS Y BOTELLAS ---
  {
    id: 'prod-taza-1',
    name: 'Taza de Cerámica Ilustrada "Solo un capítulo más y a dormir"',
    department: 'TAZAS Y BOTELLAS',
    subCategory: 'Tazas',
    fandom: 'LITERARIO',
    price: 11.90,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Taza de cerámica esmaltada de 350 ml apta para microondas y lavavajillas. Ilustración a todo color que no pierde intensidad.',
    features: [
      'Cerámica de alta calidad AAA',
      'Capacidad: 350 ml',
      'Apta para lavavajillas y microondas'
    ],
    isNew: false,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 42,
    inStock: true
  },

  // --- PAPELERÍA ---
  {
    id: 'prod-pap-1',
    name: 'Diario de lectura A5 Princesas y Villanas (100 reseñas)',
    department: 'PAPELERÍA',
    subCategory: 'Diario de lectura',
    fandom: 'LITERARIO',
    price: 18.50,
    images: [
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Lleva el registro de todas tus aventuras literarias con fichas de 100 reseñas, estadísticas y retos.',
    features: [
      'Papel de 120 g/m² que no traspasa la tinta',
      'Tapa dura cosida apertura 180°',
      'Bolsillo interior para marcapáginas'
    ],
    isNew: false,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 51,
    inStock: true
  },
  {
    id: 'prod-pap-2',
    name: 'Set Sticky Notes Transparentes para Anotación de Libros',
    department: 'PAPELERÍA',
    subCategory: 'Post it',
    fandom: 'LITERARIO',
    price: 4.20,
    images: [
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Pestañas y notas translúcidas que te permiten subrayar y escribir notas sobre las páginas de tus libros sin manchar el papel original.',
    features: [
      'Material PET translúcido resistente al agua',
      'Adhesivo suave reposicionable',
      '200 pestañas en 10 colores pastel estéticos'
    ],
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviewsCount: 89,
    inStock: true
  },

  // --- COMPLEMENTOS ---
  {
    id: 'prod-comp-1',
    name: 'Vela Aromática Literaria de Soja "Librería Antigua & Café"',
    department: 'COMPLEMENTOS',
    subCategory: 'Velas aromáticas',
    fandom: 'LITERARIO',
    price: 13.90,
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Vela 100% cera de soja vegetal vertida a mano en vaso de cristal ámbar. Notas de papel envejecido, cuero, vainilla cálida y café tostado.',
    features: [
      'Cera de soja biodegradable de combustión limpia',
      'Mecha de madera crepitante efecto chimenea',
      'Duración aproximada: 45 horas'
    ],
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true
  },
  {
    id: 'prod-comp-2',
    name: 'Standee Acrílico 3D Heroína de Fantasía & Dragón',
    department: 'COMPLEMENTOS',
    subCategory: 'Standee',
    fandom: 'ANIME / MANGA',
    price: 12.90,
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Figura de colección en metacrilato óptico de alta pureza (4 mm). Impresión UV en capas con acabado brillante.',
    features: [
      'Acrílico fundido de 4 mm',
      'Efecto de profundidad tridimensional',
      'Base encajable serigrafiada'
    ],
    isNew: true,
    isBestseller: false,
    rating: 4.8,
    reviewsCount: 17,
    inStock: true,
    model3dType: 'standee'
  },
  {
    id: 'prod-comp-3',
    name: 'Contador de Libros de Madera Artesanal Grabado',
    department: 'COMPLEMENTOS',
    subCategory: 'Contador de libros',
    fandom: 'LITERARIO',
    price: 14.50,
    images: [
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Accesorio de madera de haya natural cortado y grabado a láser. Permite girar los diales magnéticos para contar los libros leídos en tu reto.',
    features: [
      'Madera de haya sostenible FSC',
      'Marcadores magnéticos integrados',
      'Mide hasta 99 libros al año'
    ],
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 23,
    inStock: true,
    model3dType: 'tracker'
  },

  // --- OUTLET ---
  {
    id: 'prod-out-1',
    name: 'Set Marcapáginas Colección Otoño Pasado (Pack 4 uds)',
    department: 'OUTLET',
    subCategory: 'Marcapáginas magnéticos',
    fandom: 'OTROS',
    price: 6.90,
    originalPrice: 14.00,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Últimas unidades en liquidación de nuestra colección de otoño anterior con más del 50% de descuento.',
    features: [
      'Pack de 4 marcapáginas magnéticos',
      'Descuento irrepetible hasta fin de existencias'
    ],
    isNew: false,
    isBestseller: false,
    rating: 4.7,
    reviewsCount: 15,
    inStock: true
  }
];

export const PHYSICAL_STORES: StoreLocation[] = [
  {
    id: 'store-valencia-1',
    province: 'Valencia',
    name: 'Punto de Venta Quart de Poblet',
    address: 'Avinguda Antic Regne de València, 26',
    postalCode: '46930',
    city: 'Quart de Poblet, Valencia',
    googleMapsUrl: 'https://maps.google.com/?q=Avinguda+Antic+Regne+de+Valencia+26+46930+Quart+de+Poblet'
  },
  {
    id: 'store-valencia-2',
    province: 'Valencia',
    name: 'Librería Benicalap',
    address: 'Calle de José Grollo, 135, bajo',
    postalCode: '46025',
    city: 'València Capital',
    googleMapsUrl: 'https://maps.google.com/?q=Calle+de+Jose+Grollo+135+46025+Valencia'
  },
  {
    id: 'store-valencia-3',
    province: 'Valencia',
    name: 'Espacio C.C. Arena Multiespacio',
    address: 'C/ de Santa Genoveva Torres, 21',
    postalCode: '46019',
    city: 'València',
    isMall: true,
    mallName: 'Centro Comercial Arena',
    googleMapsUrl: 'https://maps.google.com/?q=Centro+Comercial+Arena+Valencia'
  },
  {
    id: 'store-valencia-4',
    province: 'Valencia',
    name: 'Espacio C.C. Nuevo Centro',
    address: 'Av. de Pius XII, 2',
    postalCode: '46009',
    city: 'València',
    isMall: true,
    mallName: 'Centro Comercial Nuevo Centro',
    googleMapsUrl: 'https://maps.google.com/?q=Centro+Comercial+Nuevo+Centro+Valencia'
  },
  {
    id: 'store-valencia-5',
    province: 'Valencia',
    name: 'Espacio C.C. Bonaire',
    address: 'Carretera A-3, Km 345, Local B-368',
    postalCode: '46960',
    city: 'Aldaia, Valencia',
    isMall: true,
    mallName: 'Centro Comercial Bonaire',
    googleMapsUrl: 'https://maps.google.com/?q=Centro+Comercial+Bonaire+Valencia'
  },
  {
    id: 'store-valencia-6',
    province: 'Valencia',
    name: 'Espacio C.C. L\'Epicentre',
    address: 'Avinguda de l\'Advocat Fausto Caruana, 37',
    postalCode: '46520',
    city: 'Port de Sagunt, Valencia',
    isMall: true,
    mallName: 'Centro Comercial L\'Epicentre',
    googleMapsUrl: 'https://maps.google.com/?q=Centro+Comercial+Epicentre+Sagunt'
  },
  {
    id: 'store-pontevedra',
    province: 'Pontevedra',
    name: 'Librería & Papelería Gondomar',
    address: 'Av. Elduayen, bajo, Nº 19',
    postalCode: '36380',
    city: 'Gondomar, Pontevedra',
    googleMapsUrl: 'https://maps.google.com/?q=Av.+Elduayen+19+36380+Gondomar'
  },
  {
    id: 'store-tarragona',
    province: 'Tarragona',
    name: 'Punto de Venta Reus Centro',
    address: 'Carrer de Jesús, 5',
    postalCode: '43201',
    city: 'Reus, Tarragona',
    googleMapsUrl: 'https://maps.google.com/?q=Carrer+de+Jesus+5+43201+Reus'
  },
  {
    id: 'store-malaga',
    province: 'Málaga',
    name: 'Espacio Alameda Principal',
    address: 'Alameda Principal, 37',
    postalCode: '29001',
    city: 'Málaga Centro',
    googleMapsUrl: 'https://maps.google.com/?q=Alameda+Principal+37+29001+Malaga'
  },
  {
    id: 'store-tenerife',
    province: 'Santa Cruz de Tenerife',
    name: 'Librería El Sauzal',
    address: 'Av. Inmaculada Concepción, 18, Local Librería',
    postalCode: '38360',
    city: 'El Sauzal, Santa Cruz de Tenerife',
    googleMapsUrl: 'https://maps.google.com/?q=Av.+Inmaculada+Concepcion+18+38360+El+Sauzal'
  }
];
