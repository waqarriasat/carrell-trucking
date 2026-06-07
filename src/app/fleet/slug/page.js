// import Link from "next/link";
// import { FaChevronRight, FaCheck, FaPhone } from "react-icons/fa";
// import { notFound } from "next/navigation";

// const FLEET_DATA = {
//   "container-dry": {
//     name: "Container Dry",
//     category: "Storage",
//     tagline: "Secure On-Site Storage — Ready When You Are!",
//     description: "Our dry storage containers are weather-tight, secure, and available in multiple sizes to fit any job site. Whether you need short-term overflow storage or a long-term solution, our containers are built to last and easy to access at ground level.",
//     sizes: ["10 ft", "20 ft", "40 ft"],
//     mainImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
//     gallery: [
//       "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?auto=format&fit=crop&w=400&q=80",
//     ],
//     benefits: [
//       { title: "Weatherproof", desc: "Fully sealed against rain, wind, and dust — your contents stay dry no matter the conditions." },
//       { title: "Lockable & Secure", desc: "Heavy-duty locking mechanisms keep your valuables safe around the clock." },
//       { title: "Ground Level Access", desc: "Easy drive-up access for forklifts, pallet jacks, and foot traffic." },
//       { title: "Multiple Sizes", desc: "Available in 10, 20, and 40 ft — choose the size that fits your space and budget." },
//     ],
//     features: ["Pest resistant", "Stackable", "Corrosion resistant", "Ventilated options", "Custom delivery", "2-month minimum"],
//   },
//   "trailers": {
//     name: "Trailers",
//     category: "Transport",
//     tagline: "Standard Enclosed Trailers for Every Job!",
//     description: "Our standard enclosed trailers are ideal for general freight, temporary on-site storage, and logistics. Available in multiple lengths with roll-up or swing doors to match your operational needs.",
//     sizes: ["28 ft", "48 ft", "53 ft"],
//     mainImage: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80",
//     gallery: [
//       "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
//     ],
//     benefits: [
//       { title: "Roll-Up Doors", desc: "Easy rear access with roll-up doors for quick loading and unloading." },
//       { title: "Multiple Lengths", desc: "Choose from 28, 48, or 53 ft to match your freight requirements." },
//       { title: "E-Track Rails", desc: "Built-in cargo securing rails keep your freight in place during transit." },
//       { title: "Dry Freight Ready", desc: "Clean, dry interior ideal for general merchandise and equipment." },
//     ],
//     features: ["Swing doors available", "Side doors available", "Logistics ready", "Clean interior", "Custom delivery", "2-month minimum"],
//   },
//   "reefer-diesel": {
//     name: "Reefer Diesel",
//     category: "Refrigerated",
//     tagline: "Keep Your Product Cold — Anywhere, Anytime!",
//     description: "Our diesel-powered refrigerated trailers are fully self-contained and capable of maintaining precise temperatures for your most sensitive cargo. Perfect for food service, pharmaceuticals, and any temperature-controlled application.",
//     sizes: ["28 ft", "48 ft", "53 ft"],
//     mainImage: "https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?auto=format&fit=crop&w=900&q=80",
//     gallery: [
//       "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
//     ],
//     benefits: [
//       { title: "Self-Contained", desc: "Runs independently on diesel — no external power source needed." },
//       { title: "Multi-Temp Zones", desc: "Maintain different temperatures in separate zones within the same unit." },
//       { title: "Wide Temp Range", desc: "From frozen to fresh — set the exact temperature your product demands." },
//       { title: "24/7 Monitoring", desc: "Continuous temperature monitoring ensures your cargo stays protected." },
//     ],
//     features: ["Independent operation", "Diesel powered", "Precise temp control", "Food grade interior", "Custom delivery", "2-month minimum"],
//   },
//   "reefer-electric": {
//     name: "Reefer Electric",
//     category: "Refrigerated",
//     tagline: "Quiet, Efficient, Eco-Friendly Refrigeration!",
//     description: "Electric reefer units offer the same reliable cold storage as diesel units, but with lower noise and reduced emissions. Ideal for indoor use, urban locations, or anywhere a quiet operation is required.",
//     sizes: ["20 ft", "40 ft"],
//     mainImage: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=900&q=80",
//     gallery: [
//       "https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80",
//     ],
//     benefits: [
//       { title: "Low Noise", desc: "Electric operation runs quietly — perfect for sensitive environments." },
//       { title: "Energy Efficient", desc: "Lower operating costs compared to diesel-powered alternatives." },
//       { title: "Eco Friendly", desc: "Reduced emissions make this the green choice for refrigeration." },
//       { title: "Precise Temp Control", desc: "Accurate temperature regulation for your most sensitive products." },
//     ],
//     features: ["Indoor suitable", "Electric powered", "Low vibration", "Clean operation", "Custom delivery", "2-month minimum"],
//   },
//   "reefer-container": {
//     name: "Reefer Container",
//     category: "Refrigerated",
//     tagline: "Stationary Cold Storage — Plug In and Go!",
//     description: "Refrigerated containers for stationary on-site cold storage. Simply plug into a power source and maintain the temperature your product needs. Ideal for events, construction sites, and retail overflow.",
//     sizes: ["20 ft", "40 ft"],
//     mainImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=900&q=80",
//     gallery: [
//       "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80",
//     ],
//     benefits: [
//       { title: "Plug-In Electric", desc: "Simply connect to power and your container maintains the set temperature." },
//       { title: "Ground Level Access", desc: "Easy loading and unloading at ground level — no ramps needed." },
//       { title: "Secure Storage", desc: "Heavy-duty locks keep your refrigerated goods safe and secure." },
//       { title: "Temp Monitoring", desc: "Built-in monitoring ensures consistent temperature around the clock." },
//     ],
//     features: ["Weatherproof", "Remote ready", "Food grade", "Multiple sizes", "Custom delivery", "2-month minimum"],
//   },
//   "generator": {
//     name: "Generator Units",
//     category: "Power",
//     tagline: "Reliable Power — Wherever Your Job Takes You!",
//     description: "Our generator units deliver dependable power for remote sites, events, and industrial operations. Available in multiple output sizes to match your power requirements, with diesel operation for maximum reliability.",
//     sizes: ["20 kW", "50 kW", "100 kW"],
//     mainImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",
//     gallery: [
//       "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80",
//     ],
//     benefits: [
//       { title: "Diesel Powered", desc: "Reliable diesel operation keeps your site running through any conditions." },
//       { title: "Auto Transfer Switch", desc: "Seamless power transfer ensures zero downtime when switching sources." },
//       { title: "Remote Monitoring", desc: "Monitor output and fuel levels remotely for peace of mind." },
//       { title: "Weatherproof", desc: "Built to operate in harsh outdoor environments without issue." },
//     ],
//     features: ["Load ready", "Fuel efficient", "Multiple outputs", "Industrial grade", "Custom delivery", "2-month minimum"],
//   },
//   "office": {
//     name: "Office Units",
//     category: "Specialty",
//     tagline: "Your Job Site Office — Ready to Move In!",
//     description: "Our portable office units are fully climate-controlled and ready for immediate use. Perfect for construction site management, sales offices, and temporary workspace needs. Available in multiple sizes to match your crew.",
//     sizes: ["8x20 ft", "8x40 ft", "12x60 ft"],
//     mainImage: "https://images.unsplash.com/photo-1572435555646-a45fc045bc66?auto=format&fit=crop&w=900&q=80",
//     gallery: [
//       "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80",
//     ],
//     benefits: [
//       { title: "Climate Controlled", desc: "HVAC system keeps your workspace comfortable in any weather." },
//       { title: "Electrical Outlets", desc: "Multiple outlets for computers, phones, and office equipment." },
//       { title: "Windows", desc: "Natural light and ventilation for a comfortable working environment." },
//       { title: "Move-In Ready", desc: "Delivered and set up — just walk in and start working." },
//     ],
//     features: ["Lockable doors", "HVAC included", "Professional finish", "Multiple sizes", "Custom delivery", "2-month minimum"],
//   },
//   "mud-lab": {
//     name: "Mud Lab",
//     category: "Specialty",
//     tagline: "Purpose-Built for Oilfield Operations!",
//     description: "Our mud lab units are purpose-built for oilfield and drilling operations. Custom fit-out available to match your exact specifications. Climate controlled and built to industry standards for maximum performance in the field.",
//     sizes: ["Custom"],
//     mainImage: "https://images.unsplash.com/photo-1581092334651-ddf26d9aae9d?auto=format&fit=crop&w=900&q=80",
//     gallery: [
//       "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
//       "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=400&q=80",
//     ],
//     benefits: [
//       { title: "Oilfield Spec", desc: "Built and certified to meet oilfield and drilling industry standards." },
//       { title: "Lab Equipment Ready", desc: "Pre-wired and plumbed for immediate lab equipment installation." },
//       { title: "Climate Controlled", desc: "Maintain optimal lab conditions regardless of outside temperature." },
//       { title: "Custom Fit-Out", desc: "We configure the unit to your exact operational requirements." },
//     ],
//     features: ["Industry standard", "Durable build", "Custom layout", "Field proven", "Custom delivery", "2-month minimum"],
//   },
// };

