// // src/app/components/common/Convoy.jsx
// "use client";

// import React from 'react';
// import styles from './Convoy.module.css';

// export default function Convoy() {
//     const Wheels = () => (
//         <>
//             <div className={`${styles.wheel} ${styles.frontWheel}`}><div className={styles.rimDetail}></div></div>
//             <div className={`${styles.wheel} ${styles.backWheel1}`}><div className={styles.rimDetail}></div></div>
//             <div className={`${styles.wheel} ${styles.backWheel2}`}><div className={styles.rimDetail}></div></div>
//         </>
//     );

//     return (
//         <div className={styles.animationContainer}>
//             <div className={styles.convoyStream}>

//                 {/* 1. REEFER UNIT */}
//                 <div className={`${styles.ardmoreVehicle} ${styles.reeferUnit}`}>
//                     <div className={styles.truckBody}>
//                         <div className={styles.cabin}><div className={styles.window}></div></div>
//                         <div className={`${styles.trailer} ${styles.reeferBox}`}>
//                             <div className={styles.coolingMotor}></div>
//                             <div className={styles.brandingArea}>
//                                 <h2>Ardmore</h2>
//                                 <p>REEFER LOGISTICS</p>
//                             </div>
//                         </div>
//                     </div>
//                     <Wheels />
//                 </div>

//                 {/* 2. SHIPPING CONTAINER */}
//                 <div className={`${styles.ardmoreVehicle} ${styles.containerUnit}`}>
//                     <div className={styles.truckBody}>
//                         <div className={styles.cabin}><div className={styles.window}></div></div>
//                         <div className={`${styles.trailer} ${styles.shippingContainer}`}>
//                             <div className={styles.containerGrooves}></div>
//                             <div className={`${styles.brandingArea} ${styles.containerLabel}`}>
//                                 <h2>Ardmore</h2>
//                                 <p>CONTAINER LINE</p>
//                             </div>
//                         </div>
//                     </div>
//                     <Wheels />
//                 </div>

//                 {/* 3. STANDARD CARGO TRAILER */}
//                 <div className={`${styles.ardmoreVehicle} ${styles.standardTrailerUnit}`}>
//                     <div className={styles.truckBody}>
//                         <div className={styles.cabin}><div className={styles.window}></div></div>
//                         <div className={`${styles.trailer} ${styles.cargoBox}`}>
//                             <div className={styles.brandingArea}>
//                                 <h2>Ardmore</h2>
//                                 <p>TRAILER Inc</p>
//                             </div>
//                         </div>
//                     </div>
//                     <Wheels />
//                 </div>

//                 {/* 4. EMPTY FLATBED TRAILER */}
//                 <div className={`${styles.ardmoreVehicle} ${styles.emptyFlatbedUnit}`}>
//                     <div className={styles.truckBody}>
//                         <div className={styles.cabin}><div className={styles.window}></div></div>
//                         <div className={`${styles.trailer} ${styles.flatbedChassis}`}>
//                             <div className={styles.hitchNeck}></div>
//                             <div className={styles.rearMudguard}></div>

//                             {/* Text perfectly centered directly onto the steel flatbed frame */}
//                             <div className={styles.flatbedText}>
//                                 <h2>Ardmore</h2>
//                                 <p>TRAILER FLATBED</p>
//                             </div>
//                         </div>
//                     </div>
//                     <Wheels />
//                 </div>

//             </div>
//             {/* <div className={styles.roadTrack}></div> */}
//         </div>
//     );
// }

// "use client";

// import React, { useState, useEffect } from 'react';

// // ─────────────────────────────────────────────────────────────────────────────
// //  NEW CONVOY ANIMATION — Flatbed Loading Cycle
// //  A flatbed trailer goes right (empty) → loads equipment → returns left
// //  Cycles through all 8 equipment types over ~2 minutes (15s per equipment)
// //
// //  OLD CODE PRESERVED BELOW (commented out)
// // ─────────────────────────────────────────────────────────────────────────────

