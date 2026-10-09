import Hero from "@/app/components/pages/home/Hero";
import TrustBar from "./components/pages/home/Trustbar";
import FleetGrid from "./components/pages/home/Fleetgrid";
import WhyUs from "./components/pages/home/WhyUs";
import CtaBanner from "./components/pages/home/CtaBanner";
import Testimonials from "./components/pages/home/Testimonials";
import { getContent } from "@/app/lib/server/content";

export default async function HomePage() {
  const { home, site, fleet, services } = await getContent();

  return (
    <>

      <Hero
        hero={home.hero}
        site={site}
        fleet={fleet.map(({ id, badge, shortName, sizes }) => ({ id, badge, shortName, sizes }))}
      />
      <TrustBar trustBar={home.trustBar} site={site} services={services} />
      <FleetGrid fleetGrid={home.fleetGrid} fleet={fleet} brand={site.logoTop} />
      <WhyUs whyUs={home.whyUs} site={site} />
      <Testimonials testimonials={home.testimonials} site={site} />
      <CtaBanner ctaBanner={home.ctaBanner} />

    </>
  );
}
