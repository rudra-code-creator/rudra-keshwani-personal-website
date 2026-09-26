/** Infrastructure megaprojects Rudra is excited about, shown on the homepage map. */

export type InfrastructureLink = {
  label: string;
  href: string;
};

export type InfrastructureImage = {
  src: string;
  alt: string;
};

export type RouteStation = {
  name: string;
  lat: number;
  lng: number;
  labelSide: "left" | "right" | "above" | "below";
};

export type InfrastructureRoute = {
  /** Polyline drawn on the map as [lng, lat] pairs. */
  path: [number, number][];
  stations: RouteStation[];
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
  route?: InfrastructureRoute;
  links: InfrastructureLink[];
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
    name: "Kunming–Bangkok Railway",
    location: "Kunming, China → Vientiane, Laos → Bangkok, Thailand",
    status: "Kunming–Vientiane live · Thai HSR 2030–31",
    description:
      "A ~1,650 km rail spine tying southwest China to the Gulf of Thailand. The 1,035 km Kunming–Vientiane line has run since Dec 2021; Thailand's 250 km Bangkok–Nakhon Ratchasima high-speed section is ~57% built for a 2030–31 opening, with the 357 km extension to Nong Khai and a new Mekong rail bridge to Vientiane next.",
    images: [],
    lat: 19.4,
    lng: 102.3,
    countryNumeric: "418",
    alsoCountries: ["156", "764"],
    route: {
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
        [102.74, 17.88],
        [102.79, 17.41],
        [102.83, 16.43],
        [102.1, 14.97],
        [101.41, 14.71],
        [100.91, 14.53],
        [100.57, 14.35],
        [100.5, 13.75],
      ],
      stations: [
        { name: "Kunming", lat: 25.04, lng: 102.71, labelSide: "right" },
        { name: "Yuxi", lat: 24.35, lng: 102.54, labelSide: "right" },
        { name: "Mohan", lat: 21.19, lng: 101.69, labelSide: "right" },
        { name: "Luang Namtha", lat: 20.95, lng: 101.4, labelSide: "left" },
        { name: "Vientiane", lat: 17.97, lng: 102.6, labelSide: "left" },
        { name: "Nong Khai", lat: 17.88, lng: 102.74, labelSide: "right" },
        { name: "Bangkok", lat: 13.75, lng: 100.5, labelSide: "left" },
      ],
    },
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
    route: {
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
    route: {
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
        { name: "Gombak", lat: 3.24, lng: 101.72, labelSide: "left" },
        { name: "Kuantan", lat: 3.97, lng: 103.43, labelSide: "right" },
        { name: "Kuala Terengganu", lat: 5.33, lng: 103.14, labelSide: "right" },
        { name: "Kota Bharu", lat: 6.13, lng: 102.24, labelSide: "right" },
      ],
    },
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
    route: {
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
];