// const EQUIPMENT = [
//   {
//     id: "container-dry",
//     label: "Container Dry",
//     color: "#1b5e20",
//     render: () => (
//       <div style={{
//         width: 90, height: 34, background: "#1b5e20",
//         borderRadius: "3px 0 0 3px", position: "relative",
//         backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 2px, transparent 2px, transparent 8px)"
//       }}>
//         <div style={{ position: "absolute", inset: 3, background: "#fff", borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//           <span style={{ fontSize: 7, fontWeight: 900, color: "#1b5e20", textTransform: "uppercase", letterSpacing: 0.5 }}>ARDMORE</span>
//           <span style={{ fontSize: 5, fontWeight: 700, color: "#c9a84c", textTransform: "uppercase", letterSpacing: 1 }}>CONTAINER DRY</span>
//         </div>
//       </div>
//     )
//   },
//   {
//     id: "trailers",
//     label: "Trailers",
//     color: "#f59e0b",
//     render: () => (
//       <div style={{ width: 90, height: 34, background: "#f59e0b", borderRadius: "3px 0 0 3px", position: "relative" }}>
//         <div style={{ position: "absolute", inset: 3, background: "#fff", borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//           <span style={{ fontSize: 7, fontWeight: 900, color: "#0f2d4a", textTransform: "uppercase" }}>ARDMORE</span>
//           <span style={{ fontSize: 5, fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 1 }}>DRY VAN</span>
//         </div>
//       </div>
//     )
//   },
//   {
//     id: "reefer-diesel",
//     label: "Reefer Diesel",
//     color: "#0288d1",
//     render: () => (
//       <div style={{ width: 90, height: 34, background: "#0288d1", borderRadius: "3px 0 0 3px", position: "relative" }}>
//         <div style={{ position: "absolute", top: 3, right: -4, width: 6, height: 12, background: "#e2e8f0", border: "1px solid #64748b", borderRadius: 1, zIndex: 2 }}>
//           <div style={{ height: 3, background: "red", borderRadius: 1, margin: "1px 1px 0" }} />
//         </div>
//         <div style={{ position: "absolute", inset: 3, background: "#fff", borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//           <span style={{ fontSize: 7, fontWeight: 900, color: "#0f2d4a", textTransform: "uppercase" }}>ARDMORE</span>
//           <span style={{ fontSize: 5, fontWeight: 700, color: "red", textTransform: "uppercase", letterSpacing: 1 }}>REEFER DIESEL</span>
//         </div>
//       </div>
//     )
//   },
//   {
//     id: "reefer-electric",
//     label: "Reefer Electric",
//     color: "#00a896",
//     render: () => (
//       <div style={{ width: 90, height: 34, background: "#00a896", borderRadius: "3px 0 0 3px", position: "relative" }}>
//         <div style={{ position: "absolute", top: 8, right: -3, width: 4, height: 8, background: "#ffb300", border: "1px solid #b57c00", borderRadius: "2px 0 0 2px", zIndex: 2 }} />
//         <div style={{ position: "absolute", inset: 3, background: "#fff", borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//           <span style={{ fontSize: 7, fontWeight: 900, color: "#0f2d4a", textTransform: "uppercase" }}>ARDMORE</span>
//           <span style={{ fontSize: 5, fontWeight: 700, color: "#00a896", textTransform: "uppercase", letterSpacing: 1 }}>E-POWER REEFER</span>
//         </div>
//       </div>
//     )
//   },
//   {
//     id: "reefer-container",
//     label: "Reefer Container",
//     color: "#0288d1",
//     render: () => (
//       <div style={{
//         width: 90, height: 34, background: "#0288d1",
//         borderRadius: "3px 0 0 3px", position: "relative",
//         backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 2px, transparent 2px, transparent 8px)"
//       }}>
//         <div style={{ position: "absolute", inset: 3, background: "#fff", borderRadius: 2, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//           <span style={{ fontSize: 7, fontWeight: 900, color: "#0f2d4a", textTransform: "uppercase" }}>ARDMORE</span>
//           <span style={{ fontSize: 5, fontWeight: 700, color: "#0288d1", textTransform: "uppercase", letterSpacing: 1 }}>REEFER CONTAINER</span>
//         </div>
//       </div>
//     )
//   },
//   {
//     id: "generator",
//     label: "Generator Units",
//     color: "#2d3748",
//     render: () => (
//       <div style={{ width: 80, height: 32, background: "#2d3748", border: "2px solid #4a5568", borderRadius: 4, position: "relative" }}>
//         <div style={{ position: "absolute", top: -6, right: 10, width: 10, height: 6, background: "#1a202c", borderRadius: "2px 2px 0 0" }} />
//         <div style={{ position: "absolute", left: 6, top: 4, bottom: 4, width: 12, display: "flex", flexDirection: "column", gap: 2, justifyContent: "center" }}>
//           {[0,1,2].map(i => <div key={i} style={{ height: 2, background: "#1a202c", borderRadius: 1 }} />)}
//         </div>
//         <div style={{ position: "absolute", right: 6, inset: "4px 4px 4px 22px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//           <span style={{ fontSize: 6, fontWeight: 900, color: "#ffb300", textTransform: "uppercase" }}>ARDMORE</span>
//           <span style={{ fontSize: 4, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 0.5 }}>POWER GEN</span>
//         </div>
//       </div>
//     )
//   },
//   {
//     id: "office",
//     label: "Office Units",
//     color: "#e2e8f0",
//     render: () => (
//       <div style={{ width: 90, height: 34, background: "#e2e8f0", border: "1px solid #cbd5e1", borderBottom: "3px solid #94a3b8", borderRadius: "3px 0 0 0", position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px" }}>
//         <div style={{ width: 12, height: 24, background: "#475569", border: "1px solid #334155", borderRadius: "2px 2px 0 0", alignSelf: "flex-end", position: "relative" }}>
//           <div style={{ position: "absolute", bottom: 4, right: 1, width: 2, height: 2, background: "#ffb300", borderRadius: "50%" }} />
//         </div>
//         <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <span style={{ fontSize: 6, fontWeight: 900, color: "#0d47a1", textTransform: "uppercase" }}>ARDMORE</span>
//           <span style={{ fontSize: 4, fontWeight: 800, color: "#475569", textTransform: "uppercase" }}>HQ SITE OFFICE</span>
//         </div>
//         <div style={{ width: 20, height: 14, background: "#e0f7fa", border: "1px solid #94a3b8", display: "flex", gap: 1, padding: 1 }}>
//           <div style={{ flex: 1, background: "rgba(255,255,255,0.6)", borderRight: "1px solid #b2ebf2" }} />
//           <div style={{ flex: 1, background: "rgba(255,255,255,0.6)" }} />
//         </div>
//       </div>
//     )
//   },
//   {
//     id: "mud-lab",
//     label: "Mud Lab",
//     color: "#34495e",
//     render: () => (
//       <div style={{ width: 85, height: 34, background: "#34495e", border: "1px solid #2c3e50", borderRadius: "3px 0 0 3px", position: "relative" }}>
//         <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: "repeating-linear-gradient(45deg, #ffb300, #ffb300 3px, #1a202c 3px, #1a202c 6px)", borderRadius: "3px 0 0 0" }} />
//         <div style={{ position: "absolute", top: -8, left: 14, width: 5, height: 8, background: "#94a3b8", borderTop: "1px solid #1a202c" }}>
//           <div style={{ width: 9, height: 2, background: "#1a202c", position: "absolute", top: 0, left: -2 }} />
//         </div>
//         <div style={{ position: "absolute", inset: "6px 4px 4px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//           <span style={{ fontSize: 6, fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>ARDMORE TECH</span>
//           <span style={{ fontSize: 4, fontWeight: 700, color: "#ffb300", textTransform: "uppercase", letterSpacing: 0.5 }}>MUD LAB UNIT</span>
//         </div>
//       </div>
//     )
//   },
// ]

