// ─────────────────────────────────────────────
//  Admin editor schema
//  Describes every editable field on the site,
//  grouped the way the admin sees it: page →
//  section → fields. The editor UI is generated
//  from this file, so adding a field here (and a
//  default in lib/content/defaults.js) makes it
//  editable.
//
//  Field types: text, textarea, number, image,
//  images, color, icon, link, button, strings,
//  list, group, select, fleetPicker
// ─────────────────────────────────────────────

const t = (key, label, extra = {}) => ({ type: "text", key, label, ...extra })
const ta = (key, label, extra = {}) => ({ type: "textarea", key, label, ...extra })
const img = (key, label, extra = {}) => ({ type: "image", key, label, ...extra })
const btn = (key, label, extra = {}) => ({ type: "button", key, label, ...extra })
const strings = (key, label, extra = {}) => ({ type: "strings", key, label, ...extra })
const statList = (key, label = "Stats") => ({
  type: "list",
  key,
  label,
  itemName: "stat",
  itemTitle: (s) => [s.value, s.label].filter(Boolean).join(" — "),
  newItem: { value: "", label: "" },
  inline: true,
  fields: [t("value", "Number / short value", { width: "sm" }), t("label", "Label")],
})

const BRAND_COLORS = [
  { value: "#c9a84c", label: "Gold" },
  { value: "#2d8fdd", label: "Blue" },
  { value: "#1e4d7b", label: "Navy" },
  { value: "#0f2d4a", label: "Dark navy" },
]

const GRAPHICS = [
  { value: "container-dry", label: "Green dry container" },
  { value: "trailers", label: "Orange dry-van trailer" },
  { value: "reefer-diesel", label: "Blue diesel reefer" },
  { value: "reefer-electric", label: "Teal electric reefer" },
  { value: "reefer-container", label: "Blue reefer container" },
  { value: "generator", label: "Generator set" },
  { value: "office", label: "Mobile office" },
  { value: "mud-lab", label: "Mud lab unit" },
]

const breadcrumb = (key = "") => [
  t(`${key}breadcrumbHome`, "Breadcrumb: first link", { width: "sm" }),
  t(`${key}breadcrumbCurrent`, "Breadcrumb: this page", { width: "sm" }),
]