// export function generateStaticParams() {
//   return Object.keys(FLEET_DATA).map((slug) => ({ slug }));
// }

// export function generateMetadata({ params }) {
//   const item = FLEET_DATA[params.slug];
//   if (!item) return { title: "Not Found" };
//   return {
//     title: item.name,
//     description: item.description,
//   };
// }

// export default function FleetDetailPage({ params }) {
//   const item = FLEET_DATA[params.slug];
//   if (!item) notFound();

//   return (
//     <>
//       {/* ── Page Hero ── */}
//       <div style={{ backgroundColor: "#0f2d4a" }} className="py-10 px-5">
//         <div className="max-w-6xl mx-auto">

//           {/* Breadcrumb */}
//           <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: "#7a9bb5" }}>
//             <Link href="/" className="hover:text-white transition-colors">Home</Link>
//             <FaChevronRight size={9} />
//             <Link href="/fleet" className="hover:text-white transition-colors">Fleet</Link>
//             <FaChevronRight size={9} />
//             <span style={{ color: "#c9a84c" }}>{item.name}</span>
//           </div>

//           <span
//             className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
//             style={{ backgroundColor: "#c9a84c20", color: "#c9a84c", border: "1px solid #c9a84c44" }}
//           >
//             {item.category}
//           </span>
//           <h1
//             className="text-3xl md:text-4xl font-black mt-3 mb-2"
//             style={{ color: "#ffffff" }}
//           >
//             {item.name}
//           </h1>
//           <p className="text-sm" style={{ color: "#7a9bb5" }}>{item.tagline}</p>

