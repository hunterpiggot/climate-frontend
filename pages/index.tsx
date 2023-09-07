import { ClimateDashboardView, NavBarView } from "@/views";
import Link from "next/link";

const IndexPage = () => (
  <div className="h-full bg-page-background">
    <NavBarView />
    <ClimateDashboardView />
  </div>
);

export default IndexPage;
