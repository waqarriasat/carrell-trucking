import FleetHero from "@/app/components/pages/fleet/FleetHero";
import FleetList from "@/app/components/pages/fleet/FleetList";
import FleetCTA from "@/app/components/pages/fleet/FleetCTA";
import ScrollToHash from "@/app/components/pages/fleet/ScrollToHash";
import { getContent } from "@/app/lib/server/content";
import { pageMeta } from "@/app/lib/server/seo";

export async function generateMetadata() {
  const { fleetPage } = await getContent();
  return pageMeta({
    title: "Trailer & Container Rentals — Full Fleet",
    description: fleetPage.text,
    path: "/fleet",
  });
}

export default async function FleetPage() {
  const { fleetPage, fleet, site } = await getContent();

  return (
    <>
      <ScrollToHash />
      <FleetHero fleetPage={fleetPage} />
      <FleetList fleetPage={fleetPage} fleet={fleet} site={site} />
      <FleetCTA fleetPage={fleetPage} />
    </>
  );
}
