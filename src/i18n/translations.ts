export type Language = 'es' | 'ca' | 'en' | 'fr';

export interface Translations {
  // Common / Header
  topNotice: string;
  handcrafted: string;
  freeShippingBanner: string;
  workflow3D: string;
  storesLink: string;
  home: string;
  print3D: string;
  legami: string;
  bookmarks: string;
  stationery: string;
  fandoms: string;
  outlet: string;
  buildBox: string;
  searchPlaceholder: string;
  myAccount: string;
  login: string;
  register: string;
  logout: string;
  cart: string;
  wishlist: string;

  // Hero
  heroPill: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  exploreCatalog: string;
  customBoxBtn: string;
  uniqueBadge: string;
  uniqueDesc: string;
  magnetBadge: string;
  magnetDesc: string;
  fastShippingBadge: string;
  fastShippingDesc: string;

  // Catalog
  catalogBadge: string;
  catalogTitle: string;
  catalogTitleHighlight: string;
  catalogSubtitle: string;
  showingItems: string;
  filterDepartment: string;
  filterSubcategory: string;
  filterFandom: string;
  all: string;
  newBadge: string;
  bestsellerBadge: string;
  addToCart: string;
  quickView: string;
  magneticClosure: string;

  // 3D Lab
  labTitle: string;
  labSubtitle: string;
  resetView: string;
  autoRotate: string;
  zoomIn: string;
  zoomOut: string;

  // Wishlist Drawer
  wishlistTitle: string;
  wishlistEmpty: string;
  wishlistEmptySub: string;
  moveToCart: string;
  removeFromWishlist: string;
  clearWishlist: string;

  // Featured Fanning Deck / Promociones
  featuredDeckBadge: string;
  featuredDeckTitle: string;
  featuredDeckHighlight: string;
  featuredDeckSubtitle: string;
  cardDeckHint: string;
  viewPiece: string;
  addToCartFast: string;
  discountBadge: string;
  limitedEdition: string;

  // Cart Drawer
  cartTitle: string;
  cartEmpty: string;
  cartEmptySub: string;
  freeShippingAlert: string;
  missingForFreeShipping: string;
  couponCode: string;
  applyCoupon: string;
  subtotal: string;
  shipping: string;
  freeShipping: string;
  discount: string;
  total: string;
  checkoutBtn: string;

  // Auth Modal
  loginTitle: string;
  registerTitle: string;
  forgotTitle: string;
  emailLabel: string;
  passwordLabel: string;
  nameLabel: string;
  loginSubmit: string;
  registerSubmit: string;
  sendResetLink: string;
  noAccount: string;
  haveAccount: string;
  forgotPasswordLink: string;
  acceptTermsPrompt: string;
  welcomeBack: string;

