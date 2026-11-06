export type MainDepartment =
  | 'TODOS'
  | 'IMPRESIÓN 3D'
  | 'LEGAMI'
  | 'MARCAPÁGINAS'
  | 'PAPELERÍA'
  | 'TEXTIL'
  | 'TAZAS Y BOTELLAS'
  | 'COMPLEMENTOS'
  | 'OUTLET';

export type FandomCategory = 
  | 'TODOS'
  | 'HARRY POTTER'
  | 'DISNEY'
  | 'ANIME / MANGA'
  | 'CINE - TV'
  | 'LITERARIO'
  | 'NAVIDAD'
  | 'HALLOWEEN'
  | 'OTROS';

export type SubCategory =
  | 'TODOS'
  // 3D
  | 'Dragones articulados'
  | 'Objetos literarios 3D'
  | 'Clikers'
  | 'MiniFauna'
  | 'Frikadas 3D'
  // Legami
  | 'Bolígrafos borrables Legami'
  | 'Papelería Legami'
  | 'San Valentín'
  | 'Complementos Legami'
  // Marcapáginas
  | 'Marcapáginas magnéticos'
  | 'Marcapáginas tradicionales'
  | 'Marcapáginas metálicos'
  | 'Álbum de marcapáginas'
  // Papelería
  | 'Diario de lectura'
  | 'Planner'
  | 'Post it'
  | 'Libretas'
  | 'Stickers'
  | 'Láminas'
  | 'Washi Tape'
  // Textil
  | 'Fundas de libros'
  | 'Totebags'
  | 'Estuches'
  | 'Mantas'
  // Tazas
  | 'Tazas'
  | 'Botellas de aluminio'
  // Complementos
  | 'Standee'
  | 'Contador de libros'
  | 'Llaveros'
  | 'Velas aromáticas'
  | 'Pendientes'
  | 'Gamuzas'
  | 'Alfombrillas'
  | 'Imanes'
  | 'Cajas de Regalo';

export interface Product {
  id: string;
  name: string;
  department: MainDepartment;
  subCategory: SubCategory;
  fandom: FandomCategory;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  features: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  is3DPrint?: boolean;
  isLegami?: boolean;
  hasMagneticSnap?: boolean;
  customizable?: boolean;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  variations?: string[];
  model3dType?: 'bookmark' | 'standee' | 'tracker' | 'clicker' | 'dragon';
  dimensions?: string;
  materials?: string;
  careInstructions?: string;
  craftStatus?: 'ready_to_ship' | 'made_to_order';
  craftTimeDays?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariation?: string;
  customText?: string;
  isGiftWrap?: boolean;
  giftMessage?: string;
}

export interface StoreLocation {
  id: string;
  province: 'Valencia' | 'Pontevedra' | 'Tarragona' | 'Málaga' | 'Santa Cruz de Tenerife';
  name: string;
  address: string;
  postalCode: string;
  city: string;
  isMall?: boolean;
  mallName?: string;
  googleMapsUrl: string;
}
