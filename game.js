/* =====================================================================
   PERIODLE — Adivina el Elemento del Día
   Todos los 118 elementos con lógica de juego completa
   ===================================================================== */

// ─────────────────────────────────────────────
//  DATOS DE LOS ELEMENTOS
//  n=número atómico, s=símbolo, name=nombre ES,
//  cat=categoría, per=período, grp=grupo (null=f-block),
//  blk=bloque, state=estado, ori=origen, mass=masa atómica
// ─────────────────────────────────────────────
const ELEMENTS = [
  {n:1,  s:'H',  name:'Hidrógeno',     cat:'No metal',                per:1, grp:1,  blk:'s', state:'Gas',     ori:'Natural',  mass:1.008},
  {n:2,  s:'He', name:'Helio',         cat:'Gas noble',               per:1, grp:18, blk:'s', state:'Gas',     ori:'Natural',  mass:4.003},
  {n:3,  s:'Li', name:'Litio',         cat:'Metal alcalino',          per:2, grp:1,  blk:'s', state:'Sólido',  ori:'Natural',  mass:6.941},
  {n:4,  s:'Be', name:'Berilio',       cat:'Metal alcalinotérreo',    per:2, grp:2,  blk:'s', state:'Sólido',  ori:'Natural',  mass:9.012},
  {n:5,  s:'B',  name:'Boro',          cat:'Metaloide',               per:2, grp:13, blk:'p', state:'Sólido',  ori:'Natural',  mass:10.811},
  {n:6,  s:'C',  name:'Carbono',       cat:'No metal',                per:2, grp:14, blk:'p', state:'Sólido',  ori:'Natural',  mass:12.011},
  {n:7,  s:'N',  name:'Nitrógeno',     cat:'No metal',                per:2, grp:15, blk:'p', state:'Gas',     ori:'Natural',  mass:14.007},
  {n:8,  s:'O',  name:'Oxígeno',       cat:'No metal',                per:2, grp:16, blk:'p', state:'Gas',     ori:'Natural',  mass:15.999},
  {n:9,  s:'F',  name:'Flúor',         cat:'Halógeno',                per:2, grp:17, blk:'p', state:'Gas',     ori:'Natural',  mass:18.998},
  {n:10, s:'Ne', name:'Neón',          cat:'Gas noble',               per:2, grp:18, blk:'p', state:'Gas',     ori:'Natural',  mass:20.180},
  {n:11, s:'Na', name:'Sodio',         cat:'Metal alcalino',          per:3, grp:1,  blk:'s', state:'Sólido',  ori:'Natural',  mass:22.990},
  {n:12, s:'Mg', name:'Magnesio',      cat:'Metal alcalinotérreo',    per:3, grp:2,  blk:'s', state:'Sólido',  ori:'Natural',  mass:24.305},
  {n:13, s:'Al', name:'Aluminio',      cat:'Metal post-transición',   per:3, grp:13, blk:'p', state:'Sólido',  ori:'Natural',  mass:26.982},
  {n:14, s:'Si', name:'Silicio',       cat:'Metaloide',               per:3, grp:14, blk:'p', state:'Sólido',  ori:'Natural',  mass:28.086},
  {n:15, s:'P',  name:'Fósforo',       cat:'No metal',                per:3, grp:15, blk:'p', state:'Sólido',  ori:'Natural',  mass:30.974},
  {n:16, s:'S',  name:'Azufre',        cat:'No metal',                per:3, grp:16, blk:'p', state:'Sólido',  ori:'Natural',  mass:32.065},
  {n:17, s:'Cl', name:'Cloro',         cat:'Halógeno',                per:3, grp:17, blk:'p', state:'Gas',     ori:'Natural',  mass:35.453},
  {n:18, s:'Ar', name:'Argón',         cat:'Gas noble',               per:3, grp:18, blk:'p', state:'Gas',     ori:'Natural',  mass:39.948},
  {n:19, s:'K',  name:'Potasio',       cat:'Metal alcalino',          per:4, grp:1,  blk:'s', state:'Sólido',  ori:'Natural',  mass:39.098},
  {n:20, s:'Ca', name:'Calcio',        cat:'Metal alcalinotérreo',    per:4, grp:2,  blk:'s', state:'Sólido',  ori:'Natural',  mass:40.078},
  {n:21, s:'Sc', name:'Escandio',      cat:'Metal de transición',     per:4, grp:3,  blk:'d', state:'Sólido',  ori:'Natural',  mass:44.956},
  {n:22, s:'Ti', name:'Titanio',       cat:'Metal de transición',     per:4, grp:4,  blk:'d', state:'Sólido',  ori:'Natural',  mass:47.867},
  {n:23, s:'V',  name:'Vanadio',       cat:'Metal de transición',     per:4, grp:5,  blk:'d', state:'Sólido',  ori:'Natural',  mass:50.942},
  {n:24, s:'Cr', name:'Cromo',         cat:'Metal de transición',     per:4, grp:6,  blk:'d', state:'Sólido',  ori:'Natural',  mass:51.996},
  {n:25, s:'Mn', name:'Manganeso',     cat:'Metal de transición',     per:4, grp:7,  blk:'d', state:'Sólido',  ori:'Natural',  mass:54.938},
  {n:26, s:'Fe', name:'Hierro',        cat:'Metal de transición',     per:4, grp:8,  blk:'d', state:'Sólido',  ori:'Natural',  mass:55.845},
  {n:27, s:'Co', name:'Cobalto',       cat:'Metal de transición',     per:4, grp:9,  blk:'d', state:'Sólido',  ori:'Natural',  mass:58.933},
  {n:28, s:'Ni', name:'Níquel',        cat:'Metal de transición',     per:4, grp:10, blk:'d', state:'Sólido',  ori:'Natural',  mass:58.693},
  {n:29, s:'Cu', name:'Cobre',         cat:'Metal de transición',     per:4, grp:11, blk:'d', state:'Sólido',  ori:'Natural',  mass:63.546},
  {n:30, s:'Zn', name:'Zinc',          cat:'Metal de transición',     per:4, grp:12, blk:'d', state:'Sólido',  ori:'Natural',  mass:65.38},
  {n:31, s:'Ga', name:'Galio',         cat:'Metal post-transición',   per:4, grp:13, blk:'p', state:'Sólido',  ori:'Natural',  mass:69.723},
  {n:32, s:'Ge', name:'Germanio',      cat:'Metaloide',               per:4, grp:14, blk:'p', state:'Sólido',  ori:'Natural',  mass:72.630},
  {n:33, s:'As', name:'Arsénico',      cat:'Metaloide',               per:4, grp:15, blk:'p', state:'Sólido',  ori:'Natural',  mass:74.922},
  {n:34, s:'Se', name:'Selenio',       cat:'No metal',                per:4, grp:16, blk:'p', state:'Sólido',  ori:'Natural',  mass:78.971},
  {n:35, s:'Br', name:'Bromo',         cat:'Halógeno',                per:4, grp:17, blk:'p', state:'Líquido', ori:'Natural',  mass:79.904},
  {n:36, s:'Kr', name:'Kriptón',       cat:'Gas noble',               per:4, grp:18, blk:'p', state:'Gas',     ori:'Natural',  mass:83.798},
  {n:37, s:'Rb', name:'Rubidio',       cat:'Metal alcalino',          per:5, grp:1,  blk:'s', state:'Sólido',  ori:'Natural',  mass:85.468},
  {n:38, s:'Sr', name:'Estroncio',     cat:'Metal alcalinotérreo',    per:5, grp:2,  blk:'s', state:'Sólido',  ori:'Natural',  mass:87.62},
  {n:39, s:'Y',  name:'Itrio',         cat:'Metal de transición',     per:5, grp:3,  blk:'d', state:'Sólido',  ori:'Natural',  mass:88.906},
  {n:40, s:'Zr', name:'Circonio',      cat:'Metal de transición',     per:5, grp:4,  blk:'d', state:'Sólido',  ori:'Natural',  mass:91.224},
  {n:41, s:'Nb', name:'Niobio',        cat:'Metal de transición',     per:5, grp:5,  blk:'d', state:'Sólido',  ori:'Natural',  mass:92.906},
  {n:42, s:'Mo', name:'Molibdeno',     cat:'Metal de transición',     per:5, grp:6,  blk:'d', state:'Sólido',  ori:'Natural',  mass:95.96},
  {n:43, s:'Tc', name:'Tecnecio',      cat:'Metal de transición',     per:5, grp:7,  blk:'d', state:'Sólido',  ori:'Sintético',mass:98},
  {n:44, s:'Ru', name:'Rutenio',       cat:'Metal de transición',     per:5, grp:8,  blk:'d', state:'Sólido',  ori:'Natural',  mass:101.07},
  {n:45, s:'Rh', name:'Rodio',         cat:'Metal de transición',     per:5, grp:9,  blk:'d', state:'Sólido',  ori:'Natural',  mass:102.906},
  {n:46, s:'Pd', name:'Paladio',       cat:'Metal de transición',     per:5, grp:10, blk:'d', state:'Sólido',  ori:'Natural',  mass:106.42},
  {n:47, s:'Ag', name:'Plata',         cat:'Metal de transición',     per:5, grp:11, blk:'d', state:'Sólido',  ori:'Natural',  mass:107.868},
  {n:48, s:'Cd', name:'Cadmio',        cat:'Metal de transición',     per:5, grp:12, blk:'d', state:'Sólido',  ori:'Natural',  mass:112.411},
  {n:49, s:'In', name:'Indio',         cat:'Metal post-transición',   per:5, grp:13, blk:'p', state:'Sólido',  ori:'Natural',  mass:114.818},
  {n:50, s:'Sn', name:'Estaño',        cat:'Metal post-transición',   per:5, grp:14, blk:'p', state:'Sólido',  ori:'Natural',  mass:118.710},
  {n:51, s:'Sb', name:'Antimonio',     cat:'Metaloide',               per:5, grp:15, blk:'p', state:'Sólido',  ori:'Natural',  mass:121.760},
  {n:52, s:'Te', name:'Teluro',        cat:'Metaloide',               per:5, grp:16, blk:'p', state:'Sólido',  ori:'Natural',  mass:127.60},
  {n:53, s:'I',  name:'Yodo',          cat:'Halógeno',                per:5, grp:17, blk:'p', state:'Sólido',  ori:'Natural',  mass:126.904},
  {n:54, s:'Xe', name:'Xenón',         cat:'Gas noble',               per:5, grp:18, blk:'p', state:'Gas',     ori:'Natural',  mass:131.293},
  {n:55, s:'Cs', name:'Cesio',         cat:'Metal alcalino',          per:6, grp:1,  blk:'s', state:'Sólido',  ori:'Natural',  mass:132.905},
  {n:56, s:'Ba', name:'Bario',         cat:'Metal alcalinotérreo',    per:6, grp:2,  blk:'s', state:'Sólido',  ori:'Natural',  mass:137.327},
  {n:57, s:'La', name:'Lantano',       cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:138.905},
  {n:58, s:'Ce', name:'Cerio',         cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:140.116},
  {n:59, s:'Pr', name:'Praseodimio',   cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:140.908},
  {n:60, s:'Nd', name:'Neodimio',      cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:144.242},
  {n:61, s:'Pm', name:'Prometio',      cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:145},
  {n:62, s:'Sm', name:'Samario',       cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:150.36},
  {n:63, s:'Eu', name:'Europio',       cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:151.964},
  {n:64, s:'Gd', name:'Gadolinio',     cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:157.25},
  {n:65, s:'Tb', name:'Terbio',        cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:158.925},
  {n:66, s:'Dy', name:'Disprosio',     cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:162.500},
  {n:67, s:'Ho', name:'Holmio',        cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:164.930},
  {n:68, s:'Er', name:'Erbio',         cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:167.259},
  {n:69, s:'Tm', name:'Tulio',         cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:168.934},
  {n:70, s:'Yb', name:'Iterbio',       cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:173.054},
  {n:71, s:'Lu', name:'Lutecio',       cat:'Lantánido',               per:6, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:174.967},
  {n:72, s:'Hf', name:'Hafnio',        cat:'Metal de transición',     per:6, grp:4,  blk:'d', state:'Sólido',  ori:'Natural',  mass:178.49},
  {n:73, s:'Ta', name:'Tántalo',       cat:'Metal de transición',     per:6, grp:5,  blk:'d', state:'Sólido',  ori:'Natural',  mass:180.948},
  {n:74, s:'W',  name:'Wolframio',     cat:'Metal de transición',     per:6, grp:6,  blk:'d', state:'Sólido',  ori:'Natural',  mass:183.84},
  {n:75, s:'Re', name:'Renio',         cat:'Metal de transición',     per:6, grp:7,  blk:'d', state:'Sólido',  ori:'Natural',  mass:186.207},
  {n:76, s:'Os', name:'Osmio',         cat:'Metal de transición',     per:6, grp:8,  blk:'d', state:'Sólido',  ori:'Natural',  mass:190.23},
  {n:77, s:'Ir', name:'Iridio',        cat:'Metal de transición',     per:6, grp:9,  blk:'d', state:'Sólido',  ori:'Natural',  mass:192.217},
  {n:78, s:'Pt', name:'Platino',       cat:'Metal de transición',     per:6, grp:10, blk:'d', state:'Sólido',  ori:'Natural',  mass:195.084},
  {n:79, s:'Au', name:'Oro',           cat:'Metal de transición',     per:6, grp:11, blk:'d', state:'Sólido',  ori:'Natural',  mass:196.967},
  {n:80, s:'Hg', name:'Mercurio',      cat:'Metal de transición',     per:6, grp:12, blk:'d', state:'Líquido', ori:'Natural',  mass:200.592},
  {n:81, s:'Tl', name:'Talio',         cat:'Metal post-transición',   per:6, grp:13, blk:'p', state:'Sólido',  ori:'Natural',  mass:204.383},
  {n:82, s:'Pb', name:'Plomo',         cat:'Metal post-transición',   per:6, grp:14, blk:'p', state:'Sólido',  ori:'Natural',  mass:207.2},
  {n:83, s:'Bi', name:'Bismuto',       cat:'Metal post-transición',   per:6, grp:15, blk:'p', state:'Sólido',  ori:'Natural',  mass:208.980},
  {n:84, s:'Po', name:'Polonio',       cat:'Metal post-transición',   per:6, grp:16, blk:'p', state:'Sólido',  ori:'Natural',  mass:209},
  {n:85, s:'At', name:'Astato',        cat:'Halógeno',                per:6, grp:17, blk:'p', state:'Sólido',  ori:'Natural',  mass:210},
  {n:86, s:'Rn', name:'Radón',         cat:'Gas noble',               per:6, grp:18, blk:'p', state:'Gas',     ori:'Natural',  mass:222},
  {n:87, s:'Fr', name:'Francio',       cat:'Metal alcalino',          per:7, grp:1,  blk:'s', state:'Sólido',  ori:'Natural',  mass:223},
  {n:88, s:'Ra', name:'Radio',         cat:'Metal alcalinotérreo',    per:7, grp:2,  blk:'s', state:'Sólido',  ori:'Natural',  mass:226},
  {n:89, s:'Ac', name:'Actinio',       cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:227},
  {n:90, s:'Th', name:'Torio',         cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:232.038},
  {n:91, s:'Pa', name:'Protactinio',   cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:231.036},
  {n:92, s:'U',  name:'Uranio',        cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Natural',  mass:238.029},
  {n:93, s:'Np', name:'Neptunio',      cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:237},
  {n:94, s:'Pu', name:'Plutonio',      cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:244},
  {n:95, s:'Am', name:'Americio',      cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:243},
  {n:96, s:'Cm', name:'Curio',         cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:247},
  {n:97, s:'Bk', name:'Berkelio',      cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:247},
  {n:98, s:'Cf', name:'Californio',    cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:251},
  {n:99, s:'Es', name:'Einstenio',     cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:252},
  {n:100,s:'Fm', name:'Fermio',        cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:257},
  {n:101,s:'Md', name:'Mendelevio',    cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:258},
  {n:102,s:'No', name:'Nobelio',       cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:259},
  {n:103,s:'Lr', name:'Laurencio',     cat:'Actínido',                per:7, grp:null,blk:'f',state:'Sólido',  ori:'Sintético',mass:266},
  {n:104,s:'Rf', name:'Rutherfordio',  cat:'Metal de transición',     per:7, grp:4,  blk:'d', state:'Sólido',  ori:'Sintético',mass:267},
  {n:105,s:'Db', name:'Dubnio',        cat:'Metal de transición',     per:7, grp:5,  blk:'d', state:'Sólido',  ori:'Sintético',mass:268},
  {n:106,s:'Sg', name:'Seaborgio',     cat:'Metal de transición',     per:7, grp:6,  blk:'d', state:'Sólido',  ori:'Sintético',mass:269},
  {n:107,s:'Bh', name:'Bohrio',        cat:'Metal de transición',     per:7, grp:7,  blk:'d', state:'Sólido',  ori:'Sintético',mass:270},
  {n:108,s:'Hs', name:'Hassio',        cat:'Metal de transición',     per:7, grp:8,  blk:'d', state:'Sólido',  ori:'Sintético',mass:277},
  {n:109,s:'Mt', name:'Meitnerio',     cat:'Metal de transición',     per:7, grp:9,  blk:'d', state:'Sólido',  ori:'Sintético',mass:278},
  {n:110,s:'Ds', name:'Darmstadtio',   cat:'Metal de transición',     per:7, grp:10, blk:'d', state:'Sólido',  ori:'Sintético',mass:281},
  {n:111,s:'Rg', name:'Roentgenio',    cat:'Metal de transición',     per:7, grp:11, blk:'d', state:'Sólido',  ori:'Sintético',mass:282},
  {n:112,s:'Cn', name:'Copernicio',    cat:'Metal de transición',     per:7, grp:12, blk:'d', state:'Gas',     ori:'Sintético',mass:285},
  {n:113,s:'Nh', name:'Nihonio',       cat:'Metal post-transición',   per:7, grp:13, blk:'p', state:'Sólido',  ori:'Sintético',mass:286},
  {n:114,s:'Fl', name:'Flerovio',      cat:'Metal post-transición',   per:7, grp:14, blk:'p', state:'Sólido',  ori:'Sintético',mass:289},
  {n:115,s:'Mc', name:'Moscovio',      cat:'Metal post-transición',   per:7, grp:15, blk:'p', state:'Sólido',  ori:'Sintético',mass:290},
  {n:116,s:'Lv', name:'Livermorio',    cat:'Metal post-transición',   per:7, grp:16, blk:'p', state:'Sólido',  ori:'Sintético',mass:293},
  {n:117,s:'Ts', name:'Teneso',        cat:'Halógeno',                per:7, grp:17, blk:'p', state:'Sólido',  ori:'Sintético',mass:294},
  {n:118,s:'Og', name:'Oganesón',      cat:'Gas noble',               per:7, grp:18, blk:'p', state:'Gas',     ori:'Sintético',mass:294},
];

// ─────────────────────────────────────────────
//  CONFIGURACIÓN
// ─────────────────────────────────────────────
const MAX_GUESSES = 8;
const START_DATE  = new Date('2026-01-01T00:00:00');
const STORE_KEY   = 'periodle_state';
const STATS_KEY   = 'periodle_stats';

// Pool de elementos para el reto diario (1–103, excluye superheavy)
const DAILY_POOL = ELEMENTS.filter(e => e.n <= 103);

// Mapa categoría → clase CSS
const CAT_CLASS = {
  'No metal':               'cat-no-metal',
  'Gas noble':              'cat-gas-noble',
  'Metal alcalino':         'cat-metal-alcalino',
  'Metal alcalinotérreo':   'cat-metal-alcalinotérreo',
  'Metal de transición':    'cat-metal-transicion',
  'Metal post-transición':  'cat-metal-post-transicion',
  'Metaloide':              'cat-metaloide',
  'Halógeno':               'cat-halogeno',
  'Lantánido':              'cat-lantanido',
  'Actínido':               'cat-actinido',
};

// Color CSS variable por categoría
const CAT_COLOR = {
  'No metal':               'var(--cat-no-metal)',
  'Gas noble':              'var(--cat-gas-noble)',
  'Metal alcalino':         'var(--cat-metal-alcalino)',
  'Metal alcalinotérreo':   'var(--cat-metal-alcalinotérreo)',
  'Metal de transición':    'var(--cat-metal-transicion)',
  'Metal post-transición':  'var(--cat-metal-post-transicion)',
  'Metaloide':              'var(--cat-metaloide)',
  'Halógeno':               'var(--cat-halogeno)',
  'Lantánido':              'var(--cat-lantanido)',
  'Actínido':               'var(--cat-actinido)',
};

// ─────────────────────────────────────────────
//  SEEDED RANDOM  (LCG simple, reproducible)
// ─────────────────────────────────────────────
function seededRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

function seededShuffle(arr, seed) {
  const a = [...arr];
  const rand = seededRandom(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────────
//  ELEMENTO DEL DÍA
// ─────────────────────────────────────────────
function getDayNumber() {
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((today - START_DATE) / 86400000) + 1;
}

function getDailyElement() {
  const day      = getDayNumber();
  // Barajamos la lista con semilla fija para que la secuencia sea reproducible
  const shuffled = seededShuffle(DAILY_POOL, 20260101);
  const idx      = (day - 1) % shuffled.length;
  return shuffled[idx];
}

// ─────────────────────────────────────────────
//  ESTADO DEL JUEGO
// ─────────────────────────────────────────────
let TARGET;
let guesses  = [];   // array de objetos Element
let gameOver = false;

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s.date !== getTodayStr()) return null;
    return s;
  } catch { return null; }
}

