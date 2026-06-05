// ─────────────────────────────────────────────
//  ARDMORE TRAILER, INC. — Site Constants
//  All static data lives here. Import into
//  components; never hardcode in JSX.
// ─────────────────────────────────────────────

// ── Brand / Site Config ───────────────────────
export const SITE = {
  name: "Ardmore Trailer, Inc.",
  tagline: "Heavy-Duty Rentals for Every Job Site",
  description:
    "Southern Oklahoma's most trusted source for trailer, container, reefer, and specialty equipment rentals. Serving commercial, residential, construction, and industrial customers since day one.",
  phone: "580-226-7811",
  phoneHref: "tel:5802267811",
  email: "rick@carrelltrucking.com",
  emailHref: "mailto:rick@carrelltrucking.com",
  address: {
    street: "3801 Springdale Road",
    city: "Ardmore",
    state: "OK",
    zip: "73401",
    full: "3801 Springdale Road, Ardmore, OK 73401",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=3801+Springdale+Road+Ardmore+OK+73401",
  },
  minRental: "2-month minimum rental",
  president: {
    name: "Rick Carrell",
    title: "President",
    email: "rick@carrelltrucking.com",
  },
  social: {
    facebook: null,
    linkedin: null,
  },
};

// ── Color Tokens (reference in Tailwind arbitrary values or inline styles) ──
export const COLORS = {
  dark: "#0f2d4a",
  navy: "#1e4d7b",
  blue: "#2d8fdd",
  gold: "#c9a84c",
  muted: "#7a9bb5",
  lightBg: "#f0f6fb",
};