//           {/* Sizes */}
//           <div className="flex flex-wrap gap-3 mt-5">
//             {item.sizes.map((size) => (
//               <span
//                 key={size}
//                 className="text-sm font-bold px-5 py-2 rounded-full border-2"
//                 style={{ borderColor: "#c9a84c", color: "#c9a84c" }}
//               >
//                 {size}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── Main Content ── */}
//       <div style={{ backgroundColor: "#f0f6fb" }} className="py-14 px-5">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

//           {/* ── LEFT: Images ── */}
//           <div className="flex flex-col gap-4">
//             {/* Main image */}
//             <div className="rounded-xl overflow-hidden" style={{ border: "1.5px solid #d6e8f5" }}>
//               <img
//                 src={item.mainImage}
//                 alt={item.name}
//                 className="w-full object-cover"
//                 style={{ maxHeight: 380 }}
//               />
//             </div>

//             {/* Thumbnail gallery */}
//             <div className="grid grid-cols-3 gap-3">
//               {item.gallery.map((img, i) => (
//                 <div
//                   key={i}
//                   className="rounded-lg overflow-hidden"
//                   style={{ border: "1.5px solid #d6e8f5" }}
//                 >
//                   <img
//                     src={img}
//                     alt={`${item.name} ${i + 1}`}
//                     className="w-full h-24 object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── RIGHT: Details ── */}
//           <div className="flex flex-col">