  // Footer & Legal
  artisanshipFooter: string;
  carefulShippingFooter: string;
  securePaymentFooter: string;
  legalNotice: string;
  privacyPolicy: string;
  cookiePolicy: string;
  termsWithdrawal: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  es: {
    topNotice: 'Diseños propios hechos a mano por Marta Pastor Escribano • Envíos gratis desde 45 €',
    handcrafted: 'ARTESANAL',
    freeShippingBanner: 'Envíos gratis desde 45 €',
    workflow3D: 'Flujo 3D',
    storesLink: 'Tiendas físicas (Valencia, Málaga, Tenerife...)',
    home: 'Inicio',
    print3D: 'Impresión 3D',
    legami: 'Legami Milano',
    bookmarks: 'Marcapáginas',
    stationery: 'Papelería & Textil',
    fandoms: 'Fandoms',
    outlet: 'Outlet',
    buildBox: 'Arma tu Caja',
    searchPlaceholder: 'Buscar dragones 3D, bolis Legami, marcapáginas...',
    myAccount: 'Mi Cuenta',
    login: 'Iniciar Sesión',
    register: 'Crear Cuenta',
    logout: 'Cerrar Sesión',
    cart: 'Cesta',
    wishlist: 'Favoritos',

    heroPill: 'Colección 2026 • Marcapáginas, Impresión 3D & Legami',
    heroTitle1: 'Marcapáginas magnéticos, figuras 3D y coleccionables',
    heroTitleHighlight: 'hechos a mano.',
    heroSubtitle: 'Diseños propios nacidos del amor por la literatura, el anime y la fantasía. Descubre nuestros dragones articulados 3D, bolígrafos kawaii Legami y marcapáginas con imanes de neodimio que no dañan tus páginas.',
    exploreCatalog: 'Explorar Catálogo',
    customBoxBtn: 'Armar Caja Regalo',
    uniqueBadge: '100% Únicos',
    uniqueDesc: 'Diseños propios',
    magnetBadge: 'Imán Neodimio',
    magnetDesc: 'Cierre seguro',
    fastShippingBadge: 'Envío Rápido',
    fastShippingDesc: 'Gratis desde 45 €',

    catalogBadge: 'Catálogo General & Colecciones',
    catalogTitle: 'Todos los Universos de',
    catalogTitleHighlight: 'Martenscrap',
    catalogSubtitle: 'Desde marcapáginas magnéticos y papelería kawaii Legami hasta dragones articulados y complementos 3D.',
    showingItems: 'Mostrando',
    filterDepartment: 'Departamento',
    filterSubcategory: 'Subcategoría',
    filterFandom: 'Universo / Fandom',
    all: 'Todos',
    newBadge: 'Novedad',
    bestsellerBadge: 'Top Ventas',
    addToCart: 'Añadir a la cesta',
    quickView: 'Vista Rápida',
    magneticClosure: 'Cierre Magnético',

    labTitle: 'Laboratorio 3D WebGL',
    labSubtitle: 'Interactúa, gira en 360° y haz zoom en nuestras piezas artesanales',
    resetView: 'Restablecer',
    autoRotate: 'Giro Auto',
    zoomIn: 'Acercar',
    zoomOut: 'Alejar',

    wishlistTitle: 'Tus Artículos Favoritos',
    wishlistEmpty: 'Tu lista de deseos está vacía',
    wishlistEmptySub: 'Explora nuestros dragones 3D y marcapáginas y pulsa en el corazón para guardarlos aquí.',
    moveToCart: 'Añadir a la cesta',
    removeFromWishlist: 'Quitar',
    clearWishlist: 'Vaciar lista',

    featuredDeckBadge: 'Selección Exclusiva de Taller',
    featuredDeckTitle: 'Promociones & Novedades',
    featuredDeckHighlight: 'Artesanales',
    featuredDeckSubtitle: 'Descubre las piezas más deseadas de este mes: dragones 3D de seda, sets magnéticos y cajas de autor con descuentos especiales.',
    cardDeckHint: 'Pasa el cursor o pulsa una carta para desplegarla en detalle',
    viewPiece: 'Ver pieza',
    addToCartFast: 'Añadir a la cesta',
    discountBadge: 'OFERTA',
    limitedEdition: 'Edición Limitada',

    cartTitle: 'Tu Cesta de Lecturas',
    cartEmpty: 'Tu cesta está vacía',
    cartEmptySub: 'Descubre marcapáginas, dragones articulados y complementos para tus lecturas.',
    freeShippingAlert: '¡Tienes ENVÍO GRATUITO!',
    missingForFreeShipping: 'Añade {amount} € para envío gratis',
    couponCode: 'CÓDIGO DE CUPÓN',
    applyCoupon: 'Aplicar',
    subtotal: 'Subtotal',
    shipping: 'Gastos de envío',
    freeShipping: 'GRATIS',
    discount: 'Descuento',
    total: 'Total del pedido',
    checkoutBtn: 'Tramitar Pedido Seguro',

    loginTitle: 'Iniciar Sesión',
    registerTitle: 'Crear Nueva Cuenta',
    forgotTitle: 'Recuperar Contraseña',
    emailLabel: 'Correo Electrónico',
    passwordLabel: 'Contraseña',
    nameLabel: 'Nombre y Apellidos',
    loginSubmit: 'Entrar a mi cuenta',
    registerSubmit: 'Crear cuenta de cliente',
    sendResetLink: 'Enviar enlace de recuperación',
    noAccount: '¿Aún no tienes cuenta? Regístrate aquí',
    haveAccount: '¿Ya eres cliente? Inicia sesión',
    forgotPasswordLink: '¿Olvidaste tu contraseña?',
    acceptTermsPrompt: 'Acepto la Política de Privacidad y las condiciones de usuario.',
    welcomeBack: '¡Bienvenida de nuevo!',

    artisanshipFooter: 'Artesanía de Autor',
    carefulShippingFooter: 'Envíos Cuidados',
    securePaymentFooter: 'Pago Seguro',
    legalNotice: 'Aviso Legal (LSSI-CE)',
    privacyPolicy: 'Política de Privacidad (RGPD)',
    cookiePolicy: 'Política de Cookies',
    termsWithdrawal: 'Términos & Desistimiento 14D'
  },

