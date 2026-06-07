import FleetHero from "@/app/components/pages/fleet/FleetHero";
import FleetList from "@/app/components/pages/fleet/FleetList";
import FleetCTA from "@/app/components/pages/fleet/FleetCTA";

export const metadata = {
  title: "Our Fleet",
  description: "Browse all trailer and container rental options including reefer, dry, office units, generators and more.",
};

export default function FleetPage() {
  return (
    <>
      <FleetHero />
      <FleetList />
      <FleetCTA />
    </>
  );
}