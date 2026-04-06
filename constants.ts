
import { Product } from './types';

export const products: Product[] = [
  {
    id: 'lampara-personalizada',
    name: 'Lámpara Cubo Luz',
    price: 45,
    image: 'img/lampara.png',
    gallery: [
        'img/lampara.png',
        'img/lampara2.webp',
    ],
    description: 'Haz tuyo cada rincón con una lámpara de resina totalmente personalizable. esta lámpara te permite elegir colores, brillos, incrustaciones y estilo, creando un diseño que encaje exactamente con tu gusto o con la temática de tu espacio. Cada unidad se elabora a mano, garantizando un acabado exclusivo y un patrón de resina imposible de repetir. Precio sin gastos de envío.',
    categories: ['Decoración'],
    customization: true,
  },
  {
    id: 'piramide-personalizada',
    name: 'Pirámide con Luz',
    price: 65,
    image: 'img/piramide.png',
    gallery: [
        'img/piramide.png',
        'img/piramide2.webp',
        'img/piramide3.webp',
    ],
    description: 'Esta pirámide de resina es totalmente personalizable. Su forma geométrica aporta equilibrio y presencia, mientras que los detalles internos elegidos por ti crean un efecto visual hipnótico desde cualquier ángulo. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Decoración'],
    customization: true,
  },
  {
    id: 'ajedrez-completo',
    name: 'Tablero Ajedrez LED',
    price: 450,
    image: 'img/ajedrezled.png',
    gallery: [
        'img/ajedrezled.png',
        'img/Ajedrez 2.jpg',
        'img/Ajedrez.jpg',
    ],
    description: 'Un perfecto regalo de tablero de ajedrez con luces LED y piezas personalizadas. Cada pieza es una obra de arte, hecha a mano con resina de alta calidad. El tablero iluminado crea una atmósfera mágica para cada partida. Elige los colores y detalles para un set verdaderamente único. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Juegos'],
    customization: true,
  },
  {
    id: 'tetris',
    name: 'Cuelga llaves Tetris',
    price: 18,
    image: 'img/tetris1.png',
    gallery: [
        'img/tetris1.png',
        'img/tetris2.webp',
        'img/tetris3.webp',
    ],
    description: 'Juego de llaveros perfecto para familia o grupo de amig@, cada uno es importante. Un detalle original y práctico, ideal para quienes buscan un accesorio pequeño con un toque diferente. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Decoración'],
    customization: true,
  },
  {
    id: 'posavaso-comecocos',
    name: 'Posavasos Comecocos',
    price: 6,
    image: 'img/comecocos1.png',
    gallery: [
      'img/comecocos1.png',
      'img/comecocos2.webp',
      'img/comecocos3.webp',
    ],
    description: 'Posavasos de resina inspirado en Pac-Man, con diseño divertido y reconocible al instante. Perfecto para dar un toque retro y original a cualquier mesa, sin perder funcionalidad. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Posavasos'],
    customization: true,
    variants: [
      { name: '1 Unidad', price: 6 },
      { name: 'Juego de 4 unidades', price: 18 }
    ]
  },
  {
    id: 'soportes-resina',
    name: 'Posavasos cuadrado con soporte',
    price: 7,
    image: 'img/soporteresina.jpg',
    gallery: [
      'img/soporteresina.jpg',
      'img/soporteresina2.webp',
      'img/soporteresina3.jpg',
    ],
    description: 'Posavasos de resina hechos a mano combinan elegancia y diversión, ideales como recuerdo de boda, aniversario o regalo especial. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Posavasos'],
    customization: true,
     variants: [
      { name: '1 Unidad', price: 7 },
      { name: 'Juego de 4 unidades', price: 22 }
    ]
  },
  {
    id: 'posavasos-redondo',
    name: 'Posavasos redondo nemo',
    price: 6,
    image: 'img/posavasoredondo.jpg',
    gallery: [
        'img/posavasoredondo.jpg',
        'img/posavasoredondo2.jpg',
    ],
    description: 'Posavasos de resina inspirado en Buscando a Nemo, con un diseño colorido y alegre. Un complemento práctico que aporta un toque divertido y marino a cualquier mesa. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Posavasos'],
    customization: true,
    variants: [
      { name: '1 Unidad', price: 6 },
      { name: 'Juego de 4 unidades', price: 18 }
    ]
  },
  {
    id: 'posavasos-gato',
    name: 'Posavasos redondo gato',
    price: 6,
    image: 'img/gato1.png',
    gallery: [
        'img/gato1.png',
        'img/gato2.webp',
        'img/gato3.webp',
    ],
    description: 'Posavasos de resina con diseño de gato, delicado y decorativo. Un accesorio práctico que aporta un toque acogedor y original a cualquier mesa. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero, perfecta para amantes de los animales. Precio sin gastos de envío.',
    categories: ['Posavasos','Zona Peludos'],
    customization: true,
    variants: [
      { name: '1 Unidad', price: 6 },
      { name: 'Juego de 4 unidades', price: 18 }
    ]
  },
  {
    id: 'llavero-huellita',
    name: 'Llavero Huella Gato',
    price: 8,
    image: 'img/llaverohuellas.png',
    gallery: [
        'img/llaverohuellas.png',
        'img/llaverohuellas2.webp',
        'img/llaverohuellas3.webp',
    ],
    description: 'Llévate contigo una dosis de ternura y estilo con estos adorables llaveros de huellita hechos a mano en resina. Cada pieza está elaborada artesanalmente, con un acabado brillante y resistente, perfecta para amantes de los animales. Precio sin gastos de envío.',
    categories: ['Llaveros','Zona Peludos'],
    customization: true,
  },
    {
    id: 'placa-mascota',
    name: 'Placa Mascota personalizada',
    price: 3,
    image: 'img/mascota1.png',
    gallery: [
        'img/mascota1.png',
        'img/mascota2.webp',
    ],
    description: 'Llévate contigo una dosis de ternura y estilo con estas adorables placas para tu mascota, hechos a mano en resina. Cada pieza está elaborada artesanalmente, con un acabado brillante y resistente, perfecta para amantes de los animales o como regalo especial. Precio sin gastos de envío.',
    categories: ['Zona Peludos'],
    customization: true,
    variants: [
      { name: 'Pequeño', price: 3 },
      { name: 'Mediano', price: 4 },
      { name: 'Grande', price: 5 }
    ]
  },
  {
    id: 'domino-personalizado',
    name: 'Dominó The Simpsons',
    price: 30,
    image: 'img/simpsons.jpg',
    gallery: [
        'img/simpsons.jpg',
        'img/domino2.jpg',
        'img/domino3.jpg',
    ],
    description: 'Juega con estilo con este set de dominó personalizado. Hecho en resina, puedes elegir los colores y acabados para un regalo original y divertido. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Juegos'],
    customization: true,
  },
  {
    id: 'llavero-artesanal-resina',
    name: 'Llavero Amistad',
    price: 10,
    image: 'img/llavero.png',
    gallery: [
        'img/llavero.png',
        'img/llavero2.webp',
    ],
    description: 'Llavero artesanal de resina transparente, con diseño original y acabado brillante. Incluye detalle decorativo encapsulado y cadena resistente, ideal para llevar tus llaves con estilo o como regalo especial. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Llaveros'],
    customization: true,
  },
  {
    id: 'marca-paginas-personalizado',
    name: 'Marca páginas',
    price: 3,
    image: 'img/marcapaginas.png',
    gallery: [
        'img/marcapaginas.png',
        'img/marcapaginas2.webp',
        'img/marcapaginas3.webp',
    ],
    description: 'Este accesorio combina elegancia, durabilidad y un toque emocional que lo convierte en mucho más que un simple marca páginas: es una pequeña obra de arte pensada solo para ti. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Complementos'],
    customization: true,
  },
  {
    id: 'reloj-personalizado',
    name: 'Reloj de Pared',
    price: 30,
    image: 'img/reloj.jpg',
    gallery: [
        'img/reloj.jpg',
        'img/reloj2.webp',
        'img/reloj3.webp',
    ],
    description: 'Personaliza tu reloj con diferentes colores y accesorios, ¡se puede incluir texto! Una pieza funcional y decorativa que se adapta perfectamente a tu estilo y a tu hogar. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Decoración'],
    customization: true,
  },
  {
    id: 'posavasos-playstation',
    name: 'Posavasos Playstation',
    price: 6,
    image: 'img/play1.webp',
    gallery: [
        'img/play1.webp',
        'img/play2.webp',
        'img/play3.webp',
    ],
    description: 'Ideal para amantes de los videojuegos que quieren añadir un detalle original y creativo a su escritorio o mesa. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Posavasos'],
    customization: true,
    variants: [
      { name: '1 Unidad', price: 6 },
      { name: 'Juego de 4 unidades', price: 18 }
    ]
  },
  {
    id: 'llavero-calendario',
    name: 'LLavero Calendario',
    price: 10,
    image: 'img/calendario1.webp',
    gallery: [
        'img/calendario1.webp',
        'img/calendario2.webp',
    ],
    description: 'Llavero artesanal de resina con calendario, elegante y duradero, diseñado para recordar una fecha especial de forma práctica y significativa. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Llaveros','Días Especiales'],
    customization: true,
  },
  {
    id: 'posavasos-corazón2',
    name: 'Posavasos Corazón Lila',
    price: 8,
    image: 'img/corazon2.jpeg',
    gallery: [
        'img/corazon2.jpeg',
        'img/corazon4.webp',
    ],
    description: 'Posavasos de resina con diseño en forma de corazón, elegante y decorativo. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Posavasos'],
    customization: true,
    variants: [
      { name: '1 Unidad', price: 8 },
      { name: 'Juego de 4 unidades', price: 20 }
    ]
  },
  {
    id: 'posavasos-corazón1',
    name: 'Posavasos Corazón Verde',
    price: 8,
    image: 'img/corazon1.jpeg',
    gallery: [
        'img/corazon1.jpeg',
        'img/corazon3.webp',
    ],
    description: 'Posavasos de resina con diseño en forma de corazón, elegante y decorativo. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Posavasos'],
    customization: true,
    variants: [
      { name: '1 Unidad', price: 8 },
      { name: 'Juego de 4 unidades', price: 20 }
    ]
  },
  {
    id: 'peine-personalizado',
    name: 'Peine Personalizado',
    price: 8,
    image: 'img/peine1.webp',
    gallery: [
        'img/peine1.webp',
        'img/peine2.webp',
        'img/peine3.webp',
    ],
    description: 'Peine de resina con diseño elegante y acabado brillante. Un accesorio práctico y decorativo, ideal para el cuidado del cabello con un toque original. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Complementos'],
    customization: true,
    variants: [
      { name: 'Pequeño', price: 8 },
      { name: 'Grande', price: 10 }
    ]
  },
  {
    id: 'bandeja-bolsillo',
    name: 'Bandeja Bolsillo',
    price: 10,
    image: 'img/bandeja1.jpeg',
    gallery: [
        'img/bandeja1.jpeg',
        'img/bandeja2.webp',
        'img/bandeja3.webp',
    ],
    description: 'Bandeja de resina con diseño elegante y acabado brillante. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Decoración'],
    customization: true,
  },
  {
    id: 'identificador-personalizado',
    name: 'Identificador personalizado',
    price: 3,
    image: 'img/identif1.png',
    gallery: [
        'img/identif1.png',
    ],
    description: 'Llavero de resina con identificador personalizado con tu nombre, resistente y elegante. Un accesorio práctico y único para llevar siempre contigo. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Complementos'],
    customization: true,
  },
  {
    id: 'recuerdo-bebe',
    name: 'Recuerdo nacimiento',
    price: 55,
    image: 'img/bebe1.webp',
    gallery: [
        'img/bebe1.webp',
        'img/bebe2.webp',
    ],
    description: 'Recuadro de resina personalizado con los datos del nacimiento de tu bebé, un recuerdo único y especial para conservar ese momento para siempre. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Días Especiales'],
    customization: true,
  },
  {
    id: 'llavero-voz',
    name: 'Llavero personalizado con voz',
    price: 10,
    image: 'img/llaverovoz.webp',
    gallery: [
        'img/llaverovoz.webp',
        'img/llaverovoz2.webp',
    ],
    description: 'Llavero de resina con código QR que, al escanearlo con el móvil, reproduce un audio con la voz de un ser querido. Un recuerdo único para llevar siempre contigo. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Llaveros'],
    customization: true,
  },
  {
    id: 'llavero-papa',
    name: 'Llavero Papá',
    price: 10,
    image: 'img/llaveropapa.webp',
    gallery: [
        'img/llaveropapa.webp',
        'img/llaveropapa2.webp',
        'img/llaveropapa3.webp',
    ],
    description: 'Llavero de resina personalizado para el Día del Padre, un detalle especial y significativo para demostrarle cuánto lo quieres. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Llaveros','Días Especiales'],
    customization: true,
  },
  {
    id: 'abridor-papa',
    name: 'Abrebotellas Personalizado',
    price: 12,
    image: 'img/abridorpapa.webp',
    gallery: [
        'img/abridorpapa.webp',
    ],
    description: 'Abridor personalizado para el Día del Padre, práctico y resistente, diseñado para acompañar sus mejores momentos y recordarle cuánto lo quieres. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Llaveros','Días Especiales'],
    customization: true,
  },
  {
    id: 'Calabaza-luz',
    name: 'Calabaza con Luz',
    price: 8,
    image: 'img/calabaza1.webp',
    gallery: [
        'img/calabaza1.webp',
        'img/calabaza2.webp',
        'img/calabaza3.webp',
    ],
    description: 'Calabaza de Halloween en resina, decorativa y original, perfecta para dar un toque divertido y espeluznante a la temporada más terrorífica del año. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Decoración','Halloween'],
    customization: true,
  },
  {
    id: 'llavero-esqueleto',
    name: 'Llavero Esqueleto',
    price: 6,
    image: 'img/esqueleto1.webp',
    gallery: [
        'img/esqueleto1.webp',
        'img/esqueleto2.webp',
        'img/esqueleto3.webp',
    ],
    description: 'Llavero de esqueleto en resina, original y llamativo, perfecto para los amantes de Halloween o para añadir un toque divertido y diferente a tus llaves. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Llaveros','Halloween'],
    customization: true,
  },
  {
    id: 'corazon-pareja',
    name: 'Corazón pareja personalizado',
    price: 45,
    image: 'img/corazonpareja1.webp',
    gallery: [
        'img/corazonpareja1.webp',
        'img/corazonpareja2.webp',
        'img/corazonpareja3.webp',
    ],
    description: 'Corazón de resina para parejas, un detalle romántico y personalizado que simboliza amor y conexión. Perfecto para regalar y recordar momentos especiales juntos. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Decoración','Días Especiales'],
    customization: true,
  },
  {
    id: 'navidad-bolas',
    name: 'Bolas Navideñas Personalizas',
    price: 8,
    image: 'img/navidad1.webp',
    gallery: [
        'img/navidad1.webp',
        'img/navidad2.webp',
        'img/navidad3.jpg',
    ],
    description: 'Bolas de Navidad en resina, decorativas y personalizables, ideales para darle un toque único y elegante a tu árbol durante las fiestas. Cada pieza está cuidadosamente elaborada en resina de alta calidad, con un acabado brillante y duradero. Precio sin gastos de envío.',
    categories: ['Decoración','Días Especiales'],
    customization: true,
  },
];

export const LOGO_URL = 'img/logo.png';