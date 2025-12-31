import { LineChartCallback} from "@/components/lineCharts/LineChartCallback"
import Sidebar from "@/components/ui/Sidebar";

export default function Home() {
  return (
    <div className="grid min-h-screen pb-20 gap-16  font-(family-name:--font-geist-sans)">
      <main>
        <Sidebar />
        <div className="pl-60 pt-10">
        <LineChartCallback />
        </div>
      </main>
    </div>
  );
}