function saveState(won, completed) {
  const s = {
    date:      getTodayStr(),
    guesses:   guesses.map(e => e.n),
    won,
    completed,
  };
  localStorage.setItem(STORE_KEY, JSON.stringify(s));
}

// ─────────────────────────────────────────────
//  ESTADÍSTICAS
// ─────────────────────────────────────────────
function loadStats() {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? JSON.parse(raw) : defaultStats();
  } catch { return defaultStats(); }
}

function defaultStats() {
  return { played:0, won:0, streak:0, maxStreak:0, dist:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0} };
}

function saveStats(won, guessCount) {
  const stats = loadStats();
  const today = getTodayStr();
  if (stats.lastDate === today) return; // ya contado hoy
  stats.lastDate = today;
  stats.played++;
  if (won) {
    stats.won++;
    stats.streak++;
    stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
    stats.dist[guessCount] = (stats.dist[guessCount] || 0) + 1;
  } else {
    stats.streak = 0;
  }
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

// ─────────────────────────────────────────────
//  LÓGICA DE COMPARACIÓN
// ─────────────────────────────────────────────
function compareGuess(guess) {
  const t = TARGET;
  return {
    cat:   guess.cat   === t.cat   ? 'correct' : 'wrong',
    per:   guess.per   === t.per   ? 'correct' : (guess.per < t.per ? 'higher' : 'lower'),
    grp:   (guess.grp === null && t.grp === null)   ? 'correct'
         : (guess.grp === null || t.grp === null)   ? 'wrong'
         : (guess.grp === t.grp)                    ? 'correct'
         : (guess.grp < t.grp)                      ? 'higher' : 'lower',
    blk:   guess.blk   === t.blk   ? 'correct' : 'wrong',
    state: guess.state === t.state ? 'correct' : 'wrong',
    ori:   guess.ori   === t.ori   ? 'correct' : 'wrong',
    n:     guess.n     === t.n     ? 'correct' : (guess.n < t.n ? 'higher' : 'lower'),
  };
}

function isWin(result) {
  return Object.values(result).every(v => v === 'correct');
}

// ─────────────────────────────────────────────
//  RENDER: TARJETA DE ELEMENTO
// ─────────────────────────────────────────────
function renderCard(el, sizeClass) {
  const cls = CAT_CLASS[el.cat] || 'cat-no-metal';
  return `
    <div class="el-card ${cls} ${sizeClass || ''}">
      <span class="el-num">${el.n}</span>
      <span class="el-symbol">${el.s}</span>
      <span class="el-name">${el.name}</span>
      <span class="el-mass">${el.mass}</span>
    </div>`;
}

// ─────────────────────────────────────────────
//  RENDER: CELDA DE RESULTADO
// ─────────────────────────────────────────────
const ICONS = { correct:'✓', higher:'↑', lower:'↓', wrong:'✗' };

function renderCell(result, value, delay) {
  const icon = ICONS[result];
  return `<div class="guess-cell ${result}" style="animation-delay:${delay}s">
    <span class="cell-icon">${icon}</span>
    <span class="cell-val">${value !== null && value !== undefined ? value : '—'}</span>
  </div>`;
}

// ─────────────────────────────────────────────
//  AÑADIR FILA DE INTENTO
// ─────────────────────────────────────────────
function addGuessRow(el, result) {
  const tbody = document.getElementById('guesses-tbody');
  const tr    = document.createElement('tr');
  tr.className = 'guess-row';

  const d = 0.07; // delay entre celdas (seg)
  tr.innerHTML = `
    <td>${renderCard(el)}</td>
    <td>${renderCell(result.cat,   el.cat,               0*d)}</td>
    <td>${renderCell(result.per,   `P${el.per}`,         1*d)}</td>
    <td>${renderCell(result.grp,   el.grp ?? '—',        2*d)}</td>
    <td>${renderCell(result.blk,   el.blk.toUpperCase(), 3*d)}</td>
    <td>${renderCell(result.state, el.state,             4*d)}</td>
    <td>${renderCell(result.ori,   el.ori,               5*d)}</td>
    <td>${renderCell(result.n,     el.n,                 6*d)}</td>`;

  tbody.appendChild(tr);
  tr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─────────────────────────────────────────────
//  AUTOCOMPLETE
// ─────────────────────────────────────────────
const searchInput = document.getElementById('search-input');
const acList      = document.getElementById('autocomplete');
const guessBtn    = document.getElementById('guess-btn');

let acSelected = -1;
let acItems    = [];

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  acList.innerHTML = '';
  acSelected = -1;

  if (!q || gameOver) {
    acList.classList.add('hidden');
    guessBtn.disabled = true;
    return;
  }

  const guessedNs = new Set(guesses.map(e => e.n));
  acItems = ELEMENTS.filter(e =>
    !guessedNs.has(e.n) && (
      e.name.toLowerCase().includes(q) ||
      e.s.toLowerCase() === q
    )
  ).slice(0, 8);

  if (!acItems.length) {
    acList.classList.add('hidden');
    guessBtn.disabled = true;
    return;
  }

  acItems.forEach((el, i) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    li.innerHTML = `<span class="ac-symbol">${el.s}</span>${el.name}<span class="ac-num">${el.n}</span>`;
    li.addEventListener('mousedown', e => { e.preventDefault(); selectAc(i); });
    acList.appendChild(li);
  });

  acList.classList.remove('hidden');
  guessBtn.disabled = false;
});