// // ── Wheel component ──────────────────────────────────────────────────────────
// function Wheel({ spinning, size = 16 }) {
//   const [rotation, setRotation] = useState(0)
//   useEffect(() => {
//     if (!spinning) return
//     const interval = setInterval(() => {
//       setRotation(r => r + 12)
//     }, 50)
//     return () => clearInterval(interval)
//   }, [spinning])

//   return (
//     <div style={{
//       width: size, height: size,
//       background: `radial-gradient(circle, #ffffff 20%, #0d47a1 35%, #0d47a1 65%, #111111 75%)`,
//       borderRadius: "50%",
//       boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
//       transform: `rotate(${rotation}deg)`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       flexShrink: 0,
//     }}>
//       <div style={{
//         width: "100%", height: "100%",
//         borderRadius: "50%",
//         border: "1.5px dashed rgba(255,255,255,0.6)",
//         boxSizing: "border-box",
//       }} />
//     </div>
//   )
// }

// // ── Flatbed Truck component ──────────────────────────────────────────────────
// function FlatbedTruck({ flipped, loaded, equipmentIndex, spinning }) {
//   const equipment = EQUIPMENT[equipmentIndex]

//   return (
//     <div style={{
//       display: "flex",
//       flexDirection: flipped ? "row" : "row-reverse",
//       alignItems: "flex-end",
//       transform: flipped ? "scaleX(-1)" : "scaleX(1)",
//       position: "relative",
//     }}>
//       {/* Cab */}
//       <div style={{
//         width: 44, height: 38,
//         background: "#0d47a1",
//         borderRadius: flipped ? "2px 12px 2px 2px" : "12px 2px 2px 2px",
//         position: "relative", flexShrink: 0, zIndex: 2,
//       }}>
//         <div style={{
//           position: "absolute",
//           top: 5, right: flipped ? "auto" : 5, left: flipped ? 5 : "auto",
//           width: 16, height: 11,
//           background: "#fff",
//           borderRadius: flipped ? "3px 0 0 3px" : "0 3px 3px 0",
//           clipPath: flipped ? "polygon(0 0, 100% 0, 60% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 40% 100%)",
//         }} />
//         {/* Cab wheel */}
//         <div style={{ position: "absolute", bottom: -8, right: flipped ? "auto" : 4, left: flipped ? 4 : "auto" }}>
//           <Wheel spinning={spinning} size={18} />
//         </div>
//       </div>

//       {/* Flatbed chassis */}
//       <div style={{
//         width: 100, height: 8,
//         background: "#37474f",
//         borderTop: "2px solid #b0bec5",
//         borderRadius: flipped ? "0 2px 2px 0" : "2px 0 0 2px",
//         position: "relative",
//         marginBottom: 0,
//       }}>
//         {/* Equipment on flatbed */}
//         {loaded && (
//           <div style={{
//             position: "absolute",
//             bottom: 8,
//             left: flipped ? "auto" : 4,
//             right: flipped ? 4 : "auto",
//             transform: flipped ? "scaleX(-1)" : "scaleX(1)",
//           }}>
//             {equipment.render()}
//           </div>
//         )}