export const ADMIN_PAGES = [
  // ── Business info ─────────────────────────
  {
    id: "business",
    label: "Business Info & SEO",
    icon: "building",
    preview: "/",
    restoreKeys: ["site", "seo"],
    description:
      "Phone numbers, email, address and logo text used across the whole website. Change them once here and every page updates.",
    sections: [
      {
        title: "Company & logo",
        path: "site",
        fields: [
          t("name", "Company name", { help: "Shown in the footer copyright, page titles and emails. Placeholder: {company}" }),
          t("logoTop", "Logo — top line", { width: "sm", help: "Large word in the header/footer logo (e.g. ARDMORE)." }),
          t("logoBottom", "Logo — bottom line", { width: "sm", help: "Small gold line under the logo." }),
          t("minRental", "Footer badge", { help: "Gold badge in the footer." }),
        ],
      },
      {
        title: "Contact details",
        description: "Used by every phone button, email link and address on the site.",
        path: "site",
        fields: [
          t("phone", "Main phone", { width: "sm", help: "Placeholder: {phone}" }),
          t("cell", "Cell phone", { width: "sm", help: "Placeholder: {cell}" }),
          t("email", "Public email", { help: "Placeholder: {email}" }),
          t("street", "Street address", { help: "Placeholder: {street}" }),
          t("city", "City", { width: "sm" }),
          t("state", "State", { width: "xs" }),
          t("zip", "ZIP code", { width: "xs" }),
          ta("mapEmbedUrl", "Google Maps embed link (Contact page map)", {
            rows: 3,
            help: "In Google Maps: Share → Embed a map → copy only the link inside src=\"…\".",
          }),
        ],
      },
      {
        title: "Form submissions",
        path: "site",
        fields: [
          t("formRecipient", "Send quote & contact form messages to", {
            help: "Email address that receives messages from the Contact and Get-a-Quote forms.",
          }),
        ],
      },
      {
        title: "Search engines (SEO)",
        description: "How the site appears in Google results and link previews.",
        path: "seo",
        fields: [
          t("title", "Home page title"),
          t("titleTemplate", "Title pattern for other pages", { help: "%s is replaced with the page name." }),
          ta("description", "Site description", { rows: 3 }),
          strings("keywords", "Keywords", { itemName: "keyword" }),
          t("siteUrl", "Website address", { help: "Full address, e.g. https://ardmoretrailer.com (used in the sitemap)." }),
        ],
      },
    ],
  },

  // ── Header & footer ───────────────────────
  {
    id: "layout",
    label: "Header & Footer",
    icon: "layout",
    preview: "/",
    restoreKeys: ["nav", "footer"],
    description: "The menu at the top of every page and the footer at the bottom.",
    sections: [
      {
        title: "Main menu",
        path: "nav",
        fields: [
          {
            type: "list",
            key: "links",
            label: "Menu links",
            itemName: "link",
            inline: true,
            itemTitle: (l) => l.label,
            newItem: { label: "", href: "/" },
            help: "Links to /fleet and /services automatically show a drop-down of equipment / services.",
            fields: [t("label", "Text", { width: "sm" }), { type: "link", key: "href", label: "Goes to" }],
          },
          btn("cta", "Highlighted button (right side)"),
          t("fleetViewAll", "Fleet drop-down: “view all” text", { width: "sm" }),
          t("servicesViewAll", "Services drop-down: “view all” text", { width: "sm" }),
        ],
      },
      {
        title: "Mobile menu",
        path: "nav",
        fields: [
          t("mobileMenuTitle", "Menu title", { width: "sm" }),
          t("mobileViewAllPrefix", "“View all” prefix", { width: "sm" }),
          t("mobileCallLabel", "Call label", { width: "sm" }),
        ],
      },
      {
        title: "Footer",
        path: "footer",
        fields: [
          t("ctaEyebrow", "Top strip — small gold text", { width: "sm" }),
          t("ctaTitle", "Top strip — headline"),
          btn("ctaButton", "Top strip — button"),
          ta("blurb", "Company description", { rows: 3 }),
          t("fleetHeading", "Column heading: equipment", { width: "sm" }),
          t("industriesHeading", "Column heading: industries", { width: "sm" }),
          t("contactHeading", "Column heading: contact", { width: "sm" }),
          t("contactQuoteLabel", "Contact column: quote link text", { width: "sm" }),
          t("copyright", "Copyright text", { help: "Shown after “© year company name.”" }),
        ],
      },
    ],
  },

  // ── Home page ─────────────────────────────
  {
    id: "home",
    label: "Home Page",
    icon: "home",
    preview: "/",
    restoreKeys: ["home"],
    description: "Every section of the home page, from top to bottom.",
    sections: [
      {
        title: "Hero (top banner)",
        path: "home.hero",
        fields: [
          t("eyebrow", "Small gold text above the headline"),
          {
            type: "group",
            label: "Headline",
            preview: "heroTitle",
            help: "The headline is split into parts so each keeps its colour.",
            fields: [
              t("titleStart", "White words", { width: "sm", help: "Optional – leave empty to start with the blue word." }),
              t("titleAccent1", "Blue underlined word", { width: "sm" }),
              t("titleJoin", "Joining word", { width: "xs" }),
              t("titleAccent2", "Blue word", { width: "sm" }),
              t("titleLine2", "Second line (white)", { width: "sm" }),
              t("titleAccent3", "Gold ending", { width: "sm" }),
            ],
          },
          ta("text", "Description", { rows: 3 }),
          t("textHighlight", "Description — bold white ending"),
          btn("primaryButton", "Gold button"),
          btn("secondaryButton", "Outline button"),
          t("callLabel", "Label above phone number", { width: "sm" }),
          t("previewLabel", "Equipment cards heading", { width: "sm" }),
          { type: "number", key: "previewCount", label: "Equipment cards to show", min: 0, max: 12, width: "xs" },
          t("viewAllText", "“View all” link", { help: "{count} = number of equipment types." }),
          {
            type: "images",
            key: "slides",
            label: "Background slideshow images",
            help: "Large landscape photos (about 2000px wide). They are shown faded behind the text.",
          },
          { type: "number", key: "slideSeconds", label: "Seconds per slide", min: 2, max: 30, width: "xs" },
        ],
      },
      {
        title: "Trust bar (stats under the banner)",
        path: "home.trustBar",
        fields: [
          statList("stats"),
          t("industriesLabel", "Industries label", { width: "sm", help: "The industry pills come from the Services page items." }),
        ],
      },
      {
        title: "Fleet grid",
        path: "home.fleetGrid",
        description: "The equipment cards themselves are edited under “Equipment”.",
        fields: [
          t("eyebrow", "Small gold text", { width: "sm" }),
          t("title", "Heading"),
          ta("text", "Description", { rows: 2 }),
          t("linkLabel", "“See full fleet” link", { width: "sm" }),
          t("mobileButtonLabel", "Mobile button", { width: "sm" }),
          t("cardLinkLabel", "Card link text", { width: "sm" }),
        ],
      },
      {
        title: "Why choose us",
        path: "home.whyUs",
        fields: [
          t("eyebrow", "Small gold text", { width: "sm" }),
          t("title", "Heading"),
          ta("text", "Description", { rows: 2 }),
          {
            type: "group",
            key: "badge1",
            label: "Badge image 1",
            fields: [img("image", "Image", { size: "square" }), t("alt", "Image description (for accessibility)")],
          },
          {
            type: "group",
            key: "badge2",
            label: "Badge image 2",
            fields: [img("image", "Image", { size: "square" }), t("alt", "Image description (for accessibility)")],
          },
          t("badgeTitle", "Badge box heading", { help: "Leave the badge images, heading and text empty to hide this whole box." }),
          ta("badgeText", "Badge box text", { rows: 2 }),
          {
            type: "list",
            key: "items",
            label: "Feature cards",
            itemName: "card",
            itemTitle: (c) => c.title,
            newItem: { icon: "/images/quality.png", title: "", text: "", stat: "", statLabel: "" },
            fields: [
              img("icon", "Icon", {
                size: "icon",
                help: "Use a transparent PNG — its shape is displayed in gold.",
              }),
              t("stat", "Big number", { width: "xs" }),
              t("statLabel", "Number label", { width: "sm" }),
              t("title", "Title"),
              ta("text", "Text", { rows: 2 }),
            ],
          },
          t("stripBefore", "Bottom strip — text before highlight"),
          t("stripHighlight", "Bottom strip — gold highlight", { width: "sm" }),
          t("stripAfter", "Bottom strip — text after highlight", { width: "sm" }),
          t("stripButtonLabel", "Bottom strip — button", { width: "sm" }),
        ],
      },
      {
        title: "Testimonials",
        path: "home.testimonials",
        fields: [
          t("eyebrow", "Small gold text", { width: "sm" }),
          t("title", "Heading"),
          ta("text", "Description", { rows: 2 }),
          {
            type: "list",
            key: "items",
            label: "Customer reviews",
            itemName: "review",
            itemTitle: (r) => [r.author, r.company].filter(Boolean).join(", "),
            newItem: { quote: "", author: "", company: "" },
            fields: [
              ta("quote", "Review text", { rows: 3 }),
              t("author", "Customer name", { width: "sm" }),
              t("company", "Company / location", { width: "sm" }),
            ],
          },
          t("ctaTitle", "Bottom box — headline"),
          t("ctaText", "Bottom box — text"),
          btn("ctaPrimaryButton", "Bottom box — gold button"),
          t("ctaCallLabel", "Bottom box — call button", { width: "sm" }),
        ],
      },
      {
        title: "Call-to-action banner",
        path: "home.ctaBanner",
        fields: [
          statList("stats"),
          t("eyebrow", "Small gold text", { width: "sm" }),
          t("titleStart", "Headline — white part"),
          t("titleAccent", "Headline — gold part"),
          ta("text", "Text", { rows: 3 }),
          btn("button", "Button"),
          t("processLabel", "Steps heading"),
          t("stepPrefix", "Step badge word", { width: "xs" }),
          {
            type: "list",
            key: "steps",
            label: "Steps",
            itemName: "step",
            itemTitle: (s) => s.title,
            newItem: { icon: "fa6/FaTruck", title: "", text: "" },
            fields: [{ type: "icon", key: "icon", label: "Icon" }, t("title", "Title"), ta("text", "Text", { rows: 2 })],
          },
        ],
      },
    ],
  },

  // ── Equipment ─────────────────────────────
  {
    id: "equipment",
    label: "Equipment",
    icon: "truck",
    preview: "/fleet",
    restoreKeys: ["fleet"],
    description:
      "Each equipment type appears on the home page, the Fleet page, its own detail page, the menus and the quote form.",
    sections: [
      {
        title: "Equipment types",
        path: "",
        fields: [
          {
            type: "list",
            key: "fleet",
            label: "Equipment",
            itemName: "equipment type",
            itemTitle: (f) => f.name,
            itemSubtitle: (f) => `/fleet/${f.id}`,
            previewPath: (f) => `/fleet/${f.id}`,
            idField: "id",
            newItem: {
              id: "",
              name: "New equipment",
              shortName: "New equipment",
              badge: "",
              icon: "fa/FaBox",
              graphic: "container-dry",
              graphicLabel: "",
              accent: "#2d8fdd",
              sizes: [],
              description: "",
              features: [],
              useCases: [],
              listSizes: [],
              listDescription: "",
              listFeatures: [],
              image: "",
              gallery: [],
            },
            fields: [
              { type: "subheading", label: "Basics" },
              t("name", "Name", { width: "sm", help: "Used in menus, the Fleet page and the quote form." }),
              t("shortName", "Short name", { width: "sm", help: "Used on home page cards." }),
              { type: "slug", key: "id", label: "Page address", from: "name", prefix: "/fleet/" },
              t("badge", "Category badge", { help: "Small gold label, e.g. “Storage Container Rentals”." }),
              { type: "select", key: "accent", label: "Accent colour", options: BRAND_COLORS, width: "sm" },
              { type: "subheading", label: "Photos" },
              img("image", "Main photo", { help: "Landscape photo, about 900 × 600px." }),
              { type: "images", key: "gallery", label: "Gallery photos (detail page thumbnails)" },
              { type: "subheading", label: "Home page card & detail page" },
              strings("sizes", "Sizes", { itemName: "size", inline: true }),
              ta("description", "Description", { rows: 3 }),
              strings("features", "Features", { itemName: "feature", help: "The first 3 show on the home page card." }),
              strings("useCases", "Common use cases", { itemName: "use case" }),
              { type: "select", key: "graphic", label: "Card illustration", options: GRAPHICS, width: "sm" },
              t("graphicLabel", "Illustration label", { width: "sm", help: "Small text printed on the illustration." }),
              { type: "subheading", label: "Fleet page card" },
              { type: "icon", key: "icon", label: "Icon" },
              strings("listSizes", "Sizes", { itemName: "size", inline: true }),
              ta("listDescription", "Description", { rows: 3 }),
              strings("listFeatures", "Features", { itemName: "feature" }),
            ],
          },
        ],
      },
    ],
  },

  // ── Fleet page ────────────────────────────
  {
    id: "fleetPage",
    label: "Fleet Page",
    icon: "list",
    preview: "/fleet",
    restoreKeys: ["fleetPage", "fleetDetail"],
    description: "Headings and labels on the Fleet page and on every equipment detail page.",
    sections: [
      {
        title: "Fleet page banner",
        path: "fleetPage",
        fields: [
          ...breadcrumb(),
          t("eyebrow", "Small gold text", { width: "sm" }),
          t("title", "Heading"),
          ta("text", "Description", { rows: 3 }),
          statList("stats"),
        ],
      },
      {
        title: "Fleet page cards & bottom banner",
        path: "fleetPage",
        fields: [
          t("quoteButtonLabel", "Card quote button", { width: "sm" }),
          t("callButtonLabel", "Card call button", { width: "sm" }),
          t("ctaTitle", "Bottom banner — first line"),
          t("ctaAccent", "Bottom banner — gold line", { width: "sm" }),
          ta("ctaText", "Bottom banner — text", { rows: 2 }),
        ],
      },
      {
        title: "Equipment detail pages",
        path: "fleetDetail",
        description: "Labels shared by every /fleet/… page.",
        fields: [
          t("overviewLabel", "Overview heading", { width: "sm" }),
          t("featuresLabel", "Features heading", { width: "sm" }),
          t("useCasesLabel", "Use cases heading", { width: "sm" }),
          t("otherLabel", "Other equipment heading", { width: "sm" }),
          t("quoteButtonLabel", "Quote button", { width: "sm" }),
          t("callButtonLabel", "Call button", { width: "sm" }),
        ],
      },
    ],
  },

  // ── Services ──────────────────────────────
  {
    id: "services",
    label: "Services",
    icon: "briefcase",
    preview: "/services",
    restoreKeys: ["services", "servicesPage", "serviceDetail"],
    description: "Industries you serve, the Services page and each service's own page.",
    sections: [
      {
        title: "Services / industries",
        path: "",
        fields: [
          {
            type: "list",
            key: "services",
            label: "Services",
            itemName: "service",
            itemTitle: (s) => s.label,
            itemSubtitle: (s) => `/services/${s.id}`,
            previewPath: (s) => `/services/${s.id}`,
            idField: "id",
            newItem: { id: "", label: "New service", icon: "fa/FaStore", description: "", image: "", features: [], fleet: [] },
            fields: [
              t("label", "Name", { width: "sm" }),
              { type: "slug", key: "id", label: "Page address", from: "label", prefix: "/services/" },
              { type: "icon", key: "icon", label: "Icon" },
              ta("description", "Description", { rows: 2 }),
              img("image", "Photo", { help: "Landscape photo, about 800 × 500px." }),
              strings("features", "Common applications", { itemName: "application" }),
              { type: "fleetPicker", key: "fleet", label: "Recommended equipment" },
            ],
          },
        ],
      },
      {
        title: "Services page",
        path: "servicesPage",
        fields: [
          t("metaTitle", "Browser tab title"),
          ta("metaDescription", "Search description", { rows: 2 }),
          ...breadcrumb(),
          t("eyebrow", "Small gold text", { width: "sm" }),
          t("titleStart", "Heading — white part", { width: "sm" }),
          t("titleAccent", "Heading — gold part", { width: "sm" }),
          ta("text", "Description", { rows: 3 }),
          statList("stats"),
          t("applicationsLabel", "Card: applications heading", { width: "sm" }),
          t("recommendedLabel", "Card: equipment heading", { width: "sm" }),
          t("cardButtonLabel", "Card button", { help: "{service} = the service name." }),
          t("ctaTitle", "Bottom banner — white part"),
          t("ctaAccent", "Bottom banner — gold part", { width: "sm" }),
          ta("ctaText", "Bottom banner — text", { rows: 2 }),
          btn("ctaPrimaryButton", "Bottom banner — gold button"),
        ],
      },
      {
        title: "Service detail pages",
        path: "serviceDetail",
        description: "Labels shared by every /services/… page.",
        fields: [
          t("metaTitle", "Browser tab title", { help: "{service} = the service name." }),
          t("eyebrow", "Small gold text", { width: "sm" }),
          t("titleAccent", "Gold word after the service name", { width: "sm" }),
          t("applicationsLabel", "Applications heading", { width: "sm" }),
          t("recommendedLabel", "Equipment heading", { width: "sm" }),
          t("whyLabel", "“Why us” box heading", { width: "sm" }),
          strings("whyItems", "“Why us” points", { itemName: "point" }),
          t("quoteButtonLabel", "Quote button", { width: "sm" }),
          t("callButtonLabel", "Call button", { width: "sm" }),
          t("otherLabel", "Other services heading", { width: "sm" }),
        ],
      },
    ],
  },

  // ── About ─────────────────────────────────
  {
    id: "about",
    label: "About Page",
    icon: "info",
    preview: "/about",
    restoreKeys: ["about"],
    description: "Your story, values and team.",
    sections: [
      {
        title: "Banner",
        path: "about",
        fields: [
          t("metaTitle", "Browser tab title"),
          ta("metaDescription", "Search description", { rows: 2 }),
          ...breadcrumb(),
          t("eyebrow", "Small gold text", { width: "sm" }),
          t("titleStart", "Heading — first part", { width: "sm" }),
          t("titleAccent", "Heading — gold part", { width: "sm" }),
          t("titleEnd", "Heading — last part", { width: "sm" }),
          ta("text", "Description", { rows: 3 }),
          statList("stats"),
        ],
      },
      {
        title: "Our story",
        path: "about",
        fields: [
          img("storyImage", "Photo", { help: "Landscape photo, about 700 × 500px." }),
          t("storyImageAlt", "Photo description (for accessibility)"),
          t("storyEyebrow", "Small gold text", { width: "sm" }),
          t("storyTitle", "Heading"),
          ta("storyParagraph1", "Paragraph 1", { rows: 4 }),
          ta("storyParagraph2", "Paragraph 2", { rows: 4 }),
          strings("storyChecklist", "Checklist", { itemName: "point" }),
        ],
      },
      {
        title: "Values",
        path: "about",
        fields: [
          t("valuesEyebrow", "Small gold text", { width: "sm" }),
          t("valuesTitle", "Heading", { width: "sm" }),
          {
            type: "list",
            key: "values",
            label: "Values",
            itemName: "value",
            itemTitle: (v) => v.title,
            newItem: { icon: "fa6/FaShield", title: "", text: "" },
            fields: [{ type: "icon", key: "icon", label: "Icon" }, t("title", "Title"), ta("text", "Text", { rows: 2 })],
          },
        ],
      },
      {
        title: "Team",
        path: "about",
        fields: [
          t("teamEyebrow", "Small gold text", { width: "sm" }),
          t("teamTitle", "Heading", { width: "sm" }),
          {
            type: "list",
            key: "team",
            label: "Team members",
            itemName: "team member",
            itemTitle: (m) => [m.name, m.role].filter(Boolean).join(" — "),
            newItem: { name: "", role: "", photo: "" },
            fields: [
              t("name", "Name", { width: "sm" }),
              t("role", "Role", { width: "sm" }),
              img("photo", "Photo (optional)", { size: "square", help: "Square photo. Leave empty to show the team icon." }),
            ],
          },
        ],
      },
      {
        title: "Bottom banner",
        path: "about",
        fields: [
          t("ctaTitle", "Heading — white part"),
          t("ctaAccent", "Heading — gold part", { width: "sm" }),
          t("ctaText", "Text"),
          t("ctaCallLabel", "Call button", { width: "sm" }),
          t("ctaEmailLabel", "Email button", { width: "sm" }),
          t("ctaDirectionsLabel", "Directions button", { width: "sm" }),
        ],
      },
    ],
  },

  // ── Contact ───────────────────────────────
  {
    id: "contact",
    label: "Contact Page",
    icon: "mail",
    preview: "/contact",
    restoreKeys: ["contact"],
    description: "Contact cards, map, business hours, the message form and team contacts.",
    sections: [
      {
        title: "Banner",
        path: "contact",
        fields: [
          ...breadcrumb(),
          t("eyebrow", "Small gold text", { width: "sm" }),
          t("titleStart", "Heading — white part", { width: "sm" }),
          t("titleAccent", "Heading — gold part", { width: "sm" }),
          ta("text", "Description", { rows: 2 }),
        ],
      },
      {
        title: "Contact cards",
        path: "contact",
        fields: [
          t("infoEyebrow", "Small gold text", { width: "sm" }),
          t("infoTitle", "Heading", { width: "sm" }),
          {
            type: "list",
            key: "infoCards",
            label: "Cards",
            itemName: "card",
            itemTitle: (c) => c.label,
            newItem: { icon: "fa/FaPhone", label: "", value: "", sub: "", href: "", color: "#c9a84c" },
            fields: [
              { type: "icon", key: "icon", label: "Icon" },
              { type: "select", key: "color", label: "Colour", options: BRAND_COLORS, width: "sm" },
              t("label", "Small label", { width: "sm" }),
              t("value", "Main text", { width: "sm" }),
              t("sub", "Small text under it"),
              { type: "link", key: "href", label: "Opens when clicked", help: "e.g. {phoneLink}, {emailLink}, {mapsLink} or a web address." },
            ],
          },
        ],
      },
      {
        title: "Map & hours",
        path: "contact",
        description: "The map location itself is set under Business Info.",
        fields: [
          t("mapEyebrow", "Small gold text", { width: "sm" }),
          t("mapTitle", "Heading", { width: "sm" }),
          t("mapLocationName", "Location name", { width: "sm" }),
          t("mapLocationAddress", "Location address"),
          t("hoursTitle", "Hours heading", { width: "sm" }),
          strings("hours", "Opening hours", { itemName: "line" }),
        ],
      },
      {
        title: "Message form",
        path: "contact",
        fields: [
          t("formEyebrow", "Small gold text", { width: "sm" }),
          t("formTitle", "Heading", { width: "sm" }),
          {
            type: "group",
            key: "form",
            label: "Form labels",
            fields: [
              t("nameLabel", "Name label", { width: "sm" }),
              t("namePlaceholder", "Name hint", { width: "sm" }),
              t("phoneLabel", "Phone label", { width: "sm" }),
              t("phonePlaceholder", "Phone hint", { width: "sm" }),
              t("emailLabel", "Email label", { width: "sm" }),
              t("emailPlaceholder", "Email hint", { width: "sm" }),
              t("messageLabel", "Message label", { width: "sm" }),
              t("messagePlaceholder", "Message hint", { width: "sm" }),
              t("submitLabel", "Send button", { width: "sm" }),
              t("sendingLabel", "Button while sending", { width: "sm" }),
              t("successMessage", "Success message"),
              t("callText", "Text before phone number", { width: "sm" }),
            ],
          },
        ],
      },
      {
        title: "Team contacts",
        path: "contact",
        fields: [
          t("teamEyebrow", "Small gold text", { width: "sm" }),
          t("teamTitle", "Heading", { width: "sm" }),
          {
            type: "list",
            key: "team",
            label: "People",
            itemName: "person",
            itemTitle: (m) => [m.name, m.role].filter(Boolean).join(" — "),
            newItem: { name: "", role: "", note: "" },
            fields: [t("name", "Name", { width: "sm" }), t("role", "Role", { width: "sm" }), t("note", "What to contact them about")],
          },
        ],
      },
    ],
  },

  // ── Quote ─────────────────────────────────
  {
    id: "quote",
    label: "Quote Page",
    icon: "file",
    preview: "/quote",
    restoreKeys: ["quote"],
    description: "The Get-a-Quote form and the information panel beside it.",
    sections: [
      {
        title: "Banner",
        path: "quote",
        fields: [
          ...breadcrumb(),
          t("eyebrow", "Small gold text", { width: "sm" }),
          t("titleStart", "Heading — white part", { width: "sm" }),
          t("titleAccent", "Heading — gold part", { width: "sm" }),
          ta("text", "Description", { rows: 2 }),
        ],
      },
      {
        title: "Quote form",
        path: "quote",
        description: "Equipment and service choices come automatically from the Equipment and Services pages.",
        fields: [
          t("formEyebrow", "Small gold text", { width: "sm" }),
          t("formTitle", "Heading", { width: "sm" }),
          {
            type: "group",
            key: "form",
            label: "Form labels",
            fields: [
              t("nameLabel", "Name label", { width: "sm" }),
              t("namePlaceholder", "Name hint", { width: "sm" }),
              t("phoneLabel", "Phone label", { width: "sm" }),
              t("phonePlaceholder", "Phone hint", { width: "sm" }),
              t("emailLabel", "Email label", { width: "sm" }),
              t("emailPlaceholder", "Email hint", { width: "sm" }),
              t("companyLabel", "Company label", { width: "sm" }),
              t("companyPlaceholder", "Company hint", { width: "sm" }),
              t("equipmentLabel", "Equipment label", { width: "sm" }),
              t("serviceLabel", "Service label", { width: "sm" }),
              t("durationLabel", "Duration label", { width: "sm" }),
              t("durationPlaceholder", "Duration hint", { width: "sm" }),
              strings("durations", "Duration choices", { itemName: "choice" }),
              t("locationLabel", "Location label", { width: "sm" }),
              t("locationPlaceholder", "Location hint", { width: "sm" }),
              t("notesLabel", "Notes label", { width: "sm" }),
              t("notesPlaceholder", "Notes hint", { width: "sm" }),
              t("submitLabel", "Send button", { width: "sm" }),
              t("sendingLabel", "Button while sending", { width: "sm" }),
              t("successMessage", "Success message"),
              t("callText", "Text before phone number", { width: "sm" }),
            ],
          },
        ],
      },
      {
        title: "Side panel",
        path: "quote",
        fields: [
          t("whyEyebrow", "Small gold text", { width: "sm" }),
          t("whyTitle", "Heading", { width: "sm" }),
          strings("whyItems", "Points", { itemName: "point" }),
          t("callTitle", "Contact box heading", { width: "sm" }),
          {
            type: "list",
            key: "contacts",
            label: "Contact rows",
            itemName: "row",
            itemTitle: (c) => c.label,
            newItem: { icon: "fa/FaPhone", label: "", value: "", href: "", color: "#c9a84c" },
            fields: [
              { type: "icon", key: "icon", label: "Icon" },
              { type: "select", key: "color", label: "Colour", options: BRAND_COLORS, width: "sm" },
              t("label", "Small label", { width: "sm" }),
              t("value", "Main text", { width: "sm" }),
              { type: "link", key: "href", label: "Opens when clicked", help: "e.g. {phoneLink}, {emailLink}, {mapsLink}" },
            ],
          },
          t("noteBold", "Note — bold start", { width: "sm" }),
          ta("noteText", "Note — text", { rows: 2 }),
        ],
      },
    ],
  },

  // ── 404 ───────────────────────────────────
  {
    id: "notFound",
    label: "404 Page",
    icon: "alert",
    preview: "/this-page-does-not-exist",
    restoreKeys: ["notFound"],
    description: "Shown when a visitor opens a link that doesn't exist.",
    sections: [
      {
        title: "Page not found",
        path: "notFound",
        fields: [
          t("title", "Heading"),
          ta("text", "Text", { rows: 2 }),
          t("homeLabel", "Home button", { width: "sm" }),
          t("fleetLabel", "Fleet button", { width: "sm" }),
          t("callLabel", "Call button", { width: "sm" }),
          t("quickLinksLabel", "Quick links heading", { width: "sm" }),
          {
            type: "list",
            key: "quickLinks",
            label: "Quick links",
            itemName: "link",
            inline: true,
            itemTitle: (l) => l.label,
            newItem: { label: "", href: "/" },
            fields: [t("label", "Text", { width: "sm" }), { type: "link", key: "href", label: "Goes to" }],
          },
        ],
      },
    ],
  },
]
