import Hero from "@/app/components/pages/home/Hero";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import TrustBar from "./components/pages/home/Trustbar";
import FleetGrid from "./components/pages/home/Fleetgrid";

export default function HomePage() {
  return (
    <>
    <Navbar/>
      <Hero />
      <TrustBar/>
      <FleetGrid/>
      <Footer/>
    </>
  );
}