searchInput.addEventListener('keydown', e => {
  if (acList.classList.contains('hidden')) {
    if (e.key === 'Enter') submitGuess();
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    acSelected = Math.min(acSelected + 1, acItems.length - 1);
    highlightAc();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    acSelected = Math.max(acSelected - 1, -1);
    highlightAc();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (acSelected >= 0) selectAc(acSelected);
    else if (acItems.length === 1) selectAc(0);
    else submitGuess();
  } else if (e.key === 'Escape') {
    acList.classList.add('hidden');
  }
});

searchInput.addEventListener('blur', () => {
  setTimeout(() => acList.classList.add('hidden'), 150);
});

function highlightAc() {
  [...acList.children].forEach((li, i) => {
    li.classList.toggle('active', i === acSelected);
  });
}

function selectAc(i) {
  const el = acItems[i];
  if (!el) return;
  searchInput.value = el.name;
  acList.classList.add('hidden');
  guessBtn.disabled = false;
  searchInput.focus();
}

guessBtn.addEventListener('click', submitGuess);

// ─────────────────────────────────────────────
//  SUBMIT GUESS
// ─────────────────────────────────────────────
function submitGuess() {
  if (gameOver) return;
  const q = searchInput.value.trim().toLowerCase();
  const el = ELEMENTS.find(e =>
    e.name.toLowerCase() === q ||
    e.s.toLowerCase()    === q
  );

  if (!el) { showToast('Elemento no encontrado. Escribe el nombre completo.'); return; }
  if (guesses.some(g => g.n === el.n)) { showToast('Ya has intentado ese elemento.'); return; }

  guesses.push(el);
  const result = compareGuess(el);
  addGuessRow(el, result);

  searchInput.value = '';
  guessBtn.disabled = true;
  acList.classList.add('hidden');

  const remaining = MAX_GUESSES - guesses.length;

  if (isWin(result)) {
    gameOver = true;
    saveStats(true, guesses.length);
    saveState(true, true);
    disableInput();
    setTimeout(() => showResult(true), 900);
  } else if (guesses.length >= MAX_GUESSES) {
    gameOver = true;
    saveStats(false, guesses.length);
    saveState(false, true);
    disableInput();
    setTimeout(() => showResult(false), 600);
  } else {
    saveState(false, false);
    updateAttemptsLeft(remaining);
  }
}

