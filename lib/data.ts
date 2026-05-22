export const COMPANY = {
  name: "RUNA SOLAR",
  shortName: "Runa Solar",
  tagline: "Сонячні станції, що не вимикаються разом зі світлом",
  phones: ["+380 67 791 97 97", "+380 63 663 88 99"],
  phonesRaw: ["+380677919797", "+380636638899"],
  instagram: "https://www.instagram.com/runasolar_/",
  tiktok: "https://www.tiktok.com/@runasolar_",
  email: "runasolarua@gmail.com",
  city: "Хмельницький",
  region: "Хмельницька область",
  serviceRadius: 120,
  address: "проспект Миру, 58/3, Хмельницький",
  addressStreet: "проспект Миру, 58/3",
  addressCity: "Хмельницький",
  postalCode: "29027",
  // Direct Google Maps share link to our office pin
  mapsUrl: "https://maps.app.goo.gl/iPAC3vpiqqqgTLvA7",
  workingHours: "Пн–Сб, 9:00–19:00",
};

export const NAV = [
  { href: "#services", label: "Послуги" },
  { href: "#cases", label: "Проєкти" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#contact", label: "Контакти" },
];

export const BRANDS: {
  name: string;
  category: "inverter" | "panel";
  /** Path under /public — when missing, the marquee falls back to a wordmark. */
  logo?: string;
}[] = [
  // Inverters & batteries
  { name: "Huawei", category: "inverter", logo: "/brands/huawei.png" },
  { name: "Solis", category: "inverter", logo: "/brands/solis.png" },
  { name: "Solax", category: "inverter", logo: "/brands/solax.webp" },
  { name: "FOX ESS", category: "inverter", logo: "/brands/foxess.webp" },
  { name: "Deye", category: "inverter", logo: "/brands/deye.webp" },
  { name: "Victron", category: "inverter", logo: "/brands/victron.svg" },
  { name: "Fronius", category: "inverter", logo: "/brands/fronius.svg" },
  // Solar panels
  { name: "LONGi", category: "panel", logo: "/brands/longi.png" },
  { name: "JinkoSolar", category: "panel", logo: "/brands/jinko.svg" },
  { name: "JA Solar", category: "panel", logo: "/brands/jasolar.svg" },
  { name: "TW Solar", category: "panel", logo: "/brands/tw-solar.webp" },
  { name: "Trina Solar", category: "panel", logo: "/brands/trina.svg" },
  { name: "Risen Energy", category: "panel", logo: "/brands/risen.webp" },
  { name: "Dah Solar", category: "panel", logo: "/brands/dahsolar.webp" },
  { name: "Leapton", category: "panel", logo: "/brands/leapton.webp" },
];

export const SERVICES = [
  {
    id: "home",
    title: "Сонячна електростанція для будинку",
    short: "СЕС дім",
    description:
      "Мережева станція під «зелений тариф» або гібридна станція з акумуляторами для Вашого комфорту під ключ для приватного будинку, таунхаусу, модульного будинку. Робимо проєктування для найкращого результату, використовуємо фотомодулі зі списку TOP Tier-1, швидкі терміни монтажу станції.",
    bullets: [
      "Можливість заробляти на продажі надлишку електроенергії",
      "Економія на поточних рахунках за електроенергію",
      "Комфортні умови під час відключень чи аварій, без шуму генератора",
    ],
  },
  {
    id: "business",
    title: "СЕС для бізнесу",
    short: "СЕС бізнес",
    description:
      "Це рішення для зменшення витрат на електроенергію, підвищення енергонезалежності та стабільної роботи підприємства навіть в умовах перебоїв у мережі.",
    bullets: [
      "Окупність 2–6 років",
      "Економія на електроенергії",
      "Безперервне виробництво",
    ],
  },
  {
    id: "storage",
    title: "Установки зберігання енергії",
    short: "УЗЕ",
    description:
      "П'ять режимів роботи під різні сценарії — від власного споживання до енергетичного арбітражу. Система автоматично керує зарядом і віддачею батареї залежно від тарифів та цілей об'єкта.",
    bullets: [
      "Власне споживання",
      "Робота за тарифами часу доби",
      "Пріоритет віддачі в мережу",
      "Ручне керування",
      "Енергетичний арбітраж",
    ],
  },
  {
    id: "ups",
    title: "Системи автономного живлення",
    short: "САЖ",
    description:
      "Для автономної роботи вашого дому та бізнесу. Миттєво підхоплює навантаження у блекаут — без шуму, без чекання, без перебоїв.",
    bullets: [
      "Перемикання за частки секунди",
      "Тиха робота, без шуму генератора",
      "Автономія під час перебоїв зі світлом",
    ],
  },
];

export type CaseItem = {
  title: string;
  location: string;
  type: "Дім" | "Бізнес";
  power: string;
  image: string;
  /** When present, the card autoplays this clip instead of rendering the image. */
  video?: string;
};

export const CASES: CaseItem[] = [
  {
    title: "Приватний дім, Хмельницький",
    location: "Хмельницький",
    type: "Дім",
    power: "12 кВт",
    image: "/projects/private-home.webp",
    video: "/projects/loc-2.mp4",
  },
  {
    title: "Приватний дім, Хмельницький",
    location: "Хмельницький",
    type: "Дім",
    power: "6 кВт",
    image: "/projects/private-home-2.webp",
    video: "/projects/loc-2.mp4",
  },
  {
    title: "Офісний центр, Хмельницький",
    location: "Хмельницький",
    type: "Бізнес",
    power: "20 кВт",
    image: "",
    video: "/projects/office-1.mp4",
  },
];

export const TESTIMONIALS = [
  {
    name: "Андрій М.",
    role: "Власник дому",
    location: "Хмельницький, вул. Прибузька",
    project: "Гібрид 12 кВт + 10 кВт·год",
    date: "Лютий 2026",
    rating: 5,
    text: "Команда зробила все за 4 дні. Через тиждень я вже бачив у застосунку, скільки виробляє станція. Чесні цифри, чесні люди — і світло у блекаут не зникає.",
  },
  {
    name: "Олена К.",
    role: "Власниця готелю",
    location: "Хмельницький, район Виставка",
    project: "Гібрид 25 кВт + 20 кВт·год",
    date: "Січень 2026",
    rating: 5,
    text: "Раніше блекаут означав втрачених гостей і скарги. Зараз гості навіть не помічають перемикання — все плавно. Окупність вийшла рівно як обіцяли при першій зустрічі.",
  },
  {
    name: "Петро С.",
    role: "Власник цеху",
    location: "Хмельницький, район Дубове",
    project: "Гібрид 40 кВт + 30 кВт·год",
    date: "Грудень 2025",
    rating: 5,
    text: "Холодильні камери — це не іграшка. Хлопці порахували все по-чесному, поставили швидко, документи зробили самі. Я тільки підписав папери і отримав ключі від нової реальності.",
  },
];

