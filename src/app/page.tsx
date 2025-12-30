import Image from "next/image";
import { LineChartCallback} from "@/components/LineChart/LineChartCallback"

export default function Home() {
  return (
    <div className="grid min-h-screen p-8 pb-20 gap-16 sm:p-20 font-(family-name:--font-geist-sans)">
      <main className="flex gap-8 justify-center sm:items-start">
        <LineChartCallback />
      </main>
    </div>
  );
}
