/** Infrastructure megaprojects Rudra is excited about, shown on the homepage map. */

export type InfrastructureLink = {
  label: string;
  href: string;
};

export type InfrastructureImage = {
  src: string;
  alt: string;
  /** Attribution for openly licensed images (e.g. Wikimedia Commons CC BY-SA). */
  credit?: { text: string; href: string };
};

export type RouteStation = {
  name: string;
  lat: number;
  lng: number;
  labelSide: "left" | "right" | "above" | "below";
};

export type RailLine = {
  name: string;
  /** Legend group heading. */
  region: string;
  color: string;
};

/**
 * Every railway drawn on the map, in legend order. Neighbouring lines get contrasting colours;
 * the Kunming–Singapore corridor keeps the blue / green / orange of its reference map.
 */
export const railLines = {
  "kunming-singapore-central": {
    name: "Kunming–Singapore Central Route",
    region: "Kunming–Singapore corridor",
    color: "#1e90dc",
  },
  "kunming-singapore-western": {
    name: "Kunming–Singapore Western Route",
    region: "Kunming–Singapore corridor",
    color: "#f2852a",
  },
  "kunming-singapore-eastern": {
    name: "Kunming–Singapore Eastern Route",
    region: "Kunming–Singapore corridor",
    color: "#2fb54a",
  },
  "vietnam-hsr": { name: "Vietnam North–South HSR", region: "Southeast Asia", color: "#e11d48" },
  ecrl: { name: "East Coast Rail Link", region: "Southeast Asia", color: "#c084fc" },
  whoosh: { name: "Jakarta–Bandung HSR (Whoosh)", region: "Southeast Asia", color: "#f59e0b" },
  "jiribam-imphal": { name: "Jiribam–Imphal Railway", region: "Himalaya & Northeast India", color: "#84cc16" },
  "sivok-rangpo": { name: "Sivok–Rangpo Railway", region: "Himalaya & Northeast India", color: "#14b8a6" },
  "kerung-kathmandu": { name: "Kerung–Kathmandu Railway", region: "Himalaya & Northeast India", color: "#6366f1" },
  "yunnan-tibet": { name: "Yunnan–Tibet Railway", region: "Himalaya & Northeast India", color: "#d946ef" },
  "sichuan-tibet": { name: "Sichuan–Tibet Railway", region: "Himalaya & Northeast India", color: "#dc2626" },
  "chengdu-chongqing": { name: "Chengdu–Chongqing Central HSR", region: "Southwest China", color: "#facc15" },
  "chongqing-kunming": { name: "Chongqing–Kunming HSR", region: "Southwest China", color: "#8b5cf6" },
  "xian-chongqing": { name: "Xi'an–Chongqing HSR", region: "Southwest China", color: "#06b6d4" },
  "chengdu-dazhou-wanzhou": { name: "Chengdu–Dazhou–Wanzhou HSR", region: "Southwest China", color: "#f472b6" },
  "western-land-sea": { name: "New Western Land–Sea Corridor", region: "Southwest China", color: "#b45309" },
  "nanning-hanoi": { name: "Nanning–Hanoi rail link", region: "South & East China · Taiwan", color: "#38bdf8" },
  "zhanjiang-haikou": { name: "Zhanjiang–Haikou HSR", region: "South & East China · Taiwan", color: "#ea580c" },
  "fuzhou-xiamen": { name: "Fuzhou–Xiamen HSR", region: "South & East China · Taiwan", color: "#fb7185" },
  "hangzhou-bay": { name: "Nantong–Suzhou–Jiaxing–Ningbo HSR", region: "South & East China · Taiwan", color: "#65a30d" },
  "thsr-pingtung": { name: "Taiwan HSR Pingtung extension", region: "South & East China · Taiwan", color: "#2dd4bf" },
  "taklamakan-loop": { name: "Taklamakan desert rail loop", region: "Northwest China & Central Asia", color: "#fde047" },
  "xinjiang-tibet": { name: "Xinjiang–Tibet Railway", region: "Northwest China & Central Asia", color: "#10b981" },
  "china-kyrgyzstan-uzbekistan": {
    name: "China–Kyrgyzstan–Uzbekistan Railway",
    region: "Northwest China & Central Asia",
    color: "#f43f5e",
  },
  "mumbai-ahmedabad-hsr": { name: "Mumbai–Ahmedabad bullet train", region: "India", color: "#ec4899" },
  "western-dfc": { name: "Western Dedicated Freight Corridor", region: "India", color: "#3b82f6" },
  "eastern-dfc": { name: "Eastern Dedicated Freight Corridor", region: "India", color: "#22c55e" },
  usbrl: { name: "Udhampur–Srinagar–Baramulla Rail Link", region: "India", color: "#fb923c" },
  pamban: { name: "Rameswaram line · New Pamban Bridge", region: "India", color: "#eab308" },
} satisfies Record<string, RailLine>;

export type RailLineId = keyof typeof railLines;

export type InfrastructureRoute = {
  /** Polyline drawn on the map as [lng, lat] pairs. */
  path: [number, number][];
  stations: RouteStation[];
  /** The railway this segment belongs to; routes without one (canals, water transfers, sea legs) use the theme accent. */
  line?: RailLineId;
  /** Drawn dotted — proposed rather than built or under construction. */
  planned?: boolean;
};

export type InfrastructureProject = {
  id: string;
  name: string;
  location: string;
  /** Short status line shown as a pill on the hover card. */
  status: string;
  description: string;
  images: InfrastructureImage[];
  lat: number;
  lng: number;
  /** ISO 3166-1 numeric id of the host country (world-atlas feature id). */
  countryNumeric: string;
  /** Other countries the project runs through, highlighted alongside the host. */
  alsoCountries?: string[];
  /** Nudges the pin away from its true location (map viewBox px) when neighbouring pins would overlap. */
  pinOffset?: [number, number];
  routes?: InfrastructureRoute[];
  links: InfrastructureLink[];
};

const kunmingSingaporeMap: InfrastructureImage = {
  src: "/images/infrastructure/kunming-singapore-rail.jpg",
  alt: "Geopolitical Monitor map of the Kunming–Singapore high-speed rail corridor with its central, eastern and western routes",
};