//         {/* Flatbed wheels */}
//         <div style={{
//           position: "absolute", bottom: -9,
//           left: flipped ? "auto" : 10, right: flipped ? 10 : "auto",
//           display: "flex", gap: 6,
//         }}>
//           <Wheel spinning={spinning} size={16} />
//           <Wheel spinning={spinning} size={16} />
//         </div>
//         <div style={{
//           position: "absolute", bottom: -9,
//           left: flipped ? "auto" : 60, right: flipped ? 60 : "auto",
//           display: "flex", gap: 6,
//         }}>
//           <Wheel spinning={spinning} size={16} />
//         </div>
//       </div>
//     </div>
//   )
// }

// // ── Loading crane animation ──────────────────────────────────────────────────
// function LoadingZone({ equipmentIndex, phase }) {
//   const equipment = EQUIPMENT[equipmentIndex]
//   const isLifting  = phase === "loading"
//   const isDropping = phase === "dropping"

//   return (
//     <div style={{
//       position: "absolute", right: 60, bottom: 20,
//       display: "flex", flexDirection: "column", alignItems: "center",
//       opacity: (isLifting || isDropping) ? 1 : 0,
//       transition: "opacity 0.5s",
//     }}>
//       {/* Crane arm */}
//       <div style={{
//         width: 3, background: "#37474f",
//         height: isLifting ? 20 : isDropping ? 50 : 0,
//         transition: "height 1s ease",
//         marginBottom: 4,
//       }} />
//       {/* Equipment being lifted */}
//       <div style={{
//         transform: isLifting ? "translateY(0)" : isDropping ? "translateY(30px)" : "translateY(-20px)",
//         transition: "transform 1.5s ease",
//         opacity: (isLifting || isDropping) ? 1 : 0,
//       }}>
//         {equipment.render()}
//       </div>
//       {/* Label */}
//       <div style={{
//         marginTop: 6, fontSize: 9, fontWeight: 700,
//         color: "#c9a84c", textTransform: "uppercase",
//         letterSpacing: 1, whiteSpace: "nowrap",
//         opacity: isLifting ? 1 : 0,
//         transition: "opacity 0.5s",
//       }}>
//         Loading: {equipment.label}
//       </div>
//     </div>
//   )
// }

// // ── PHASE TIMING (per equipment cycle = 15s) ─────────────────────────────────
// // 0-3s:   empty truck drives right
// // 3-5s:   truck stops, loading animation
// // 5-7s:   equipment dropped onto flatbed
// // 7-12s:  loaded truck drives left (return)
// // 12-15s: pause + label display, next equipment

// const CYCLE_DURATION = 15000
// const PHASE_TIMES = {
//   goRight:  [0,    3000],
//   loading:  [3000, 5000],
//   dropping: [5000, 7000],
//   goLeft:   [7000, 12000],
//   pause:    [12000,15000],
// }

// export default function Convoy() {
//   const [equipmentIndex, setEquipmentIndex] = useState(0)
//   const [phase, setPhase]                   = useState("goRight")
//   const [truckX, setTruckX]                 = useState(-160)
//   const [loaded, setLoaded]                 = useState(false)
//   const [flipped, setFlipped]               = useState(false)
//   const [cycleTime, setCycleTime]           = useState(0)

//   useEffect(() => {
//     const start = Date.now()
//     let animFrame

//     const tick = () => {
//       const elapsed = (Date.now() - start) % CYCLE_DURATION
//       setCycleTime(elapsed)

//       if (elapsed < PHASE_TIMES.goRight[1]) {
//         // Going right — empty
//         const progress = elapsed / PHASE_TIMES.goRight[1]
//         setPhase("goRight")
//         setFlipped(false)
//         setLoaded(false)
//         setTruckX(-160 + progress * (window.innerWidth * 0.5))

//       } else if (elapsed < PHASE_TIMES.loading[1]) {
//         // Stopped for loading
//         setPhase("loading")
//         setTruckX(window.innerWidth * 0.5 - 160)
//         setFlipped(false)
//         setLoaded(false)

//       } else if (elapsed < PHASE_TIMES.dropping[1]) {
//         // Equipment dropped
//         setPhase("dropping")
//         setTruckX(window.innerWidth * 0.5 - 160)
//         setFlipped(false)
//         setLoaded(true)

//       } else if (elapsed < PHASE_TIMES.goLeft[1]) {
//         // Going left — loaded
//         const progress = (elapsed - PHASE_TIMES.goLeft[0]) / (PHASE_TIMES.goLeft[1] - PHASE_TIMES.goLeft[0])
//         setPhase("goLeft")
//         setFlipped(true)
//         setLoaded(true)
//         setTruckX((window.innerWidth * 0.5 - 160) - progress * (window.innerWidth * 0.7))

