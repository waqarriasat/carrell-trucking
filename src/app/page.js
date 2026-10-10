import Hero from "@/app/components/pages/home/Hero";
import FleetBanner from "@/app/components/pages/home/FleetBanner";
import TrustBar from "./components/pages/home/Trustbar";
import FleetGrid from "./components/pages/home/Fleetgrid";
import WhyUs from "./components/pages/home/WhyUs";
import CtaBanner from "./components/pages/home/CtaBanner";
import Testimonials from "./components/pages/home/Testimonials";
import YardSection from "./components/pages/home/YardSection";
import { getContent } from "@/app/lib/server/content";

export default async function HomePage() {
  const { home, site, fleet, services } = await getContent();

  return (
    <>

      <FleetBanner banner={home.fleetBanner} fleet={fleet} />
      <Hero
        compact={!!home.fleetBanner && home.fleetBanner.enabled !== "no"}
        hero={home.hero}
        site={site}
        fleet={fleet.map(({ id, badge, shortName, sizes, cornerBadge }) => ({ id, badge, shortName, sizes, cornerBadge }))}
      />
      <TrustBar trustBar={home.trustBar} site={site} services={services} />
      <FleetGrid fleetGrid={home.fleetGrid} fleet={fleet} brand={site.logoTop} />
      <YardSection yard={home.yard} site={site} />
      <WhyUs whyUs={home.whyUs} site={site} />
      <Testimonials testimonials={home.testimonials} site={site} />
      <CtaBanner ctaBanner={home.ctaBanner} />

    </>
  );
}