  ca: {
    topNotice: 'Dissenys propis fets a mà per Marta Pastor Escribano • Enviaments gratuïts des de 45 €',
    handcrafted: 'ARTESANAL',
    freeShippingBanner: 'Enviaments gratuïts des de 45 €',
    workflow3D: 'Flux 3D',
    storesLink: 'Botigues físiques (València, Màlaga, Tenerife...)',
    home: 'Inici',
    print3D: 'Impressió 3D',
    legami: 'Legami Milano',
    bookmarks: 'Punt de llibre',
    stationery: 'Papereria & Tèxtil',
    fandoms: 'Fàndoms',
    outlet: 'Outlet',
    buildBox: 'Crea la teua Caixeta',
    searchPlaceholder: 'Cerca dracs 3D, bolis Legami, punts de llibre...',
    myAccount: 'El meu Compte',
    login: 'Iniciar Sessió',
    register: 'Crear Compte',
    logout: 'Tancar Sessió',
    cart: 'Cistella',
    wishlist: 'Preferits',

    heroPill: 'Col·lecció 2026 • Punts de llibre, Impressió 3D & Legami',
    heroTitle1: 'Punts de llibre magnètics, figures 3D i col·leccionables',
    heroTitleHighlight: 'fets a mà.',
    heroSubtitle: 'Dissenys propis nascuts de la passió per la lectura, l\'anime i la fantasia. Descobreix els nostres dracs articulats 3D, bolígrafs kawaii Legami i punts amb imants de neodimi que no fan malbé les teues pàgines.',
    exploreCatalog: 'Explorar Catàleg',
    customBoxBtn: 'Preparar Caixa Regal',
    uniqueBadge: '100% Únics',
    uniqueDesc: 'Dissenys propis',
    magnetBadge: 'Imant Neodimi',
    magnetDesc: 'Tancament segur',
    fastShippingBadge: 'Enviament Ràpid',
    fastShippingDesc: 'Gratuït des de 45 €',

    catalogBadge: 'Catàleg General & Col·leccions',
    catalogTitle: 'Tots els Universos de',
    catalogTitleHighlight: 'Martenscrap',
    catalogSubtitle: 'Des de marcapàgines magnètics i papereria kawaii Legami fins a dracs articulats i complements 3D.',
    showingItems: 'Mostrant',
    filterDepartment: 'Departament',
    filterSubcategory: 'Subcategoria',
    filterFandom: 'Univers / Fàndom',
    all: 'Tots',
    newBadge: 'Novetat',
    bestsellerBadge: 'Més Venuts',
    addToCart: 'Afegir a la cistella',
    quickView: 'Vista Ràpida',
    magneticClosure: 'Tancament Magnètic',

    labTitle: 'Laboratori 3D WebGL',
    labSubtitle: 'Interactua, gira en 360° i fes zoom a les nostres peces artesanals',
    resetView: 'Restablir',
    autoRotate: 'Gir Auto',
    zoomIn: 'Apropar',
    zoomOut: 'Allunyar',

    wishlistTitle: 'Els teus Articles Preferits',
    wishlistEmpty: 'La teua llista de desitjos està buida',
    wishlistEmptySub: 'Explora els nostres dracs 3D i marcapàgines i prem al cor per a guardar-los ací.',
    moveToCart: 'Afegir a la cistella',
    removeFromWishlist: 'Llevar',
    clearWishlist: 'Buidar llista',

    featuredDeckBadge: 'Selecció Exclusiva de Taller',
    featuredDeckTitle: 'Promocions & Novetats',
    featuredDeckHighlight: 'Artesanals',
    featuredDeckSubtitle: 'Descobreix les peces més desitjades d\'aquest mes: dracs 3D de seda, sets magnètics i caixes d\'autor amb descomptes especials.',
    cardDeckHint: 'Passa el cursor o prem una carta per a desplegar-la en detall',
    viewPiece: 'Veure peça',
    addToCartFast: 'Afegir a la cistella',
    discountBadge: 'OFERTA',
    limitedEdition: 'Edició Limitada',

    cartTitle: 'La teua Cistella de Lectures',
    cartEmpty: 'La teua cistella està buida',
    cartEmptySub: 'Descobreix marcapàgines, dracs articulats i complements per a les teues lectures.',
    freeShippingAlert: '🎉 Tens ENVIAMENT GRATUÏT!',
    missingForFreeShipping: 'Afig {amount} € per a enviament gratuït',
    couponCode: 'CODI DE CUPÓ',
    applyCoupon: 'Aplicar',
    subtotal: 'Subtotal',
    shipping: 'Despeses d\'enviament',
    freeShipping: 'GRATIS',
    discount: 'Descompte',
    total: 'Total de la comanda',
    checkoutBtn: 'Tramitar Comanda Segura',

    loginTitle: 'Iniciar Sessió',
    registerTitle: 'Crear Nou Compte',
    forgotTitle: 'Recuperar Contrasenya',
    emailLabel: 'Correu Electrònic',
    passwordLabel: 'Contrasenya',
    nameLabel: 'Nom i Cognoms',
    loginSubmit: 'Entrar al meu compte',
    registerSubmit: 'Crear compte de client',
    sendResetLink: 'Enviar enllaç de recuperació',
    noAccount: 'Encara no tens compte? Registra\'t ací',
    haveAccount: 'Ja ets client? Inicia sessió',
    forgotPasswordLink: 'Has oblidat la contrasenya?',
    acceptTermsPrompt: 'Accepte la Política de Privadesa i les condicions d\'usuari.',
    welcomeBack: 'Benvinguda de nou!',

    artisanshipFooter: 'Artesania d\'Autor',
    carefulShippingFooter: 'Enviaments Cuidadosos',
    securePaymentFooter: 'Pagament Segur',
    legalNotice: 'Avís Legal (LSSI-CE)',
    privacyPolicy: 'Política de Privadesa (RGPD)',
    cookiePolicy: 'Política de Cookies',
    termsWithdrawal: 'Termes & Desistiment 14D'
  },