function disableInput() {
  searchInput.disabled = true;
  guessBtn.disabled    = true;
  document.getElementById('attempts-left').textContent = '';
}

function updateAttemptsLeft(n) {
  const el = document.getElementById('attempts-left');
  el.textContent = n === 1 ? '⚠️ Último intento' : `${n} intentos disponibles`;
}

// ─────────────────────────────────────────────
//  MODAL DE RESULTADO
// ─────────────────────────────────────────────
function showResult(won) {
  const modal   = document.getElementById('modal-result');
  const content = document.getElementById('result-content');
  const reveal  = document.getElementById('element-reveal');

  if (won) {
    const n = guesses.length;
    const emojis = ['🏆','🥇','🎯','🧪','⚗️','🔬','🧬','😅'];
    content.innerHTML = `
      <div class="result-win">${emojis[n-1] || '🎉'}</div>
      <p class="result-title">¡Correcto!</p>
      <p class="result-sub">Lo adivinaste en <strong>${n}</strong> intento${n>1?'s':''}.</p>`;
  } else {
    content.innerHTML = `
      <div class="result-lose">💀</div>
      <p class="result-title">¡Sin intentos!</p>
      <p class="result-sub">El elemento era:</p>`;
  }

  reveal.innerHTML = renderCard(TARGET, 'big');
  modal.classList.remove('hidden');
  startCountdown('countdown2');

  document.getElementById('close-result').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  document.getElementById('share-btn').addEventListener('click', shareResult);
}

