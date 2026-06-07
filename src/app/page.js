import Hero from "@/app/components/pages/home/Hero";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import TrustBar from "./components/pages/home/Trustbar";
import FleetGrid from "./components/pages/home/Fleetgrid";
import WhyUs from "./components/pages/home/WhyUs";
import CtaBanner from "./components/pages/home/CtaBanner";

export default function HomePage() {
  return (
    <>
    
      <Hero />
      <TrustBar/>
      <FleetGrid/>
      <WhyUs/>
      <CtaBanner/>
      
    </>
  );
}