  en: {
    topNotice: 'Handmade original designs by Marta Pastor Escribano • Free EU shipping from €45',
    handcrafted: 'HANDMADE',
    freeShippingBanner: 'Free shipping from €45',
    workflow3D: '3D Workflow',
    storesLink: 'Physical stockists (Valencia, Malaga, Tenerife...)',
    home: 'Home',
    print3D: '3D Printing',
    legami: 'Legami Milano',
    bookmarks: 'Bookmarks',
    stationery: 'Stationery & Textile',
    fandoms: 'Fandoms',
    outlet: 'Outlet',
    buildBox: 'Build a Gift Box',
    searchPlaceholder: 'Search 3D dragons, Legami pens, magnetic bookmarks...',
    myAccount: 'My Account',
    login: 'Sign In',
    register: 'Create Account',
    logout: 'Sign Out',
    cart: 'Cart',
    wishlist: 'Wishlist',

    heroPill: '2026 Collection • Magnetic Bookmarks, 3D Craft & Legami',
    heroTitle1: 'Magnetic bookmarks, 3D art and collectibles',
    heroTitleHighlight: 'crafted by hand.',
    heroSubtitle: 'Original designs born from a deep love for literature, anime, and fantasy. Discover our 3D articulated dragons, cute Legami erasable pens, and gentle neodymium magnetic bookmarks that never pinch paper.',
    exploreCatalog: 'Explore Catalog',
    customBoxBtn: 'Build Gift Box',
    uniqueBadge: '100% Unique',
    uniqueDesc: 'Artisan craft',
    magnetBadge: 'Neodymium Magnet',
    magnetDesc: 'Gentle secure grip',
    fastShippingBadge: 'Fast Dispatch',
    fastShippingDesc: 'Free from €45',

    catalogBadge: 'General Catalog & Collections',
    catalogTitle: 'All Universes by',
    catalogTitleHighlight: 'Martenscrap',
    catalogSubtitle: 'From magnetic bookmarks and kawaii Legami stationery to flexible 3D dragons and book sleeves.',
    showingItems: 'Showing',
    filterDepartment: 'Department',
    filterSubcategory: 'Subcategory',
    filterFandom: 'Universe / Fandom',
    all: 'All',
    newBadge: 'New',
    bestsellerBadge: 'Bestseller',
    addToCart: 'Add to Cart',
    quickView: 'Quick View',
    magneticClosure: 'Magnetic Closure',

    labTitle: '3D WebGL Studio',
    labSubtitle: 'Interact, rotate 360°, and zoom into our handmade pieces',
    resetView: 'Reset View',
    autoRotate: 'Auto Rotate',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',

    wishlistTitle: 'Your Saved Favorites',
    wishlistEmpty: 'Your wishlist is currently empty',
    wishlistEmptySub: 'Explore our 3D dragons, Legami pens, and bookmarks and tap the heart icon to save them here.',
    moveToCart: 'Add to Cart',
    removeFromWishlist: 'Remove',
    clearWishlist: 'Clear all',

    featuredDeckBadge: 'Exclusive Workshop Selection',
    featuredDeckTitle: 'Featured Deals & New',
    featuredDeckHighlight: 'Crafts',
    featuredDeckSubtitle: 'Explore our most-coveted handcrafted items: silk 3D dragons, magnetic bookmarks and author gift boxes with special discounts.',
    cardDeckHint: 'Hover or tap a card to unfold and inspect in full detail',
    viewPiece: 'View piece',
    addToCartFast: 'Add to Cart',
    discountBadge: 'SALE',
    limitedEdition: 'Limited Edition',

    cartTitle: 'Your Reading Bag',
    cartEmpty: 'Your cart is empty',
    cartEmptySub: 'Discover cute bookmarks, articulated dragons, and bookish accessories.',
    freeShippingAlert: '🎉 You have unlocked FREE SHIPPING!',
    missingForFreeShipping: 'Add €{amount} more for free shipping',
    couponCode: 'DISCOUNT CODE',
    applyCoupon: 'Apply',
    subtotal: 'Subtotal',
    shipping: 'Shipping cost',
    freeShipping: 'FREE',
    discount: 'Discount',
    total: 'Order total',
    checkoutBtn: 'Proceed to Secure Checkout',

    loginTitle: 'Sign In to Your Account',
    registerTitle: 'Create Customer Account',
    forgotTitle: 'Reset Password',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    nameLabel: 'Full Name',
    loginSubmit: 'Sign In',
    registerSubmit: 'Create My Account',
    sendResetLink: 'Send Password Reset Link',
    noAccount: 'Don\'t have an account yet? Register here',
    haveAccount: 'Already a customer? Sign in',
    forgotPasswordLink: 'Forgot your password?',
    acceptTermsPrompt: 'I agree to the Privacy Policy and customer terms.',
    welcomeBack: 'Welcome back!',

    artisanshipFooter: 'Author Artisanship',
    carefulShippingFooter: 'Eco-Careful Shipping',
    securePaymentFooter: 'Secure Payment',
    legalNotice: 'Legal Notice (LSSI-CE)',
    privacyPolicy: 'Privacy Policy (GDPR)',
    cookiePolicy: 'Cookie Policy',
    termsWithdrawal: 'Terms & 14-Day Right to Cancel'
  },