export const infrastructureProjects: InfrastructureProject[] = [
  {
    id: "kra-canal",
    name: "Kra Isthmus Canal",
    location: "Satun – Songkhla, southern Thailand",
    status: "Proposed · revisited for decades",
    description:
      "A ~100 km cut across Thailand's narrowest point linking the Andaman Sea to the Gulf of Thailand — bypassing the congested Strait of Malacca and shaving roughly 1,000 km off Indian–Pacific shipping routes, with industrial zones planned at both ends.",
    images: [
      {
        src: "/images/infrastructure/kra-canal.jpg",
        alt: "Map of the proposed Kra canal route between Satun and Songkhla with industrial zones",
      },
    ],
    lat: 6.9,
    lng: 100.3,
    countryNumeric: "764",
    links: [
      { label: "Kra Canal — Wikipedia", href: "https://en.wikipedia.org/wiki/Kra_Canal" },
      {
        label: "Latest on the Land Bridge alternative (CNA)",
        href: "https://www.channelnewsasia.com/asia/thailand-scales-back-megaport-land-bridge-project-6276221",
      },
    ],
  },
  {
    id: "long-thanh",
    name: "Long Thanh International Airport",
    location: "Đồng Nai, ~40 km east of Ho Chi Minh City, Vietnam",
    status: "Phase 1 opening Dec 2026",
    description:
      "Vietnam's new southern gateway: phase 1 brings a 4 km runway and a 25M-passenger terminal, scaling in later phases to four runways, 100M passengers and 5M tonnes of cargo a year — built to take over most international traffic from Tan Son Nhat.",
    images: [
      {
        src: "/images/infrastructure/long-thanh.jpg",
        alt: "Satellite master plan of Long Thanh International Airport with surrounding road links",
      },
    ],
    lat: 10.77,
    lng: 107.04,
    countryNumeric: "704",
    pinOffset: [0, 24],
    links: [
      {
        label: "Long Thanh International Airport — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Long_Thanh_International_Airport",
      },
      {
        label: "Commercial opening plan (VOV)",
        href: "https://english.vov.vn/en/economy/acv-proposes-december-1-commercial-opening-for-long-thanh-airport-post1317085.vov",
      },
    ],
  },
  {
    id: "nansha",
    name: "Nansha New City",
    location: "Guangzhou, Pearl River Delta, China",
    status: "Under development · plan to 2035",
    description:
      "An ~800 km² national-level new area at the geographic heart of the Greater Bay Area — clustering high-tech industry, a deep-water port, logistics on Longxue Island and a services hub, designed as the platform for Guangdong–Hong Kong–Macao cooperation.",
    images: [
      {
        src: "/images/infrastructure/nansha.jpg",
        alt: "Nansha land-use plan showing industrial, high-tech, harbour and logistics clusters",
      },
    ],
    lat: 22.75,
    lng: 113.55,
    countryNumeric: "156",
    pinOffset: [-20, -18],
    links: [
      { label: "Nansha District — Wikipedia", href: "https://en.wikipedia.org/wiki/Nansha_District" },
      {
        label: "State Council Nansha master plan (GBA)",
        href: "https://www.bayarea.gov.hk/en/resource/mainland-policies-measures-20220606.html",
      },
    ],
  },
  {
    id: "changi",
    name: "Changi Airport Expansion",
    location: "Changi East, Singapore",
    status: "Runway 3 live · T5 mid-2030s",
    description:
      "Changi's largest expansion ever: a 1,080-hectare Changi East site with a three-runway system, Terminal 5 (~50M passengers a year in phase one), an aviation park and Changi City — all stitched into one integrated air hub.",
    images: [
      {
        src: "/images/infrastructure/changi.jpg",
        alt: "Changi Airport expansion plan showing Changi Aviation Park, Changi City and Terminal 5",
      },
    ],
    lat: 1.36,
    lng: 103.99,
    countryNumeric: "702",
    pinOffset: [6, 22],
    links: [
      {
        label: "Changi East development (official)",
        href: "https://www.changiairport.com/en/corporate/about-us/future-developments/changi-east.html",
      },
      {
        label: "Terminal 5 project (official)",
        href: "https://www.changiairport.com/en/corporate/about-us/future-developments/terminal-5.html",
      },
    ],
  },
  {
    id: "nusantara",
    name: "Nusantara",
    location: "East Kalimantan, Borneo, Indonesia",
    status: "Under construction · political capital 2028",
    description:
      "Indonesia's purpose-built new capital carved out of the Borneo forest to take pressure off sinking, congested Jakarta — a 'forest city' plan with a government core, legislative and judicial complexes due around 2027–28, and a long-run target of nearly two million residents.",
    images: [
      {
        src: "/images/infrastructure/nusantara.jpg",
        alt: "Aerial master plan of Nusantara's core area set within the East Kalimantan forest",
      },
    ],
    lat: -0.97,
    lng: 116.7,
    countryNumeric: "360",
    links: [
      { label: "Nusantara — Wikipedia", href: "https://en.wikipedia.org/wiki/Nusantara_(city)" },
      {
        label: "Why Jakarta is still the capital (Tempo)",
        href: "https://en.tempo.co/read/2103536/why-does-jakarta-remain-the-capital-despite-the-ikn-law",
      },
    ],
  },
  {
    id: "funan-techo",
    name: "Funan Techo Canal",
    location: "Mekong at Prek Takeo to Kep, Cambodia",
    status: "Under construction · target 2028",
    description:
      "A 172.6 km canal giving Cambodia its own waterway from the Mekong to the Gulf of Thailand — letting barges reach the sea without routing through Vietnam, with ports, logistics hubs and irrigation planned along the corridor.",
    images: [
      {
        src: "/images/infrastructure/funan-techo.jpg",
        alt: "Map of the Funan Techo canal route from Phnom Penh to the Gulf of Thailand",
      },
    ],
    lat: 11.0,
    lng: 104.75,
    countryNumeric: "116",
    pinOffset: [0, 12],
    links: [
      { label: "Funan Techo Canal — Wikipedia", href: "https://en.wikipedia.org/wiki/Funan_Techo_Canal" },
      { label: "Construction update (AKP)", href: "https://www.akp.gov.kh/post/detail/371395" },
      {
        label: "China commits full funding (CamboJA News)",
        href: "https://cambojanews.com/china-now-commits-full-funding-for-funan-techo-canal-in-1b-loan/",
      },
    ],
  },
  {
    id: "techo-airport",
    name: "Techo International Airport",
    location: "Kandal & Takeo, south of Phnom Penh, Cambodia",
    status: "Opened Sep 2025 · scaling to 50M",
    description:
      "Phnom Penh's new ~$2B, 2,600-hectare 4F-class gateway replacing the old city airport — opening at 13M passengers a year and planned to grow to 30M by 2030 and 50M by 2050, able to handle the largest long-haul jets.",
    images: [
      {
        src: "/images/infrastructure/techo-airport.jpg",
        alt: "Satellite view of Techo International Airport's runway and terminal site south of Phnom Penh",
      },
    ],
    lat: 11.35,
    lng: 104.92,
    countryNumeric: "116",
    pinOffset: [8, -30],
    links: [
      {
        label: "First flight announcement (official)",
        href: "https://www.techoairport.com.kh/news/techo-intl-airport-welcome-first-flight-09-sep-2025",
      },
      { label: "Project overview (OCIC)", href: "https://www.ocic.com.kh/projects/techo-international-airport" },
    ],
  },
  {
    id: "pinglu-canal",
    name: "Pinglu Canal",
    location: "Nanning to Qinzhou, Guangxi, China",
    status: "Opened Sep 2026 · trial operations",
    description:
      "A 134 km, ~$10B waterway linking the Xijiang river system to the Beibu Gulf — China's first new river-to-sea canal since 1949, taking 5,000-tonne ships and cutting more than 560 km off the route from inland southwest China to ASEAN ports.",
    images: [
      {
        src: "/images/infrastructure/pinglu.jpg",
        alt: "Map comparing shipping routes to the sea before and after the Pinglu canal",
      },
    ],
    lat: 22.3,
    lng: 108.55,
    countryNumeric: "156",
    links: [
      {
        label: "Canal opens to shipping (gov.cn)",
        href: "https://english.www.gov.cn/news/202609/16/content_WS6aaa7819c6d00ca5f9a0d3b2.html",
      },
      {
        label: "New gateway to ASEAN (Container News)",
        href: "https://container-news.com/china-opens-pinglu-canal-launching-new-shipping-gateway-to-asean/",
      },
    ],
  },
  {
    id: "haikou-jiangdong",
    name: "Haikou Jiangdong New Area",
    location: "Haikou, Hainan, China",
    status: "Under development · plan to 2035",
    description:
      "A ~298 km² new district on Haikou's east coast designed as the headquarters hub of the Hainan Free Trade Port — clusters for international services, culture and higher education around Meilan airport, framed by rivers, wetlands and the Dongzhai mangrove reserve.",
    images: [
      {
        src: "/images/infrastructure/haikou-jiangdong.jpg",
        alt: "Aerial rendering of Haikou Jiangdong New Area's coastline districts, rivers and Meilan airport",
      },
    ],
    lat: 20.03,
    lng: 110.55,
    countryNumeric: "156",
    links: [
      {
        label: "Introduction to Jiangdong New Area (official)",
        href: "https://jdxq.haikou.gov.cn/xinwen/2020/show-209.html",
      },
      { label: "Park planning & clusters (official)", href: "https://jdxq.haikou.gov.cn/xinwen/2025/show-8727.html" },
    ],
  },
  {
    id: "pudong",
    name: "Pudong New Area",
    location: "Shanghai, China",
    status: "Launched 1990 · still expanding",
    description:
      "The blueprint for China's new-city playbook: farmland east of the Huangpu turned into Lujiazui's financial skyline, Zhangjiang's chip and biotech cluster, the first pilot free trade zone and the Lingang special area — now ~5.8M residents and one of Asia's biggest economies by district.",
    images: [
      {
        src: "/images/infrastructure/pudong.jpg",
        alt: "Map of Pudong New Area's development zones, from Lujiazui and Zhangjiang to Lingang",
      },
    ],
    lat: 31.22,
    lng: 121.6,
    countryNumeric: "156",
    links: [
      { label: "Pudong — Wikipedia", href: "https://en.wikipedia.org/wiki/Pudong" },
      { label: "Pudong 30 years on (official)", href: "http://english.pudong.gov.cn/pudong30yearson.html" },
    ],
  },
  {
    id: "hkia-3rs",
    name: "Hong Kong Airport Expansion",
    location: "Chek Lap Kok, Hong Kong SAR, China",
    status: "3 runways live · T2 opened 2026",
    description:
      "A three-runway system built on 650 hectares of reclaimed land — comparable to building a new airport beside the old one — plus an expanded Terminal 2 and the SKYCITY airport city, lifting capacity toward 120M passengers and 10M tonnes of cargo a year by 2035.",
    images: [
      {
        src: "/images/infrastructure/hkia-3rs.jpg",
        alt: "Plan of Hong Kong International Airport's three-runway system, new concourse and Terminal 2 expansion",
      },
    ],
    lat: 22.31,
    lng: 113.92,
    countryNumeric: "344",
    pinOffset: [20, 16],
    links: [
      {
        label: "Three-runway system commissioned (official)",
        href: "https://www.hongkongairport.com/en/media-centre/press-release/2024/pr_1763",
      },
      {
        label: "Terminal 2 opening (official)",
        href: "https://www.hongkongairport.com/en/media-centre/press-release/2026/pr_1866",
      },
    ],
  },
  {
    id: "phu-quoc",
    name: "Phu Quoc Master Plan",
    location: "Phu Quoc Island, Vietnam — by Sasaki",
    status: "Master plan completed 2024",
    description:
      "Sasaki's 560-hectare mixed-use district for Sun Group between the island's hotel zone and An Thoi — a pedestrian spine running to a marina and public beach, a civic and commercial town centre, and ecological corridors for stormwater and habitat, sized for 80,000+ residents.",
    images: [
      {
        src: "/images/infrastructure/phu-quoc.jpg",
        alt: "Sasaki's 3D master plan model of the Phu Quoc district with marina, beach and town centre",
      },
    ],
    lat: 10.1,
    lng: 104.0,
    countryNumeric: "704",
    pinOffset: [-20, 14],
    links: [
      { label: "Phu Quoc Master Plan (Sasaki)", href: "https://www.sasaki.com/projects/phu-quoc-master-plan/" },
      { label: "Phu Quoc — Wikipedia", href: "https://en.wikipedia.org/wiki/Phu_Quoc" },
    ],
  },
  {
    id: "yangpu-port",
    name: "Yangpu Port Expansion",
    location: "Yangpu, Danzhou, Hainan, China",
    status: "Expanding · 12M TEU by 2035",
    description:
      "Hainan Free Trade Port's main cargo gateway and the Beibu Gulf deep-water port closest to international trunk routes — a ¥10.3B container hub expansion adds berths for 24,000-TEU megaships, after throughput jumped 65% to 3.31M TEU in 2025, with a master plan targeting 12M TEU by 2035.",
    images: [
      {
        src: "/images/infrastructure/yangpu.jpg",
        alt: "Aerial view of a container port with long breakwaters and terminals",
      },
    ],
    lat: 19.73,
    lng: 109.19,
    countryNumeric: "156",
    pinOffset: [-14, 12],
    links: [
      {
        label: "Container traffic up 65% (gov.cn)",
        href: "https://english.www.gov.cn/archive/statistics/202601/09/content_WS6960bf4ac6d00ca5f9a08817.html",
      },
      {
        label: "Yangpu Port Master Plan 2024–2035 (Hainan FTP)",
        href: "http://en.hnftp.gov.cn/HowtoInvest/IndependentCustomsOperations/202503/t20250305_3471800.html",
      },
      { label: "Container hub expansion starts (Seetao)", href: "https://www.seetaoe.com/details/199278.html" },
    ],
  },
  {
    id: "hon-khoai",
    name: "Hon Khoai Island Port",
    location: "Hon Khoai Island, Ca Mau, Vietnam",
    status: "Under construction · target 2028–29",
    description:
      "A dual-use deep-water general port on an island off Vietnam's southern tip, tied to the mainland by the country's longest sea-crossing bridge and the Ca Mau–Dat Mui expressway — pitched as a new southern gateway for Mekong Delta trade on the Gulf of Thailand.",
    images: [
      {
        src: "/images/infrastructure/hon-khoai.jpg",
        alt: "Rendering of the Hon Khoai port with breakwaters linking two forested islands",
      },
      {
        src: "/images/infrastructure/hon-khoai-map.jpg",
        alt: "ISEAS map showing planned Hon Khoai and Ha Tien ports and the Vientiane–Vung Ang railway",
      },
    ],
    lat: 8.43,
    lng: 104.83,
    countryNumeric: "704",
    links: [
      {
        label: "Vietnam's longest sea bridge takes shape (Tuoi Tre)",
        href: "https://news.tuoitre.vn/vietnams-longest-sea-crossing-bridge-takes-shape-103260923162034641.htm",
      },
      {
        label: "Deputy PM on Ca Mau project timelines",
        href: "https://www.vietnam.vn/en/pho-thu-tuong-pham-gia-tuc-yeu-cau-day-nhanh-tien-do-cac-du-an-giao-thong-trong-diem-o-ca-mau",
      },
    ],
  },
  {
    id: "kunming-bangkok-rail",
    name: "Kunming–Bangkok Railway (Central Route)",
    location: "Kunming, China → Vientiane, Laos → Bangkok, Thailand",
    status: "Kunming–Vientiane live · Thai HSR 2030–31",
    description:
      "The central spine of the Kunming–Singapore corridor: ~1,650 km tying southwest China to the Gulf of Thailand. The 1,035 km Kunming–Vientiane line has run since Dec 2021; Thailand's 250 km Bangkok–Nakhon Ratchasima high-speed section is ~57% built for a 2030–31 opening, with the 357 km extension to Nong Khai and a new Mekong rail bridge to Vientiane next.",
    images: [kunmingSingaporeMap],
    lat: 19.4,
    lng: 102.3,
    countryNumeric: "418",
    alsoCountries: ["156", "764"],
    routes: [
      {
        line: "kunming-singapore-central",
        path: [
          [102.71, 25.04],
          [102.54, 24.35],
          [100.97, 22.79],
          [100.8, 22.01],
          [101.69, 21.19],
          [101.4, 20.95],
          [101.99, 20.69],
          [102.13, 19.89],
          [102.45, 18.92],
          [102.6, 17.97],
        ],
        stations: [
          { name: "Kunming", lat: 25.04, lng: 102.71, labelSide: "right" },
          { name: "Yuxi", lat: 24.35, lng: 102.54, labelSide: "right" },
          { name: "Mohan", lat: 21.19, lng: 101.69, labelSide: "right" },
          { name: "Luang Namtha", lat: 20.95, lng: 101.4, labelSide: "left" },
          { name: "Vientiane", lat: 17.97, lng: 102.6, labelSide: "left" },
        ],
      },
      {
        line: "kunming-singapore-central",
        planned: true,
        path: [
          [102.6, 17.97],
          [102.74, 17.88],
          [102.79, 17.41],
          [102.83, 16.43],
          [102.1, 14.97],
        ],
        stations: [{ name: "Nong Khai", lat: 17.88, lng: 102.74, labelSide: "right" }],
      },
      {
        line: "kunming-singapore-central",
        path: [
          [102.1, 14.97],
          [101.41, 14.71],
          [100.91, 14.53],
          [100.57, 14.35],
          [100.5, 13.75],
        ],
        stations: [{ name: "Bangkok", lat: 13.75, lng: 100.5, labelSide: "left" }],
      },
    ],
    links: [
      { label: "Laos–China Railway — Wikipedia", href: "https://en.wikipedia.org/wiki/Boten%E2%80%93Vientiane_railway" },
      { label: "Thai–Chinese High-Speed Railway (official)", href: "https://www.highspeedrail-thai-china.com/en/" },
      {
        label: "Nong Khai phase tenders (Nation Thailand)",
        href: "https://www.nationthailand.com/news/general/40069210",
      },
    ],
  },
  {
    id: "kunming-singapore-western",
    name: "Kunming–Bangkok Railway (Western Route)",
    location: "Kunming → Dali → Ruili, China → Mandalay → Yangon, Myanmar → Bangkok",
    status: "Kunming–Dali live · Dali–Ruili building · Myanmar leg proposed",
    description:
      "The Myanmar branch of the Kunming–Singapore corridor. China has already opened Kunming–Dali and is pushing the Dali–Ruili line to the border; from there the China–Myanmar Economic Corridor proposes a Muse–Mandalay railway continuing south to Yangon and across the Three Pagodas Pass to Bangkok.",
    images: [kunmingSingaporeMap],
    lat: 19.75,
    lng: 96.13,
    countryNumeric: "104",
    alsoCountries: ["156", "764"],
    routes: [
      {
        line: "kunming-singapore-western",
        path: [
          [102.71, 25.04],
          [101.55, 25.03],
          [100.27, 25.61],
          [99.16, 25.11],
          [97.85, 24.01],
        ],
        stations: [
          { name: "Dali", lat: 25.61, lng: 100.27, labelSide: "above" },
          { name: "Ruili", lat: 24.01, lng: 97.85, labelSide: "right" },
        ],
      },
      {
        line: "kunming-singapore-western",
        planned: true,
        path: [
          [97.85, 24.01],
          [97.75, 22.93],
          [96.08, 21.96],
          [96.13, 19.75],
          [96.16, 16.87],
          [97.63, 16.49],
          [98.4, 15.3],
          [99.53, 14.02],
          [100.5, 13.75],
        ],
        stations: [
          { name: "Mandalay", lat: 21.96, lng: 96.08, labelSide: "left" },
          { name: "Yangon", lat: 16.87, lng: 96.16, labelSide: "left" },
        ],
      },
    ],
    links: [
      {
        label: "Kunming–Singapore railway — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Kunming%E2%80%93Singapore_railway",
      },
      {
        label: "Muse–Mandalay railway — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Muse%E2%80%93Mandalay_railway",
      },
    ],
  },
  {
    id: "kunming-singapore-eastern",
    name: "Kunming–Bangkok Railway (Eastern Route)",
    location: "Kunming → Hanoi → Ho Chi Minh City → Phnom Penh → Bangkok",
    status: "Proposed",
    description:
      "The Vietnam branch of the Kunming–Singapore corridor: down the Red River valley via Hekou to Hanoi, south along the coast to Ho Chi Minh City, then west through Phnom Penh to Bangkok — filling Cambodia's missing link and joining up with Vietnam's own Lao Cai–Hanoi and North–South rail upgrades.",
    images: [kunmingSingaporeMap],
    lat: 13.6,
    lng: 103.4,
    countryNumeric: "704",
    alsoCountries: ["156", "116", "764"],
    routes: [
      {
        line: "kunming-singapore-eastern",
        planned: true,
        path: [
          [102.71, 25.04],
          [103.38, 23.37],
          [103.95, 22.5],
          [104.87, 21.72],
          [105.84, 21.03],
          [105.9, 20.25],
          [105.5, 18.6],
          [106.45, 17.4],
          [107.4, 16.4],
          [108.0, 15.95],
          [108.55, 15.05],
          [108.95, 13.8],
          [109.0, 12.3],
          [107.95, 11.0],
          [106.7, 10.78],
          [104.92, 11.56],
          [103.2, 13.1],
          [102.56, 13.66],
          [100.5, 13.75],
        ],
        stations: [
          { name: "Hekou", lat: 22.5, lng: 103.95, labelSide: "right" },
          { name: "Phnom Penh", lat: 11.56, lng: 104.92, labelSide: "left" },
        ],
      },
    ],
    links: [
      {
        label: "Kunming–Singapore railway — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Kunming%E2%80%93Singapore_railway",
      },
      {
        label: "Lao Cai–Hanoi–Haiphong railway — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Lao_Cai%E2%80%93Hanoi%E2%80%93Haiphong_railway",
      },
    ],
  },
  {
    id: "bangkok-singapore-extension",
    name: "Central Route Extension to Kuala Lumpur & Singapore",
    location: "Bangkok, Thailand → Kuala Lumpur, Malaysia → Singapore",
    status: "KL–Johor Bahru electrified · Bangkok–KL proposed",
    description:
      "The southern tail of the Kunming–Singapore corridor. Malaysia's electrified double-track now runs from the Thai border through Kuala Lumpur to Johor Bahru (Gemas–JB finished in 2025), leaving a high-speed upgrade down the Thai peninsula and a revived KL–Singapore HSR as the pieces needed to run trains from Kunming all the way to Singapore.",
    images: [kunmingSingaporeMap],
    lat: 10.2,
    lng: 99.2,
    countryNumeric: "764",
    alsoCountries: ["458", "702"],
    routes: [
      {
        line: "kunming-singapore-central",
        planned: true,
        path: [
          [100.5, 13.75],
          [99.96, 12.57],
          [99.18, 10.5],
          [99.33, 9.13],
          [100.47, 7.0],
          [100.32, 6.66],
          [100.37, 6.12],
          [100.36, 5.4],
          [101.08, 4.6],
          [101.69, 3.14],
        ],
        stations: [],
      },
      {
        line: "kunming-singapore-central",
        path: [
          [101.69, 3.14],
          [101.94, 2.72],
          [102.6, 2.58],
          [103.32, 2.03],
          [103.76, 1.46],
          [103.85, 1.29],
        ],
        stations: [
          { name: "Kuala Lumpur", lat: 3.14, lng: 101.69, labelSide: "left" },
          { name: "Singapore", lat: 1.29, lng: 103.85, labelSide: "right" },
        ],
      },
    ],
    links: [
      {
        label: "Kunming–Singapore railway — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Kunming%E2%80%93Singapore_railway",
      },
      {
        label: "Gemas–Johor Bahru electrified double-track — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Gemas%E2%80%93Johor_Bahru_electrified_double-tracking_project",
      },
      {
        label: "Kuala Lumpur–Singapore high-speed rail — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Kuala_Lumpur%E2%80%93Singapore_high-speed_rail",
      },
    ],
  },
  {
    id: "vietnam-hsr",
    name: "North–South High-Speed Railway",
    location: "Hanoi (Ngoc Hoi) → Ho Chi Minh City (Thu Thiem), Vietnam",
    status: "Groundbreaking Dec 2027 · target 2035",
    description:
      "A 1,541 km, ~$67B double-track line built for 350 km/h through 15 provinces with 23 passenger stations — cutting Hanoi to Ho Chi Minh City from about 30 hours by train to roughly 5.5, and calling at the new Long Thanh airport on the way in.",
    images: [
      {
        src: "/images/infrastructure/vietnam-hsr.jpg",
        alt: "Map of the planned North–South high-speed railway and its stations along Vietnam's coast",
      },
    ],
    lat: 15.12,
    lng: 108.8,
    countryNumeric: "704",
    routes: [
      {
        line: "vietnam-hsr",
        path: [
          [105.84, 20.93],
          [105.91, 20.54],
          [106.17, 20.42],
          [105.97, 20.25],
          [105.78, 19.8],
          [105.68, 18.68],
          [105.9, 18.34],
          [106.37, 18.08],
          [106.6, 17.47],
          [107.1, 16.82],
          [107.59, 16.46],
          [108.2, 16.05],
          [108.47, 15.57],
          [108.8, 15.12],
          [109.0, 14.42],
          [109.14, 13.8],
          [109.3, 13.09],
          [109.19, 12.25],
          [108.99, 11.58],
          [108.53, 11.2],
          [108.07, 10.97],
          [107.04, 10.77],
          [106.72, 10.79],
        ],
        stations: [
          { name: "Hanoi", lat: 20.93, lng: 105.84, labelSide: "right" },
          { name: "Vinh", lat: 18.68, lng: 105.68, labelSide: "right" },
          { name: "Da Nang", lat: 16.05, lng: 108.2, labelSide: "right" },
          { name: "Nha Trang", lat: 12.25, lng: 109.19, labelSide: "right" },
          { name: "Ho Chi Minh City", lat: 10.79, lng: 106.72, labelSide: "right" },
        ],
      },
    ],
    links: [
      {
        label: "North–South express railway — Wikipedia",
        href: "https://en.wikipedia.org/wiki/North%E2%80%93South_express_railway",
      },
      {
        label: "Groundbreaking targeted for Dec 2027 (VOV)",
        href: "https://english.vov.vn/en/economy/north-south-high-speed-railway-targeted-to-break-ground-in-dec-2027-post1331412.vov",
      },
    ],
  },
  {
    id: "ecrl",
    name: "East Coast Rail Link",
    location: "Port Klang → Gombak → Kota Bharu, Peninsular Malaysia",
    status: "Kota Bharu–Gombak opens Jan 2027",
    description:
      "A 665 km, RM50B electrified line stitching the peninsula's east coast to the Klang Valley — 160 km/h trains cut Kota Bharu to Gombak to about four hours, while freight links Kuantan Port to Port Klang on the Strait of Malacca. Phase 1 is ~97% built and in testing; Gombak–Port Klang follows in 2028.",
    images: [
      {
        src: "/images/infrastructure/ecrl.jpg",
        alt: "CNA infographic of the East Coast Rail Link route and stations from Port Klang to Kota Bharu",
      },
    ],
    lat: 3.45,
    lng: 102.42,
    countryNumeric: "458",
    pinOffset: [24, 10],
    routes: [
      {
        line: "ecrl",
        path: [
          [101.39, 3.0],
          [101.37, 3.13],
          [101.45, 3.23],
          [101.6, 3.35],
          [101.72, 3.24],
          [101.91, 3.52],
          [102.42, 3.45],
          [102.77, 3.58],
          [103.2, 3.77],
          [103.3, 3.83],
          [103.43, 3.97],
          [103.39, 4.13],
          [103.42, 4.23],
          [103.45, 4.43],
          [103.42, 4.76],
          [103.14, 5.33],
          [102.75, 5.52],
          [102.49, 5.74],
          [102.4, 5.83],
          [102.24, 6.13],
        ],
        stations: [
          { name: "Port Klang", lat: 3.0, lng: 101.39, labelSide: "below" },
          { name: "Gombak", lat: 3.24, lng: 101.72, labelSide: "above" },
          { name: "Kuantan", lat: 3.97, lng: 103.43, labelSide: "right" },
          { name: "Kuala Terengganu", lat: 5.33, lng: 103.14, labelSide: "right" },
          { name: "Kota Bharu", lat: 6.13, lng: 102.24, labelSide: "right" },
        ],
      },
    ],
    links: [
      {
        label: "Last section starts as opening nears (Railway Gazette)",
        href: "https://www.railwaygazette.com/malaysia/2026/09/17/last-section-of-malaysias-ecrl-gets-underway-as-opening-nears/",
      },
      {
        label: "Testing ahead of January 2027 launch (RailMarket)",
        href: "https://railmarket.com/news/passenger-rail/61862-east-coast-rail-link-in-malaysia-enters-testing-before-january-2027-launch",
      },
    ],
  },
  {
    id: "whoosh",
    name: "Jakarta–Bandung High-Speed Rail (Whoosh)",
    location: "Jakarta (Halim) → Bandung (Tegalluar), Indonesia",
    status: "Open since Oct 2023",
    description:
      "Southeast Asia's first high-speed railway: 142 km at up to 350 km/h, cutting Jakarta–Bandung to about 45 minutes. Built with China for ~$7.3B, it's now in a government-led debt restructuring even as Jakarta weighs extending it to Surabaya.",
    images: [
      {
        src: "/images/infrastructure/whoosh.jpg",
        alt: "Map of the Jakarta–Bandung high-speed rail line with Halim, Karawang, Padalarang and Tegalluar stations",
      },
    ],
    lat: -6.6,
    lng: 107.45,
    countryNumeric: "360",
    pinOffset: [26, -4],
    routes: [
      {
        line: "whoosh",
        path: [
          [106.89, -6.25],
          [107.3, -6.37],
          [107.45, -6.55],
          [107.49, -6.84],
          [107.75, -6.97],
        ],
        stations: [
          { name: "Jakarta", lat: -6.25, lng: 106.89, labelSide: "left" },
          { name: "Bandung", lat: -6.97, lng: 107.75, labelSide: "left" },
        ],
      },
    ],
    links: [
      { label: "High-speed rail in Indonesia — Wikipedia", href: "https://en.wikipedia.org/wiki/High-speed_rail_in_Indonesia" },
      {
        label: "Whoosh's financial burden (Jakarta Post)",
        href: "https://www.thejakartapost.com/opinion/2026/08/14/analysis-whooshs-mounting-financial-burden-is-now-govts-problem",
      },
    ],
  },
  {
    id: "tuas-port",
    name: "Tuas Mega Port",
    location: "Tuas, western Singapore",
    status: "14 berths live · 65M TEU by 2040s",
    description:
      "The world's largest fully automated container terminal, consolidating all of Singapore's city terminals onto 1,337 ha of reclaimed land — 66 berths along 26 km of quay and 65M TEU a year when complete in the 2040s, freeing the old waterfront for redevelopment.",
    images: [
      {
        src: "/images/infrastructure/tuas.jpg",
        alt: "Diagram of Singapore's container terminals relocating from the city to Tuas Mega Port",
      },
    ],
    lat: 1.25,
    lng: 103.62,
    countryNumeric: "702",
    pinOffset: [-24, 8],
    links: [
      { label: "Port of the Future (MPA)", href: "https://www.mpa.gov.sg/maritime-singapore/port-of-the-future" },
      {
        label: "Tuas hits 25M TEU (Business Times)",
        href: "https://www.businesstimes.com.sg/companies-markets/transport-logistics/psas-automated-tuas-port-hits-25-million-teus-amid-us90-billion-capacity-race",
      },
    ],
  },
  {
    id: "kyaukphyu",
    name: "Kyaukphyu Deep-Sea Port",
    location: "Maday Island, Rakhine State, Myanmar",
    status: "Stalled by conflict · CITIC-led",
    description:
      "China's planned Bay of Bengal gateway on the China–Myanmar Economic Corridor — a ~$1.3B first phase for a deep-sea port and special economic zone at the head of oil and gas pipelines to Kunming that bypass the Strait of Malacca. Fighting around Kyaukphyu has kept construction largely on paper.",
    images: [
      {
        src: "/images/infrastructure/kyaukphyu.jpg",
        alt: "Kyaukphyu regional plan showing the deep-sea port, special economic zone and industrial park",
      },
    ],
    lat: 19.36,
    lng: 93.68,
    countryNumeric: "104",
    links: [
      { label: "Kyaukphyu Deep-Sea Port — Wikipedia", href: "https://en.wikipedia.org/wiki/Kyaukphyu_Deep-Sea_Port" },
      {
        label: "China's Kyaukphyu push vs the war in Arakan (DMG)",
        href: "https://dmediag.com/review/ckpat.html",
      },
    ],
  },
  {
    id: "jakarta-sea-wall",
    name: "Jakarta Giant Sea Wall",
    location: "Jakarta Bay & Java's north coast, Indonesia",
    status: "Planning · contracts from 2027",
    description:
      "A 575 km coastal defence along Java's north coast to protect ~50 million people from sinking land and rising seas — starting with Jakarta Bay's outer wall and reclaimed islands. Estimated at around $80B over 15–20 years and run by a new North Java Coast authority.",
    images: [
      {
        src: "/images/infrastructure/jakarta-sea-wall.jpg",
        alt: "Rendering of the outer sea wall and reclaimed islands across Jakarta Bay",
      },
    ],
    lat: -6.05,
    lng: 106.8,
    countryNumeric: "360",
    pinOffset: [0, -26],
    links: [
      {
        label: "Prabowo recommits to the Java Sea Wall (Cabinet Secretariat)",
        href: "https://setkab.go.id/en/president-prabowo-reiterates-commitment-to-launch-java-sea-wall-project/",
      },
      {
        label: "Divided into 15 segments (ANTARA)",
        href: "https://en.antaranews.com/news/414577/giant-sea-wall-construction-divided-into-15-segments-boppj",
      },
    ],
  },
  {
    id: "manila-airport",
    name: "New Manila International Airport",
    location: "Bulakan, Bulacan, Philippines",
    status: "First runway target 2028",
    description:
      "San Miguel's ₱735B airport on 2,500 hectares of Manila Bay coastline — four parallel runways, opening at 35M passengers a year and scaling past 100M, built to relieve a NAIA serving well over its design capacity.",
    images: [
      {
        src: "/images/infrastructure/manila-airport.jpg",
        alt: "Satellite map of the New Manila International Airport site on the Bulacan coast north of Metro Manila",
      },
    ],
    lat: 14.79,
    lng: 120.87,
    countryNumeric: "608",
    links: [
      {
        label: "First runway ready by 2028 (Context.ph)",
        href: "https://context.ph/2026/06/09/new-manila-international-airports-first-runway-ready-by-2028/",
      },
      {
        label: "SMC's NMIA runway seen ready in '28 (Inquirer)",
        href: "https://business.inquirer.net/594551/smcs-nmia-runway-seen-ready-in-28",
      },
    ],
  },
  {
    id: "medog-dam",
    name: "Medog Hydropower Project",
    location: "Great Bend of the Yarlung Tsangpo, Nyingchi, Tibet, China",
    status: "Under construction · target 2033",
    description:
      "A ¥1.2 trillion cascade of five power stations where the Yarlung Tsangpo plunges around the Great Bend — ~60 GW and 300 TWh a year, triple Three Gorges and the largest hydropower project ever. It sits on an active fault near the Indian border, and downstream India and Bangladesh are watching closely.",
    images: [
      {
        src: "/images/infrastructure/medog.jpg",
        alt: "Map of the Yarlung Tsangpo–Brahmaputra river showing the Medog dam site in Tibet",
      },
    ],
    lat: 29.46,
    lng: 95.36,
    countryNumeric: "156",
    links: [
      { label: "Medog Hydropower Station — Wikipedia", href: "https://en.wikipedia.org/wiki/Medog_Hydropower_Station" },
      {
        label: "What's driving the Medog project (The Diplomat)",
        href: "https://thediplomat.com/2026/02/whats-driving-chinas-mega-medog-hydropower-project/",
      },
    ],
  },
  {
    id: "great-nicobar",
    name: "Great Nicobar Project",
    location: "Galathea Bay, Great Nicobar Island, India",
    status: "Awaiting Cabinet nod · port works 2028",
    description:
      "India's ~₹81,000 crore plan to turn its southernmost island into a hub beside the Strait of Malacca — a transshipment port at Galathea Bay, a dual-use airport, a township and a power plant. It's contested over its impact on rainforest, coral reefs and the island's Shompen and Nicobarese communities.",
    images: [
      {
        src: "/images/infrastructure/great-nicobar.jpg",
        alt: "Explainer of the Great Nicobar project's port, airport, township and power plant sites",
      },
      {
        src: "/images/infrastructure/great-nicobar-map.jpg",
        alt: "Map of distances from Campbell Bay, Great Nicobar to major Indian Ocean ports",
      },
    ],
    lat: 6.82,
    lng: 93.87,
    countryNumeric: "356",
    links: [
      {
        label: "Galathea Bay port secures approval (The Tribune)",
        href: "https://www.tribuneindia.com/news/business/great-nicobar-project-transhipment-port-at-galathea-bay-secures-approval-despite-concerns/",
      },
      {
        label: "Phase one to begin by 2028 (Construction World)",
        href: "https://www.constructionworld.in/transport-infrastructure/ports-and-shipping/great-nicobar-port-phase-one-to-begin-by-2028/93612",
      },
    ],
  },
  {
    id: "rts-link",
    name: "Johor Bahru–Singapore RTS Link",
    location: "Bukit Chagar, Johor Bahru → Woodlands North, Singapore",
    status: "Testing · service from Jan 2027",
    description:
      "A 4 km cross-border shuttle over the Johor Strait moving up to 10,000 passengers an hour each way in 6–8 minutes, with customs at both ends — built to relieve the Causeway, which around 350,000 people cross every day.",
    images: [
      {
        src: "/images/infrastructure/rts-link.jpg",
        alt: "Satellite map of the RTS Link route from Bukit Chagar in Johor Bahru to Woodlands North in Singapore",
      },
    ],
    lat: 1.46,
    lng: 103.77,
    countryNumeric: "702",
    alsoCountries: ["458"],
    pinOffset: [26, -16],
    links: [
      {
        label: "RTS Link in final testing (Straits Times)",
        href: "https://www.straitstimes.com/asia/se-asia/rts-link-in-final-testing-fare-and-launch-date-to-be-announced-soon-transport-minister-loke",
      },
      {
        label: "Testing ahead of January launch (The Star)",
        href: "https://www.thestar.com.my/news/nation/2026/08/18/rts-link-enters-testing-phase-ahead-of-january-launch-says-loke",
      },
    ],
  },
  {
    id: "gelephu-mindfulness-city",
    name: "Gelephu Mindfulness City",
    location: "Gelephu, southern Bhutan (Assam border)",
    status: "Under development · airport and first housing underway",
    description:
      "A ~2,500 km² special administrative region on Bhutan's southern border, masterplanned by BIG as a 'mindful' economic hub with its own legal framework. Early pieces are taking shape: the Choego GMC reference building is finished, Gelephu International Airport is in the works, and on 1 Nov 2026 some 40,000 volunteers are set to build 108 chortens in a single day.",
    images: [
      {
        src: "/images/infrastructure/gelephu.jpg",
        alt: "View over Gelephu's trees and roads toward the Himalayan foothills",
        credit: {
          text: "Photo: MoutainBoy · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:View_of_moutains_from_Gelephu.jpg",
        },
      },
    ],
    lat: 26.87,
    lng: 90.49,
    countryNumeric: "064",
    links: [
      { label: "Gelephu Mindfulness City — Wikipedia", href: "https://en.wikipedia.org/wiki/Gelephu_Mindfulness_City" },
      {
        label: "His Majesty reviews GMC projects (The Bhutan Live)",
        href: "https://thebhutanlive.com/bhutan-news/his-majesty-reviews-key-infrastructure-projects-in-gelephu-mindfulness-city/",
      },
    ],
  },
  {
    id: "siang-upper",
    name: "Siang Upper Multipurpose Project",
    location: "Siang & Upper Siang districts, Arunachal Pradesh, India",
    status: "Pre-feasibility survey · strong local opposition",
    description:
      "A proposed ~11 GW dam and ~9 billion m³ reservoir on the Siang — the Yarlung Tsangpo after it leaves Tibet — pitched as India's buffer against China's Medog dam upstream, able to store water and absorb sudden releases. Declared a National Project in 2008, it is still stuck at the pre-feasibility survey, with Adi villages at the proposed dam sites protesting against displacement.",
    images: [
      {
        src: "/images/infrastructure/siang.jpg",
        alt: "The Siang river winding through forested hills in Arunachal Pradesh",
        credit: {
          text: "Photo: ঈশান জ্যোতি বৰা · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Siang_River_in_Arunachal.jpg",
        },
      },
    ],
    lat: 28.45,
    lng: 95.1,
    countryNumeric: "356",
    pinOffset: [16, 12],
    links: [
      {
        label: "Upper Siang project — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Upper_Siang_Hydroelectric_Project",
      },
      {
        label: "Cabinet panel to oversee Siang survey (Times of India)",
        href: "https://timesofindia.indiatimes.com/city/guwahati/arunachal-cabinet-approves-panel-to-oversee-siang-project-survey/articleshow/134444126.cms",
      },
    ],
  },
  {
    id: "jiribam-imphal-rail",
    name: "Jiribam–Imphal Railway",
    location: "Jiribam → Noney → Imphal, Manipur, India",
    status: "~90% built · Imphal by Dec 2028",
    description:
      "A 110.6 km line bringing Manipur's capital onto India's rail network through 54 tunnels (~66 km of them) and 131 bridges — including the Noney bridge, whose 141 m piers are the tallest of any railway bridge in the world. Jiribam–Khongsang is open; the sections on to Imphal face a safety inspection in Oct 2026, with full completion targeted for Dec 2028.",
    images: [
      {
        src: "/images/infrastructure/jiribam-imphal-map.jpg",
        alt: "Route map of the Jiribam–Imphal railway through Vangaichungpao, Khongsang, Noney and Tupul",
        credit: {
          text: "Map: Praveenvats · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Jiribam-Imphal_section.jpg",
        },
      },
    ],
    lat: 24.87,
    lng: 93.63,
    countryNumeric: "356",
    pinOffset: [24, -18],
    routes: [
      {
        line: "jiribam-imphal",
        path: [
          [93.12, 24.8],
          [93.16, 24.72],
          [93.29, 24.7],
          [93.45, 24.78],
          [93.54, 24.85],
          [93.63, 24.87],
          [93.7, 24.8],
          [93.78, 24.87],
          [93.94, 24.81],
        ],
        stations: [
          { name: "Jiribam", lat: 24.8, lng: 93.12, labelSide: "left" },
          { name: "Noney", lat: 24.87, lng: 93.63, labelSide: "above" },
          { name: "Imphal", lat: 24.81, lng: 93.94, labelSide: "right" },
        ],
      },
    ],
    links: [
      { label: "Noney railway bridge — Wikipedia", href: "https://en.wikipedia.org/wiki/Noney_Railway_Bridge" },
      {
        label: "NFR inspects Jiribam–Imphal sections (RailPost)",
        href: "https://www.railpost.in/nfr-construction-gm-inspects-sections-of-jiribam-imphal-new-line-project/",
      },
    ],
  },
  {
    id: "kaladan",
    name: "Kaladan Multi-Modal Transit Corridor",
    location: "Kolkata → Sittwe, Myanmar → Paletwa → Mizoram, India",
    status: "Sittwe port open · Paletwa road ~23% built",
    description:
      "India's back door to the Northeast that skips the narrow Siliguri Corridor: ships sail 539 km from Kolkata to the India-built port at Sittwe, barges run 158 km up the Kaladan river to Paletwa, and a road climbs to Zorinpui on the Mizoram border. Sittwe port has operated since 2023, but the 109 km Paletwa–Zorinpui road is only ~23% built amid Myanmar's civil war.",
    images: [
      {
        src: "/images/infrastructure/kaladan-map.jpg",
        alt: "Map of the Kaladan corridor: sea route from Kolkata to Sittwe, river to Paletwa and highway to Aizawl",
        credit: {
          text: "Map: RaviC · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Kaladan_Multi-Modal_Transit_Transport_Project.svg",
        },
      },
      {
        src: "/images/infrastructure/kaladan-paletwa.jpg",
        alt: "Boats moored at Paletwa on the Kaladan river in Myanmar's Chin State",
        credit: {
          text: "Photo: Germartin1 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Paletwa_seen_from_the_Kaladan_River_2015.jpg",
        },
      },
    ],
    lat: 21.3,
    lng: 92.85,
    countryNumeric: "104",
    alsoCountries: ["356"],
    routes: [
      {
        path: [
          [88.36, 22.57],
          [88.15, 22.2],
          [88.08, 21.65],
          [88.2, 21.15],
          [92.8, 20.1],
          [92.9, 20.14],
          [92.95, 20.5],
          [92.93, 20.9],
          [92.85, 21.3],
          [92.87, 21.9],
          [92.9, 22.53],
          [92.8, 23.1],
          [92.72, 23.73],
        ],
        stations: [
          { name: "Kolkata", lat: 22.57, lng: 88.36, labelSide: "left" },
          { name: "Sittwe", lat: 20.14, lng: 92.9, labelSide: "left" },
          { name: "Aizawl", lat: 23.73, lng: 92.72, labelSide: "right" },
        ],
      },
    ],
    links: [
      {
        label: "Kaladan project — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Kaladan_Multi-Modal_Transit_Transport_Project",
      },
      {
        label: "Mizoram CM reviews Kaladan progress (Construction World)",
        href: "https://www.constructionworld.in/policy-updates-and-economic-news/mizoram-cm-reviews-infrastructure-projects-at-sixth-mi-pragati-meeting/97764",
      },
    ],
  },
  {
    id: "padma-bridge",
    name: "Padma Multipurpose Bridge",
    location: "Mawa – Janjira, Bangladesh",
    status: "Open since 2022 · rail since Dec 2024",
    description:
      "A 6.15 km double-deck road-rail bridge over one of the world's most powerful rivers, built with Bangladesh's own money (~Tk 30,800 crore) after the World Bank pulled out. Opened in June 2022, it put 21 southwestern districts within hours of Dhaka, and the 170 km Padma Bridge Rail Link across its lower deck opened end to end in Dec 2024.",
    images: [
      {
        src: "/images/infrastructure/padma-bridge.jpg",
        alt: "The Padma Bridge stretching across the river at dusk",
        credit: {
          text: "Photo: Jubair Bin Iqbal · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Padma_Multipurpose_Bridge.jpg",
        },
      },
    ],
    lat: 23.44,
    lng: 90.26,
    countryNumeric: "050",
    links: [
      { label: "Padma Bridge — Wikipedia", href: "https://en.wikipedia.org/wiki/Padma_Bridge" },
      {
        label: "Rail route via Padma Bridge opens (The Daily Star)",
        href: "https://online91.thedailystar.net/news/bangladesh/transport/news/rail-route-padma-bridge-opens-new-era-connectivity-3782946",
      },
    ],
  },
  {
    id: "rooppur",
    name: "Rooppur Nuclear Power Plant",
    location: "Rooppur, Pabna, Bangladesh",
    status: "Unit 1 fuelled · grid start delayed",
    description:
      "Bangladesh's first nuclear power plant: two Rosatom VVER-1200 reactors (2.4 GW) on the Padma near Pabna, costing ~$12.65B and largely financed by a Russian loan. Unit 1 began fuel loading in April 2026, but two faulty pressuriser relief valves have pushed its first grid power back with no firm date yet.",
    images: [
      {
        src: "/images/infrastructure/rooppur.jpg",
        alt: "Aerial view of the Rooppur nuclear power plant with its cooling towers and reactor buildings",
        credit: {
          text: "Photo: Dean Calma / IAEA · CC BY 2.0",
          href: "https://commons.wikimedia.org/wiki/File:Rooppur_Nuclear_Power_Plant_2023.jpg",
        },
      },
      {
        src: "/images/infrastructure/rooppur-night.jpg",
        alt: "Rooppur's four cooling towers lit up at night",
        credit: {
          text: "Photo: ROCKY · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Rooppur_Nuclear_Power_Plant_at_night.jpg",
        },
      },
    ],
    lat: 24.07,
    lng: 89.05,
    countryNumeric: "050",
    links: [
      { label: "Rooppur Nuclear Power Plant — Wikipedia", href: "https://en.wikipedia.org/wiki/Rooppur_Nuclear_Power_Plant" },
      { label: "Rooppur grid start delayed (NEI Magazine)", href: "https://www.neimagazine.com/news/rooppur-grid-start-delayed/" },
    ],
  },
  {
    id: "kerung-kathmandu-rail",
    name: "Kerung–Kathmandu Railway",
    location: "Shigatse → Kerung (Gyirong), Tibet → Kathmandu, Nepal",
    status: "Shigatse–Kerung building · Nepal leg in study",
    description:
      "A proposed 72 km trans-Himalayan line from Kerung to Kathmandu, extending the railway China is building from Shigatse to the border. About 98% of the Nepal section would be tunnels or bridges, spiralling down from ~4,000 m on the Tibetan Plateau to 1,400 m in Kathmandu for ~$5.5B — while India pitches a rival Raxaul–Kathmandu line from the south.",
    images: [
      {
        src: "/images/infrastructure/kerung-rasuwagadhi.jpg",
        alt: "The Rasuwagadhi border crossing between Nepal and China, with a new bridge rising beside the old one",
        credit: {
          text: "Photo: Urusa Sharma · CC BY-SA 3.0",
          href: "https://commons.wikimedia.org/wiki/File:Sino-Nepal_Friendship_Bridge.JPG",
        },
      },
    ],
    lat: 28.27,
    lng: 85.38,
    countryNumeric: "524",
    alsoCountries: ["156"],
    pinOffset: [24, -8],
    routes: [
      {
        line: "kerung-kathmandu",
        path: [
          [88.88, 29.27],
          [87.64, 29.09],
          [86.3, 28.95],
          [85.6, 28.85],
          [85.3, 28.39],
          [85.38, 28.27],
        ],
        stations: [
          { name: "Shigatse", lat: 29.27, lng: 88.88, labelSide: "right" },
          { name: "Kerung", lat: 28.39, lng: 85.3, labelSide: "left" },
        ],
      },
      {
        line: "kerung-kathmandu",
        planned: true,
        path: [
          [85.38, 28.27],
          [85.35, 28.16],
          [85.25, 27.95],
          [85.32, 27.7],
        ],
        stations: [{ name: "Kathmandu", lat: 27.7, lng: 85.32, labelSide: "left" }],
      },
    ],
    links: [
      { label: "China–Nepal railway — Wikipedia", href: "https://en.wikipedia.org/wiki/China%E2%80%93Nepal_railway" },
      {
        label: "Feasibility report due (Kathmandu Post)",
        href: "https://kathmandupost.com/national/2026/02/26/feasibility-report-on-kerung-kathmandu-railway-expected-by-june",
      },
    ],
  },
  {
    id: "sivok-rangpo-rail",
    name: "Sivok–Rangpo Railway",
    location: "Sivok, West Bengal → Rangpo, Sikkim, India",
    status: "~77% built · opening Dec 2027",
    description:
      "A 44.96 km line giving Sikkim its first railway, most of it inside 14 tunnels bored through the unstable Teesta valley between Sivok in the Darjeeling foothills and Rangpo on the Sikkim border. 13 of the 14 tunnels are through and commissioning is targeted for Dec 2027, with an extension toward Gangtok planned after.",
    images: [
      {
        src: "/images/infrastructure/sivok-station.jpg",
        alt: "Sivok railway station platform, the starting point of the line to Sikkim",
        credit: {
          text: "Photo: Shibangkp · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Beauty_of_sevoke_02.jpg",
        },
      },
      {
        src: "/images/infrastructure/teesta-valley.jpg",
        alt: "The forested Teesta river valley seen from the Sevoke bridge, which the railway tunnels through",
        credit: {
          text: "Photo: Hulksr51 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Teesta_River_from_Sevoke_Bridge.jpg",
        },
      },
    ],
    lat: 27.03,
    lng: 88.45,
    countryNumeric: "356",
    pinOffset: [-26, -2],
    routes: [
      {
        line: "sivok-rangpo",
        path: [
          [88.47, 26.89],
          [88.43, 26.95],
          [88.43, 27.06],
          [88.46, 27.09],
          [88.53, 27.18],
        ],
        stations: [
          { name: "Sivok", lat: 26.89, lng: 88.47, labelSide: "right" },
          { name: "Rangpo", lat: 27.18, lng: 88.53, labelSide: "above" },
        ],
      },
    ],
    links: [
      { label: "Sivok–Rangpo line — Wikipedia", href: "https://en.wikipedia.org/wiki/Sivok%E2%80%93Rangpo_line" },
      {
        label: "Tunnel breakthrough, 2027 target (Indian Express)",
        href: "https://indianexpress.com/article/india/train-to-sikkim-sevoke-rangpo-railway-project-tunnel-breakthrough-commissioning-2027-10590537/",
      },
    ],
  },
  {
    id: "baihetan-dam",
    name: "Baihetan Dam",
    location: "Jinsha River, Sichuan–Yunnan border, China",
    status: "Fully operational since Dec 2022",
    description:
      "A 289 m double-curvature arch dam on the Jinsha, the upper Yangtze, with sixteen 1 GW turbines — the largest single generating units ever built. That makes it the world's second-biggest hydropower plant after Three Gorges, producing ~62 TWh a year that is sent 2,000 km east over ultra-high-voltage lines to Jiangsu and Zhejiang.",
    images: [
      {
        src: "/images/infrastructure/baihetan.jpg",
        alt: "Satellite view of the curved Baihetan arch dam holding back the Jinsha River reservoir",
        credit: {
          text: "Satellite: EOX s2cloudless 2024 · CC BY-NC-SA 4.0",
          href: "https://s2maps.eu",
        },
      },
    ],
    lat: 27.215,
    lng: 102.905,
    countryNumeric: "156",
    links: [
      { label: "Baihetan Dam — Wikipedia", href: "https://en.wikipedia.org/wiki/Baihetan_Dam" },
      {
        label: "Enters full operation (CGTN)",
        href: "https://news.cgtn.com/news/2022-12-19/China-s-16-GW-Baihetan-hydropower-plant-to-kick-off-full-operation-1fTlmFPh2XC/index.html",
      },
    ],
  },
  {
    id: "gaoligong-tunnel",
    name: "Gaoligong Mountain Tunnel",
    location: "Baoshan → Ruili, Yunnan, China (Dali–Ruili railway)",
    status: "~72% excavated · line opening 2028",
    description:
      "A 34.5 km bore under the Gaoligong range — Asia's longest mountain railway tunnel and the last missing link on the Dali–Ruili line to the Myanmar border. It crosses 19 active faults with rock temperatures up to 102°C; after 11 years of digging the main tunnel was 71.6% excavated by Aug 2026, with breakthrough targeted for Dec 2027.",
    images: [
      {
        src: "/images/infrastructure/gaoligong-tunnel.jpg",
        alt: "The Gaoligong tunnel portal and tunnel boring machine assembly yard in a forested valley",
        credit: {
          text: "Photo: 瑞丽江的河水 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:%E9%AB%98%E9%BB%8E%E8%B4%A1%E5%B1%B1%E9%9A%A7%E9%81%9303.jpg",
        },
      },
    ],
    lat: 24.93,
    lng: 98.78,
    countryNumeric: "156",
    links: [
      { label: "Dali–Ruili railway — Wikipedia", href: "https://en.wikipedia.org/wiki/Dali%E2%80%93Ruili_railway" },
      {
        label: "Set for completion by 2028 (China Daily)",
        href: "https://www.chinadaily.com.cn/a/202602/12/WS698d7d3fa310d6866eb38f02.html",
      },
    ],
  },
  {
    id: "kunming-changshui-t2",
    name: "Kunming Changshui Airport T2",
    location: "Kunming, Yunnan, China",
    status: "Under construction · trial ops 2028",
    description:
      "A 730,000 m² second terminal with four piers plus a third runway, the core of a ¥43.8B expansion to lift Changshui to 95 million passengers a year as China's air gateway to South and Southeast Asia. Lifting of T2's 13,000-tonne steel roof began in Sep 2026, with trial operations planned for 2028 and completion in 2029.",
    images: [
      {
        src: "/images/infrastructure/kunming-changshui.jpg",
        alt: "The golden gull-wing roof of Kunming Changshui's existing terminal, which T2 will join",
        credit: {
          text: "Photo: N509FZ · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Fa%C3%A7ade_of_Kunming_Changshui_International_Airport_(20180213180341).jpg",
        },
      },
    ],
    lat: 25.102,
    lng: 102.929,
    countryNumeric: "156",
    pinOffset: [0, -18],
    links: [
      {
        label: "Kunming Changshui Airport — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Kunming_Changshui_International_Airport",
      },
      {
        label: "T2 steel roof lift begins (Yunnan Daily)",
        href: "https://www.kunming.cn/news/c/2026-09-20/14074764.shtml",
      },
    ],
  },
  {
    id: "yunnan-tibet-rail",
    name: "Yunnan–Tibet Railway",
    location: "Dali → Lijiang → Shangri-La, Yunnan → Bomi, Tibet",
    status: "Open to Shangri-La (2023) · Tibet leg planned",
    description:
      "The southern rail route onto the Tibetan Plateau. Trains have run from Kunming via Dali and Lijiang to Shangri-La — at 3,276 m, Yunnan's highest station — since Nov 2023; the next ~490 km, tunnelling through the Three Parallel Rivers gorges past Deqin to meet the Sichuan–Tibet line near Bomi, is still being surveyed.",
    images: [
      {
        src: "/images/infrastructure/lijiang-shangrila-rail.jpg",
        alt: "The Lijiang–Shangri-La railway viaduct crossing grassland beside a white Tibetan stupa",
        credit: {
          text: "Photo: N509FZ · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Lijiang%E2%80%94Shangri-la_Railway_at_Jiantang_Town,_Shangri-la_(20230929175646).jpg",
        },
      },
      {
        src: "/images/infrastructure/lijiang-shangrila-train.jpg",
        alt: "A green and white Fuxing train passing grazing yaks in Shangri-La",
        credit: {
          text: "Photo: 瑞丽江的河水 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:%E4%B8%BD%E9%A6%99%E9%93%81%E8%B7%AF%E9%A6%99%E6%A0%BC%E9%87%8C%E6%8B%89%E6%AE%B5_-_2025-05-08_03.jpg",
        },
      },
    ],
    lat: 27.83,
    lng: 99.7,
    countryNumeric: "156",
    routes: [
      {
        line: "yunnan-tibet",
        path: [
          [100.27, 25.61],
          [100.2, 26.2],
          [100.23, 26.87],
          [99.95, 27.4],
          [99.7, 27.83],
        ],
        stations: [{ name: "Lijiang", lat: 26.87, lng: 100.23, labelSide: "left" }],
      },
      {
        line: "yunnan-tibet",
        planned: true,
        path: [
          [99.7, 27.83],
          [98.91, 28.49],
          [98.3, 29.0],
          [97.6, 29.3],
          [96.77, 29.49],
          [95.77, 29.86],
        ],
        stations: [],
      },
    ],
    links: [
      {
        label: "Lijiang–Shangri-La railway — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Lijiang%E2%80%93Shangri-La_railway",
      },
      { label: "Yunnan–Tibet railway — Wikipedia", href: "https://en.wikipedia.org/wiki/Yunnan%E2%80%93Tibet_railway" },
    ],
  },
  {
    id: "huajiang-bridge",
    name: "Huajiang Grand Canyon Bridge",
    location: "Guanling–Zhenfeng, Guizhou, China",
    status: "Opened Sep 2025",
    description:
      "The world's highest bridge: a 2,890 m suspension bridge whose deck hangs 625 m above the Beipan River — nearly nine times the height of the Golden Gate. Built in just over three years for ¥2.1B, it turned a two-hour drive around the canyon into a two-minute crossing and has become a tourist attraction in its own right.",
    images: [
      {
        src: "/images/infrastructure/huajiang-bridge.jpg",
        alt: "Aerial view of the teal Huajiang suspension bridge spanning a deep green river canyon",
        credit: {
          text: "Photo: Glabb · CC BY-SA 3.0",
          href: "https://commons.wikimedia.org/wiki/File:Huajiang_Canyon_Bridge2.JPG",
        },
      },
      {
        src: "/images/infrastructure/huajiang-bridge-deck.jpg",
        alt: "Traffic crossing the Huajiang bridge deck past one of its 262 m towers",
        credit: {
          text: "Photo: Glabb · CC BY-SA 3.0",
          href: "https://commons.wikimedia.org/wiki/File:Huajiang_Canyon_Bridge1.JPG",
        },
      },
    ],
    lat: 25.7047,
    lng: 105.5881,
    countryNumeric: "156",
    pinOffset: [10, 10],
    links: [
      { label: "Huajiang Canyon Bridge — Wikipedia", href: "https://en.wikipedia.org/wiki/Huajiang_Canyon_Bridge" },
      {
        label: "World's tallest bridge opens (Xinhua)",
        href: "https://english.news.cn/20250928/ce013ebd370a4fc4929da976c1fb5a99/c.html",
      },
    ],
  },
  {
    id: "sichuan-tibet-rail",
    name: "Sichuan–Tibet Railway",
    location: "Chengdu → Ya'an → Kangding → Qamdo → Nyingchi → Lhasa",
    status: "Both ends open · middle section to 2030",
    description:
      "A ~1,600 km railway cutting across the grain of the Hengduan Mountains, set to shrink Chengdu–Lhasa from ~36 hours by train to about 12. Chengdu–Ya'an (2018) and Lhasa–Nyingchi (2021) already run; the ¥319.8B, 1,011 km Ya'an–Nyingchi middle section — 95.8% bridges and tunnels — is under construction for completion around 2030.",
    images: [
      {
        src: "/images/infrastructure/sichuan-tibet-yaan.jpg",
        alt: "A Fuxing train at Ya'an station, currently the western end of the line from Chengdu",
        credit: {
          text: "Photo: MNXANL · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:201908_CRH6A-A-0454_as_D6622_at_Ya%27an_Station.jpg",
        },
      },
    ],
    lat: 29.99,
    lng: 100.27,
    countryNumeric: "156",
    routes: [
      {
        line: "sichuan-tibet",
        path: [
          [104.07, 30.66],
          [103.5, 30.3],
          [103.0, 29.98],
        ],
        stations: [
          { name: "Chengdu", lat: 30.66, lng: 104.07, labelSide: "above" },
          { name: "Ya'an", lat: 29.98, lng: 103.0, labelSide: "below" },
        ],
      },
      {
        line: "sichuan-tibet",
        planned: true,
        path: [
          [103.0, 29.98],
          [101.96, 30.05],
          [101.0, 30.0],
          [100.27, 29.99],
          [99.1, 30.0],
          [98.2, 30.7],
          [97.17, 31.14],
          [96.4, 30.4],
          [95.77, 29.86],
          [94.9, 29.7],
          [94.36, 29.65],
        ],
        stations: [{ name: "Qamdo", lat: 31.14, lng: 97.17, labelSide: "above" }],
      },
      {
        line: "sichuan-tibet",
        path: [
          [94.36, 29.65],
          [93.3, 29.1],
          [92.2, 29.25],
          [91.13, 29.65],
        ],
        stations: [
          { name: "Nyingchi", lat: 29.65, lng: 94.36, labelSide: "above" },
          { name: "Lhasa", lat: 29.65, lng: 91.13, labelSide: "above" },
        ],
      },
    ],
    links: [
      { label: "Sichuan–Tibet railway — Wikipedia", href: "https://en.wikipedia.org/wiki/Sichuan%E2%80%93Tibet_railway" },
      {
        label: "Ya'an–Nyingchi section starts (Seetao)",
        href: "https://www.seetao.com/details/46798.html",
      },
    ],
  },
  {
    id: "tianfu-airport",
    name: "Chengdu Tianfu International Airport",
    location: "Jianyang, Chengdu, Sichuan, China",
    status: "Open since Jun 2021",
    description:
      "Chengdu's second airport, 51 km southeast of downtown, making it the third Chinese city after Beijing and Shanghai with two international airports. Its mirror-image terminals opened with three runways and already handle ~45 million passengers a year — among the 30 busiest airports in the world — with room to grow to six runways.",
    images: [
      {
        src: "/images/infrastructure/tianfu-airport.jpg",
        alt: "Aerial view of Tianfu airport's two mirror-image, bird-shaped terminal buildings",
        credit: {
          text: "Photo: FISU · CC BY 3.0",
          href: "https://commons.wikimedia.org/wiki/File:%E6%88%90%E9%83%BD%E5%A4%A9%E5%BA%9C%E5%9B%BD%E9%99%85%E6%9C%BA%E5%9C%BA_Chengdu_Tianfu_International_Airport_5.jpg",
        },
      },
      {
        src: "/images/infrastructure/tianfu-airport-aerial.jpg",
        alt: "Tianfu airport's terminals and landscaped transport centre seen from above",
        credit: {
          text: "Photo: FATIII Aviation · CC BY 3.0",
          href: "https://commons.wikimedia.org/wiki/File:%E6%88%90%E9%83%BD%E5%A4%A9%E5%BA%9C%E5%9B%BD%E9%99%85%E6%9C%BA%E5%9C%BA_Chengdu_Tianfu_International_Airport_1.jpg",
        },
      },
    ],
    lat: 30.319,
    lng: 104.445,
    countryNumeric: "156",
    pinOffset: [14, 12],
    links: [
      {
        label: "Chengdu Tianfu Airport — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Chengdu_Tianfu_International_Airport",
      },
    ],
  },
  {
    id: "shuangjiangkou-dam",
    name: "Shuangjiangkou Dam",
    location: "Dadu River, Aba Prefecture, Sichuan, China",
    status: "3 of 4 units online · Aug 2026",
    description:
      "At 315 m, the tallest dam in the world — a clay-core rockfill embankment on the upper Dadu River, 10 m higher than Jinping-I. After 11 years of building (with 27 sun-tracking mirrors warming the clay core through winter), its first 500 MW unit hit the grid in Jun 2026 and three were running by Aug 31, feeding the Chengdu–Chongqing summer peak.",
    images: [
      {
        src: "/images/infrastructure/shuangjiangkou.jpg",
        alt: "Satellite view of the Shuangjiangkou dam construction site in a narrow forested gorge",
        credit: {
          text: "Satellite: EOX s2cloudless 2024 · CC BY-NC-SA 4.0",
          href: "https://s2maps.eu",
        },
      },
    ],
    lat: 31.7925,
    lng: 101.9225,
    countryNumeric: "156",
    links: [
      { label: "Shuangjiangkou Dam — Wikipedia", href: "https://en.wikipedia.org/wiki/Shuangjiangkou_Dam" },
      {
        label: "Three units in operation (CHN Energy)",
        href: "https://www.chnenergy.com.cn/gjnyjtwwEn/xwzx/202609/afda6f5d338445d7b4fb7eb903d7c61a.shtml",
      },
    ],
  },
  {
    id: "tianfu-new-area",
    name: "Tianfu New Area",
    location: "South Chengdu & Meishan, Sichuan, China",
    status: "Building out · GDP ¥500B+ (2025)",
    description:
      "A 1,578 km² state-level new area growing south of Chengdu along Tianfu Avenue, centred on Xinglong Lake's science city, the Tianfu CBD and the Western China International Expo City. Its economy passed ¥500 billion in 2025, and the directly administered core added more new residents than any other Chengdu district.",
    images: [
      {
        src: "/images/infrastructure/tianfu-new-area.jpg",
        alt: "The twin Tianfu Financial Center towers above curved glass pavilions and parkland",
        credit: {
          text: "Photo: Kkkev999 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Tianfu_Financial_Center_2.jpg",
        },
      },
    ],
    lat: 30.5,
    lng: 104.07,
    countryNumeric: "156",
    pinOffset: [-18, 12],
    links: [{ label: "Tianfu New Area — Wikipedia", href: "https://en.wikipedia.org/wiki/Tianfu_New_Area" }],
  },
  {
    id: "jinping-lab",
    name: "China Jinping Underground Laboratory",
    location: "Jinping Mountains, Liangshan, Sichuan, China",
    status: "Phase II complete · PandaX-20T arriving",
    description:
      "The deepest and best-shielded underground lab on Earth, 2,400 m beneath Jinping Mountain's marble, reached by truck through the tunnels of the Jinping hydropower scheme. Its 300,000 m³ Phase II halls host the CDEX and PandaX dark-matter hunts; PandaX-4T wrapped up in Apr 2026 and the 20-tonne successor is being installed from late 2026.",
    images: [
      {
        src: "/images/infrastructure/jinping-mountain.jpg",
        alt: "Satellite view of Jinping Mountain above the lab, with the Jinping-I reservoir on the Yalong River at left",
        credit: {
          text: "Satellite: EOX s2cloudless 2024 · CC BY-NC-SA 4.0",
          href: "https://s2maps.eu",
        },
      },
    ],
    lat: 28.153,
    lng: 101.711,
    countryNumeric: "156",
    links: [
      {
        label: "China Jinping Underground Laboratory — Wikipedia",
        href: "https://en.wikipedia.org/wiki/China_Jinping_Underground_Laboratory",
      },
      {
        label: "The world's deepest lab (Nature)",
        href: "https://www.nature.com/articles/d42473-026-00104-6",
      },
    ],
  },
  {
    id: "chengdu-chongqing-central-hsr",
    name: "Chengdu–Chongqing Central Line HSR",
    location: "Chengdu → Anyue → Dazu → Chongqing North",
    status: "Track laid in Chongqing · opening 2027",
    description:
      "A straighter, 292 km, 350 km/h line (with sections built for 400 km/h) joining the twin megacities of Chengdu and Chongqing in about 50 minutes on a more direct path than the existing intercity line. All bridges, tunnels and slab track are finished; the Chongqing section's rails were completed on Sep 25, 2026, with overhead wiring under way ahead of a 2027 opening.",
    images: [
      {
        src: "/images/infrastructure/chongqing-north.jpg",
        alt: "Chongqing North railway station's south square, the line's eastern terminus",
        credit: {
          text: "Photo: Junyi Lou · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Front_South_Square_of_Chongqingbei_Railway_Station.jpg",
        },
      },
    ],
    lat: 29.84,
    lng: 105.6,
    countryNumeric: "156",
    routes: [
      {
        line: "chengdu-chongqing",
        planned: true,
        path: [
          [104.07, 30.66],
          [104.55, 30.4],
          [105.02, 30.28],
          [105.33, 30.1],
          [105.72, 29.7],
          [106.05, 29.84],
          [106.23, 29.59],
          [106.55, 29.61],
        ],
        stations: [{ name: "Chongqing", lat: 29.61, lng: 106.55, labelSide: "right" }],
      },
    ],
    links: [
      {
        label: "Second Chengdu–Chongqing HSR — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Second_Chengdu%E2%80%93Chongqing_high-speed_railway",
      },
      {
        label: "Overhead wiring begins (China News)",
        href: "https://www.chinanews.com.cn/sh/2026/09-14/10695955.shtml",
      },
    ],
  },
  {
    id: "western-land-sea-corridor",
    name: "New Western Land–Sea Corridor",
    location: "Chongqing → Guiyang → Nanning → Qinzhou Port, Beibu Gulf",
    status: "Operating · 6M TEU shipped (Sep 2026)",
    description:
      "A rail–sea freight artery sending western China's goods south to the Beibu Gulf instead of 2,000 km east to Shanghai, now reaching 571 ports in 127 countries. Trains have hauled 6 million TEU since the first run from Chongqing's Tuanjiecun in 2017 — 857,000 in the first eight months of 2026 alone — and the new Pinglu Canal adds a river route to the same ports.",
    images: [
      {
        src: "/images/infrastructure/qinzhou-port.jpg",
        alt: "Satellite view of Qinzhou's automated container terminal and rail yard on the Beibu Gulf",
        credit: {
          text: "Satellite: EOX s2cloudless 2024 · CC BY-NC-SA 4.0",
          href: "https://s2maps.eu",
        },
      },
    ],
    lat: 27.7,
    lng: 106.93,
    countryNumeric: "156",
    routes: [
      {
        line: "western-land-sea",
        path: [
          [106.55, 29.56],
          [106.93, 27.7],
          [106.63, 26.65],
          [107.52, 26.26],
          [108.06, 24.69],
          [108.32, 22.82],
          [108.65, 21.68],
        ],
        stations: [
          { name: "Guiyang", lat: 26.65, lng: 106.63, labelSide: "left" },
          { name: "Nanning", lat: 22.82, lng: 108.32, labelSide: "left" },
        ],
      },
    ],
    links: [
      {
        label: "New International Land-Sea Trade Corridor — Wikipedia",
        href: "https://en.wikipedia.org/wiki/New_International_Land-Sea_Trade_Corridor",
      },
      {
        label: "Chongqing freight trips surge (Xinhua)",
        href: "https://english.news.cn/20260731/574f76021fae4510a82d28fdd8d41862/c.html",
      },
    ],
  },
  {
    id: "three-gorges-dam",
    name: "Three Gorges Dam",
    location: "Sandouping, Yichang, Hubei, China",
    status: "Complete · ship lift since 2016",
    description:
      "The world's largest power station: a 185 m tall, 2.3 km wide gravity dam across the Yangtze with 32 × 700 MW turbines (22.5 GW), producing ~95–112 TWh a year. Its reservoir stretches ~600 km upstream toward Chongqing, and a five-step lock flight plus the world's largest ship lift carry vessels over the dam.",
    images: [
      {
        src: "/images/infrastructure/three-gorges.jpg",
        alt: "Red gantry cranes along the top of the Three Gorges Dam's concrete wall",
        credit: {
          text: "Photo: Thomas Bächinger · CC BY-SA 2.0",
          href: "https://commons.wikimedia.org/wiki/File:Three_Gorges_Dam_2015-07-25.jpg",
        },
      },
      {
        src: "/images/infrastructure/three-gorges-ship-lift.jpg",
        alt: "The towering concrete Three Gorges ship lift that raises boats 113 m over the dam",
        credit: {
          text: "Photo: risastla · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:20260518-Scheepslift_van_de_Drieklovendam_(55309807268).jpg",
        },
      },
    ],
    lat: 30.823,
    lng: 111.004,
    countryNumeric: "156",
    links: [{ label: "Three Gorges Dam — Wikipedia", href: "https://en.wikipedia.org/wiki/Three_Gorges_Dam" }],
  },
  {
    id: "raffles-city-chongqing",
    name: "Raffles City Chongqing",
    location: "Chaotianmen, Yuzhong, Chongqing, China",
    status: "Complete · opened 2019",
    description:
      "Moshe Safdie's eight-tower, 817,000 m² complex on the point where the Jialing meets the Yangtze, designed to evoke a ship's sails. Four of the towers are joined 250 m up by \"The Crystal\", a 300 m horizontal skyscraper with a glass-floored observation deck and infinity pool — one of the most expensive buildings in China.",
    images: [
      {
        src: "/images/infrastructure/raffles-city.jpg",
        alt: "Raffles City's towers linked near the top by the horizontal Crystal skybridge",
        credit: {
          text: "Photo: Junyi Lou · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Raffles_City_Chongqing_2019-9.jpg",
        },
      },
      {
        src: "/images/infrastructure/raffles-city-river.jpg",
        alt: "Raffles City rising at the confluence of the Yangtze and Jialing rivers",
        credit: {
          text: "Photo: Junyi Lou · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Raffles_City_Chongqing_from_Yangtze_River.jpg",
        },
      },
    ],
    lat: 29.568,
    lng: 106.584,
    countryNumeric: "156",
    pinOffset: [18, 12],
    links: [{ label: "Raffles City Chongqing — Wikipedia", href: "https://en.wikipedia.org/wiki/Raffles_City_Chongqing" }],
  },
  {
    id: "chongqing-kunming-hsr",
    name: "Chongqing–Kunming HSR",
    location: "Chongqing → Luzhou → Yibin → Zhaotong → Kunming",
    status: "Chongqing–Yibin open · Yibin–Kunming late 2026",
    description:
      "A ~700 km, 350 km/h line — Yunnan's first at that speed — cutting Chongqing–Kunming from ~5 hours to about 2.5, and Chengdu–Kunming to under 3. Chongqing West–Yibin opened in Sep 2024; every tunnel on the Yibin–Kunming half was through by Jun 2026, and it could open as early as the end of 2026.",
    images: [
      {
        src: "/images/infrastructure/yibin-east.jpg",
        alt: "Yibin East railway station, where the open Chongqing section meets the line to Kunming",
        credit: {
          text: "Photo: N509FZ · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Yibindong_Railway_Station_(20250116173548).jpg",
        },
      },
    ],
    lat: 28.1,
    lng: 104.2,
    countryNumeric: "156",
    routes: [
      {
        line: "chongqing-kunming",
        path: [
          [106.43, 29.5],
          [106.26, 29.29],
          [105.44, 28.87],
          [104.63, 28.77],
        ],
        stations: [
          { name: "Luzhou", lat: 28.87, lng: 105.44, labelSide: "below" },
          { name: "Yibin", lat: 28.77, lng: 104.63, labelSide: "above" },
        ],
      },
      {
        line: "chongqing-kunming",
        planned: true,
        path: [
          [104.63, 28.77],
          [104.2, 28.1],
          [103.72, 27.34],
          [103.3, 26.42],
          [103.04, 25.34],
          [102.71, 25.04],
        ],
        stations: [],
      },
    ],
    links: [
      {
        label: "Chongqing–Kunming HSR — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Chongqing%E2%80%93Kunming_high-speed_railway",
      },
      {
        label: "All tunnels through (Red Star News)",
        href: "https://news.chengdu.cn/2026/0627/6a3f1f6a27964c1b4e1ebd3b.shtml",
      },
    ],
  },
  {
    id: "nanning-hanoi-rail",
    name: "Nanning–Hanoi rail link",
    location: "Nanning → Pingxiang → Đồng Đăng → Hanoi",
    status: "Nanning–Pingxiang open · Hanoi link planned",
    description:
      "China's half is done: the 250 km/h Nanning–Pingxiang high-speed line reached the Friendship Pass border city in Dec 2025, cutting the trip to 75 minutes. Vietnam finished the pre-feasibility study for a 138 km, $5B+ standard-gauge Hanoi–Đồng Đăng line in Jul 2026, aiming to start building before 2030 and finish by 2035.",
    images: [
      {
        src: "/images/infrastructure/pingxiang-station.jpg",
        alt: "Pingxiang railway station, the Chinese border city at the end of the line from Nanning",
        credit: {
          text: "Photo: Yhxc57082 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Pingxiang_Railway_Station_(Sep_15,_2018).jpg",
        },
      },
    ],
    lat: 22.55,
    lng: 107.75,
    countryNumeric: "156",
    alsoCountries: ["704"],
    routes: [
      {
        line: "nanning-hanoi",
        path: [
          [108.32, 22.82],
          [107.36, 22.38],
          [106.76, 22.1],
        ],
        stations: [
          { name: "Chongzuo", lat: 22.38, lng: 107.36, labelSide: "below" },
          { name: "Pingxiang", lat: 22.1, lng: 106.76, labelSide: "left" },
        ],
      },
      {
        line: "nanning-hanoi",
        planned: true,
        path: [
          [106.76, 22.1],
          [106.73, 21.97],
          [106.76, 21.85],
          [106.2, 21.4],
          [105.84, 20.93],
        ],
        stations: [],
      },
    ],
    links: [
      {
        label: "Nanning–Pingxiang HSR — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Nanning%E2%80%93Pingxiang_high-speed_railway",
      },
      {
        label: "Line fully open (Xinhua)",
        href: "https://www.news.cn/local/20251205/c7f21a2e15024e9da6421b12aa7c313b/c.html",
      },
      {
        label: "Hanoi–Đồng Đăng plans (Vietnam.vn)",
        href: "https://www.vietnam.vn/en/sap-trien-khai-duong-sat-ha-noi-dong-dang-hon-5-ty-usd",
      },
    ],
  },
  {
    id: "longtan-dam",
    name: "Longtan Dam",
    location: "Tian'e, Guangxi · Hongshui River",
    status: "Operating since 2009 · 1.4 GW expansion in study",
    description:
      "A 192 m roller-compacted concrete dam, the tallest of its kind when it was finished, with seven 700 MW units (4.9 GW) on the upper Hongshui River. It was built to be enlarged: the intakes for two more 700 MW units already exist, and a feasibility study for them began in 2023.",
    images: [
      {
        src: "/images/infrastructure/longtan-dam.jpg",
        alt: "Longtan Dam on the Hongshui River in Guangxi",
        credit: { text: "Photo: Glabb · CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:Longtan_Dam1.JPG" },
      },
    ],
    lat: 25.027,
    lng: 107.048,
    countryNumeric: "156",
    links: [
      { label: "Longtan Dam — Wikipedia", href: "https://en.wikipedia.org/wiki/Longtan_Dam" },
      { label: "Units 8–9 feasibility study (Polaris Power)", href: "https://www.gdshe.org/article/20138.html" },
    ],
  },
  {
    id: "hainan-ftp",
    name: "Hainan Free Trade Port",
    location: "Hainan Island",
    status: "Island-wide special customs since Dec 2025",
    description:
      "On 18 Dec 2025 all of Hainan became a separate customs zone. Most overseas goods now arrive tariff-free across the 'first line', while shipments on to the mainland clear customs at ten 'second-line' ports. Zero-tariff imports more than doubled in the first five and a half months.",
    images: [
      {
        src: "/images/infrastructure/hainan-ftp.jpg",
        alt: "Xinhai Harbour in Haikou, one of the ports handling traffic across the new customs line",
        credit: {
          text: "Photo: China News Service · CC BY 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Xinhai_Harbour,_Hainan_Free_Trade_Port.png",
        },
      },
    ],
    lat: 19.2,
    lng: 109.75,
    countryNumeric: "156",
    links: [
      { label: "Hainan Free Trade Port — Wikipedia", href: "https://en.wikipedia.org/wiki/Hainan_Free_Trade_Port" },
      {
        label: "Six months of island-wide customs (SCIO)",
        href: "http://english.scio.gov.cn/m/in-depth/2026-06/22/content_118560080.html",
      },
    ],
  },
  {
    id: "wenchang-launch",
    name: "Wenchang launch sites",
    location: "Wenchang, Hainan",
    status: "Operating · commercial pads 3 & 4 due Q4 2026",
    description:
      "China's southernmost spaceport, and its only coastal one, launches the heaviest rockets, including the Long March 5 that sent Tianwen-1 to Mars. Next door, the Hainan commercial launch site has flown 23 missions from two pads since Nov 2024. Two more multi-user pads are built and should see their first launch in late 2026, for up to 60 launches a year.",
    images: [
      {
        src: "/images/infrastructure/wenchang-launch.jpg",
        alt: "A Long March 5 launching Tianwen-1 to Mars from Wenchang in July 2020",
        credit: {
          text: "Photo: China News Service · CC BY 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Tianwen-1_launch_04_(cropped).jpg",
        },
      },
      {
        src: "/images/infrastructure/wenchang-commercial.jpg",
        alt: "iSpace's integration building at the Hainan commercial launch site, Oct 2025",
        credit: {
          text: "Photo: China News Service · CC BY-SA 3.0",
          href: "https://commons.wikimedia.org/wiki/File:%E4%B8%AD%E5%9B%BD%E6%96%87%E6%98%8C%E8%88%AA%E5%A4%A9%E5%8F%91%E5%B0%84%E5%9C%BA%E8%A5%BF%E4%BE%A7%E8%A7%86%E8%A7%92%EF%BC%882025%E5%B9%B410%E6%9C%88%EF%BC%891.jpg",
        },
      },
    ],
    lat: 19.6145,
    lng: 110.9511,
    countryNumeric: "156",
    links: [
      { label: "Wenchang Space Launch Site — Wikipedia", href: "https://en.wikipedia.org/wiki/Wenchang_Space_Launch_Site" },
      { label: "Hainan commercial launch site (HICAL) — Wikipedia", href: "https://en.wikipedia.org/wiki/HICAL" },
      {
        label: "Pads 3 & 4 nearly ready (China in Space)",
        href: "https://www.china-in-space.com/p/wenchang-prepares-for-up-to-thirty",
      },
    ],
  },
  {
    id: "linglong-one",
    name: "Linglong One SMR",
    location: "Changjiang, Hainan",
    status: "Under construction · 90% installed",
    description:
      "The world's first commercial onshore small modular reactor: a 125 MWe ACP100 going up beside the Changjiang nuclear plant. Equipment installation passed 90% in Aug 2026. Once running it should generate about 1 billion kWh a year, enough for 526,000 households.",
    images: [
      {
        src: "/images/infrastructure/linglong-one.jpg",
        alt: "Linglong One under construction at Changjiang",
        credit: {
          text: "Photo: China News Service · CC BY 4.0",
          href: "https://commons.wikimedia.org/wiki/File:%E9%99%86%E4%B8%8A%E6%A8%A1%E5%9D%97%E5%8C%96%E5%B0%8F%E5%9E%8B%E6%A0%B8%E5%8F%8D%E5%BA%94%E5%A0%86%E2%80%9C%E7%8E%B2%E9%BE%99%E4%B8%80%E5%8F%B7%E2%80%9D%E6%96%BD%E5%B7%A5%E7%8E%B0%E5%9C%BA.png",
        },
      },
    ],
    lat: 19.46,
    lng: 108.9,
    countryNumeric: "156",
    pinOffset: [-4, 18],
    links: [
      {
        label: "Changjiang Nuclear Power Plant — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Changjiang_Nuclear_Power_Plant",
      },
      { label: "90% installed (China Daily)", href: "https://www.chinadaily.com.cn/a/202608/06/WS6a73ee5fa310986e2b46945a.html" },
    ],
  },
  {
    id: "qiongzhou-crossing",
    name: "Zhanjiang–Haikou HSR ferry",
    location: "Qiongzhou Strait · Guangdong ↔ Hainan",
    status: "Approved Dec 2025 · in design",
    description:
      "Rather than bridge or tunnel the strait, China is building a 350 km/h line from Zhanjiang to the Xuwen coast, plus six 30,000-tonne roll-on/roll-off ferries to carry passengers across to Haikou. The ¥40B project was approved in Dec 2025 and is in preliminary design, with a four-year build to follow.",
    images: [
      {
        src: "/images/infrastructure/qiongzhou-ferry.jpg",
        alt: "A train ferry on the existing Guangdong–Hainan railway crossing",
        credit: {
          text: "Photo: Nihongarden · CC BY-SA 3.0",
          href: "https://commons.wikimedia.org/wiki/File:Qiongzhou_Strait_Train_Ferry.jpg",
        },
      },
      {
        src: "/images/infrastructure/qiongzhou-ferry-2.jpg",
        alt: "Ferries between Xuwen and Haikou, 2025",
        credit: {
          text: "Photo: Waikijacky · CC0",
          href: "https://commons.wikimedia.org/wiki/File:Ferry_transport_between_Haikou_and_Xuwen_2025.jpg",
        },
      },
    ],
    lat: 20.62,
    lng: 110.18,
    countryNumeric: "156",
    routes: [
      {
        line: "zhanjiang-haikou",
        planned: true,
        path: [
          [110.36, 21.27],
          [110.18, 20.62],
          [110.17, 20.26],
          [110.2, 20.02],
        ],
        stations: [{ name: "Zhanjiang", lat: 21.27, lng: 110.36, labelSide: "right" }],
      },
    ],
    links: [
      { label: "Qiongzhou Strait — Wikipedia", href: "https://en.wikipedia.org/wiki/Qiongzhou_Strait" },
      {
        label: "Feasibility study approved (NDRC)",
        href: "https://www.ndrc.gov.cn/fzggw/jgsj/zcs/sjdt/202601/t20260107_1403097.html",
      },
      { label: "Environmental assessment (People's Daily)", href: "http://hi.people.com.cn/n2/2026/0303/c231190-41514244.html" },
    ],
  },
  {
    id: "hzmb",
    name: "Hong Kong–Zhuhai–Macau Bridge",
    location: "Pearl River Delta · Hong Kong ↔ Zhuhai ↔ Macau",
    status: "Open since Oct 2018",
    description:
      "The world's longest sea crossing at 55 km: bridges, two artificial islands and a 6.7 km immersed tunnel beneath the shipping lanes. It cut the Hong Kong–Zhuhai trip from about four hours by road to around 45 minutes.",
    images: [
      {
        src: "/images/infrastructure/hzmb.jpg",
        alt: "The western bridge section of the Hong Kong–Zhuhai–Macau Bridge",
        credit: {
          text: "Photo: N509FZ · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:West_section_of_Hong_Kong-Zhuhai-Macau_Bridge_(20180902174105).jpg",
        },
      },
      {
        src: "/images/infrastructure/hzmb-2.jpg",
        alt: "The Hong Kong–Zhuhai–Macau Bridge crossing the Pearl River estuary",
        credit: {
          text: "Photo: Pauloleong2002 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Hong_Kong%E2%80%93Zhuhai%E2%80%93Macau_Bridge_01.jpg",
        },
      },
    ],
    lat: 22.283,
    lng: 113.78,
    countryNumeric: "156",
    pinOffset: [-12, 14],
    links: [
      {
        label: "Hong Kong–Zhuhai–Macau Bridge — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Hong_Kong%E2%80%93Zhuhai%E2%80%93Macau_Bridge",
      },
    ],
  },
  {
    id: "shenzhen-zhongshan-link",
    name: "Shenzhen–Zhongshan Link",
    location: "Pearl River estuary · Shenzhen ↔ Zhongshan",
    status: "Open since Jun 2024",
    description:
      "A 24 km bridge, island and tunnel crossing just north of the HZMB. It pairs a 6.8 km steel-shell immersed tunnel with the Lingdingyang Bridge's 1,666 m main span, and cut the Shenzhen–Zhongshan drive from two hours to about 30 minutes.",
    images: [
      {
        src: "/images/infrastructure/shenzhen-zhongshan.jpg",
        alt: "The Shenzhen–Zhongshan Link across the Pearl River estuary, Jun 2025",
        credit: {
          text: "Photo: Shujianyang · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Shenzhen-Zhongshan_Link_2025.06.jpg",
        },
      },
      {
        src: "/images/infrastructure/shenzhen-zhongshan-bridge.jpg",
        alt: "The Lingdingyang suspension bridge on the Shenzhen–Zhongshan Link",
        credit: {
          text: "Photo: Pulsarwind · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:ShenzhenZhongshanBridge3.jpg",
        },
      },
    ],
    lat: 22.63,
    lng: 113.72,
    countryNumeric: "156",
    pinOffset: [14, -6],
    links: [
      {
        label: "Shenzhen–Zhongshan Link — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Shenzhen%E2%80%93Zhongshan_Link",
      },
    ],
  },
  {
    id: "baiyun-t3",
    name: "Guangzhou Baiyun T3",
    location: "Guangzhou, Guangdong",
    status: "Open since Oct 2025",
    description:
      "Terminal 3 and a fifth runway opened on 30 Oct 2025, making Baiyun China's first five-runway airport. The ¥53.8B expansion lifts capacity to 120 million passengers a year, on the way to 140 million.",
    images: [
      {
        src: "/images/infrastructure/baiyun-t3.jpg",
        alt: "The departure deck at Baiyun Terminal 3, Dec 2025",
        credit: {
          text: "Photo: Sun8908 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Guangzhou_Baiyun_International_Airport_Terminal_3_departure_deck_2025-12-13_(1).jpg",
        },
      },
    ],
    lat: 23.3925,
    lng: 113.2989,
    countryNumeric: "156",
    links: [
      {
        label: "Guangzhou Baiyun International Airport — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Guangzhou_Baiyun_International_Airport",
      },
      { label: "T3 opens (Xinhua)", href: "https://english.news.cn/20251030/4e108ae0df6046979c2377544dba87b1/c.html" },
    ],
  },
  {
    id: "fast-telescope",
    name: "FAST radio telescope",
    location: "Pingtang, Guizhou",
    status: "Operating since 2016",
    description:
      "A 500 m dish set into a natural karst sinkhole, the largest single-dish radio telescope in the world. Since it opened in 2016 it has found more than 1,000 pulsars.",
    images: [
      {
        src: "/images/infrastructure/fast-telescope.jpg",
        alt: "The FAST dish in its karst depression, Aug 2025",
        credit: {
          text: "Photo: SCJiang · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:202508_FAST_(Five-hundred-meter_Aperture_Spherical_radio_Telescope).jpg",
        },
      },
    ],
    lat: 25.6531,
    lng: 106.8567,
    countryNumeric: "156",
    links: [
      {
        label: "FAST — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Five-hundred-meter_Aperture_Spherical_Telescope",
      },
    ],
  },
  {
    id: "duge-bridge",
    name: "Duge Bridge",
    location: "Beipan River · Guizhou–Yunnan border",
    status: "Open since Dec 2016",
    description:
      "A 1,341 m cable-stayed bridge 565 m above the Beipan River. It was the highest bridge in the world until the Huajiang Grand Canyon Bridge, also on this map, opened in 2025.",
    images: [
      {
        src: "/images/infrastructure/duge-bridge.jpg",
        alt: "Duge Bridge spanning the Beipan River gorge",
        credit: {
          text: "Photo: HighestBridges · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:BeipanjiangDugeByHighestBridges.jpg",
        },
      },
    ],
    lat: 26.38,
    lng: 104.62,
    countryNumeric: "156",
    links: [{ label: "Duge Bridge — Wikipedia", href: "https://en.wikipedia.org/wiki/Duge_Bridge" }],
  },
  {
    id: "guian-data-centres",
    name: "Gui'an data centres",
    location: "Gui'an New Area, Guizhou",
    status: "27 mega data centres · 15 operating",
    description:
      "A cool climate, cheap hydropower and karst hills made Gui'an China's data-centre capital. Apple's iCloud China, Huawei Cloud's largest site and Tencent's tunnel-built centre are all here. By Jul 2026 it had drawn 27 mega data centres with 170 EFLOPS of computing power, 98% of it for AI.",
    images: [
      {
        src: "/images/infrastructure/guian.jpg",
        alt: "Satellite view of Gui'an New Area, between Guiyang and Anshun",
        credit: { text: "Satellite: EOX s2cloudless 2024 · CC BY-NC-SA 4.0", href: "https://s2maps.eu" },
      },
    ],
    lat: 26.43,
    lng: 106.47,
    countryNumeric: "156",
    pinOffset: [-14, 10],
    links: [
      { label: "Gui'an's computing hub (China Daily)", href: "http://guizhou.chinadaily.com.cn/2026-07/16/c_1197853.htm" },
      {
        label: "China's AI ambitions hum in Guizhou (Straits Times)",
        href: "https://www.straitstimes.com/asia/east-asia/chinas-ai-ambitions-hum-in-guizhous-hills-as-data-centres-transform-the-rural-west",
      },
    ],
  },
  {
    id: "changsha-t3",
    name: "Changsha Huanghua T3",
    location: "Changsha, Hunan",
    status: "98% complete · opens end 2026",
    description:
      "The 500,000 m² 'Star of Changsha' terminal, with five piers, adds capacity for 40 million passengers a year and takes the airport to 60 million. It was 98% done in Aug 2026, and connects to the Changsha–Ganzhou high-speed line, Metro Line 6 and the maglev.",
    images: [
      {
        src: "/images/infrastructure/changsha-huanghua.jpg",
        alt: "Aerial view of Changsha Huanghua airport's existing terminals",
        credit: {
          text: "Photo: Livewireshock · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Changsha_Huanghua_International_Airport_aerial_view_of_terminal_buildings.JPG",
        },
      },
    ],
    lat: 28.1967,
    lng: 113.2208,
    countryNumeric: "156",
    pinOffset: [12, -10],
    links: [
      {
        label: "Changsha Huanghua International Airport — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Changsha_Huanghua_International_Airport",
      },
      { label: "T3 98% complete (Voice of Hunan)", href: "https://hunan.voc.com.cn/news/202608/33402695.html" },
    ],
  },
  {
    id: "changsha-maglev",
    name: "Changsha Maglev",
    location: "Changsha South station → Huanghua Airport",
    status: "Open since May 2016",
    description:
      "China's first home-grown medium-low-speed maglev: an 18.6 km elevated line from Changsha South high-speed station to the airport, and one of the links into the new T3.",
    images: [
      {
        src: "/images/infrastructure/changsha-maglev.jpg",
        alt: "A Changsha Maglev train on its elevated guideway",
        credit: { text: "Photo: Jadenlai19 · CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Changsha_Maglev_Train.jpg" },
      },
    ],
    lat: 28.16,
    lng: 113.1,
    countryNumeric: "156",
    pinOffset: [-12, 10],
    links: [{ label: "Changsha Maglev Express — Wikipedia", href: "https://en.wikipedia.org/wiki/Changsha_Maglev_Express" }],
  },
  {
    id: "poyang-lake-project",
    name: "Poyang Lake water control project",
    location: "Poyang Lake outlet, Jiangxi",
    status: "Approved Mar 2026 · studies under way",
    description:
      "A sluice across the channel joining China's largest freshwater lake to the Yangtze, meant to hold water back through ever-longer autumn droughts. It was debated for more than 20 years because of its effect on the wetlands, finless porpoises and wintering Siberian cranes, and was finally listed as a 2026 new start in Mar 2026.",
    images: [
      {
        src: "/images/infrastructure/poyang-lake.jpg",
        alt: "Envisat view of Poyang Lake and its channel to the Yangtze",
        credit: {
          text: "Image: ESA · CC BY-SA 3.0 IGO",
          href: "https://commons.wikimedia.org/wiki/File:Envisat_shows_Poyang_Lake_(Poyang_Hu)_in_China_ESA203949.jpg",
        },
      },
    ],
    lat: 29.45,
    lng: 116.1,
    countryNumeric: "156",
    links: [
      { label: "Poyang Lake — Wikipedia", href: "https://en.wikipedia.org/wiki/Poyang_Lake" },
      {
        label: "Dam green-lit after decades of debate (Caixin)",
        href: "https://www.caixinglobal.com/2026-03-24/china-greenlights-controversial-poyang-lake-dam-after-decades-of-debate-102426988.html",
      },
    ],
  },
  {
    id: "gan-yue-canal",
    name: "Gan–Yue Canal",
    location: "Gan River, Jiangxi → Bei River, Guangdong",
    status: "Pre-feasibility study",
    description:
      "A ~1,228 km, ~¥150B waterway that would cross the Meiling watershed and join the Yangtze and Pearl river systems for the first time. It is part of a ¥320B Zhejiang–Jiangxi–Guangdong canal network, and is still at the pre-feasibility stage.",
    images: [
      {
        src: "/images/infrastructure/meiling-pass.jpg",
        alt: "The ancient Meiling Pass between Jiangxi and Guangdong, on the watershed the canal would cross",
        credit: {
          text: "Photo: Zhangzhugang · CC BY-SA 3.0",
          href: "https://commons.wikimedia.org/wiki/File:Mei_Guan_2014.01.12_13-57-42.jpg",
        },
      },
    ],
    lat: 26.4,
    lng: 114.95,
    countryNumeric: "156",
    routes: [
      {
        planned: true,
        path: [
          [115.89, 28.68],
          [115.4, 27.9],
          [114.99, 27.11],
          [114.93, 25.83],
          [114.3, 25.3],
          [113.6, 24.8],
          [113.05, 23.68],
          [113.26, 23.13],
        ],
        stations: [
          { name: "Ganzhou", lat: 25.83, lng: 114.93, labelSide: "right" },
          { name: "Shaoguan", lat: 24.8, lng: 113.6, labelSide: "left" },
        ],
      },
    ],
    links: [{ label: "Canal network plans (China News)", href: "http://www.fj.chinanews.com.cn/news/2025/2025-05-25/566554.html" }],
  },
  {
    id: "fuzhou-xiamen-hsr",
    name: "Fuzhou–Xiamen HSR",
    location: "Fuzhou → Putian → Quanzhou → Xiamen → Zhangzhou",
    status: "Open since Sep 2023",
    description:
      "China's first sea-crossing high-speed railway: 277 km at 350 km/h, bridging Meizhou, Quanzhou and Anhai bays. It put Fuzhou and Xiamen under an hour apart.",
    images: [
      {
        src: "/images/infrastructure/fuzhou-xiamen-hsr.jpg",
        alt: "The Fuzhou–Xiamen line crossing the Mulan River",
        credit: {
          text: "Photo: 董辰兴 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:%E7%A6%8F%E5%8E%A6%E9%93%81%E8%B7%AF%E7%A6%8F%E5%8E%A6%E9%AB%98%E9%93%81%E8%B7%A8%E6%B2%88%E6%B5%B7%E9%AB%98%E9%80%9F%E6%9C%A8%E5%85%B0%E6%BA%AA.jpg",
        },
      },
    ],
    lat: 25.25,
    lng: 118.9,
    countryNumeric: "156",
    routes: [
      {
        line: "fuzhou-xiamen",
        path: [
          [119.38, 25.98],
          [119.0, 25.43],
          [118.6, 24.9],
          [118.08, 24.63],
          [117.65, 24.51],
        ],
        stations: [
          { name: "Fuzhou", lat: 25.98, lng: 119.38, labelSide: "left" },
          { name: "Xiamen", lat: 24.63, lng: 118.08, labelSide: "below" },
        ],
      },
    ],
    links: [
      {
        label: "Fuzhou–Xiamen HSR — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Fuzhou%E2%80%93Xiamen_high-speed_railway",
      },
    ],
  },
  {
    id: "pingtan-bridge",
    name: "Pingtan Strait road-rail bridge",
    location: "Fuzhou ↔ Pingtan Island, Fujian",
    status: "Open since Dec 2020",
    description:
      "A 16.3 km double-deck bridge across one of the world's roughest straits, with a six-lane expressway above the Fuzhou–Pingtan railway. Pingtan is the closest point of mainland China to Taiwan.",
    images: [
      {
        src: "/images/infrastructure/pingtan-bridge.jpg",
        alt: "The Pingtan Strait road-rail bridge seen from Dalian Island",
        credit: {
          text: "Photo: FradonStar · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:%E5%A4%A7%E7%BB%83%E5%B2%9B%E4%B8%8A%E7%9C%8B%E5%B9%B3%E6%BD%AD%E5%85%AC%E9%93%81%E5%A4%A7%E6%A1%A5_01.jpg",
        },
      },
    ],
    lat: 25.6,
    lng: 119.62,
    countryNumeric: "156",
    pinOffset: [10, -6],
    links: [
      { label: "Fuzhou–Pingtan railway — Wikipedia", href: "https://en.wikipedia.org/wiki/Fuzhou%E2%80%93Pingtan_railway" },
      { label: "Pingtan Island — Wikipedia", href: "https://en.wikipedia.org/wiki/Pingtan_Island" },
    ],
  },
  {
    id: "xiapu-cfr600",
    name: "Xiapu fast reactors (CFR-600)",
    location: "Changbiao Island, Xiapu, Fujian",
    status: "Unit 1 in test operation · Unit 2 building",
    description:
      "Two 600 MWe sodium-cooled fast-breeder reactors, China's step towards a closed fuel cycle and a source of plutonium that worries arms-control analysts. Unit 1 has been in low-power testing since 2023 with no grid connection announced; Unit 2 is due around 2026–27.",
    images: [
      {
        src: "/images/infrastructure/xiapu.jpg",
        alt: "Satellite view of the CFR-600 site on Changbiao Island",
        credit: { text: "Satellite: EOX s2cloudless 2024 · CC BY-NC-SA 4.0", href: "https://s2maps.eu" },
      },
    ],
    lat: 26.804,
    lng: 120.155,
    countryNumeric: "156",
    links: [{ label: "CFR-600 — Wikipedia", href: "https://en.wikipedia.org/wiki/CFR-600" }],
  },
  {
    id: "ningbo-zhoushan-port",
    name: "Ningbo-Zhoushan Port",
    location: "Ningbo & Zhoushan, Zhejiang",
    status: "Operating · world's busiest by tonnage",
    description:
      "The world's biggest port by cargo tonnage, stretching from Beilun on the mainland out across the Zhoushan islands, and the third-busiest container port after Shanghai and Singapore.",
    images: [
      {
        src: "/images/infrastructure/ningbo-zhoushan.jpg",
        alt: "The Beilun Phase 4 container terminal at Ningbo-Zhoushan",
        credit: {
          text: "Photo: Siyuwj · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Phase_4_Dock_of_Beilun_Port,_2015-04-11_01.jpg",
        },
      },
    ],
    lat: 29.93,
    lng: 121.83,
    countryNumeric: "156",
    pinOffset: [10, 8],
    links: [{ label: "Port of Ningbo-Zhoushan — Wikipedia", href: "https://en.wikipedia.org/wiki/Port_of_Ningbo-Zhoushan" }],
  },
  {
    id: "hangzhou-bay-hsr-bridge",
    name: "Hangzhou Bay HSR bridge",
    location: "Nantong → Suzhou → Jiaxing → Ningbo",
    status: "All piers done · opens end 2027",
    description:
      "At 29.2 km, the world's longest sea-crossing high-speed rail bridge, carrying the 310 km Nantong–Suzhou–Jiaxing–Ningbo line across Hangzhou Bay at 350 km/h. All seven towers were capped by 3 Sep 2026, and the last of its 656 piers was finished on 23 Sep.",
    images: [
      {
        src: "/images/infrastructure/hangzhou-bay-bridge.jpg",
        alt: "The Hangzhou Bay road bridge; the new rail bridge is rising alongside it",
        credit: {
          text: "Photo: Jürgen Zeller · CC BY-SA 2.5",
          href: "https://commons.wikimedia.org/wiki/File:Hangzhou_Bay_Bridge_ABA_1360_AK1.jpg",
        },
      },
    ],
    lat: 30.42,
    lng: 121.05,
    countryNumeric: "156",
    routes: [
      {
        line: "hangzhou-bay",
        planned: true,
        path: [
          [120.82, 32.02],
          [120.72, 31.88],
          [120.62, 31.3],
          [120.75, 30.75],
          [121.0, 30.55],
          [121.08, 30.3],
          [121.55, 29.87],
        ],
        stations: [],
      },
    ],
    links: [
      {
        label: "Nantong–Suzhou–Jiaxing–Ningbo HSR — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Nantong%E2%80%93Suzhou%E2%80%93Jiaxing%E2%80%93Ningbo_high-speed_railway",
      },
      { label: "All towers capped (China News)", href: "https://www.chinanews.com.cn/sh/2026/09-03/10689777.shtml" },
    ],
  },
  {
    id: "yangshan-port",
    name: "Yangshan Deep-Water Port",
    location: "Yangshan islands, Shanghai",
    status: "Operating · Phase IV automated since 2017",
    description:
      "Built on islands 30 km out to sea because the Yangtze estuary is too shallow, and tied to Shanghai by the 32.5 km Donghai Bridge. Its Phase IV terminal is one of the world's largest fully automated container terminals, and helps keep Shanghai the busiest container port on earth.",
    images: [
      {
        src: "/images/infrastructure/yangshan-port.jpg",
        alt: "Container stacks and cranes at Yangshan",
        credit: { text: "Photo: Reb42 · CC BY 3.0", href: "https://commons.wikimedia.org/wiki/File:Yangshan-Port-Containers.jpg" },
      },
      {
        src: "/images/infrastructure/donghai-bridge.jpg",
        alt: "The Donghai Bridge linking Yangshan to the mainland",
        credit: { text: "Photo: Zhang 2008 · Public domain", href: "https://commons.wikimedia.org/wiki/File:Donghai_Bridge.jpg" },
      },
    ],
    lat: 30.62,
    lng: 122.07,
    countryNumeric: "156",
    links: [{ label: "Yangshan Port — Wikipedia", href: "https://en.wikipedia.org/wiki/Yangshan_Port" }],
  },
  {
    id: "pudong-t3",
    name: "Shanghai Pudong T3",
    location: "Pudong, Shanghai",
    status: "Under construction · opens end 2028",
    description:
      "The centrepiece of Pudong's phase IV expansion, Terminal 3 adds 50 million passengers a year and takes the airport to 130 million. Construction began in Nov 2024, and all 17 of its tree-like 'bird columns' were standing by Jul 2026.",
    images: [
      {
        src: "/images/infrastructure/pudong-satellite.jpg",
        alt: "Pudong's satellite concourse, the airport's last big addition before T3",
        credit: {
          text: "Photo: MNXANL · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:201812_Satellite_Terminal_of_PVG.jpg",
        },
      },
    ],
    lat: 31.1433,
    lng: 121.8053,
    countryNumeric: "156",
    pinOffset: [12, 6],
    links: [
      {
        label: "Shanghai Pudong International Airport — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Shanghai_Pudong_International_Airport",
      },
      {
        label: "T3 to open by 2028 (City News Service)",
        href: "https://www.citynewsservice.cn/articles/cns/city-news/quick-news/sh-transit-pudong-airport-to-open-terminal-3-by-2028-with-smarter-and-faster-travel-zmppqwpm",
      },
    ],
  },
  {
    id: "shanghai-tower",
    name: "Shanghai Tower",
    location: "Lujiazui, Shanghai",
    status: "Open since 2015",
    description:
      "At 632 m, China's tallest building and the third-tallest in the world: a twisting, double-skinned tower whose nine vertical 'neighbourhoods' each have their own sky garden.",
    images: [
      {
        src: "/images/infrastructure/shanghai-tower.jpg",
        alt: "Shanghai Tower rising over Lujiazui",
        credit: {
          text: "Photo: Stefan Fussan · CC BY-SA 3.0",
          href: "https://commons.wikimedia.org/wiki/File:Shanghai_-_Shanghai_Tower_-_0001.jpg",
        },
      },
    ],
    lat: 31.2335,
    lng: 121.5055,
    countryNumeric: "156",
    pinOffset: [-20, -14],
    links: [{ label: "Shanghai Tower — Wikipedia", href: "https://en.wikipedia.org/wiki/Shanghai_Tower" }],
  },
  {
    id: "zhangjinggao-bridge",
    name: "Zhangjinggao Yangtze Bridge",
    location: "Zhangjiagang ↔ Jingjiang ↔ Rugao, Jiangsu",
    status: "Under construction · 2028",
    description:
      "Its 2,300 m main span will be the longest of any bridge in the world, beating Turkey's Çanakkale 1915 Bridge. Both 350 m towers and the anchorages are finished, and the first pilot rope was pulled across the Yangtze on 10 Sep 2026.",
    images: [
      {
        src: "/images/infrastructure/zhangjinggao-bridge.jpg",
        alt: "A Zhangjinggao bridge tower rising from the Yangtze",
        credit: {
          text: "Photo: Glabb · CC BY-SA 3.0",
          href: "https://commons.wikimedia.org/wiki/File:Zhangjinggao_Yangtze_River_Bridge2.JPG",
        },
      },
    ],
    lat: 32.0,
    lng: 120.5,
    countryNumeric: "156",
    pinOffset: [-6, -12],
    links: [
      {
        label: "Zhangjinggao Yangtze River Bridge — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Zhangjinggao_Yangtze_River_Bridge",
      },
      { label: "Pilot rope across (Yangtse Evening Post)", href: "https://www.yangtse.com/news/jiangsu/202609/t20260910_391437.html" },
    ],
  },
  {
    id: "changtai-bridge",
    name: "Changtai Yangtze Bridge",
    location: "Changzhou ↔ Taizhou, Jiangsu",
    status: "Open since Sep 2025",
    description:
      "A 10 km road-and-rail crossing whose 1,208 m main span, hung from 350 m towers, is the longest of any cable-stayed bridge. It cut the Changzhou–Taizhou trip from 80 minutes to 20.",
    images: [
      {
        src: "/images/infrastructure/changtai-bridge.jpg",
        alt: "The Changtai Yangtze River Bridge",
        credit: {
          text: "Photo: Hpppp0527 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Changtai_Yangtze_River_Bridge_165230.jpg",
        },
      },
    ],
    lat: 32.0086,
    lng: 119.9683,
    countryNumeric: "156",
    links: [
      {
        label: "Changtai Yangtze River Bridge — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Changtai_Yangtze_River_Bridge",
      },
      { label: "Bridge opens (gov.cn)", href: "https://english.www.gov.cn/news/202509/09/content_WS68c015b7c6d0868f4e8f56ef.html" },
    ],
  },
  {
    id: "hutong-bridge",
    name: "Hutong Yangtze Bridge",
    location: "Nantong ↔ Zhangjiagang, Jiangsu",
    status: "Open since Jul 2020",
    description:
      "The first road-rail bridge with a cable-stayed span over 1,000 m (1,092 m). It carries the Shanghai–Nantong railway beneath a six-lane expressway, putting northern Jiangsu on a direct rail line to Shanghai.",
    images: [
      {
        src: "/images/infrastructure/hutong-bridge.jpg",
        alt: "The Hutong Yangtze River road-rail bridge",
        credit: { text: "Photo: Mingshi Ng · CC BY-SA 2.0", href: "https://commons.wikimedia.org/wiki/File:Husutong_Bridge.jpg" },
      },
    ],
    lat: 31.89,
    lng: 120.72,
    countryNumeric: "156",
    pinOffset: [10, 6],
    links: [
      {
        label: "Husutong Yangtze River Bridge — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Husutong_Yangtze_River_Bridge",
      },
    ],
  },
  {
    id: "best-fusion",
    name: "BEST fusion reactor",
    location: "Hefei, Anhui",
    status: "Under construction · completion end 2027",
    description:
      "The Burning Plasma Experimental Superconducting Tokamak aims to be the first machine to get more fusion energy out of a deuterium–tritium plasma than goes in, and to demonstrate fusion electricity around 2030. Its magnets passed full-load tests in mid-2026. It builds on Hefei's EAST tokamak, which held a plasma for a record 1,066 seconds in 2025.",
    images: [
      {
        src: "/images/infrastructure/east-tokamak.jpg",
        alt: "Inside the vacuum vessel of EAST, BEST's predecessor in Hefei",
        credit: {
          text: "Photo: Gao et al. · CC BY 3.0",
          href: "https://commons.wikimedia.org/wiki/File:EAST_Tokamak_vacuum_vessel_2015.jpg",
        },
      },
    ],
    lat: 31.91,
    lng: 117.15,
    countryNumeric: "156",
    links: [
      {
        label: "BEST — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Burning_Plasma_Experimental_Superconducting_Tokamak",
      },
      { label: "BEST moves toward 2030 goal (NEI Magazine)", href: "https://www.neimagazine.com/news/best-tokamak-moves-toward-2030-goal/" },
    ],
  },
  {
    id: "yangtze-huai-diversion",
    name: "Yangtze-to-Huai water diversion",
    location: "Anhui · Yangtze → Chaohu → Hefei → Huai River",
    status: "Phase 1 open · phase 2 by 2028",
    description:
      "A 723 km system of canals and pumping stations that lifts Yangtze water over the Jianghuai watershed to the Huai River, open to water and shipping since Dec 2022. The ¥20.3B second phase is now connecting it to the water supply of more than 30 million people in northern Anhui, and should be finished in 2028.",
    images: [
      {
        src: "/images/infrastructure/yangtze-huai-map.jpg",
        alt: "Map of the diversion's Yangtze–Huai section through Chaohu and Hefei",
        credit: {
          text: "Map: NTooru · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:%E5%BC%95%E6%B1%9F%E6%B5%8E%E6%B7%AE%E5%B7%A5%E7%A8%8B%E6%B1%9F%E6%B7%AE%E6%AE%B5%E7%A4%BA%E6%84%8F%E5%9B%BE.png",
        },
      },
    ],
    lat: 32.3,
    lng: 116.93,
    countryNumeric: "156",
    routes: [
      {
        path: [
          [117.22, 30.7],
          [117.28, 31.25],
          [117.3, 31.57],
          [117.12, 31.85],
          [116.95, 32.25],
          [116.75, 32.6],
        ],
        stations: [],
      },
    ],
    links: [
      { label: "Phase 2 progress (Minsheng Weekly)", href: "https://www.msweekly.com/show.html?id=179211" },
      { label: "Fuyang pumping station (China Water)", href: "https://www.chinawater.com.cn/df/ah/202603/t20260313_1070775.html" },
    ],
  },
  {
    id: "ezhou-huahu",
    name: "Ezhou Huahu cargo airport",
    location: "Ezhou, Hubei",
    status: "Operating since Jul 2022",
    description:
      "Asia's first airport built mainly for cargo, and SF Express's national hub. By Jul 2026 it had 122 cargo routes and had handled 3.7 million tonnes. In 2025 it was the world's fastest-growing cargo hub, and international transfers now take as little as five hours.",
    images: [
      {
        src: "/images/infrastructure/ezhou-huahu.jpg",
        alt: "The terminal at Ezhou Huahu airport",
        credit: {
          text: "Photo: Yp8080123 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Exterior_view_of_Ezhou_Huahu_Airport_terminal.jpg",
        },
      },
      {
        src: "/images/infrastructure/ezhou-runway.jpg",
        alt: "The north end of Ezhou Huahu's east runway",
        credit: {
          text: "Photo: Yp8080123 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Ezhou_Huahu_Airport,North_end_of_east_runway.jpg",
        },
      },
    ],
    lat: 30.3429,
    lng: 115.0296,
    countryNumeric: "156",
    links: [
      {
        label: "Ezhou Huahu International Airport — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Ezhou_Huahu_International_Airport",
      },
      {
        label: "A world-class cargo hub (China Daily)",
        href: "https://regional.chinadaily.com.cn/eastlakehightechzone/2026-07/30/c_1201379.htm",
      },
    ],
  },
  {
    id: "danjiangkou-dam",
    name: "Danjiangkou Dam",
    location: "Danjiangkou, Hubei · Han River",
    status: "Raised in 2013 · feeding the north",
    description:
      "Finished in 1973, then raised from 162 m to 176.6 m in 2013 to deepen the reservoir that now feeds the South–North Water Transfer's middle route.",
    images: [
      {
        src: "/images/infrastructure/danjiangkou-landsat.jpg",
        alt: "Landsat 9 view of the Danjiangkou Reservoir, May 2023",
        credit: {
          text: "Satellite: Landsat 9 (NASA/USGS) · Public domain",
          href: "https://commons.wikimedia.org/wiki/File:20230514_Danjiangkou(chs_3,2,1).png",
        },
      },
    ],
    lat: 32.556,
    lng: 111.488,
    countryNumeric: "156",
    links: [{ label: "Danjiangkou Dam — Wikipedia", href: "https://en.wikipedia.org/wiki/Danjiangkou_Dam" }],
  },
  {
    id: "snwt-middle-route",
    name: "South–North Water Transfer: Middle Route",
    location: "Danjiangkou → Nanyang → Zhengzhou → Beijing",
    status: "Operating since Dec 2014",
    description:
      "A 1,432 km canal that carries Han River water by gravity alone from Danjiangkou to Beijing and Tianjin, tunnelling under the Yellow River near Zhengzhou. By Aug 2026 it had delivered more than 80 billion m³ to nearly 118 million people in 27 cities.",
    images: [
      {
        src: "/images/infrastructure/snwt-taocha.jpg",
        alt: "Taocha, where the middle route leaves the Danjiangkou Reservoir",
        credit: {
          text: "Photo: Nsbdgc · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:South%E2%80%93North_Water_Transfer_Project_Central_route_starting_point_taocha.jpg",
        },
      },
    ],
    lat: 33.4,
    lng: 112.85,
    countryNumeric: "156",
    routes: [
      {
        path: [
          [111.7, 32.67],
          [112.1, 32.95],
          [112.53, 33.0],
          [113.19, 33.73],
          [113.62, 34.75],
          [113.9, 35.3],
          [114.3, 35.95],
        ],
        stations: [{ name: "Zhengzhou", lat: 34.75, lng: 113.62, labelSide: "right" }],
      },
    ],
    links: [
      {
        label: "South–North Water Transfer — Wikipedia",
        href: "https://en.wikipedia.org/wiki/South%E2%80%93North_Water_Transfer_Project",
      },
      {
        label: "80 billion m³ milestone (Xinhua)",
        href: "https://english.news.cn/20260807/d07418b0d86949858be631e275191d7b/c.html",
      },
    ],
  },
  {
    id: "xian-chongqing-hsr",
    name: "Xi'an–Chongqing HSR",
    location: "Xi'an → Ankang → Dazhou → Chongqing",
    status: "Xi'an–Ankang open Sep 2026 · full line 2028",
    description:
      "A 739 km, 350 km/h line tunnelling through the Qinling and Daba mountains to cut Xi'an–Chongqing from about 5 hours to 2.5. The 171 km Xi'an–Ankang section opened on 28 Sep 2026; the Ankang–Chongqing half has all its girders in place and is due by the end of 2028.",
    images: [
      {
        src: "/images/infrastructure/xian-east.jpg",
        alt: "A train on the temporary tracks at Xi'an East, where the new line begins",
        credit: {
          text: "Photo: Liuxingy · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:K1001%E9%80%9A%E8%BF%87%E8%A5%BF%E5%AE%89%E4%B8%9C%E7%AB%99%E4%B8%B4%E6%97%B6%E7%BA%BF%E8%B7%AF.jpg",
        },
      },
    ],
    lat: 33.35,
    lng: 108.95,
    countryNumeric: "156",
    routes: [
      {
        line: "xian-chongqing",
        path: [
          [109.1, 34.28],
          [109.12, 33.7],
          [109.1, 33.3],
          [109.03, 32.69],
        ],
        stations: [
          { name: "Xi'an", lat: 34.28, lng: 109.1, labelSide: "left" },
          { name: "Ankang", lat: 32.69, lng: 109.03, labelSide: "right" },
        ],
      },
      {
        line: "xian-chongqing",
        planned: true,
        path: [
          [109.03, 32.69],
          [108.66, 31.95],
          [107.72, 31.4],
          [107.5, 31.2],
          [106.63, 30.47],
          [106.43, 29.5],
        ],
        stations: [{ name: "Dazhou", lat: 31.2, lng: 107.5, labelSide: "left" }],
      },
    ],
    links: [
      {
        label: "Xi'an–Chongqing HSR — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Xi%27an%E2%80%93Chongqing_high-speed_railway",
      },
      { label: "Xi'an–Ankang opens (ifeng)", href: "https://news.ifeng.com/c/8wjZql2wBQX" },
      { label: "Full line due 2028 (China News)", href: "https://www.chinanews.com.cn/cj/2026/09-17/10698477.shtml" },
    ],
  },
  {
    id: "chongqing-east-station",
    name: "Chongqing East station",
    location: "Nan'an, Chongqing",
    status: "Open since Jun 2025",
    description:
      "Western China's largest high-speed rail hub: 29 platforms under one elevated roof, and the terminus for lines towards Xiamen, Zhengzhou, Kunming and down the Yangtze.",
    images: [
      {
        src: "/images/infrastructure/chongqing-east.jpg",
        alt: "Chongqing East station, Sep 2025",
        credit: {
          text: "Photo: Renek78 · CC0",
          href: "https://commons.wikimedia.org/wiki/File:September_2025_at_Chongqing_East_Railway_Station_10.jpg",
        },
      },
      {
        src: "/images/infrastructure/chongqing-east-2.jpg",
        alt: "Chongqing East station nearing completion, Sep 2024",
        credit: {
          text: "Photo: 重庆轨交18 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:CR%E9%87%8D%E5%BA%86%E4%B8%9C_2024.9.jpg",
        },
      },
    ],
    lat: 29.487,
    lng: 106.669,
    countryNumeric: "156",
    pinOffset: [16, 24],
    links: [
      {
        label: "Chongqing East railway station — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Chongqing_East_railway_station",
      },
      {
        label: "Station opens (Chongqing government)",
        href: "https://www.cq.gov.cn/zwgk/zfxxgkml/zdlyxxgk/jt/jjkfz/202506/t20250627_14754940.html",
      },
    ],
  },
  {
    id: "chengdu-dazhou-wanzhou-hsr",
    name: "Chengdu–Dazhou–Wanzhou HSR",
    location: "Chengdu → Suining → Nanchong → Dazhou → Wanzhou",
    status: "Track-laying · opens 2027",
    description:
      "A 486 km, 350 km/h piece of China's Yangtze-riverside corridor, running east from Chengdu Tianfu to join the Zhengzhou–Chongqing line at Wanzhou. All but one of its 136 tunnels were through by Aug 2026, and the Chengdu–Dazhou section aims to open in Sep 2027.",
    images: [
      {
        src: "/images/infrastructure/wanzhou-north.jpg",
        alt: "Wanzhou North, the line's eastern terminus",
        credit: {
          text: "Photo: 申忠平 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Wanzhoubei_Railway_Station.jpg",
        },
      },
    ],
    lat: 30.41,
    lng: 105.3,
    countryNumeric: "156",
    routes: [
      {
        line: "chengdu-dazhou-wanzhou",
        planned: true,
        path: [
          [104.07, 30.32],
          [104.63, 30.12],
          [105.59, 30.53],
          [106.08, 30.8],
          [107.5, 31.2],
          [108.4, 31.18],
          [108.36, 30.87],
        ],
        stations: [
          { name: "Nanchong", lat: 30.8, lng: 106.08, labelSide: "above" },
          { name: "Wanzhou", lat: 30.87, lng: 108.36, labelSide: "right" },
        ],
      },
    ],
    links: [
      {
        label: "Chengdu–Dazhou–Wanzhou HSR — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Chengdu%E2%80%93Dazhou%E2%80%93Wanzhou_high-speed_railway",
      },
      { label: "Chengdu–Dazhou by Sep 2027 (Toutiao)", href: "https://www.toutiao.com/article/7677009131865195058/" },
    ],
  },
  {
    id: "wudongde-dam",
    name: "Wudongde Dam",
    location: "Jinsha River · Sichuan–Yunnan border",
    status: "Fully operating since Jun 2021",
    description:
      "A 270 m double-curvature arch dam with twelve 850 MW units (10.2 GW). It is the first of the four giant dams on the lower Jinsha, upstream of Baihetan, in a cascade that ends at Three Gorges.",
    images: [
      {
        src: "/images/infrastructure/wudongde.jpg",
        alt: "Wudongde's arch dam in the Jinsha gorge",
        credit: { text: "Photo: Zhangmoon618 · CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Wudongde_Dam_01.jpg" },
      },
    ],
    lat: 26.334,
    lng: 102.63,
    countryNumeric: "156",
    links: [{ label: "Wudongde Dam — Wikipedia", href: "https://en.wikipedia.org/wiki/Wudongde_Dam" }],
  },
  {
    id: "lianghekou-dam",
    name: "Lianghekou Dam",
    location: "Yajiang, Sichuan · Yalong River",
    status: "Operating since 2021",
    description:
      "A 295 m earth-and-rockfill dam holding the 3 GW reservoir at the head of the Yalong River cascade; the water it stores raises output at every dam below. It also balances the 1 GW Kela solar farm, built at about 4,000 m.",
    images: [
      {
        src: "/images/infrastructure/lianghekou.jpg",
        alt: "Satellite view of Lianghekou Dam and its reservoir",
        credit: { text: "Satellite: EOX s2cloudless 2024 · CC BY-NC-SA 4.0", href: "https://s2maps.eu" },
      },
    ],
    lat: 30.197,
    lng: 101.011,
    countryNumeric: "156",
    links: [{ label: "Lianghekou Dam — Wikipedia", href: "https://en.wikipedia.org/wiki/Lianghekou_Dam" }],
  },
  {
    id: "taoyuan-t3",
    name: "Taoyuan Airport T3",
    location: "Taoyuan, Taiwan",
    status: "North concourse open · main terminal end 2027",
    description:
      "A wave-roofed terminal designed by Richard Rogers' practice, and Taiwan's largest public building since the 1970s, built to handle 45 million passengers a year. The north concourse opened in Dec 2025; the main building topped out in Apr 2026 and is due to be finished at the end of 2027.",
    images: [
      {
        src: "/images/infrastructure/taoyuan-t3.jpg",
        alt: "Taoyuan Terminal 3 under construction, May 2026",
        credit: {
          text: "Photo: 4300streetcar · CC BY 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Taiwan_Taoyuan_Airport_Terminal_3_construction_May_2026.jpg",
        },
      },
    ],
    lat: 25.078,
    lng: 121.235,
    countryNumeric: "158",
    links: [
      { label: "Taoyuan International Airport — Wikipedia", href: "https://en.wikipedia.org/wiki/Taoyuan_International_Airport" },
      { label: "T3 set for 2027 (Taiwan News)", href: "https://www.taiwannews.com.tw/news/6432447" },
    ],
  },
  {
    id: "thsr-pingtung",
    name: "Taiwan HSR extension to Pingtung",
    location: "Zuoying → Kaohsiung → Pingtung",
    status: "Approved · environmental review",
    description:
      "A 26.2 km, mostly tunnelled extension taking Taiwan's high-speed line south from Zuoying, under Kaohsiung Main Station and across the Gaoping River to a new Pingtung station at Liukuaicuo. The Cabinet has approved the route; the second-stage environmental review should finish in 2027, with trains around 2039.",
    images: [
      {
        src: "/images/infrastructure/zuoying-station.jpg",
        alt: "Zuoying, the current southern terminus of Taiwan High Speed Rail",
        credit: {
          text: "Photo: MickeyDisney · CC BY-SA 3.0",
          href: "https://commons.wikimedia.org/wiki/File:Zuoying_Station-Taiwan_High_Speed_Rail_%E9%AB%98%E9%90%B5%E5%B7%A6%E7%87%9F%E7%AB%99_-_panoramio.jpg",
        },
      },
    ],
    lat: 22.66,
    lng: 120.42,
    countryNumeric: "158",
    pinOffset: [6, 20],
    routes: [
      {
        line: "thsr-pingtung",
        planned: true,
        path: [
          [120.308, 22.687],
          [120.302, 22.64],
          [120.4, 22.645],
          [120.52, 22.66],
        ],
        stations: [{ name: "Pingtung", lat: 22.66, lng: 120.52, labelSide: "right" }],
      },
    ],
    links: [
      { label: "Taiwan High Speed Rail — Wikipedia", href: "https://en.wikipedia.org/wiki/Taiwan_High_Speed_Rail" },
      { label: "Cabinet approves route (Taipei Times)", href: "https://www.taipeitimes.com/News/front/archives/2026/07/24/2003861282" },
      { label: "2039 target (Kaohsiung Times)", href: "https://www.kaohsiungtimes.com/thsr-extension-to-pingtung-sets-2039-target/" },
    ],
  },
  {
    id: "tsmc-kaohsiung",
    name: "TSMC Kaohsiung 2 nm fabs",
    location: "Nanzih, Kaohsiung, Taiwan",
    status: "Phase 1 in volume production · 5 phases by 2027",
    description:
      "Fab 22 is where TSMC began making 2 nm chips, its first gate-all-around transistors, in Q4 2025. Phase 2 is in trial production and phases 3–5 are going up alongside, all due to be running by the end of 2027.",
    images: [
      {
        src: "/images/infrastructure/tsmc-fab22.jpg",
        alt: "TSMC Fab 22 under construction in Nanzih, Apr 2024",
        credit: {
          text: "Photo: Thingreenline4546 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:TSMC_fab_22_under_construction_Kaohsiung,_Nanzih_District,_Taiwan_Apr_13,_2024_05-44-42_PM.jpeg",
        },
      },
    ],
    lat: 22.73,
    lng: 120.3,
    countryNumeric: "158",
    pinOffset: [-16, -8],
    links: [
      { label: "TSMC — Wikipedia", href: "https://en.wikipedia.org/wiki/TSMC" },
      {
        label: "2 nm volume production begins (Tom's Hardware)",
        href: "https://www.tomshardware.com/tech-industry/semiconductors/tsmc-begins-quietly-volume-production-of-2nm-class-chips-first-gaa-transistor-for-tsmc-claims-up-to-15-percent-improvement-at-iso-power",
      },
      {
        label: "Five Kaohsiung phases by 2027 (TrendForce)",
        href: "https://www.trendforce.com/news/2026/02/23/news-tsmc-speeds-up-expansion-in-taiwan-up-to-10-fabs-reportedly-under-construction-or-starting-in-2026/",
      },
    ],
  },
  {
    id: "greater-changhua-wind",
    name: "Greater Changhua offshore wind",
    location: "35–60 km off Changhua, Taiwan",
    status: "2b & 4 in final commissioning · 1 & 2a since 2024",
    description:
      "Ørsted's four farms add up to 1.82 GW. Greater Changhua 1 and 2a (900 MW) have run since 2024; 2b and 4 (920 MW, 66 Siemens Gamesa 14 MW turbines) finished construction on 1 Sep 2026, are due for commercial operation by the end of Q3, and sell their power to TSMC.",
    images: [
      {
        src: "/images/infrastructure/changhua-offshore.jpg",
        alt: "Taipower's offshore wind farm off Changhua, beside Ørsted's Greater Changhua zone",
        credit: {
          text: "Photo: Taipower · Attribution",
          href: "https://commons.wikimedia.org/wiki/File:%E5%8F%B0%E9%9B%BB%E9%9B%A2%E5%B2%B8%E9%A2%A8%E5%8A%9B%E7%99%BC%E9%9B%BB%E5%A0%B4_%E7%AC%AC%E4%B8%80%E6%9C%9F.jpg",
        },
      },
    ],
    lat: 24.1,
    lng: 119.95,
    countryNumeric: "158",
    links: [
      {
        label: "Greater Changhua Offshore Wind Farms — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Greater_Changhua_Offshore_Wind_Farms",
      },
      {
        label: "2b & 4 construction complete (Ørsted)",
        href: "https://orsted.com/en/media/news/2026/09/orsted-hosts-completion-ceremony-for-920-mw-greate-15125521",
      },
    ],
  },
  {
    id: "xiongan-new-area",
    name: "Xiong'an New Area",
    location: "Xiongxian · Rongcheng · Anxin, Hebei, China",
    status: "Under construction · 1.41M residents",
    description:
      "Xi Jinping's \"city of the future\", ~100 km south-west of Beijing, is absorbing functions moved out of the capital. By 2026 it had 215 km² built up, 5,345 buildings, over ¥1 trillion invested and 1.41 million residents. China SatNet, Sinochem and China Huaneng have moved their headquarters in, with four Beijing universities and two hospitals being built.",
    images: [
      {
        src: "/images/infrastructure/xiongan-map.png",
        alt: "Map of Xiong'an New Area across Xiong, Rongcheng and Anxin counties south-west of Beijing",
        credit: { text: "Map: Bxxiaolin · CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Xiongan_New_Area.png" },
      },
    ],
    lat: 39.05,
    lng: 115.93,
    countryNumeric: "156",
    pinOffset: [-14, 6],
    links: [
      { label: "Xiong'an — Wikipedia", href: "https://en.wikipedia.org/wiki/Xiong%27an" },
      {
        label: "Xi tours Xiong'an start-up zone (Xinhua)",
        href: "https://english.news.cn/20260327/5992415d73854bc9a22fa29253521b65/c.html",
      },
    ],
  },
  {
    id: "beijing-daxing-airport",
    name: "Beijing Daxing International Airport",
    location: "Daxing, Beijing · Langfang, Hebei, China",
    status: "Open since Sep 2019 · 53.6M passengers (2025)",
    description:
      "Zaha Hadid's starfish terminal straddles the Beijing–Hebei border and opened in 2019 with four runways. It handled a record 53.62 million passengers in 2025, with international traffic up 24.6%, and topped ACI's Asia-Pacific service-quality rankings. It passed 30 million passengers for 2026 in July, five days sooner than in 2025.",
    images: [
      {
        src: "/images/infrastructure/daxing-layout.png",
        alt: "Layout diagram of Beijing Daxing airport's four runways, taxiways and central starfish terminal",
        credit: { text: "Diagram: CellarDoor85 · CC BY 4.0", href: "https://commons.wikimedia.org/wiki/File:ZBAD_Layout.svg" },
      },
    ],
    lat: 39.51,
    lng: 116.41,
    countryNumeric: "156",
    pinOffset: [8, -12],
    links: [
      {
        label: "Beijing Daxing International Airport — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Beijing_Daxing_International_Airport",
      },
      {
        label: "Daxing tops service rankings (Beijing Gov)",
        href: "https://english.beijing.gov.cn/livinginbeijing/transportation/airport/202603/t20260306_4551020.html",
      },
    ],
  },
  {
    id: "taklamakan-rail-loop",
    name: "Taklamakan desert rail loop",
    location: "Hotan → Ruoqiang, Xinjiang, China · 2,712 km ring",
    status: "Loop closed Jun 2022",
    description:
      "The 825 km Hotan–Ruoqiang line opened in June 2022 and closed the world's first desert railway loop, 2,712 km around the Taklamakan. About 65% of it crosses shifting sand, guarded by bridges and straw-grid dune fences, and it brought rail to Qira, Yutian, Minfeng and Qiemo for the first time. Freight routes out of southern Xinjiang are now ~1,000 km shorter.",
    images: [
      {
        src: "/images/infrastructure/taklamakan-loop-map.png",
        alt: "Map of Xinjiang highlighting the Hotan–Ruoqiang railway that closes the loop around the Taklamakan Desert",
        credit: {
          text: "Map: 燃灯 · CC0",
          href: "https://commons.wikimedia.org/wiki/File:Hotan%E2%80%93Ruoqiang_railway_location_in_Xinjiang.svg",
        },
      },
    ],
    lat: 37.07,
    lng: 82.69,
    countryNumeric: "156",
    routes: [
      {
        line: "taklamakan-loop",
        path: [
          [86.15, 41.73],
          [84.25, 41.78],
          [82.96, 41.72],
          [80.26, 41.17],
          [78.45, 40.1],
          [75.99, 39.47],
          [76.17, 38.93],
          [77.24, 38.42],
          [77.41, 37.88],
          [78.28, 37.62],
          [79.73, 37.3],
          [79.92, 37.11],
          [80.19, 37.07],
          [80.8, 37.02],
          [81.67, 36.86],
          [82.69, 37.07],
          [84.2, 37.95],
          [85.53, 38.14],
          [87.0, 38.6],
          [88.17, 39.02],
          [88.0, 39.8],
          [87.65, 40.55],
          [86.26, 41.34],
          [86.15, 41.73],
        ],
        stations: [
          { name: "Hotan", lat: 37.11, lng: 79.92, labelSide: "below" },
          { name: "Qiemo", lat: 38.14, lng: 85.53, labelSide: "below" },
          { name: "Ruoqiang", lat: 39.02, lng: 88.17, labelSide: "right" },
          { name: "Korla", lat: 41.73, lng: 86.15, labelSide: "above" },
        ],
      },
    ],
    links: [
      { label: "Hotan–Ruoqiang railway — Wikipedia", href: "https://en.wikipedia.org/wiki/Hotan%E2%80%93Ruoqiang_railway" },
      {
        label: "Freight distance cut by 1,000 km (ECNS)",
        href: "https://www.ecns.cn/news/cns-wire/2025-05-29/detail-iherwsih6787830.shtml",
      },
    ],
  },
  {
    id: "xinjiang-tibet-railway",
    name: "Xinjiang–Tibet Railway",
    location: "Hotan → Aksai Chin → Shigatse, China",
    status: "Planned · railway company formed Aug 2025",
    description:
      "A ~2,000 km line from Hotan to Shigatse over the Kunlun and Karakoram, averaging more than 4,500 m above sea level, then on to Lhasa. It runs through Aksai Chin, which India claims. Xinjiang–Xizang Railway Co. was set up in Aug 2025 with ¥95 billion of capital; its first 462 km section was slated to start in late 2025, but no groundbreaking has been confirmed.",
    images: [
      {
        src: "/images/infrastructure/xinjiang-tibet-map.jpg",
        alt: "Map of the planned Xinjiang–Tibet railway from Hotan through Aksai Chin and Shiquanhe to Shigatse",
        credit: {
          text: "Map: © OpenStreetMap contributors, rendering © EOX · route overlay by Rudra",
          href: "https://www.openstreetmap.org/copyright",
        },
      },
    ],
    lat: 35.2,
    lng: 79.5,
    countryNumeric: "156",
    routes: [
      {
        line: "xinjiang-tibet",
        planned: true,
        path: [
          [79.92, 37.11],
          [79.29, 37.21],
          [78.9, 36.8],
          [78.0, 36.43],
          [79.2, 35.8],
          [79.5, 35.2],
          [79.73, 33.38],
          [80.1, 32.5],
          [81.3, 30.7],
          [84.03, 29.77],
          [85.23, 29.33],
          [85.6, 28.9],
          [87.63, 29.08],
          [88.88, 29.27],
        ],
        stations: [
          { name: "Shiquanhe", lat: 32.5, lng: 80.1, labelSide: "right" },
          { name: "Shigatse", lat: 29.27, lng: 88.88, labelSide: "above" },
        ],
      },
    ],
    links: [
      { label: "Xinjiang–Tibet railway — Wikipedia", href: "https://en.wikipedia.org/wiki/Xinjiang%E2%80%93Tibet_railway" },
      {
        label: "Xinjiang–Xizang railway company formed (China Daily)",
        href: "https://www.chinadaily.com.cn/a/202508/10/WS6898699ea310724b60020d0d.html",
      },
    ],
  },
  {
    id: "china-kyrgyzstan-uzbekistan-railway",
    name: "China–Kyrgyzstan–Uzbekistan Railway",
    location: "Kashgar → Torugart → Jalal-Abad → Andijan",
    status: "Under construction · target 2030",
    description:
      "A 500+ km Belt and Road line from Kashgar over the Torugart Pass and through Kyrgyzstan's mountains to Andijan. About 40% of its 305 km Kyrgyz section is tunnels and bridges. Works began in Dec 2024 and spread along the whole Kyrgyz route from mid-2025; in Sep 2026 crews holed through the first tunnel, with 27 of 29 tunnels under way.",
    images: [
      {
        src: "/images/infrastructure/cku-railway-map.jpg",
        alt: "Map of the China–Kyrgyzstan–Uzbekistan railway from Kashgar via the Torugart Pass and Jalal-Abad to Andijan",
        credit: {
          text: "Map: © OpenStreetMap contributors, rendering © EOX · route overlay by Rudra",
          href: "https://www.openstreetmap.org/copyright",
        },
      },
    ],
    lat: 40.55,
    lng: 75.4,
    countryNumeric: "156",
    alsoCountries: ["417", "860"],
    routes: [
      {
        line: "china-kyrgyzstan-uzbekistan",
        path: [
          [75.99, 39.47],
          [76.1, 39.72],
          [75.75, 40.25],
          [75.4, 40.55],
          [75.2, 40.85],
          [74.95, 41.15],
          [74.6, 41.35],
          [74.03, 41.4],
          [73.6, 41.2],
          [73.0, 40.93],
          [72.6, 40.85],
          [72.34, 40.78],
        ],
        stations: [
          { name: "Kashgar", lat: 39.47, lng: 75.99, labelSide: "left" },
          { name: "Jalal-Abad", lat: 40.93, lng: 73.0, labelSide: "above" },
          { name: "Andijan", lat: 40.78, lng: 72.34, labelSide: "left" },
        ],
      },
    ],
    links: [
      {
        label: "China–Kyrgyzstan–Uzbekistan railway — Wikipedia",
        href: "https://en.wikipedia.org/wiki/China%E2%80%93Kyrgyzstan%E2%80%93Uzbekistan_railway",
      },
      {
        label: "First Kyrgyz tunnel holed through (CGTN)",
        href: "https://news.cgtn.com/news/2026-09-05/China-Kyrgyzstan-Uzbekistan-railway-achieves-breakthrough-1Qc3rDBAukw/p.html",
      },
    ],
  },
  {
    id: "tianshan-shengli-tunnel",
    name: "Tianshan Shengli Tunnel",
    location: "Urumqi → Yuli expressway, Xinjiang, China",
    status: "Open since Dec 2025",
    description:
      "At 22.13 km, the world's longest expressway tunnel runs under the central Tianshan, up to 1,112 m below the surface and through 16 fault zones. It opened in Dec 2025 with the 324.7 km, ¥46.7 billion Urumqi–Yuli expressway. Crossing the range now takes 20 minutes, and the drive from Urumqi to Korla has halved from seven hours to 3.5.",
    images: [
      {
        src: "/images/infrastructure/tianshan-tunnel-map.jpg",
        alt: "Map of the Urumqi–Yuli expressway crossing the Tianshan through the Shengli Tunnel",
        credit: {
          text: "Map: © OpenStreetMap contributors, rendering © EOX · route overlay by Rudra",
          href: "https://www.openstreetmap.org/copyright",
        },
      },
    ],
    lat: 43.25,
    lng: 87.0,
    countryNumeric: "156",
    routes: [
      {
        path: [
          [87.6, 43.8],
          [87.0, 43.25],
          [86.3, 42.73],
          [86.57, 42.06],
          [86.15, 41.73],
          [86.26, 41.34],
        ],
        stations: [
          { name: "Urumqi", lat: 43.8, lng: 87.6, labelSide: "right" },
          { name: "Yuli", lat: 41.34, lng: 86.26, labelSide: "below" },
        ],
      },
    ],
    links: [
      { label: "Tianshan Shengli Tunnel — Wikipedia", href: "https://en.wikipedia.org/wiki/Tianshan_Shengli_Tunnel" },
      {
        label: "World's longest expressway tunnel opens (Xinhua)",
        href: "https://english.news.cn/20251226/debafa9a105746d3921612a7878fce8a/c.html",
      },
    ],
  },
  {
    id: "talatan-solar-park",
    name: "Talatan Solar Park",
    location: "Gonghe County, Qinghai, China · beside Longyangxia Dam",
    status: "Operating · ~17–21 GW",
    description:
      "More than 7 million panels cover ~420 km² of a 3,000 m-high Qinghai plateau, making this the world's largest solar park. It has grown since 2011 to somewhere between 17 and 21 GW (sources differ). It began as a pioneering hydro–solar hybrid, with Longyangxia Dam's turbines ramping to smooth out solar swings, and sheep graze beneath the panels.",
    images: [
      {
        src: "/images/infrastructure/talatan-solar.jpg",
        alt: "Landsat satellite view of the Longyangxia and Talatan solar arrays beside the Longyangxia reservoir",
        credit: {
          text: "Image: USGS / NASA Landsat · Public domain",
          href: "https://commons.wikimedia.org/wiki/File:Longyangxia_solar_2017.jpg",
        },
      },
    ],
    lat: 36.19,
    lng: 100.54,
    countryNumeric: "156",
    links: [
      { label: "Talatan Solar Park — Wikipedia", href: "https://en.wikipedia.org/wiki/Talatan_Solar_Park" },
      {
        label: "Solar park on the Tibetan Plateau (Electrical Technology)",
        href: "https://www.electricaltechnology.org/2026/09/china-builds-worlds-largest-solar-park-on-tibetan-plateau.html",
      },
    ],
  },
  {
    id: "jiuquan-launch-center",
    name: "Jiuquan Satellite Launch Center",
    location: "Ejin Banner, Inner Mongolia, China · Gobi Desert",
    status: "Active · Shenzhou-23 launched May 2026",
    description:
      "China's oldest spaceport, founded in 1958, has launched every Shenzhou crewed mission since Yang Liwei's first flight in 2003. In Nov 2025 it flew an uncrewed Shenzhou-22 at short notice after debris cracked Shenzhou-20's window. In May 2026 Shenzhou-23 took three astronauts, including Hong Kong's first, to Tiangong, where one will attempt China's first year-long stay in orbit.",
    images: [
      {
        src: "/images/infrastructure/jiuquan-map.gif",
        alt: "Site map of the Jiuquan Satellite Launch Center with its launch complexes and technical area",
        credit: {
          text: "Map: CGWIC · CC BY-SA 2.5",
          href: "https://commons.wikimedia.org/wiki/File:Jiuquan_Satellite_Launch_Center_map.gif",
        },
      },
    ],
    lat: 40.96,
    lng: 100.29,
    countryNumeric: "156",
    links: [
      {
        label: "Jiuquan Satellite Launch Center — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Jiuquan_Satellite_Launch_Center",
      },
      { label: "Shenzhou-23 mission (China Manned Space)", href: "https://en.cmse.gov.cn/missions/shenzhou23/" },
    ],
  },
  {
    id: "kubuqi-solar-wall",
    name: "Kubuqi \"Great Solar Wall\"",
    location: "Kubuqi Desert, Ordos, Inner Mongolia, China",
    status: "Under construction · 2030 target",
    description:
      "A band of panels meant to stretch ~400 km by 5 km across the Kubuqi dunes. NASA counted ~5.4 GW installed by late 2024 against a 100 GW goal for 2030 (Chinese sources cite 48 GW for export). The flagship Three Gorges base, with 8 GW of solar and 4 GW of wind, is due by the end of 2027 and will feed an ±800 kV line to Hebei.",
    images: [
      {
        src: "/images/infrastructure/kubuqi-solar.jpg",
        alt: "NASA Landsat image of solar arrays spreading across the Kubuqi Desert in Inner Mongolia",
        credit: {
          text: "Image: NASA Earth Observatory / Landsat · Public domain",
          href: "https://commons.wikimedia.org/wiki/File:Building_a_Great_Solar_Wall_in_China_(153759_-_2_20241208_lrg).jpg",
        },
      },
    ],
    lat: 40.4,
    lng: 110.05,
    countryNumeric: "156",
    links: [
      { label: "Kubuqi Desert — Wikipedia", href: "https://en.wikipedia.org/wiki/Kubuqi_Desert" },
      {
        label: "Kubuqi base hits key milestone (CGTN)",
        href: "https://news.cgtn.com/news/2026-09-26/China-s-Kubuqi-renewable-energy-base-hits-key-milestone-1QKlWEM7LXO/p.html",
      },
    ],
  },
  {
    id: "mumbai-ahmedabad-hsr",
    name: "Mumbai–Ahmedabad bullet train",
    location: "Mumbai → Ahmedabad, India",
    status: "~62% built · first section mid-2027",
    description:
      "India's first high-speed line runs 508 km through 12 stations, built for 320 km/h on Japanese Shinkansen technology, with 21 km of tunnel including 7 km under Thane Creek. By Sep 2026 it was 62% complete, with 366 km of viaduct girders up and all land acquired. The first section, in Gujarat, is due in mid-2027 and the full line in 2029.",
    images: [
      {
        src: "/images/infrastructure/mahsr-map.png",
        alt: "Map of the Mumbai–Ahmedabad high-speed rail route and its stations along India's west coast",
        credit: {
          text: "Map: Pechristener · CC BY-SA 2.0",
          href: "https://commons.wikimedia.org/wiki/File:Map_high-speed_line_Mumbai%E2%80%93Ahmedabad.png",
        },
      },
    ],
    lat: 21.17,
    lng: 72.88,
    countryNumeric: "356",
    routes: [
      {
        line: "mumbai-ahmedabad-hsr",
        path: [
          [72.86, 19.07],
          [73.03, 19.19],
          [72.84, 19.46],
          [72.76, 19.8],
          [72.93, 20.37],
          [72.97, 20.77],
          [72.88, 21.17],
          [73.02, 21.71],
          [73.18, 22.31],
          [72.95, 22.56],
          [72.6, 23.02],
        ],
        stations: [
          { name: "Surat", lat: 21.17, lng: 72.88, labelSide: "left" },
          { name: "Vadodara", lat: 22.31, lng: 73.18, labelSide: "right" },
          { name: "Ahmedabad", lat: 23.02, lng: 72.6, labelSide: "left" },
        ],
      },
    ],
    links: [
      {
        label: "Mumbai–Ahmedabad high-speed rail — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Mumbai%E2%80%93Ahmedabad_high-speed_rail_corridor",
      },
      {
        label: "62% complete, all land acquired (India Today)",
        href: "https://www.indiatoday.in/information/story/mumbai-ahmedabad-bullet-train-project-6216-work-completed-all-land-acquired-rti-reveals-3002924-2026-09-25",
      },
    ],
  },
  {
    id: "usbrl-chenab",
    name: "Udhampur–Srinagar–Baramulla Rail Link",
    location: "Udhampur → Srinagar → Baramulla, Jammu & Kashmir, India",
    status: "Open since Jun 2025",
    description:
      "The 272 km, ₹43,780 crore line connected Kashmir to India's national rail network in June 2025, through 36 tunnels and over 943 bridges. They include the Chenab arch, 359 m above the river and the world's highest rail bridge, and Anji Khad, India's first cable-stayed rail bridge. Since April 2026 a Vande Bharat has run Jammu–Srinagar in about five hours.",
    images: [
      {
        src: "/images/infrastructure/usbrl-map.png",
        alt: "Map of the Jammu–Udhampur–Srinagar–Baramulla railway through the Pir Panjal to the Kashmir valley",
        credit: {
          text: "Map: PlaneMad / Wikimedia · CC BY-SA 3.0",
          href: "https://commons.wikimedia.org/wiki/File:Kashmir_Railway_JUSBRL_Project_Map.png",
        },
      },
      {
        src: "/images/infrastructure/chenab-bridge.jpg",
        alt: "The Chenab rail bridge arching across the Chenab gorge in Reasi district",
        credit: {
          text: "Photo: Konkan Railway Corporation · GODL-India",
          href: "https://commons.wikimedia.org/wiki/File:Chenab_Rail_Bridge,_Reasi_district,_Jammu_and_Kashmir,_India.jpg",
        },
      },
    ],
    lat: 33.15,
    lng: 74.88,
    countryNumeric: "356",
    routes: [
      {
        line: "usbrl",
        path: [
          [75.14, 32.92],
          [74.93, 32.98],
          [74.79, 33.07],
          [74.83, 33.08],
          [74.88, 33.15],
          [75.05, 33.24],
          [75.2, 33.43],
          [75.16, 33.59],
          [75.15, 33.73],
          [74.82, 34.03],
          [74.36, 34.2],
        ],
        stations: [
          { name: "Srinagar", lat: 34.03, lng: 74.82, labelSide: "right" },
          { name: "Baramulla", lat: 34.2, lng: 74.36, labelSide: "left" },
        ],
      },
    ],
    links: [
      {
        label: "Udhampur–Srinagar–Baramulla line — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Udhampur%E2%80%93Srinagar%E2%80%93Baramulla_railway_line",
      },
      {
        label: "Extended Srinagar–Jammu Vande Bharat (The Hindu)",
        href: "https://www.thehindu.com/news/national/extended-srinagar-jammu-vande-bharat-will-allow-unbroken-journey-on-pilgrim-circuit/article70921402.ece",
      },
    ],
  },
  {
    id: "dedicated-freight-corridors",
    name: "Dedicated Freight Corridors",
    location: "Ludhiana → Sonnagar · Dadri → JNPT, India",
    status: "Both corridors complete · Sep 2026",
    description:
      "2,843 km of freight-only railway. The Eastern corridor (1,337 km, Ludhiana–Sonnagar) was finished in 2023; the Western corridor (1,506 km, Dadri–JNPT port) runs double-stacked container trains, and its last 326 km were opened by the PM on 8 Sep 2026. Together they now carry ~443 trains a day, freeing the passenger network.",
    images: [
      {
        src: "/images/infrastructure/dfc-map.jpg",
        alt: "Map of India's Eastern, Western and proposed dedicated freight corridors",
        credit: {
          text: "Map: Footy2000 · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Map_of_dedicated_freight_corridors_of_India.jpg",
        },
      },
    ],
    lat: 28.55,
    lng: 77.55,
    countryNumeric: "356",
    routes: [
      {
        line: "eastern-dfc",
        path: [
          [75.95, 30.85],
          [76.6, 30.48],
          [76.78, 30.38],
          [77.55, 29.95],
          [77.7, 29.0],
          [77.85, 28.25],
          [78.08, 27.88],
          [78.24, 27.21],
          [79.02, 26.78],
          [80.18, 26.47],
          [80.81, 25.93],
          [81.85, 25.4],
          [83.12, 25.28],
          [84.23, 24.88],
        ],
        stations: [
          { name: "Ludhiana", lat: 30.85, lng: 75.95, labelSide: "left" },
          { name: "Sonnagar", lat: 24.88, lng: 84.23, labelSide: "right" },
        ],
      },
      {
        line: "western-dfc",
        path: [
          [77.55, 28.55],
          [76.62, 28.2],
          [75.24, 26.87],
          [74.64, 26.45],
          [73.61, 25.73],
          [72.43, 24.17],
          [72.39, 23.6],
          [72.37, 22.99],
          [73.18, 22.25],
          [73.0, 21.7],
          [72.85, 21.25],
          [72.93, 20.37],
          [72.8, 19.55],
          [73.06, 19.3],
          [72.95, 18.95],
        ],
        stations: [
          { name: "Dadri", lat: 28.55, lng: 77.55, labelSide: "right" },
          { name: "JNPT", lat: 18.95, lng: 72.95, labelSide: "right" },
        ],
      },
    ],
    links: [
      {
        label: "Dedicated freight corridors in India — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Dedicated_freight_corridors_in_India",
      },
      {
        label: "PM commissions final Western corridor sections (HT)",
        href: "https://www.hindustantimes.com/cities/mumbai-news/pm-modi-commissions-final-sections-of-western-dedicated-freight-corridor-101788893104813.html",
      },
    ],
  },
  {
    id: "navi-mumbai-airport",
    name: "Navi Mumbai International Airport",
    location: "Ulwe, Navi Mumbai, India",
    status: "Open Dec 2025 · international since Jul 2026",
    description:
      "Mumbai's second airport, built by Adani with CIDCO, opened to commercial flights on 25 Dec 2025. Phase one handles 20 million passengers a year, rising to 90 million at full build-out. International flights began in July 2026, it passed 3 million passengers and 46 destinations in September, and a third of Mumbai's international flights are moving there.",
    images: [
      {
        src: "/images/infrastructure/navi-mumbai-airport-map.jpg",
        alt: "Map of Mumbai harbour showing Navi Mumbai airport at Ulwe, the existing CSMIA airport and Atal Setu",
        credit: {
          text: "Map: © OpenStreetMap contributors, rendering © EOX · overlay by Rudra",
          href: "https://www.openstreetmap.org/copyright",
        },
      },
    ],
    lat: 18.99,
    lng: 73.07,
    countryNumeric: "356",
    pinOffset: [14, 12],
    links: [
      {
        label: "Navi Mumbai International Airport — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Navi_Mumbai_International_Airport",
      },
      {
        label: "First international flight takes off (Times of India)",
        href: "https://timesofindia.indiatimes.com/city/mumbai/first-international-flight-takes-wing-from-navi-mumbai-airport-opening-its-global-gateway/articleshow/132420676.cms",
      },
    ],
  },
  {
    id: "atal-setu",
    name: "Atal Setu (Mumbai Trans Harbour Link)",
    location: "Sewri → Chirle, Mumbai, India",
    status: "Open since Jan 2024 · 20M crossings",
    description:
      "India's longest sea bridge carries six lanes 21.8 km across Mumbai harbour, ~16.5 km of it over water, and cuts the Sewri–Navi Mumbai trip to about 20 minutes. It logged its 20-millionth crossing in March 2026, about 25,500 vehicles a day. That is under half the forecast, as high tolls keep trucks off and 91% of traffic is private cars.",
    images: [
      {
        src: "/images/infrastructure/atal-setu-map.jpg",
        alt: "Route map of the Mumbai Trans Harbour Link from Sewri across the harbour to Chirle",
        credit: {
          text: "Map: Utkarsh.v95 · CC BY-SA 3.0",
          href: "https://commons.wikimedia.org/wiki/File:Mumbai_trans_Harbor_link.jpg",
        },
      },
    ],
    lat: 18.97,
    lng: 72.93,
    countryNumeric: "356",
    pinOffset: [-18, 8],
    routes: [
      {
        path: [
          [72.86, 19.0],
          [72.93, 18.97],
          [73.01, 18.93],
        ],
        stations: [],
      },
    ],
    links: [
      { label: "Mumbai Trans Harbour Link — Wikipedia", href: "https://en.wikipedia.org/wiki/Mumbai_Trans_Harbour_Link" },
      {
        label: "Atal Setu crosses 2 crore vehicles (Mid-day)",
        href: "https://www.mid-day.com/mumbai/mumbai-news/article/mumbai-atal-setu-crosses-2-crore-vehicles-marks-major-milestone-in-citys-infrastructural-development-23623183",
      },
    ],
  },
  {
    id: "vadhavan-port",
    name: "Vadhavan Port",
    location: "Dahanu, Palghar, Maharashtra, India",
    status: "Early works · phase 1 by 2030",
    description:
      "A ₹76,220 crore greenfield deep-water port on 1,448 ha reclaimed off Dahanu, designed for 298 million tonnes a year, including 23.2 million TEU, and 24,000-TEU megaships. Near-shore reclamation is under way and India's longest breakwater (10.14 km) has been awarded. Adani, DP World and others bid for the ₹22,323 crore offshore reclamation in Sep 2026.",
    images: [
      {
        src: "/images/infrastructure/vadhavan-port-map.jpg",
        alt: "Map of the Palghar coast showing the approximate Vadhavan port reclamation off Dahanu",
        credit: {
          text: "Map: © OpenStreetMap contributors, rendering © EOX · overlay by Rudra",
          href: "https://www.openstreetmap.org/copyright",
        },
      },
    ],
    lat: 19.93,
    lng: 72.67,
    countryNumeric: "356",
    pinOffset: [-16, -4],
    links: [
      { label: "Vadhavan Port — Wikipedia", href: "https://en.wikipedia.org/wiki/Vadhavan_Port" },
      {
        label: "Bidders line up for offshore reclamation (HT)",
        href: "https://www.hindustantimes.com/cities/mumbai-news/apsez-3-more-firms-in-race-to-develop-vadhavan-port-offshore-land-101790273756217.html",
      },
    ],
  },
  {
    id: "khavda-re-park",
    name: "Khavda Renewable Energy Park",
    location: "Khavda, Kutch, Gujarat, India",
    status: "~9.5 GW live of 30 GW",
    description:
      "Adani Green is building 30 GW of solar and wind across 538 km² of salt desert in the Rann of Kutch, an area five times the size of Paris, billed as the world's largest renewable plant. About 9.5 GW of Adani's share was running by July 2026, over 30% of the goal, with new blocks switched on every few weeks. Full build-out is targeted for 2029.",
    images: [
      {
        src: "/images/infrastructure/khavda-map.jpg",
        alt: "Map of Kutch showing the approximate extent of the Khavda renewable energy park near the Pakistan border",
        credit: {
          text: "Map: © OpenStreetMap contributors, rendering © EOX · overlay by Rudra",
          href: "https://www.openstreetmap.org/copyright",
        },
      },
    ],
    lat: 23.98,
    lng: 69.7,
    countryNumeric: "356",
    links: [
      {
        label: "Khavda Renewable Energy Park — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Khavda_Renewable_Energy_Park",
      },
      {
        label: "Adani Green passes 20 GW, 9.5 GW at Khavda (Adani)",
        href: "https://www.adani.com/newsroom/media-releases/adani-green-energy-surpasses-20-gw-operational-capacity",
      },
    ],
  },
  {
    id: "dholera-semiconductor",
    name: "Dholera SIR · Tata–PSMC chip fab",
    location: "Dholera, Ahmedabad, Gujarat, India",
    status: "Fab >50% built · first wafers 2028",
    description:
      "India's first commercial chip fab is a ₹91,000 crore Tata Electronics plant, built with Taiwan's PSMC, at the heart of the 920 km² Dholera special investment region. It is designed for 50,000 wafers a month at 28–110 nm. Construction passed the halfway mark in 2026 with cleanrooms being fitted, and commercial output is now due in mid-2028.",
    images: [
      {
        src: "/images/infrastructure/dholera-plan.jpg",
        alt: "Proposed land-use plan of the Dholera Special Investment Region with industrial, residential and green zones",
        credit: { text: "Plan: Fulshang · CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Proposed_landuse_plan.jpg" },
      },
    ],
    lat: 22.25,
    lng: 72.19,
    countryNumeric: "356",
    links: [
      {
        label: "Dholera Special Investment Region — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Dholera_Special_Investment_Region",
      },
      {
        label: "First Dholera wafer likely in 2028 (HT)",
        href: "https://www.hindustantimes.com/india-news/indias-first-wafer-from-dholera-semiconductor-plant-likely-in-2028-ashwini-vaishnaw-101789791466242.html",
      },
    ],
  },
  {
    id: "vizhinjam-port",
    name: "Vizhinjam International Seaport",
    location: "Thiruvananthapuram, Kerala, India",
    status: "Operating · phase 2 to 5.7M TEU by 2028",
    description:
      "India's first deep-water transshipment port, a few nautical miles from the main east–west shipping lane, opened in 2025 and handled 2 million TEU within 18 months. It has berthed 24,000-TEU megaships and began import–export cargo in August 2026. A ₹16,000 crore second phase will stretch the berth to 2 km and capacity to 5.7 million TEU by Dec 2028.",
    images: [
      {
        src: "/images/infrastructure/vizhinjam-map.jpg",
        alt: "Map of the Kerala coast showing Vizhinjam port south of Thiruvananthapuram",
        credit: {
          text: "Map: © OpenStreetMap contributors, rendering © EOX · overlay by Rudra",
          href: "https://www.openstreetmap.org/copyright",
        },
      },
    ],
    lat: 8.37,
    lng: 76.99,
    countryNumeric: "356",
    links: [
      {
        label: "Vizhinjam International Seaport — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Vizhinjam_International_Seaport",
      },
      {
        label: "Vizhinjam begins EXIM operations (India Today)",
        href: "https://www.indiatoday.in/business/story/vizhinjam-port-begins-export-import-operations-set-to-boost-indias-global-trade-2974207-2026-08-18",
      },
    ],
  },
  {
    id: "new-pamban-bridge",
    name: "New Pamban Bridge",
    location: "Mandapam → Rameswaram, Tamil Nadu, India",
    status: "Open since Apr 2025",
    description:
      "India's first vertical-lift sea bridge replaces the 1914 cantilever crossing to Rameswaram island: 2.08 km, 99 spans and a 72.5 m centre span that rises 17 m to let ships through. It opened in April 2025 at a cost of ~₹550 crore, though repeated lift-span glitches forced a 20 km/h speed limit from August 2025.",
    images: [
      {
        src: "/images/infrastructure/pamban-map.jpg",
        alt: "Map of the Pamban channel showing the rail bridge from Mandapam to Rameswaram island",
        credit: {
          text: "Map: © OpenStreetMap contributors, rendering © EOX · overlay by Rudra",
          href: "https://www.openstreetmap.org/copyright",
        },
      },
      {
        src: "/images/infrastructure/pamban-bridge.jpg",
        alt: "The New Pamban Bridge with its raised vertical-lift span beside the old cantilever bridge",
        credit: {
          text: "Photo: Prime Minister's Office · GODL-India",
          href: "https://commons.wikimedia.org/wiki/File:The_New_Pamban_Bridge.jpg",
        },
      },
    ],
    lat: 9.28,
    lng: 79.2,
    countryNumeric: "356",
    routes: [
      {
        line: "pamban",
        path: [
          [79.13, 9.28],
          [79.21, 9.28],
          [79.31, 9.29],
        ],
        stations: [{ name: "Rameswaram", lat: 9.29, lng: 79.31, labelSide: "right" }],
      },
    ],
    links: [
      { label: "Pamban Bridge — Wikipedia", href: "https://en.wikipedia.org/wiki/Pamban_Bridge" },
      {
        label: "Fresh bid to fix the lift span (The Hindu)",
        href: "https://www.thehindu.com/news/cities/Madurai/pamban-new-rail-bridge-fresh-attempt-being-made-to-ensure-smooth-operation-of-its-vertical-lift-span/article70026939.ece",
      },
    ],
  },
  {
    id: "amaravati-capital",
    name: "Amaravati Capital City",
    location: "Amaravati, Andhra Pradesh, India",
    status: "Works revived · ~27% built · phase 1 2028",
    description:
      "Andhra Pradesh's planned greenfield capital on the Krishna River was frozen from 2019 to 2024 and relaunched by the PM in May 2025. It now spans 119 infrastructure projects worth ₹66,802 crore, backed by ₹41,188 crore of World Bank and other loans. By late 2026, 93 projects were under way and physical progress stood at 27%; the state still promises phase 1 by 2028.",
    images: [
      {
        src: "/images/infrastructure/amaravati-map.jpg",
        alt: "Map of the Krishna River near Vijayawada showing the approximate Amaravati capital city area",
        credit: {
          text: "Map: © OpenStreetMap contributors, rendering © EOX · overlay by Rudra",
          href: "https://www.openstreetmap.org/copyright",
        },
      },
    ],
    lat: 16.51,
    lng: 80.52,
    countryNumeric: "356",
    links: [
      { label: "Amaravati — Wikipedia", href: "https://en.wikipedia.org/wiki/Amaravati" },
      {
        label: "Projects reach 27% physical progress (Times of India)",
        href: "https://timesofindia.indiatimes.com/city/vijayawada/amaravati-projects-lag-reach-only-27-physical-progress/articleshow/134215840.cms",
      },
    ],
  },
  {
    id: "port-city-colombo",
    name: "Port City Colombo",
    location: "Colombo, Sri Lanka",
    status: "First towers under way · 2026",
    description:
      "269 ha of land reclaimed from the sea beside Galle Face by China Harbour Engineering, now a ~US$1.4 billion special economic zone that is finally going vertical. The first residential tower, the 231-unit Bay One, broke ground in January 2026, and in the first half of 2026 the government approved 71 businesses bringing over US$600 million of new investment.",
    images: [
      {
        src: "/images/infrastructure/colombo-harbour-map.jpg",
        alt: "Map of Colombo's waterfront showing Port City on reclaimed land and the Colombo West International Terminal",
        credit: { text: "Map: © OpenStreetMap contributors · overlay by Rudra", href: "https://www.openstreetmap.org/copyright" },
      },
      {
        src: "/images/infrastructure/port-city-aerial.jpg",
        alt: "Aerial view of Port City Colombo's canal, parkland and building plots under construction in Dec 2023",
        credit: { text: "Photo: Port City Colombo · CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:WIP_1_Dec_2023.jpg" },
      },
    ],
    lat: 6.934,
    lng: 79.834,
    countryNumeric: "144",
    pinOffset: [-14, 10],
    links: [
      { label: "Port City Colombo — Wikipedia", href: "https://en.wikipedia.org/wiki/Port_City_Colombo" },
      {
        label: "US$600m new investment in 1H2026 (Daily FT)",
        href: "https://www.ft.lk/front-page/Port-City-secures-600-m-new-investment-through-71-strategic-businesses-in-1H2026/44-793674",
      },
    ],
  },
  {
    id: "colombo-west-terminal",
    name: "Colombo West International Terminal",
    location: "Colombo Port, Sri Lanka",
    status: "Open Apr 2025 · phase 2 due Dec 2026",
    description:
      "Sri Lanka's first fully automated deep-water container terminal is a US$800 million venture of Adani Ports, John Keells and the Sri Lanka Ports Authority. Its 1,400 m quay and 20 m depth take 24,000-TEU megaships; it opened in April 2025 and passed a million TEU in its first year. Phase 2 cranes began arriving in July 2026, for 3.2 million TEU of capacity.",
    images: [
      {
        src: "/images/infrastructure/colombo-harbour-map.jpg",
        alt: "Map of Colombo port showing the Colombo West International Terminal on the South Harbour breakwater",
        credit: { text: "Map: © OpenStreetMap contributors · overlay by Rudra", href: "https://www.openstreetmap.org/copyright" },
      },
    ],
    lat: 6.951,
    lng: 79.8275,
    countryNumeric: "144",
    pinOffset: [-14, -12],
    links: [
      {
        label: "Adani's Colombo terminal begins operations (APSEZ)",
        href: "https://www.adaniports.com/newsroom/media-releases/adani-colombo-terminal-commences-operations",
      },
      {
        label: "Phase 2 cranes arrive (Daily FT)",
        href: "https://www.ft.lk/columns/CWIT-strengthens-Colombo-s-global-maritime-leadership-with-arrival-of-tallest-electric-cranes/4-794563",
      },
    ],
  },
  {
    id: "hambantota-port",
    name: "Hambantota International Port",
    location: "Hambantota, Sri Lanka",
    status: "Record volumes · phase 2 cranes coming",
    description:
      "Once derided as a white elephant, the Chinese-built deep-water port was leased to China Merchants Port for 99 years in 2017 for US$1.12 billion. It has since boomed: cargo rose 175% to 8.24 million tonnes in 2025, including 726,000 vehicles, and July 2026 set monthly records. A US$108 million crane package targets ~2 million TEU of capacity by early 2027.",
    images: [
      {
        src: "/images/infrastructure/hambantota-map.png",
        alt: "Map of greater Hambantota showing the port basin, town and surrounding roads",
        credit: {
          text: "Map: © OpenStreetMap contributors · ODbL",
          href: "https://commons.wikimedia.org/wiki/File:Location_map_of_greater_Hambantota.png",
        },
      },
    ],
    lat: 6.12,
    lng: 81.11,
    countryNumeric: "144",
    pinOffset: [12, 6],
    links: [
      {
        label: "Hambantota International Port — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Hambantota_International_Port",
      },
      {
        label: "Record July 2026 volumes (Daily FT)",
        href: "https://www.ft.lk/special_editions/Hambantota-International-Port-Builds-Scale-as-Investment-and-Diversification-Drive-Next-Phase-of-Growth/10530-796128",
      },
    ],
  },
  {
    id: "sinopec-hambantota-refinery",
    name: "Sinopec Hambantota Refinery",
    location: "Hambantota, Sri Lanka",
    status: "Stalled · talks deadlocked (Jul 2026)",
    description:
      "Billed as Sri Lanka's largest-ever foreign investment: a US$3.7 billion, 200,000 barrel-a-day export refinery beside Hambantota port, agreed during President Dissanayake's Jan 2025 visit to Beijing. Construction hasn't begun. Sinopec wants to sell more than the agreed 20% of output locally and seeks tax holidays that clash with Sri Lanka's IMF programme.",
    images: [
      {
        src: "/images/infrastructure/hambantota-map.png",
        alt: "Map of greater Hambantota, where the proposed Sinopec refinery would sit beside the port",
        credit: {
          text: "Map: © OpenStreetMap contributors · ODbL",
          href: "https://commons.wikimedia.org/wiki/File:Location_map_of_greater_Hambantota.png",
        },
      },
    ],
    lat: 6.15,
    lng: 81.07,
    countryNumeric: "144",
    pinOffset: [-8, -12],
    links: [
      {
        label: "Govt yet to decide on Sinopec refinery (Daily Mirror)",
        href: "https://www.dailymirror.lk/breaking-news/Govt-yet-to-reach-final-decision-on-Sinopec-refinery/108-344560",
      },
      {
        label: "Hambantota International Port — Wikipedia",
        href: "https://en.wikipedia.org/wiki/Hambantota_International_Port",
      },
    ],
  },
  {
    id: "sampur-solar-grid-link",
    name: "Sampur Solar · India–Sri Lanka grid link",
    location: "Sampur, Trincomalee · Madurai → Mannar",
    status: "Solar at tender stage · grid link MoU only",
    description:
      "On the site of a scrapped coal plant near Trincomalee, India's NTPC and Ceylon Electricity Board plan a 120 MW solar park with battery storage, launched by Modi and Dissanayake in April 2025. Contractor bids closed in Feb 2026 with no award yet. The same visit signed an MoU for a ±320 kV, 1 GW HVDC cable from Madurai to Mannar; a road bridge across the Palk Strait remains shelved.",
    images: [
      {
        src: "/images/infrastructure/sampur-grid-map.jpg",
        alt: "Map of the proposed Madurai–Mannar HVDC link across the Palk Strait and the Sampur solar site near Trincomalee",
        credit: {
          text: "Map: © OpenStreetMap contributors, rendering © EOX · overlay by Rudra",
          href: "https://www.openstreetmap.org/copyright",
        },
      },
      {
        src: "/images/infrastructure/palk-bay-map.jpg",
        alt: "Bathymetry map of Palk Bay and the shallow shoals of Adam's Bridge between India and Sri Lanka",
        credit: {
          text: "Map: George Victor · CC BY-SA 4.0",
          href: "https://commons.wikimedia.org/wiki/File:Palk_Bay_bathymetry.jpg",
        },
      },
    ],
    lat: 8.49,
    lng: 81.3,
    countryNumeric: "144",
    alsoCountries: ["356"],
    routes: [
      {
        planned: true,
        path: [
          [78.12, 9.93],
          [78.83, 9.37],
          [79.31, 9.28],
          [79.42, 9.15],
          [79.73, 9.09],
          [79.9, 8.98],
        ],
        stations: [
          { name: "Madurai", lat: 9.93, lng: 78.12, labelSide: "left" },
          { name: "Mannar", lat: 8.98, lng: 79.9, labelSide: "below" },
        ],
      },
    ],
    links: [
      { label: "Delay hits Sampur solar project (The Morning)", href: "https://www.themorning.lk/articles/KoUdjBZKOAAtbBZL08fo" },
      {
        label: "India–Sri Lanka HVDC Interconnection — Wikipedia",
        href: "https://en.wikipedia.org/wiki/India%E2%80%93Sri_Lanka_HVDC_Interconnection",
      },
    ],
  },
];