//       } else {
//         // Pause — advance to next equipment
//         setPhase("pause")
//         setTruckX(-300)
//         setLoaded(false)
//         setFlipped(false)
//         setEquipmentIndex(i => (i + 1) % EQUIPMENT.length)
//       }

//       animFrame = requestAnimationFrame(tick)
//     }

//     animFrame = requestAnimationFrame(tick)
//     return () => cancelAnimationFrame(animFrame)
//   }, [])

//   const isMoving = phase === "goRight" || phase === "goLeft"

//   return (
//     <div style={{
//       position: "fixed",
//       bottom: 0, left: 0,
//       width: "100%", height: 80,
//       overflow: "hidden",
//       pointerEvents: "none",
//       zIndex: 9999,
//       background: "transparent",
//     }}>
//       {/* Road line */}
//       <div style={{
//         position: "absolute", bottom: 16, left: 0, right: 0,
//         height: 2, background: "#0d47a1", opacity: 0.15,
//       }} />

//       {/* Equipment label */}
//       <div style={{
//         position: "absolute", bottom: 52, left: "50%",
//         transform: "translateX(-50%)",
//         fontSize: 10, fontWeight: 700,
//         color: "#c9a84c", textTransform: "uppercase",
//         letterSpacing: 2, whiteSpace: "nowrap",
//         opacity: phase === "loading" || phase === "dropping" ? 1 : 0,
//         transition: "opacity 0.4s",
//       }}>
//         {EQUIPMENT[equipmentIndex].label}
//       </div>

//       {/* Loading zone */}
//       <LoadingZone equipmentIndex={equipmentIndex} phase={phase} />

//       {/* Truck */}
//       <div style={{
//         position: "absolute",
//         bottom: 20,
//         left: truckX,
//         transition: isMoving ? "left 0.05s linear" : "none",
//       }}>
//         <FlatbedTruck
//           flipped={flipped}
//           loaded={loaded}
//           equipmentIndex={equipmentIndex}
//           spinning={isMoving}
//         />
//       </div>
//     </div>
//   )
// }

// /*
// ═══════════════════════════════════════════════════════════════════
//  OLD CONVOY CODE — PRESERVED FOR REFERENCE
// ═══════════════════════════════════════════════════════════════════

// "use client";

// import React from 'react';
// import styles from './Convoy.module.css';

// export default function Convoy() {
//     const Wheels = () => (
//         <>
//             <div className={`${styles.wheel} ${styles.frontWheel}`}><div className={styles.rimDetail}></div></div>
//             <div className={`${styles.wheel} ${styles.backWheel1}`}><div className={styles.rimDetail}></div></div>
//             <div className={`${styles.wheel} ${styles.backWheel2}`}><div className={styles.rimDetail}></div></div>
//         </>
//     );

//     return (
//         <div className={styles.animationContainer}>
//             <div className={styles.convoyStream}>
//                 <div className={`${styles.ardmoreVehicle} ${styles.reeferUnit}`}>
//                     <div className={styles.truckBody}>
//                         <div className={styles.cabin}><div className={styles.window}></div></div>
//                         <div className={`${styles.trailer} ${styles.reeferBox}`}>
//                             <div className={styles.coolingMotor}></div>
//                             <div className={styles.brandingArea}>
//                                 <h2>Ardmore</h2>
//                                 <p>REEFER LOGISTICS</p>
//                             </div>
//                         </div>
//                     </div>
//                     <Wheels />
//                 </div>
//                 <div className={`${styles.ardmoreVehicle} ${styles.containerUnit}`}>
//                     <div className={styles.truckBody}>
//                         <div className={styles.cabin}><div className={styles.window}></div></div>
//                         <div className={`${styles.trailer} ${styles.shippingContainer}`}>
//                             <div className={styles.containerGrooves}></div>
//                             <div className={`${styles.brandingArea} ${styles.containerLabel}`}>
//                                 <h2>Ardmore</h2>
//                                 <p>CONTAINER LINE</p>
//                             </div>
//                         </div>
//                     </div>
//                     <Wheels />
//                 </div>
//                 <div className={`${styles.ardmoreVehicle} ${styles.standardTrailerUnit}`}>
//                     <div className={styles.truckBody}>
//                         <div className={styles.cabin}><div className={styles.window}></div></div>
//                         <div className={`${styles.trailer} ${styles.cargoBox}`}>
//                             <div className={styles.brandingArea}>
//                                 <h2>Ardmore</h2>
//                                 <p>TRAILER Inc</p>
//                             </div>
//                         </div>
//                     </div>
//                     <Wheels />
//                 </div>
//                 <div className={`${styles.ardmoreVehicle} ${styles.emptyFlatbedUnit}`}>
//                     <div className={styles.truckBody}>
//                         <div className={styles.cabin}><div className={styles.window}></div></div>
//                         <div className={`${styles.trailer} ${styles.flatbedChassis}`}>
//                             <div className={styles.hitchNeck}></div>
//                             <div className={styles.rearMudguard}></div>
//                             <div className={styles.flatbedText}>
//                                 <h2>Ardmore</h2>
//                                 <p>TRAILER FLATBED</p>
//                             </div>
//                         </div>
//                     </div>
//                     <Wheels />
//                 </div>
//             </div>
//             <div className={styles.roadTrack}></div>
//         </div>
//     );
// }


