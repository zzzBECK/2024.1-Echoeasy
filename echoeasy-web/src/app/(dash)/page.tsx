import { ContentLayout } from "@/components/content-layout";
import { InteractiveBarChart } from "@/components/example-charts/interactive-bar-chart";

export default function Home() {
  return (
    <ContentLayout className="flex flex-col gap-6" title="Dashboard">
      <InteractiveBarChart />
      <InteractiveBarChart />
      <InteractiveBarChart />
    </ContentLayout>
  );
}
