// LEGACY BLOG & FAQ CONTENT (content version 28). Only used by upgrade.js. Do not edit.
// ─────────────────────────────────────────────
//  BLOG & FAQ DEFAULT CONTENT
//  Edited in Admin → Blog & FAQ. Kept in its own file so the main
//  defaults stay readable.
//
//  SEO structure (topical authority): four topic clusters, each with
//  articles that target one main search phrase plus close variations,
//  link to the matching equipment pages, to sibling articles and to the
//  quote page. Facts are limited to what the business states on the site
//  and standard industry facts (no prices, terms or policies invented).
//
//  Article body format (Markdown-style):
//    ## Heading      ### Sub-heading
//    - bullet        1. numbered step
//    **bold**        [link text](/fleet/container-dry)
//    blank line = new paragraph. {phone} is replaced with the phone number.
// ─────────────────────────────────────────────

export const BLOG_DEFAULTS = {
  // "no" hides Blog & FAQ everywhere (menus, footer, pages, sitemap, equipment pages).
  enabled: "no",
  metaTitle: "Trailer & Container Rental Guides and Tips | Ardmore Trailer, Inc.",
  metaDescription:
    "Practical guides on storage container sizes, refrigerated trailer rental, job-site setup and renting vs. buying — from the owner of Ardmore Trailer, Inc. in Southern Oklahoma.",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Resources",
  eyebrow: "Resources",
  titleStart: "Guides &",
  titleAccent: "Expert Advice",
  text: "Straight answers from the people who own and deliver the equipment — container sizes, refrigerated trailers, job-site setup and how to choose between renting, buying and rent-to-own.",
  allLabel: "All Articles",
  readMoreLabel: "Read Article",
  relatedEquipmentLabel: "Equipment in This Article",
  relatedPostsLabel: "Related Articles",
  tocLabel: "In This Article",
  ctaTitle: "Ready to talk about your project?",
  ctaText: "Call {phone} or request a free quote — you deal directly with the owner, no middleman.",
  author: "Ardmore Trailer Team",

  // Header "Resources" menu
  menu: {
    guidesHeading: "Popular Guides",
    topicsHeading: "Browse Topics",
    faqLabel: "Frequently Asked Questions",
    note: "Advice straight from the owner — no middleman.",
    viewAll: "All Articles",
  },

  categories: [
    {
      id: "storage-containers",
      label: "Storage Containers",
      description: "Container sizes, ground-level delivery and on-site storage for businesses, homes and job sites.",
    },
    {
      id: "refrigerated",
      label: "Refrigerated Trailers & Containers",
      description: "Diesel and electric reefer trailers, refrigerated containers and temporary cold storage.",
    },
    {
      id: "job-site",
      label: "Job Site & Oilfield",
      description: "Office units, generators, mud labs and sanitation for construction and drilling sites.",
    },
    {
      id: "rent-buy",
      label: "Rent, Buy & Rent-to-Own",
      description: "How to choose between renting, buying and rent-to-own for trailers and containers.",
    },
  ],

  posts: [
    // ── Cluster: Storage containers (local pillar) ──
    {
      id: "storage-container-rental-southern-oklahoma-north-texas",
      published: "yes",
      featured: "yes",
      title: "Storage Container Rental in Southern Oklahoma & North Texas: The Complete Guide",
      metaTitle: "Storage Container Rental in Ardmore, OK & North Texas | Complete Guide",
      metaDescription:
        "Everything you need to know about renting a storage container in Southern Oklahoma and North Texas: sizes, ground-level delivery, site prep, rent vs. buy and how to get a quote.",
      category: "storage-containers",
      date: "2026-10-12",
      image: "/images/slides/delivery.webp",
      excerpt:
        "Sizes, delivery, site preparation and costs to consider — a complete guide to renting a ground-level storage container from a local owner in Ardmore, Oklahoma.",
      fleet: ["container-dry", "reefer-container", "office"],
      body: `Whether you need extra room for inventory, a secure place for tools on a job site or temporary storage during a move, a **ground-level storage container** is one of the simplest and most secure solutions available. This guide covers everything to know before you rent one in Southern Oklahoma or North Texas.

## Why rent a storage container?

A steel storage container gives you weather-tight, lockable space right where you need it — at your business, home or job site. Common uses include:

- **Retail and warehouse overflow** — extra stock before the holidays or during a remodel
- **Construction sites** — secure storage for tools, materials and equipment
- **Moving and renovation** — keep furniture safe and dry on your own property
- **Agriculture and oilfield** — parts, supplies and equipment storage at remote locations
- **Events and seasonal businesses** — storage that comes and goes with your season

## Which size do you need?

We rent [dry storage containers](/fleet/container-dry) in **20 ft, 40 ft and 48 ft** lengths, in standard and high cube heights. A 20 ft container suits most homes, small shops and single job sites; a 40 ft container doubles the floor space for warehouse overflow or large projects; and a 48 ft container gives the most room of all for big inventories and long items. Our [container size guide](/blog/20-ft-vs-40-ft-storage-container-sizes) explains the dimensions and what fits.

## Ground-level delivery — no forklift needed

Our containers are delivered on a tilt-bed truck and set **directly on the ground**. There is no ramp or loading dock required: you walk straight in from day one. Before delivery, it helps to confirm the spot is level, firm and has room for the truck to tilt and pull forward. Our [site preparation checklist](/blog/ground-level-container-delivery-site-preparation) walks through it step by step.

## Delivered to you — or store at our yard

Every container we rent is ours. We keep the fleet at our own yard on Refinery Road in Ardmore, Oklahoma, where you can come and look at the units before you choose. You can have the container **delivered to your location**, or **store your items at our yard** if you don't have space on site.

## Rent, buy or rent-to-own?

- **Rent** when you need storage for a project or a season.
- **Buy** when you need permanent storage and want to own the unit outright.
- **Rent-to-own** when you want to spread the cost and own it in the end.

Read [Rent vs. Buy vs. Rent-to-Own](/blog/rent-vs-buy-vs-rent-to-own-trailers-containers) for a side-by-side comparison.

## Need something custom?

Containers can be modified — extra doors, windows, shelving, insulation or electrical — so the unit fits the way you work. Choose **Modification** on the [quote form](/quote) and tell us what you have in mind.

## Need it cold? Choose a refrigerated container

For food, produce or temperature-sensitive products, a [refrigerated container](/fleet/reefer-container) combines the security of a steel container with active refrigeration. See our guide to [temporary cold storage rental](/blog/temporary-cold-storage-rental-produce-events).

## How to get a quote

Call **{phone}** or [request a free quote](/quote) with the size you need, your delivery address and how long you need it. You talk directly to the owner — no call centers, no middleman.`,
    },
    {
      id: "20-ft-vs-40-ft-storage-container-sizes",
      published: "yes",
      featured: "yes",
      title: "Storage Container Sizes: 20 ft vs. 40 ft vs. 48 ft and What Fits",
      metaTitle: "20 ft vs 40 ft vs 48 ft Storage Container Sizes | What Fits?",
      metaDescription:
        "Compare 20 ft, 40 ft and 48 ft storage container dimensions, standard and high cube heights, floor space and pallet capacity — with examples of what fits in each.",
      category: "storage-containers",
      date: "2026-10-10",
      image: "/images/fleet/container-dry.webp",
      excerpt:
        "Container dimensions, high cube vs. standard height, and real-world examples of what fits in a 20 ft, 40 ft and 48 ft storage container.",
      fleet: ["container-dry", "reefer-container"],
      body: `Choosing the right container size saves money and space. We rent and sell containers in 20 ft, 40 ft and 48 ft lengths — here is how they compare, and how to decide which one fits your project.

## Standard dimensions

Shipping-style storage containers are built to international standards, so the sizes are consistent. Typical figures:

- **20 ft container** — about 20 ft long, 8 ft wide and 8.5 ft tall outside; roughly 19 ft 4 in × 7 ft 8 in inside, with about **160 sq ft** of floor space and around 1,170 cubic feet of volume.
- **40 ft container** — about 40 ft long, 8 ft wide and 8.5 ft tall outside; roughly 39 ft 5 in × 7 ft 8 in inside, with about **320 sq ft** of floor space and around 2,390 cubic feet of volume.
- **48 ft container** — about 48 ft long and 9.5 ft tall outside (48 ft units are high cube), with roughly 47 ft of usable length inside. The 48 ft size isn't an international standard, so the width and inside measurements vary by maker — we'll give you the exact figures for the unit you choose.

Exact interior measurements vary slightly by unit — ask us if a few inches matter for your load.

## Standard vs. high cube

A **high cube** container is one foot taller than a standard one — about 9.5 ft outside instead of 8.5 ft, with roughly 8 ft 10 in of inside height. A 40 ft high cube holds about 2,690 cubic feet, around 300 more than a standard 40 ft. Choose high cube for tall shelving, stacked boxes or equipment that won't fit under a standard ceiling; the floor space is the same.

## What fits in a 20 ft container?

- The contents of a 1–2 bedroom home during a move or renovation
- Tools, materials and small equipment for a single job site
- Seasonal stock for a small retail shop
- About 9–10 standard 48 × 40 in pallets on the floor

## What fits in a 40 ft container?

- The contents of a 3–4 bedroom home
- Warehouse or retail overflow, including long items
- Materials for a large construction project or multiple crews
- About 20–21 standard 48 × 40 in pallets on the floor

## When to choose a 48 ft container

- Large retail or warehouse overflow that would need two smaller containers
- Long items such as pipe, lumber or equipment
- Tall loads that benefit from high cube height
- Sites with enough room for a longer delivery (see the [site checklist](/blog/ground-level-container-delivery-site-preparation))

## How to choose

1. **List what you need to store** and estimate pallet count or room count.
2. **Check your site** — a 40 ft container needs more room for delivery. See our [site preparation checklist](/blog/ground-level-container-delivery-site-preparation).
3. **Think ahead** — if your needs may grow during the project, one larger unit is often simpler than two small ones.
4. **Consider temperature** — products that must stay cold need a [refrigerated container](/fleet/reefer-container) instead.

## Ground level means easy loading

Our [dry storage containers](/fleet/container-dry) are placed directly on the ground, so you can roll a hand truck or walk straight in — no ramp or dock needed.

Not sure which size is right? Call **{phone}** and we'll help you choose, or [request a free quote](/quote).`,
    },
    {
      id: "ground-level-container-delivery-site-preparation",
      published: "yes",
      featured: "yes",
      title: "Ground-Level Container Delivery: How to Prepare Your Site",
      metaTitle: "Storage Container Delivery Site Prep Checklist | Ground-Level Delivery",
      metaDescription:
        "How ground-level storage container delivery works and how to prepare your site: ground, access, clearance and placement — so delivery day goes smoothly.",
      category: "storage-containers",
      date: "2026-10-08",
      image: "/images/slides/delivery.webp",
      excerpt:
        "How tilt-bed, ground-level delivery works and a simple checklist to get your site ready — no forklift, ramp or loading dock required.",
      fleet: ["container-dry", "reefer-container", "office"],
      body: `Ground-level delivery is the easiest way to get a storage container on site: a tilt-bed truck tilts its bed and the container slides gently to the ground. There is **no forklift, crane, ramp or loading dock** involved. A little preparation makes delivery day quick and safe.

## How ground-level delivery works

1. The truck backs up to your chosen spot.
2. The bed tilts back and the container slides down to the ground.
3. The truck pulls forward, leaving the container level and ready to use.

Because the container sits on the ground, you can walk or roll equipment straight in from day one.

## Site preparation checklist

- **Firm, level ground** — gravel, concrete, asphalt or compacted dirt. Soft or muddy ground can make the container settle unevenly.
- **Straight access for the truck** — the truck needs a clear, straight path to back in and room to pull forward as the container slides off. Longer containers need more room; we confirm the space with you before delivery.
- **Overhead clearance** — check for power lines, tree branches and roof edges, because the bed tilts upward during unloading.
- **Door direction** — decide which way you want the doors to face so loading is convenient.
- **Space around the doors** — leave enough room to open both doors fully.
- **Not sure about the spot?** — if you're unsure where it should go, or whether your neighborhood has rules about it, ask us. We'll help you choose a spot that works.

## Placement tips

- Keep the container away from low spots where water collects.
- On a job site, place it where trucks and crews can reach it without blocking traffic.
- If the ground is uneven, simple blocks under the corners can help keep it level.

## Pickup works the same way

When you're done, we pick the container up the same way it arrived — just make sure the truck can access it again.

Questions about your site? Call **{phone}** — we'll talk it through before delivery. Ready to order? See our [storage container rental guide](/blog/storage-container-rental-southern-oklahoma-north-texas) or [request a free quote](/quote).`,
    },

    // ── Cluster: Refrigerated ──
    {
      id: "diesel-vs-electric-refrigerated-trailer-rental",
      published: "yes",
      featured: "yes",
      title: "Diesel vs. Electric Refrigerated Trailers: Which Reefer Rental Do You Need?",
      metaTitle: "Diesel vs Electric Refrigerated Trailer Rental | Reefer Trailer Guide",
      metaDescription:
        "Compare diesel and electric refrigerated trailer rentals: power needs, noise, running costs and the best uses for each — plus when a refrigerated container is the better fit.",
      category: "refrigerated",
      date: "2026-10-06",
      image: "/images/slides/reefer-diesel.webp",
      excerpt:
        "Self-powered diesel reefers vs. plug-in electric reefers — how they differ, where each works best and how to choose for your site.",
      fleet: ["reefer-diesel", "reefer-electric", "reefer-container", "generator"],
      body: `A refrigerated trailer — often called a **reefer trailer** — gives you large, mobile cold storage wherever you need it. The main choice is how the refrigeration unit is powered: **diesel** or **electric**.

## Diesel refrigerated trailers

A [diesel refrigerated trailer](/fleet/reefer-diesel) has its own diesel-powered refrigeration unit, so it **doesn't need outside power**.

Best for:

- Remote job sites, farms and oilfield locations
- Events and outdoor venues without a suitable power supply
- Produce harvests and temporary storage away from buildings

Keep in mind: the unit runs on fuel, which needs to be topped up, and it makes engine noise while running.

## Electric refrigerated trailers

An [electric refrigerated trailer](/fleet/reefer-electric) plugs into **shore power** — usually a three-phase connection (460V is most common, and some units also run on 208–230V) — instead of running a diesel engine. Tell us what power you have and we'll confirm it matches the unit.

Best for:

- Restaurants, grocery stores and food distributors next to a building with the right power
- Indoor-adjacent or urban sites where noise matters
- Long-term cold storage where lower running costs add up

Keep in mind: you need a suitable power connection on site. If you don't have one, a [generator](/fleet/generator) or a diesel unit may be the better choice.

## Quick comparison

- **Power** — diesel: self-contained; electric: needs shore power
- **Noise** — diesel: engine noise; electric: quieter
- **Running cost** — diesel: fuel; electric: usually lower operating cost
- **Best location** — diesel: anywhere; electric: next to a building with power

## What about a refrigerated container?

A [refrigerated container](/fleet/reefer-container) sits at ground level like a storage container, so it's easy to walk in and load by hand. It's a strong choice for stationary cold storage at a business or event. Read our guide to [temporary cold storage rental](/blog/temporary-cold-storage-rental-produce-events).

## Get the right reefer

Tell us what you're storing, the temperature you need, where it's going and whether power is available. Call **{phone}** or [request a free quote](/quote).`,
    },
    {
      id: "temporary-cold-storage-rental-produce-events",
      published: "yes",
      featured: "no",
      title: "Temporary Cold Storage Rental for Produce, Restaurants and Events",
      metaTitle: "Temporary Cold Storage Rental | Refrigerated Trailers & Containers",
      metaDescription:
        "When you need temporary cold storage: refrigerated trailers and containers for produce harvests, restaurants, catering, events and emergency backup in Oklahoma and Texas.",
      category: "refrigerated",
      date: "2026-10-04",
      image: "/images/fleet/reefer-container.webp",
      excerpt:
        "Refrigerated trailers and containers for harvest season, restaurant remodels, catering, events and walk-in cooler breakdowns.",
      fleet: ["reefer-container", "reefer-diesel", "reefer-electric"],
      body: `When your walk-in cooler fails, harvest comes in early or an event needs extra cold space, **temporary cold storage** keeps your products safe without a permanent investment.

## Common reasons to rent cold storage

- **Produce and agriculture** — extra capacity during harvest and packing season
- **Restaurants and grocery stores** — backup during a cooler breakdown, remodel or busy season
- **Catering and events** — weddings, festivals and large gatherings
- **Food distribution** — overflow inventory and staging
- **Emergency backup** — protecting inventory during power or equipment failures

## Which unit fits your situation?

- [Refrigerated container](/fleet/reefer-container) — sits at ground level for easy walk-in loading; ideal for stationary storage at a business or event.
- [Diesel refrigerated trailer](/fleet/reefer-diesel) — self-powered, so it works anywhere, including farms and remote sites.
- [Electric refrigerated trailer](/fleet/reefer-electric) — quieter, plugs into shore power next to a building.

Not sure? Our [diesel vs. electric reefer guide](/blog/diesel-vs-electric-refrigerated-trailer-rental) compares them side by side.

## Questions to answer before you rent

1. **What are you storing**, and at what temperature?
2. **How much space** do you need — pallets, shelving or walk-in access?
3. **Is power available** on site?
4. **How long** do you need it — days, weeks or a full season?
5. **Where is it going** — delivered to your location or kept at our yard?

## Direct from the owner

We own every refrigerated trailer and container we rent. You talk directly to the people who maintain and deliver the equipment. Call **{phone}** or [request a free quote](/quote).`,
    },

    // ── Cluster: Job site & oilfield ──
    {
      id: "oilfield-site-setup-mud-lab-generator-office",
      published: "yes",
      featured: "yes",
      title: "Oilfield Site Setup: Mud Lab Units, Generators and Office Units",
      metaTitle: "Oilfield Equipment Rental: Mud Lab Units, Generators & Offices",
      metaDescription:
        "How to equip a drilling pad: ground-level mud lab rental, industrial generators, site offices and sanitation — delivered and set up across Southern Oklahoma and North Texas.",
      category: "job-site",
      date: "2026-10-02",
      image: "/images/slides/oilfield.webp",
      excerpt:
        "What a drilling site needs on location — a mud lab, power, office space and sanitation — and how to plan delivery.",
      fleet: ["mud-lab", "generator", "office", "portable-toilets"],
      body: `A drilling pad needs more than a rig. Crews need a place to test drilling fluid, reliable power, an office for paperwork and meetings, and sanitation. Here's how to plan the equipment for an oilfield location.

## Mud lab units

A [10 ft ground-level mud lab](/fleet/mud-lab) gives your mud engineer a climate-controlled lab on location to test and monitor drilling fluid. It sits flat on the ground — no steps or ramp — with room for a lab bench and electrical service. The same compact units also work as guard shacks and gate offices at the pad entrance.

## Power: industrial generators

Remote pads rarely have grid power. [Generator units](/fleet/generator) supply power for the mud lab, offices, lighting and refrigeration. Plan your total power load before delivery so the generator is sized correctly.

## Site offices

[Office units](/fleet/office) give supervisors and company men a climate-controlled space with electrical service for computers, paperwork and safety meetings.

## Sanitation

Crews need restrooms and hand washing. [Portable toilets and hand wash stations](/fleet/portable-toilets) can be delivered with the rest of your equipment. See [how many portable toilets a job site needs](/blog/construction-site-office-and-portable-toilets).

## Planning checklist

- Access road and pad space for each unit
- Total power load (lab, office, lighting, HVAC)
- Crew size for sanitation
- Duration of the job and any move to the next pad

## One call, one owner

We own and deliver every unit, so the mud lab, generator, office and toilets come from one company. Call **{phone}** or [request a free quote](/quote).`,
    },
    {
      id: "construction-site-office-and-portable-toilets",
      published: "yes",
      featured: "no",
      title: "Construction Site Setup: Office Trailers and How Many Portable Toilets You Need",
      metaTitle: "Job Site Office Trailer & Portable Toilet Rental | How Many Do You Need?",
      metaDescription:
        "Plan your construction site: office trailer rental, secure storage and how many portable toilets you need by crew size, based on OSHA guidance.",
      category: "job-site",
      date: "2026-09-30",
      image: "/images/slides/construction.webp",
      excerpt:
        "Office units, secure storage and the OSHA guideline for how many portable toilets a construction site needs.",
      fleet: ["office", "portable-toilets", "container-dry", "generator"],
      body: `A well-planned job site keeps crews productive and inspections smooth. Three basics come first: a **site office**, **secure storage** and enough **restrooms**.

## Site office

An [office unit](/fleet/office) gives project managers a climate-controlled base for plans, paperwork and meetings. Our ground-level office units come in **20 ft and 40 ft** lengths, plus a **40 ft combo** that pairs a 20 ft office with 20 ft of lockable storage — all with electrical service, heating and cooling and windows. Pair one with a [generator](/fleet/generator) if the site has no power yet.

## Secure storage

Tools and materials left in the open invite theft and weather damage. A lockable [dry storage container](/fleet/container-dry) placed at ground level keeps them safe and easy to reach. See our [container size guide](/blog/20-ft-vs-40-ft-storage-container-sizes).

## How many portable toilets do you need?

OSHA's construction sanitation standard (29 CFR 1926.51) sets the minimum number of toilet facilities by the number of workers:

- **20 or fewer workers** — at least 1 toilet
- **20 or more workers** — at least 1 toilet seat and 1 urinal per 40 workers
- **200 or more workers** — at least 1 toilet seat and 1 urinal per 50 workers

Many contractors add more units for comfort and to reduce servicing trips, include at least one **ADA-accessible toilet**, and place [hand wash stations](/fleet/portable-toilets) next to the toilets.

## Placement tips

- Put toilets on level ground, close to work areas but away from food and break areas.
- Make sure the service truck can reach them.
- Keep the office near the site entrance so visitors and deliveries check in first.

## One owner for the whole site

Office units, storage, generators and sanitation all come from one company, delivered to your site. Call **{phone}** or [request a free quote](/quote).`,
    },

    // ── Cluster: Rent / buy / rent-to-own ──
    {
      id: "rent-vs-buy-vs-rent-to-own-trailers-containers",
      published: "yes",
      featured: "yes",
      title: "Rent vs. Buy vs. Rent-to-Own: Which Is Right for Trailers and Containers?",
      metaTitle: "Rent vs Buy vs Rent-to-Own Storage Containers & Trailers | Guide",
      metaDescription:
        "Should you rent, buy or rent-to-own a storage container or trailer? Compare costs, flexibility and ownership to choose the right option for your business.",
      category: "rent-buy",
      date: "2026-09-28",
      image: "/images/fleet/trailers.webp",
      excerpt:
        "A clear comparison of renting, buying and rent-to-own — when each makes sense for containers, trailers and refrigerated units.",
      fleet: ["container-dry", "trailers", "reefer-diesel", "office"],
      body: `We offer **rental, purchase and rent-to-own** on our trailers and containers. Each option suits a different situation — here's how to decide.

## Renting

**Best when** you need equipment for a project, a season or a set period.

- No large upfront cost
- Return it when the job is done
- Easy to change size or add units as needs change

Renting is the most common choice for [storage containers](/fleet/container-dry) on job sites, [refrigerated trailers](/fleet/reefer-diesel) during harvest and [office units](/fleet/office) for a construction project.

## Buying

**Best when** you need the equipment permanently.

- You own the unit outright
- No ongoing rental payments
- Use it however and wherever you like

Buying makes sense for permanent on-site storage at a farm, shop or business, or a [trailer](/fleet/trailers) your operation uses every day.

## Rent-to-own

**Best when** you want to own the unit but prefer to spread the cost over time.

- Start using the equipment right away
- Payments go toward owning it
- A middle path between renting and buying

## Questions to help you decide

1. **How long** will you need it — weeks, months or years?
2. **Will your needs change** — size, location or quantity?
3. **Cash flow** — would you rather pay once or spread payments?
4. **Ownership** — do you want an asset on your books?

## Talk it through with the owner

Because we own every unit, you get straight answers on pricing and options without a middleman. Call **{phone}** or [request a free quote](/quote) — choose Rental, Purchase or Rent to Own on the form.`,
    },
  ],
};