"use client";

import React, { useState, useEffect, useRef } from 'react';

const EQUIPMENT = [
  { id: "container-dry",  label: "Container Dry",    bg: "#1b5e20", textColor: "#c9a84c", name: "CONTAINER DRY" },
  { id: "trailers",       label: "Dry Van",           bg: "#f59e0b", textColor: "#0f2d4a", name: "DRY VAN" },
  { id: "reefer-diesel",  label: "Reefer Diesel",     bg: "#0288d1", textColor: "#ff1744", name: "REEFER DIESEL" },
  { id: "reefer-elec",    label: "Reefer Electric",   bg: "#00897b", textColor: "#fff",    name: "E-POWER REEFER" },
  { id: "generator",      label: "Generator",         bg: "#2d3748", textColor: "#ffb300", name: "POWER GEN" },
  { id: "office",         label: "Office Unit",       bg: "#e2e8f0", textColor: "#0d47a1", name: "SITE OFFICE" },
  { id: "mud-lab",        label: "Mud Lab",           bg: "#34495e", textColor: "#ffb300", name: "MUD LAB" },
  { id: "reefer-cont",    label: "Reefer Container",  bg: "#0277bd", textColor: "#fff",    name: "REEFER CONT." },
]

// FLATBED: width=110, cargo=86px wide, center offset = (110-86)/2 = 12px from left
const FLATBED_W       = 110
const CARGO_W         = 86
const CARGO_LEFT      = Math.round((FLATBED_W - CARGO_W) / 2)  // = 12

// CRANE: tower at right:10+2=12 from screen right
// Truck stopX = w - CRANE_STOP - TRUCK_W  (CRANE_STOP=10, TRUCK_W=160)
// When goingRight, truck layout = [FLATBED(110)][CAB(44)]
// Flatbed center from truck left = 55px
// Flatbed center from screen right = CRANE_STOP + TRUCK_W - 55 = 10 + 160 - 55 = 115px
// Cable must be at 115px from screen right = right: 115
// Arm starts at right:2 of crane container (which is right:10 from screen = right:12 absolute)
// So arm must reach: 115 - 12 = 103px from right:2 → left offset in arm = arm_width - (115-12) ... 
// Simpler: cable position from screen right = 115
// Crane div right:10, tower right:2 inside = tower at screen right 12
// Arm at right:2 inside crane = arm right edge at screen right 12
// Cable at left:X inside arm → cable at screen right = 12 + arm_width - X - 2(cable_width/2)
// We want cable at screen right 115 → 12 + arm_width - X = 115 → arm_width - X = 103
// Use arm_width=120, X = 120-103 = 17 → cable at left:17 inside arm ✓
// Cargo center must align with cable → cargo left from screen right = 115 - CARGO_W/2 = 115 - 43 = 72
// Cargo div right = 72 - (crane div offset 10) ... easier to just use right:62 in crane div

const ARM_W           = 120
const CABLE_LEFT      = 17   // cable position inside arm → puts cable at flatbed center
const CARGO_RIGHT_IN_CRANE = 62  // right offset inside crane div to center cargo under cable

function CargoBox({ eq, opacity = 1 }) {
  return (
    <div style={{
      width: CARGO_W, height: 30,
      background: eq.bg,
      borderRadius: 3,
      border: "1px solid rgba(255,255,255,0.2)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity,
      transition: "opacity 0.3s",
    }}>
      <span style={{ fontSize: 6, fontWeight: 900, color: "#fff", textTransform: "uppercase", letterSpacing: 0.5 }}>ARDMORE</span>
      <span style={{ fontSize: 5, fontWeight: 700, color: eq.textColor, textTransform: "uppercase", letterSpacing: 1 }}>{eq.name}</span>
    </div>
  )
}

