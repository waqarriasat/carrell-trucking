// ─────────────────────────────────────────────
//  Icon registry — icons the admin can pick for
//  cards, steps and contact rows. Keys are
//  "<library>/<IconName>" so the site renders the
//  exact same glyph it always has.
// ─────────────────────────────────────────────
import {
  FaBox, FaTruck, FaSnowflake, FaBolt, FaIndustry, FaPlug, FaBuilding, FaFlask,
  FaStore, FaHome, FaHardHat, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock,
  FaUser, FaCheck, FaFileAlt,
} from "react-icons/fa"
import {
  FaShield, FaHandshake, FaTruck as Fa6Truck, FaAward, FaClock as Fa6Clock, FaUsers,
  FaClipboardCheck, FaTruckFast, FaWrench, FaRoad, FaCalendarDays, FaLocationDot, FaStar,
  FaThumbsUp, FaLeaf, FaGears, FaWarehouse, FaTemperatureHalf, FaDollarSign, FaHeadset,
  FaHelmetSafety, FaCircleCheck, FaBoxesStacked, FaTrailer, FaOilWell, FaFileContract,
} from "react-icons/fa6"

export const ICONS = {
  "fa/FaBox": FaBox,
  "fa/FaTruck": FaTruck,
  "fa/FaSnowflake": FaSnowflake,
  "fa/FaBolt": FaBolt,
  "fa/FaIndustry": FaIndustry,
  "fa/FaPlug": FaPlug,
  "fa/FaBuilding": FaBuilding,
  "fa/FaFlask": FaFlask,
  "fa/FaStore": FaStore,
  "fa/FaHome": FaHome,
  "fa/FaHardHat": FaHardHat,
  "fa/FaPhone": FaPhone,
  "fa/FaEnvelope": FaEnvelope,
  "fa/FaMapMarkerAlt": FaMapMarkerAlt,
  "fa/FaClock": FaClock,
  "fa/FaUser": FaUser,
  "fa/FaCheck": FaCheck,
  "fa/FaFileAlt": FaFileAlt,
  "fa6/FaShield": FaShield,
  "fa6/FaHandshake": FaHandshake,
  "fa6/FaTruck": Fa6Truck,
  "fa6/FaAward": FaAward,
  "fa6/FaClock": Fa6Clock,
  "fa6/FaUsers": FaUsers,
  "fa6/FaClipboardCheck": FaClipboardCheck,
  "fa6/FaTruckFast": FaTruckFast,
  "fa6/FaWrench": FaWrench,
  "fa6/FaRoad": FaRoad,
  "fa6/FaCalendarDays": FaCalendarDays,
  "fa6/FaLocationDot": FaLocationDot,
  "fa6/FaStar": FaStar,
  "fa6/FaThumbsUp": FaThumbsUp,
  "fa6/FaLeaf": FaLeaf,
  "fa6/FaGears": FaGears,
  "fa6/FaWarehouse": FaWarehouse,
  "fa6/FaTemperatureHalf": FaTemperatureHalf,
  "fa6/FaDollarSign": FaDollarSign,
  "fa6/FaHeadset": FaHeadset,
  "fa6/FaHelmetSafety": FaHelmetSafety,
  "fa6/FaCircleCheck": FaCircleCheck,
  "fa6/FaBoxesStacked": FaBoxesStacked,
  "fa6/FaTrailer": FaTrailer,
  "fa6/FaOilWell": FaOilWell,
  "fa6/FaFileContract": FaFileContract,
}

export const ICON_OPTIONS = Object.keys(ICONS)

export function getIcon(key, fallback = "fa/FaCheck") {
  return ICONS[key] || ICONS[fallback]
}