export const FAQ_DEFAULTS = {
  metaTitle: "Trailer & Container Rental FAQs | Ardmore Trailer, Inc.",
  metaDescription:
    "Answers to common questions about renting, buying and rent-to-own trailers and containers, ground-level delivery, refrigerated units and job-site equipment in Oklahoma and Texas.",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "FAQ",
  eyebrow: "Frequently Asked Questions",
  titleStart: "Questions &",
  titleAccent: "Answers",
  text: "Straight answers about renting, buying and delivery. Can't find your question? Call {phone} — you'll talk directly to the owner.",
  equipmentFaqLabel: "Frequently Asked Questions",
  ctaTitle: "Still have a question?",
  ctaText: "Call {phone} or send us a message — no call centers, just real people.",

  groups: [
    {
      id: "renting",
      label: "Renting & Ordering",
      items: [
        {
          q: "How do I rent a trailer or storage container?",
          a: "Call {phone} or [request a free quote](/quote) with the equipment you need, your delivery address and how long you need it. We confirm availability and details directly with you.",
          fleet: [],
        },
        {
          q: "Do you rent directly or through a broker?",
          a: "Directly. Ardmore Trailer, Inc. owns every trailer and container we rent, and keeps them at our own yard in Ardmore, Oklahoma. You deal with the owner from your first call to pickup — no middleman.",
          fleet: [],
        },
        {
          q: "What equipment can I rent?",
          a: "Dry storage containers, trailers, diesel and electric refrigerated trailers, refrigerated containers, generators, office units, portable toilets and hand wash stations, and 10 ft ground-level mud lab units. See the [full fleet](/fleet).",
          fleet: [],
        },
        {
          q: "Which areas do you serve?",
          a: "We're based in Southern Oklahoma and serve Southern Oklahoma and North Texas, with equipment available across all states. Call {phone} to confirm delivery to your location.",
          fleet: [],
        },
        {
          q: "How long can I rent for?",
          a: "Rental periods are flexible — from short projects to full seasons and longer. Tell us how long you need the equipment and we'll quote accordingly.",
          fleet: [],
        },
      ],
    },
    {
      id: "buying",
      label: "Buying & Rent-to-Own",
      items: [
        {
          q: "Can I buy a trailer or container instead of renting?",
          a: "Yes. We offer rental, purchase and rent-to-own. Choose the option on the [quote form](/quote) or ask when you call. Our guide [Rent vs. Buy vs. Rent-to-Own](/blog/rent-vs-buy-vs-rent-to-own-trailers-containers) explains the differences.",
          fleet: ["container-dry", "trailers"],
        },
        {
          q: "How does rent-to-own work?",
          a: "Rent-to-own lets you start using the equipment right away while your payments go toward owning it. Call {phone} for the current terms on the unit you're interested in.",
          fleet: ["container-dry", "trailers", "office"],
        },
      ],
    },
    {
      id: "delivery",
      label: "Delivery & Site",
      items: [
        {
          q: "What does ground-level delivery mean?",
          a: "Containers are delivered on a tilt-bed truck and slide directly onto the ground — no forklift, crane, ramp or loading dock needed. You can walk straight in from day one.",
          fleet: ["container-dry", "reefer-container", "office"],
        },
        {
          q: "How should I prepare my site for delivery?",
          a: "Choose firm, level ground with a straight path for the truck, room to pull forward and no low power lines or branches overhead. See our [site preparation checklist](/blog/ground-level-container-delivery-site-preparation).",
          fleet: ["container-dry", "reefer-container", "office"],
        },
        {
          q: "Can I store my things at your yard instead?",
          a: "Yes. Equipment can be delivered to your location, or you can store at our yard at 1612 Refinery Road in Ardmore, Oklahoma.",
          fleet: ["container-dry"],
        },
        {
          q: "Where on my property can the container go?",
          a: "Most customers use a driveway, yard, parking area or job site — anywhere with firm, level ground and room for the truck. Not sure about your spot or your neighborhood's rules? Call {phone} or send us a photo and we'll help you choose.",
          fleet: ["container-dry"],
        },
      ],
    },
    {
      id: "sizes",
      label: "Sizes & Equipment",
      items: [
        {
          q: "What sizes do your storage containers come in?",
          a: "Dry storage containers come in 20 ft, 40 ft and 48 ft lengths, in standard and high cube heights. A 20 ft container has about 160 sq ft of floor space and a 40 ft about 320 sq ft. See our [container size guide](/blog/20-ft-vs-40-ft-storage-container-sizes).",
          fleet: ["container-dry"],
        },
        {
          q: "What trailer lengths do you have?",
          a: "Our dry van and refrigerated trailers come in 48 ft and 53 ft lengths. Call {phone} to check availability.",
          fleet: ["trailers", "reefer-diesel", "reefer-electric"],
        },
        {
          q: "Are your containers secure and weather-tight?",
          a: "Yes. Our steel containers are lockable and wind- and water-tight, so tools, inventory and belongings stay safe and dry.",
          fleet: ["container-dry"],
        },
        {
          q: "What sizes do office units come in?",
          a: "Ground-level office units come in 20 ft and 40 ft lengths, plus a 40 ft combo with a 20 ft office and 20 ft of lockable storage — all with electrical service and heating and cooling. For a smaller unit, our 10 ft mud lab also works as a guard shack or gate office.",
          fleet: ["office"],
        },
      ],
    },
    {
      id: "refrigerated",
      label: "Refrigerated Units",
      items: [
        {
          q: "What's the difference between diesel and electric refrigerated trailers?",
          a: "A diesel reefer has its own diesel-powered refrigeration unit and needs no outside power. An electric reefer plugs into three-phase shore power (most often 460V), runs quieter and usually costs less to operate. See our [diesel vs. electric guide](/blog/diesel-vs-electric-refrigerated-trailer-rental).",
          fleet: ["reefer-diesel", "reefer-electric"],
        },
        {
          q: "Do I need power on site for a refrigerated unit?",
          a: "Not for a diesel refrigerated trailer — it's self-powered. Electric trailers and refrigerated containers need a suitable power connection; if you don't have one, a [generator](/fleet/generator) can supply it.",
          fleet: ["reefer-diesel", "reefer-electric", "reefer-container", "generator"],
        },
        {
          q: "Can I rent cold storage for an event or harvest?",
          a: "Yes. Refrigerated trailers and containers are popular for produce harvests, catering, festivals and cooler breakdowns. See [temporary cold storage rental](/blog/temporary-cold-storage-rental-produce-events).",
          fleet: ["reefer-container", "reefer-diesel"],
        },
      ],
    },
    {
      id: "jobsite",
      label: "Job Site & Oilfield",
      items: [
        {
          q: "How many portable toilets does a job site need?",
          a: "OSHA's construction standard requires at least 1 toilet for 20 or fewer workers, and at least 1 toilet seat and 1 urinal per 40 workers above that (per 50 workers at 200 or more). See our [job site guide](/blog/construction-site-office-and-portable-toilets).",
          fleet: ["portable-toilets"],
        },
        {
          q: "Do you rent mud lab units for drilling sites?",
          a: "Yes. Our 10 ft ground-level mud lab units are delivered to your drilling pad along with generators and office units — and they double as guard shacks. See [oilfield site setup](/blog/oilfield-site-setup-mud-lab-generator-office).",
          fleet: ["mud-lab", "generator"],
        },
        {
          q: "Can you supply power for a remote site?",
          a: "Yes. Industrial generator units power offices, mud labs, lighting and refrigerated units where there's no grid power.",
          fleet: ["generator", "office", "mud-lab"],
        },
      ],
    },
  ],
};