function Wheel({ spinning, size = 16 }) {
  const ref = useRef(null)
  const rot = useRef(0)
  useEffect(() => {
    if (!spinning) return
    let raf
    const tick = () => {
      rot.current = (rot.current + 9) % 360
      if (ref.current) ref.current.style.transform = `rotate(${rot.current}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [spinning])
  return (
    <div ref={ref} style={{
      width: size, height: size, flexShrink: 0, borderRadius: "50%",
      background: `radial-gradient(circle, #cfd8dc 14%, #1565c0 28%, #1565c0 58%, #111 70%)`,
      boxShadow: "0 1px 4px rgba(0,0,0,0.6)",
      position: "relative",
    }}>
      <div style={{ position: "absolute", inset: 3, borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.35)" }} />
    </div>
  )
}

function Cab({ spinning }) {
  return (
    <div style={{
      width: 44, height: 40,
      background: "#0d47a1",
      borderRadius: "2px 10px 2px 2px",
      position: "relative", flexShrink: 0, zIndex: 2,
    }}>
      <div style={{
        position: "absolute", top: 6, left: 4,
        width: 16, height: 12,
        background: "#b3e5fc",
        clipPath: "polygon(0% 0%, 80% 0%, 100% 100%, 0% 100%)",
        borderRadius: "2px 0 0 2px",
      }} />
      <div style={{
        position: "absolute", bottom: 7, left: 2,
        width: 5, height: 4,
        background: "#fffde7",
        borderRadius: "2px 0 0 2px",
      }} />
      <div style={{ position: "absolute", bottom: -9, left: 3 }}>
        <Wheel spinning={spinning} size={18} />
      </div>
    </div>
  )
}

function Flatbed({ loaded, eq, spinning, cargoOpacity = 1 }) {
  return (
    <div style={{ width: FLATBED_W, height: 7, background: "#455a64", borderTop: "2px solid #90a4ae", position: "relative" }}>
      {loaded && (
        <div style={{ position: "absolute", bottom: 7, left: CARGO_LEFT }}>
          <CargoBox eq={eq} opacity={cargoOpacity} />
        </div>
      )}
      <div style={{ position: "absolute", bottom: -9, left: 8, display: "flex", gap: 5 }}>
        <Wheel spinning={spinning} size={16} />
        <Wheel spinning={spinning} size={16} />
      </div>
      <div style={{ position: "absolute", bottom: -9, left: 66, display: "flex", gap: 5 }}>
        <Wheel spinning={spinning} size={16} />
        <Wheel spinning={spinning} size={16} />
      </div>
    </div>
  )
}

function Truck({ goingRight, loaded, eq, spinning, cargoOpacity }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "flex-end" }}>
      {goingRight ? (
        <><Flatbed loaded={loaded} eq={eq} spinning={spinning} cargoOpacity={cargoOpacity} /><Cab spinning={spinning} /></>
      ) : (
        <><Cab spinning={spinning} /><Flatbed loaded={loaded} eq={eq} spinning={spinning} cargoOpacity={cargoOpacity} /></>
      )}
    </div>
  )
}

function Crane({ phase, eq, craneCargoOpacity }) {
  const show    = phase === "raising" || phase === "lowering"
  const lowered = phase === "lowering"

  return (
    <div style={{ position: "absolute", right: -1, bottom: 18, pointerEvents: "none" }}>
      {/* Tower */}
      <div style={{ position: "absolute", right: 2, bottom: 0, width: 6, height: 56, background: "#37474f", borderRadius: "3px 3px 0 0" }} />
      {/* Arm */}
      <div style={{ position: "absolute", right: 2, bottom: 54, width: ARM_W, height: 5, background: "#546e7a", borderRadius: "2px 0 0 2px" }}>
        {/* Cable — positioned to hang directly over flatbed center */}
        <div style={{
          position: "absolute", left: CABLE_LEFT, top: 5, width: 2,
          background: "#b0bec5", borderRadius: 1,
          height: show ? (lowered ? 20 : 40) : 0,
          transition: "height 0.6s ease",
        }} />
      </div>
      {/* Cargo on cable — centered under cable, crossfades with flatbed cargo */}
      <div style={{
        position: "absolute",
        right: CARGO_RIGHT_IN_CRANE,
        bottom: show ? (lowered ? 28 : 58) : 130,
        opacity: show ? craneCargoOpacity : 0,
        transition: "bottom 0.8s ease, opacity 0.3s",
      }}>
        <CargoBox eq={eq} />
      </div>
      {/* Equipment name label */}
      <div style={{
        position: "absolute", right: 8, bottom: 62,
        fontSize: 8, fontWeight: 700,
        color: "#c9a84c", textTransform: "uppercase", letterSpacing: 1,
        whiteSpace: "nowrap",
        opacity: show ? 1 : 0,
        transition: "opacity 0.35s",
      }}>
        {eq.label}
      </div>
    </div>
  )
}

// ── Equipment ticker — scrolls through all names at bottom right ──────────────
// function EquipmentTicker({ activeIdx }) {
//   return (
//     <div style={{
//       position: "absolute", right: 140, bottom: 22,
//       display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1,
//       pointerEvents: "none",
//     }}>
//       {EQUIPMENT.map((eq, i) => (
//         <div key={eq.id} style={{
//           fontSize: i === activeIdx ? 9 : 7,
//           fontWeight: i === activeIdx ? 800 : 500,
//           color: i === activeIdx ? "#c9a84c" : "rgba(122,155,181,0.4)",
//           textTransform: "uppercase",
//           letterSpacing: i === activeIdx ? 1.5 : 0.5,
//           transition: "all 0.4s ease",
//           whiteSpace: "nowrap",
//           lineHeight: 1.3,
//         }}>
//           {i === activeIdx ? "▶ " : "  "}{eq.label}
//         </div>
//       ))}
//     </div>
//   )
// }