// ─────────────────────────────────────────────
//  COMPARTIR
// ─────────────────────────────────────────────
function shareResult() {
  const won = guesses.some(g => g.n === TARGET.n);
  const day = getDayNumber();
  const emoji = (r) => {
    if (r === 'correct') return '🟩';
    if (r === 'higher')  return '🔼';
    if (r === 'lower')   return '🔽';
    return '⬜';
  };

  let text = `⚗️ Periodle #${day}\n`;
  text += won ? `${guesses.length}/${MAX_GUESSES}\n\n` : `X/${MAX_GUESSES}\n\n`;

  guesses.forEach(g => {
    const r = compareGuess(g);
    // Orden: cat, per, grp, blk, state, ori, n
    text += [r.cat, r.per, r.grp, r.blk, r.state, r.ori, r.n].map(emoji).join('') + '\n';
  });

  text += '\nJuega en: periodle.app';

  if (navigator.share) {
    navigator.share({ text }).catch(() => copyToClipboard(text));
  } else {
    copyToClipboard(text);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('¡Resultado copiado al portapapeles!');
  }).catch(() => {
    showToast('No se pudo copiar.');
  });
}

// ─────────────────────────────────────────────
//  MODAL DE ESTADÍSTICAS
// ─────────────────────────────────────────────
function showStats() {
  const stats  = loadStats();
  const pct    = stats.played ? Math.round(stats.won / stats.played * 100) : 0;
  const maxVal = Math.max(...Object.values(stats.dist), 1);

  const lastState = loadState();
  const wonToday  = lastState?.won;
  const guessToday = wonToday ? lastState.guesses.length : null;

  let distHtml = '';
  for (let i = 1; i <= MAX_GUESSES; i++) {
    const v   = stats.dist[i] || 0;
    const pWidth = Math.max(4, Math.round(v / maxVal * 100));
    const hl  = wonToday && guessToday === i ? 'highlight' : '';
    distHtml += `
      <div class="dist-row">
        <span class="dist-num">${i}</span>
        <div class="dist-bar-wrap">
          <div class="dist-bar ${hl}" style="width:${pWidth}%">${v > 0 ? v : ''}</div>
        </div>
      </div>`;
  }

  document.getElementById('stats-content').innerHTML = `
    <div class="stats-grid">
      <div class="stat-box"><div class="stat-number">${stats.played}</div><div class="stat-label">Jugados</div></div>
      <div class="stat-box"><div class="stat-number">${pct}</div><div class="stat-label">% Victorias</div></div>
      <div class="stat-box"><div class="stat-number">${stats.streak}</div><div class="stat-label">Racha</div></div>
      <div class="stat-box"><div class="stat-number">${stats.maxStreak}</div><div class="stat-label">Racha máx.</div></div>
    </div>
    <p class="dist-title">Distribución de intentos</p>
    ${distHtml}`;

  document.getElementById('modal-stats').classList.remove('hidden');
  startCountdown('countdown');
}