// ── Navigation Links ──────────────────────────
export const NAV_LINKS = [
  { label: "Home",    href: "/" },
  { label: "Fleet",   href: "/fleet" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const NAV_CTA = {
  label: "Get a Quote",
  href: "/quote",
};

// ── Fleet Categories ──────────────────────────
//  Each category has: id, name, shortName, icon (react-icons key),
//  description, badge, sizes[], features[], image placeholder color

export const FLEET = [
  {
    id: "container-dry",
    name: "Dry Storage Containers",
    shortName: "Dry Container",
    iconName: "FaBox",
    badge: "Most Popular",
    description:
      "Weather-tight steel containers ideal for on-site storage, inventory overflow, and secure equipment housing. Available in three lengths to fit any footprint.",
    sizes: ["10 ft", "20 ft", "40 ft"],
    features: [
      "All-steel corrugated construction",
      "Lockbox security doors",
      "Forklift pockets on base",
      "Wind & watertight seal",
    ],
    useCases: ["Construction sites", "Retail overflow", "Document storage", "Equipment staging"],
    category: "container",
    accentColor: COLORS.blue,
  },
  {
    id: "trailer-flatbed",
    name: "Dry Van Trailers",
    shortName: "Dry Van",
    iconName: "FaTruck",
    badge: null,
    description:
      "Full-size dry van trailers for temporary storage or freight staging. Swing doors, side doors, and vent options available on select units.",
    sizes: ["28 ft", "48 ft", "53 ft"],
    features: [
      "Swing & roll-up door options",
      "Interior track & E-track",
      "Air-ride or spring suspension",
      "DOT-compliant lighting",
    ],
    useCases: ["Distribution overflow", "Event staging", "Seasonal storage", "Manufacturing"],
    category: "trailer",
    accentColor: COLORS.navy,
  },
  {
    id: "reefer-diesel",
    name: "Diesel Reefer Trailers",
    shortName: "Reefer Diesel",
    iconName: "FaTemperatureHalf",
    badge: "Temperature Controlled",
    description:
      "Self-powered diesel reefer trailers that operate independently — no external power needed. Perfect for remote job sites and large-scale temp storage.",
    sizes: ["28 ft", "48 ft", "53 ft"],
    features: [
      "Self-contained diesel unit",
      "±2°F precision temperature",
      "Remote monitoring capable",
      "Automatic defrost cycle",
    ],
    useCases: ["Remote worksites", "Outdoor events", "Pharmaceutical storage", "Produce staging"],
    category: "reefer",
    accentColor: COLORS.blue,
  },
  {
    id: "reefer-electric",
    name: "Electric Reefer Trailers",
    shortName: "Reefer Electric",
    iconName: "FaBolt",
    badge: null,
    description:
      "Plug-in electric reefer trailers — quieter, cleaner, and lower operating cost when shore power is available. Ideal for urban or facility-adjacent use.",
    sizes: ["20 ft", "40 ft"],
    features: [
      "Shore-power plug-in (460V/3ph)",
      "Ultra-quiet operation",
      "Digital thermostat control",
      "Stainless interior lining",
    ],
    useCases: ["Warehouses", "Food service", "Retail back-of-house", "Hospital overflow"],
    category: "reefer",
    accentColor: COLORS.gold,
  },
  {
    id: "reefer-container",
    name: "Refrigerated Containers",
    shortName: "Reefer Container",
    iconName: "FaSnowflake",
    badge: null,
    description:
      "ISO refrigerated containers combining container security with active refrigeration. Stack-able, lockable, and built for long-term stationary use.",
    sizes: ["20 ft", "40 ft"],
    features: [
      "Integrated Carrier/Thermo-King unit",
      "Stackable ISO corner castings",
      "Temperature range −20°F to +70°F",
      "Tamper-evident locking system",
    ],
    useCases: ["Cold chain storage", "Vaccine/pharma", "Frozen food distribution", "Export prep"],
    category: "reefer",
    accentColor: COLORS.blue,
  },
  {
    id: "generator",
    name: "Generator Sets",
    shortName: "Generator",
    iconName: "FaPlug",
    badge: "Power Solutions",
    description:
      "Skid-mounted diesel generator sets for powering reefer units, job-site operations, or emergency backup. Multiple kW ratings to match your load.",
    sizes: ["20 kW", "50 kW", "100 kW"],
    features: [
      "Tier 4 Final diesel engine",
      "Automatic transfer switch ready",
      "Weatherproof enclosure",
      "Single & three-phase output",
    ],
    useCases: ["Reefer power supply", "Construction power", "Event backup", "Emergency response"],
    category: "power",
    accentColor: COLORS.gold,
  },
  {
    id: "office-units",
    name: "Mobile Office Units",
    shortName: "Office Unit",
    iconName: "FaBuilding",
    badge: null,
    description:
      "Climate-controlled mobile offices with insulation, HVAC, electrical, and interior finishing — ready to set up and plug in on any job site.",
    sizes: ["8×20 ft", "8×40 ft"],
    features: [
      "110V electrical with breaker panel",
      "HVAC heating & cooling",
      "Insulated walls & ceiling",
      "Desk, shelving, windows included",
    ],
    useCases: ["Construction site offices", "Sales offices", "Security booths", "Command centers"],
    category: "specialty",
    accentColor: COLORS.navy,
  },
  {
    id: "mud-lab",
    name: "Mud Lab Units",
    shortName: "Mud Lab",
    iconName: "FaFlask",
    badge: "Custom Build",
    description:
      "Fully custom-built mud lab trailers engineered for oilfield drilling fluid analysis. Outfitted to your spec — call for a custom quote.",
    sizes: ["Custom"],
    features: [
      "Custom lab bench layout",
      "Fume hood & ventilation",
      "110/220V electrical service",
      "Climate control system",
    ],
    useCases: ["Drilling operations", "Oilfield services", "Geotechnical testing", "Field labs"],
    category: "specialty",
    accentColor: COLORS.gold,
  },
];

// ── Services / Industries Served ──────────────
export const SERVICES = [
  {
    id: "commercial",
    label: "Commercial",
    iconName: "FaStore",
    description: "Retail overflow, seasonal inventory, temporary warehousing for businesses of all sizes.",
  },
  {
    id: "residential",
    label: "Residential",
    iconName: "FaHouse",
    description: "Moving, renovation, and personal storage with flexible 2-month-minimum terms.",
  },
  {
    id: "construction",
    label: "Construction",
    iconName: "FaHardHat",
    description: "On-site offices, tool storage, and staging for contractors across Southern Oklahoma.",
  },
  {
    id: "industrial",
    label: "Industrial",
    iconName: "FaIndustry",
    description: "Heavy-duty oilfield, manufacturing, and energy sector solutions — custom specs welcome.",
  },
];

// ── Why Choose Us (WhyUs section) ────────────
export const WHY_US = [
  {
    id: "local",
    iconName: "FaLocationDot",
    heading: "Locally Owned & Operated",
    body: "Ardmore-based since the start. Rick Carrell and the team know Southern Oklahoma — we're your neighbor, not a national call center.",
  },
  {
    id: "fleet-size",
    iconName: "FaTruckFast",
    heading: "Wide Fleet Selection",
    body: "Dry, reefer, electric, diesel, office, lab — we carry the specialized inventory that one-size-fits-all rental chains don't stock.",
  },
  {
    id: "min-rental",
    iconName: "FaCalendarDays",
    heading: "Flexible 2-Month Minimum",
    body: "Our 2-month minimum keeps rates competitive and ensures you get equipment that's ready for real project timelines.",
  },
  {
    id: "custom",
    iconName: "FaWrench",
    heading: "Custom Configurations",
    body: "Need a mud lab or specialty unit? We build to spec. If it goes on a trailer or in a container, we can outfit it.",
  },
  {
    id: "responsive",
    iconName: "FaPhone",
    heading: "Direct Line to the Owner",
    body: "Call 580-226-7811 and talk to Rick or his team directly — no 1-800 numbers, no ticket queues, no runaround.",
  },
  {
    id: "location",
    iconName: "FaRoad",
    heading: "Prime South-Central Location",
    body: "Situated on Springdale Road in Ardmore, we're centrally positioned to serve the Permian Basin, Dallas corridor, and all points between.",
  },
];

// ── Trust Bar stats ───────────────────────────
export const TRUST_STATS = [
  { value: "8+",    label: "Equipment Categories" },
  { value: "2 mo",  label: "Minimum Rental Term" },
  { value: "580",   label: "Ardmore Area Code — Call Direct" },
  { value: "OK",    label: "Southern Oklahoma Proud" },
];

// ── Testimonials (placeholder — update with real quotes) ─────────────────
export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Ardmore Trailer had a 40-foot reefer container on our site within 48 hours. Rick was straightforward about pricing — no surprises.",
    author: "J. Harmon",
    company: "Harmon Produce, Ardmore OK",
  },
  {
    id: 2,
    quote:
      "We rented three dry van trailers for overflow storage during a facility expansion. Solid units, clean, and hassle-free pickup.",
    author: "T. Wilkins",
    company: "Wilkins Manufacturing",
  },
  {
    id: 3,
    quote:
      "The mud lab trailer was spec'd exactly how we needed it. You won't find that level of customization anywhere else in the region.",
    author: "D. Castillo",
    company: "Southwest Drilling Services",
  },
];