//             {/* Description */}
//             <div
//               className="rounded-xl p-6 mb-5"
//               style={{ backgroundColor: "#ffffff", border: "1.5px solid #d6e8f5" }}
//             >
//               <h2
//                 className="text-lg font-black mb-3"
//                 style={{ color: "#0f2d4a" }}
//               >
//                 {item.tagline}
//               </h2>
//               <p className="text-sm leading-relaxed" style={{ color: "#4a6b85" }}>
//                 {item.description}
//               </p>
//             </div>

//             {/* Benefits */}
//             <div
//               className="rounded-xl p-6 mb-5"
//               style={{ backgroundColor: "#ffffff", border: "1.5px solid #d6e8f5" }}
//             >
//               <h3
//                 className="text-sm font-black uppercase tracking-widest mb-4"
//                 style={{ color: "#0f2d4a" }}
//               >
//                 Product Benefits
//               </h3>
//               <ul className="flex flex-col gap-4">
//                 {item.benefits.map((b) => (
//                   <li key={b.title} className="flex gap-3">
//                     <span
//                       className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
//                       style={{ backgroundColor: "#c9a84c20", border: "1px solid #c9a84c44" }}
//                     >
//                       <FaCheck size={9} style={{ color: "#c9a84c" }} />
//                     </span>
//                     <div>
//                       <span className="text-sm font-bold" style={{ color: "#0f2d4a" }}>
//                         {b.title}:{" "}
//                       </span>
//                       <span className="text-sm" style={{ color: "#4a6b85" }}>
//                         {b.desc}
//                       </span>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Key Features */}
//             <div
//               className="rounded-xl p-6 mb-5"
//               style={{ backgroundColor: "#ffffff", border: "1.5px solid #d6e8f5" }}
//             >
//               <h3
//                 className="text-sm font-black uppercase tracking-widest mb-4"
//                 style={{ color: "#0f2d4a" }}
//               >
//                 Key Features
//               </h3>
//               <div className="grid grid-cols-2 gap-3">
//                 {item.features.map((f) => (
//                   <div key={f} className="flex items-center gap-2">
//                     <FaCheck size={10} style={{ color: "#c9a84c" }} className="shrink-0" />
//                     <span className="text-xs font-semibold" style={{ color: "#4a6b85" }}>{f}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3">
//               <Link
//                 href="/quote"
//                 className="flex items-center justify-center gap-2 text-sm font-bold py-3.5 px-8 rounded-lg flex-1 transition-opacity hover:opacity-90"
//                 style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
//               >
//                 Get a Free Quote
//               </Link>
//               <a
//                 href="tel:580-226-7811"
//                 className="flex items-center justify-center gap-2 text-sm font-bold py-3.5 px-8 rounded-lg flex-1 transition-opacity hover:opacity-90"
//                 style={{ border: "2px solid #1e4d7b", color: "#1e4d7b" }}
//               >
//                 <FaPhone size={13} /> Call 580-226-7811
//               </a>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* ── Related Fleet ── */}
//       <div style={{ backgroundColor: "#0f2d4a" }} className="py-10 px-5">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h3 className="text-xl font-black text-white mb-1">
//               Need a Different Unit?
//             </h3>
//             <p className="text-sm" style={{ color: "#7a9bb5" }}>
//               Browse our full fleet to find the right equipment for your job.
//             </p>
//           </div>
//           <Link
//             href="/fleet"
//             className="flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-lg shrink-0 transition-opacity hover:opacity-90"
//             style={{ backgroundColor: "#c9a84c", color: "#0f2d4a" }}
//           >
//             View Full Fleet <FaChevronRight size={12} />
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }