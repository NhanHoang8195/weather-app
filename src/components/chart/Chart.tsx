import { Chart as ChartJS, LineController, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import { HOURS } from "src/constants";
import { Line } from "react-chartjs-2";
// CategoryScale
ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale);

interface LineChartProps {
  labels: string[];
  datasets: any[];
  className?: string;
  showAddWiget?: boolean;
  onAddWidget?: () => void;
  title?: string;
}

export default function LineChart(props: LineChartProps) {
  const { labels, datasets, className, showAddWiget, onAddWidget, title, ...rest } = props;
  return (
    <div className={`${className} border shadow-lg w-full`}>
      <h1 className="text-center text-2xl relative">
        {title}
        {showAddWiget && (
          <button
            onClick={onAddWidget}
            className="absolute right-0 animate-bounce text-sm text-white border bg-blue-500 rounded-md shadow-sm px-4 py-2"
          >
            Add to widget
          </button>
        )}
      </h1>
      <div>
        <Line
          className="min-w-full"
          datasetIdKey="id"
          data={{
            labels: labels,
            datasets: datasets,
            ...rest,
          }}
          options={{
            responsive: true,
            scales: {
              x: {
                ticks: {
                  autoSkip: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