// ── Quote Form — field config ────────────────
export const QUOTE_EQUIPMENT_OPTIONS = FLEET.map((f) => ({
  value: f.id,
  label: f.name,
}));

export const QUOTE_INDUSTRY_OPTIONS = SERVICES.map((s) => ({
  value: s.id,
  label: s.label,
}));

export const QUOTE_DURATION_OPTIONS = [
  { value: "2-3",   label: "2–3 Months" },
  { value: "3-6",   label: "3–6 Months" },
  { value: "6-12",  label: "6–12 Months" },
  { value: "12+",   label: "12+ Months" },
  { value: "custom",label: "Custom / Ongoing" },
];

// ── Footer columns ────────────────────────────
export const FOOTER_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "Home",       href: "/" },
      { label: "About Us",   href: "/about" },
      { label: "Our Fleet",  href: "/fleet" },
      { label: "Get a Quote",href: "/quote" },
    ],
  },
  {
    heading: "Fleet",
    links: [
      { label: "Dry Containers",  href: "/fleet#container-dry" },
      { label: "Dry Van Trailers", href: "/fleet#trailer-flatbed" },
      { label: "Diesel Reefers",  href: "/fleet#reefer-diesel" },
      { label: "Electric Reefers", href: "/fleet#reefer-electric" },
      { label: "Reefer Containers",href: "/fleet#reefer-container" },
      { label: "Generator Sets",  href: "/fleet#generator" },
      { label: "Office Units",    href: "/fleet#office-units" },
      { label: "Mud Lab Units",   href: "/fleet#mud-lab" },
    ],
  },
  {
    heading: "Industries",
    links: SERVICES.map((s) => ({
      label: s.label,
      href: `/fleet?industry=${s.id}`,
    })),
  },
  {
    heading: "Contact",
    links: [
      { label: SITE.phone,           href: SITE.phoneHref },
      { label: SITE.email,           href: SITE.emailHref },
      { label: SITE.address.full,    href: SITE.address.mapsHref },
      { label: "Get a Quote",        href: "/quote" },
    ],
  },
];

// ── About Page content ────────────────────────
export const ABOUT = {
  headline: "Southern Oklahoma's Trailer & Container Rental Specialists",
  intro:
    "Ardmore Trailer, Inc. was built on a simple premise: give Southern Oklahoma businesses and contractors access to the heavy-duty rental equipment they need, without the runaround. We stock the units that matter — dry, refrigerated, powered, and custom — and we back every rental with direct, responsive service.",
  mission:
    "Our mission is to keep your operation moving. Whether you're a produce distributor needing a 40-foot reefer or a drilling company needing a custom mud lab, we build the solution, set the price, and get it on your site.",
  teamHighlight: {
    name: "Rick Carrell",
    title: "President, Ardmore Trailer, Inc.",
    bio: "Rick Carrell founded Ardmore Trailer with deep roots in trucking and logistics through Carrell Trucking. His hands-on approach means you'll often be talking directly with the decision-maker — the person who knows every unit in the fleet.",
    email: "rick@carrelltrucking.com",
  },
  values: [
    { label: "Reliability",    body: "Every unit goes out clean, inspected, and ready to work." },
    { label: "Transparency",   body: "Straightforward pricing. No hidden fees, no bait-and-switch." },
    { label: "Local Focus",    body: "We serve Southern Oklahoma because we live and work here too." },
    { label: "Customization",  body: "If the standard catalog doesn't fit, we build to your spec." },
  ],
};

// ── Contact Page ──────────────────────────────
export const CONTACT = {
  headline: "Get in Touch",
  subtext:
    "Ready to rent, have a question, or need a custom quote? Reach out directly — you'll get a real person who knows the fleet.",
  methods: [
    {
      id: "phone",
      iconName: "FaPhone",
      label: "Call Us",
      value: SITE.phone,
      href: SITE.phoneHref,
      note: "Mon–Fri, business hours",
    },
    {
      id: "email",
      iconName: "FaEnvelope",
      label: "Email Us",
      value: SITE.email,
      href: SITE.emailHref,
      note: "We respond same business day",
    },
    {
      id: "visit",
      iconName: "FaLocationDot",
      label: "Visit Us",
      value: SITE.address.full,
      href: SITE.address.mapsHref,
      note: "Ardmore, Oklahoma",
    },
  ],
};