const CYCLE = 14000

export default function Convoy() {
  const [eqIdx,          setEqIdx]          = useState(0)
  const [truckX,         setTruckX]         = useState(-200)
  const [goingRight,     setGoingRight]      = useState(true)
  const [loaded,         setLoaded]          = useState(false)
  const [spinning,       setSpinning]        = useState(false)
  const [cranePhase,     setCranePhase]      = useState("hidden")
  const [truckOpacity,   setTruckOpacity]    = useState(1)
  const [craneCargoOp,   setCraneCargoOp]    = useState(1)
  const [flatbedCargoOp, setFlatbedCargoOp]  = useState(0)

  const startRef = useRef(Date.now())
  const idxRef   = useRef(0)

  useEffect(() => {
    let raf
    const TRUCK_W    = 160
    const CRANE_STOP = 10

    const ease = (p) => p < 0.5 ? 2*p*p : -1+(4-2*p)*p

    const tick = () => {
      const w       = window.innerWidth
      const stopX   = w - CRANE_STOP - TRUCK_W
      const elapsed = (Date.now() - startRef.current) % CYCLE

      if (elapsed < 3800) {
        const p = ease(elapsed / 3800)
        setTruckX(-TRUCK_W + p * (stopX + TRUCK_W))
        setGoingRight(true); setLoaded(false); setSpinning(true)
        setCranePhase("hidden"); setTruckOpacity(1)
        setCraneCargoOp(1); setFlatbedCargoOp(0)

      } else if (elapsed < 5000) {
        setTruckX(stopX); setGoingRight(true)
        setLoaded(false); setSpinning(false)
        setCranePhase("raising"); setTruckOpacity(1)
        setCraneCargoOp(1); setFlatbedCargoOp(0)

      } else if (elapsed < 6600) {
        // Crossfade: crane cargo fades out, flatbed cargo fades in — never both visible
        const t         = (elapsed - 5000) / 1600
        const craneOp   = Math.max(0, 1 - t * 1.6)
        const flatbedOp = Math.max(0, (t - 0.4) / 0.6)
        setTruckX(stopX); setGoingRight(true)
        setLoaded(true); setSpinning(false)
        setCranePhase("lowering"); setTruckOpacity(1)
        setCraneCargoOp(craneOp)
        setFlatbedCargoOp(Math.min(1, flatbedOp))

      } else if (elapsed < 7300) {
        const t = (elapsed - 6600) / 700
        setTruckX(stopX)
        setGoingRight(t < 0.5)
        setLoaded(true); setSpinning(false)
        setCranePhase("hidden")
        setTruckOpacity(t < 0.5 ? Math.max(0, 1 - t * 2.4) : Math.min(1, (t - 0.5) * 2.4))
        setCraneCargoOp(0); setFlatbedCargoOp(1)

      } else if (elapsed < 12000) {
        const p = ease((elapsed - 7300) / (12000 - 7300))
        setTruckX(stopX - p * (stopX + TRUCK_W + 100))
        setGoingRight(false); setLoaded(true); setSpinning(true)
        setCranePhase("hidden"); setTruckOpacity(1)
        setCraneCargoOp(0); setFlatbedCargoOp(1)

      } else {
        setTruckX(-TRUCK_W - 100); setGoingRight(true)
        setLoaded(false); setSpinning(false)
        setCranePhase("hidden"); setTruckOpacity(1)
        setCraneCargoOp(1); setFlatbedCargoOp(0)
        if (elapsed > CYCLE - 60) {
          idxRef.current = (idxRef.current + 1) % EQUIPMENT.length
          setEqIdx(idxRef.current)
          startRef.current = Date.now()
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const eq = EQUIPMENT[eqIdx]

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      height: 72, overflow: "hidden",
      pointerEvents: "none", zIndex: 9999,
    }}>
      {/* Road */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 20, background: "#0a1628", borderTop: "2px solid #1e3a5f" }} />
      <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, height: 2, backgroundImage: "repeating-linear-gradient(90deg, #c9a84c44 0, #c9a84c44 24px, transparent 24px, transparent 52px)" }} />

      {/* Equipment list ticker */}
      {/* <EquipmentTicker activeIdx={eqIdx} /> */}

      {/* Crane */}
      <Crane phase={cranePhase} eq={eq} craneCargoOpacity={craneCargoOp} />

      {/* Truck */}
      <div style={{
        position: "absolute", bottom: 20, left: truckX,
        opacity: truckOpacity,
        willChange: "left",
      }}>
        <Truck goingRight={goingRight} loaded={loaded} eq={eq} spinning={spinning} cargoOpacity={flatbedCargoOp} />
      </div>
    </div>
  )
}