  fr: {
    topNotice: 'Créations artisanales originales par Marta Pastor Escribano • Livraison gratuite dès 45 €',
    handcrafted: 'ARTISANAL',
    freeShippingBanner: 'Livraison gratuite dès 45 €',
    workflow3D: 'Flux 3D',
    storesLink: 'Boutiques partenaires (Valence, Malaga, Ténérife...)',
    home: 'Accueil',
    print3D: 'Impression 3D',
    legami: 'Legami Milano',
    bookmarks: 'Marque-pages',
    stationery: 'Papeterie & Textile',
    fandoms: 'Fandoms',
    outlet: 'Outlet',
    buildBox: 'Créer un Coffret',
    searchPlaceholder: 'Rechercher dragons 3D, stylos Legami, marque-pages...',
    myAccount: 'Mon Compte',
    login: 'Se Connecter',
    register: 'Créer un Compte',
    logout: 'Déconnexion',
    cart: 'Panier',
    wishlist: 'Favoris',

    heroPill: 'Collection 2026 • Marque-pages, Impression 3D & Legami',
    heroTitle1: 'Marque-pages magnétiques, figurines 3D et trésors',
    heroTitleHighlight: 'faits à la main.',
    heroSubtitle: 'Des créations nées de la passion pour la littérature, les mangas et la fantaisie. Découvrez nos dragons articulés 3D, stylos kawaii Legami et marque-pages à aimants néodyme doux qui n\'abîment jamais vos livres.',
    exploreCatalog: 'Explorer le Catalogue',
    customBoxBtn: 'Créer un Coffret Cadeau',
    uniqueBadge: '100% Uniques',
    uniqueDesc: 'Créations d\'auteur',
    magnetBadge: 'Aimant Néodyme',
    magnetDesc: 'Fermeture douce',
    fastShippingBadge: 'Envoi Rapide',
    fastShippingDesc: 'Gratuit dès 45 €',

    catalogBadge: 'Catalogue Général & Collections',
    catalogTitle: 'Tous les Univers de',
    catalogTitleHighlight: 'Martenscrap',
    catalogSubtitle: 'Des marque-pages magnétiques à la papeterie kawaii Legami, en passant par les dragons articulés 3D.',
    showingItems: 'Affichage de',
    filterDepartment: 'Rayon',
    filterSubcategory: 'Sous-catégorie',
    filterFandom: 'Univers / Fandom',
    all: 'Tous',
    newBadge: 'Nouveau',
    bestsellerBadge: 'Top Ventes',
    addToCart: 'Ajouter au Panier',
    quickView: 'Aperçu Rapide',
    magneticClosure: 'Fermeture Magnétique',

    labTitle: 'Studio 3D WebGL',
    labSubtitle: 'Interagissez, tournez à 360° et zoomez sur nos pièces artisanales',
    resetView: 'Réinitialiser',
    autoRotate: 'Rotation Auto',
    zoomIn: 'Zoomer',
    zoomOut: 'Dézoomer',

    wishlistTitle: 'Vos Coups de Cœur',
    wishlistEmpty: 'Votre liste d\'envies est vide',
    wishlistEmptySub: 'Explorez nos dragons 3D et marque-pages et cliquez sur le cœur pour les garder ici.',
    moveToCart: 'Ajouter au Panier',
    removeFromWishlist: 'Retirer',
    clearWishlist: 'Vider la liste',

    featuredDeckBadge: 'Sélection Exclusive d\'Atelier',
    featuredDeckTitle: 'Promotions & Nouveautés',
    featuredDeckHighlight: 'Artisanales',
    featuredDeckSubtitle: 'Découvrez les pièces les plus recherchées du mois : dragons 3D soyeux, marque-pages magnétiques et coffrets d\'auteur en promotion.',
    cardDeckHint: 'Survolez ou touchez une carte pour la déplier en détail',
    viewPiece: 'Voir la pièce',
    addToCartFast: 'Ajouter au Panier',
    discountBadge: 'PROMO',
    limitedEdition: 'Édition Limitée',

    cartTitle: 'Votre Panier Littéraire',
    cartEmpty: 'Votre panier est vide',
    cartEmptySub: 'Découvrez des marque-pages uniques, dragons 3D et accessoires de lecture.',
    freeShippingAlert: '🎉 LIVRAISON GRATUITE débloquée !',
    missingForFreeShipping: 'Ajoutez {amount} € de plus pour la livraison gratuite',
    couponCode: 'CODE PROMO',
    applyCoupon: 'Appliquer',
    subtotal: 'Sous-total',
    shipping: 'Frais de port',
    freeShipping: 'GRATUIT',
    discount: 'Remise',
    total: 'Total de la commande',
    checkoutBtn: 'Valider ma Commande',

    loginTitle: 'Connexion Client',
    registerTitle: 'Créer un Compte Client',
    forgotTitle: 'Mot de Passe Oublié',
    emailLabel: 'Adresse E-mail',
    passwordLabel: 'Mot de Passe',
    nameLabel: 'Nom et Prénom',
    loginSubmit: 'Se Connecter',
    registerSubmit: 'Créer mon Compte',
    sendResetLink: 'Envoyer le lien de réinitialisation',
    noAccount: 'Pas encore de compte ? Inscrivez-vous ici',
    haveAccount: 'Déjà client ? Connectez-vous',
    forgotPasswordLink: 'Mot de passe oublié ?',
    acceptTermsPrompt: 'J\'accepte la Politique de Confidentialité et les conditions de vente.',
    welcomeBack: 'Ravi de vous revoir !',

    artisanshipFooter: 'Artisanat d\'Auteur',
    carefulShippingFooter: 'Envois Soignés',
    securePaymentFooter: 'Paiement Sécurisé',
    legalNotice: 'Mentions Légales (LSSI-CE)',
    privacyPolicy: 'Politique de Confidentialité (RGPD)',
    cookiePolicy: 'Politique de Cookies',
    termsWithdrawal: 'Conditions & Droit de Rétractation 14J'
  }
};