// ─────────────────────────────────────────────
//  CUENTA ATRÁS
// ─────────────────────────────────────────────
let countdownInterval = null;

function startCountdown(id) {
  if (countdownInterval) clearInterval(countdownInterval);
  tick(id);
  countdownInterval = setInterval(() => tick(id), 1000);
}

function tick(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const now   = new Date();
  const next  = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const diff  = next - now;
  const hh    = String(Math.floor(diff / 3600000)).padStart(2,'0');
  const mm    = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0');
  const ss    = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0');
  el.textContent = `${hh}:${mm}:${ss}`;
}

// ─────────────────────────────────────────────
//  TOAST
// ─────────────────────────────────────────────
function showToast(msg) {
  const old = document.querySelector('.toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2700);
}

// ─────────────────────────────────────────────
//  MODAL AYUDA: LEYENDA DE CATEGORÍAS
// ─────────────────────────────────────────────
function buildCatLegend() {
  const cont = document.getElementById('cat-legend');
  if (!cont) return;
  Object.entries(CAT_COLOR).forEach(([cat, color]) => {
    const pill = document.createElement('div');
    pill.className = 'cat-pill';
    pill.innerHTML = `<span class="cat-dot" style="background:${color}"></span>${cat}`;
    cont.appendChild(pill);
  });
}

// ─────────────────────────────────────────────
//  INICIALIZACIÓN
// ─────────────────────────────────────────────
function init() {
  TARGET = getDailyElement();
  const day = getDayNumber();

  // Header info
  document.getElementById('day-number').textContent = `#${day}`;
  const dateOpts = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  document.getElementById('header-date').textContent =
    new Date().toLocaleDateString('es-ES', dateOpts);

  buildCatLegend();

  // Cargar partida guardada
  const saved = loadState();
  if (saved) {
    saved.guesses.forEach(n => {
      const el = ELEMENTS.find(e => e.n === n);
      if (!el) return;
      guesses.push(el);
      addGuessRow(el, compareGuess(el));
    });

    if (saved.completed) {
      gameOver = true;
      disableInput();
      if (saved.won) {
        setTimeout(() => showResult(true), 400);
      } else {
        setTimeout(() => showResult(false), 400);
      }
    } else {
      updateAttemptsLeft(MAX_GUESSES - guesses.length);
    }
  } else {
    updateAttemptsLeft(MAX_GUESSES);
  }

  // Botones de modales
  document.getElementById('btn-help').addEventListener('click', () => {
    document.getElementById('modal-help').classList.remove('hidden');
  });
  document.getElementById('close-help').addEventListener('click', () => {
    document.getElementById('modal-help').classList.add('hidden');
  });
  document.getElementById('btn-stats').addEventListener('click', showStats);
  document.getElementById('close-stats').addEventListener('click', () => {
    document.getElementById('modal-stats').classList.add('hidden');
    if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
  });

  // Cerrar modales al hacer clic fuera
  ['modal-help', 'modal-stats', 'modal-result'].forEach(id => {
    document.getElementById(id).addEventListener('click', function(e) {
      if (e.target === this) this.classList.add('hidden');
    });
  });

  // Mostrar ayuda la primera vez
  if (!loadStats().played && !saved) {
    setTimeout(() => document.getElementById('modal-help').classList.remove('hidden'), 500);
  }
}

document.addEventListener('DOMContentLoaded', init);
