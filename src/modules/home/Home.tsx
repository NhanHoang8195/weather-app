import WidgetContainer from "./components/widget-container/WidgetContainer";
import ChartContainer from "./components/chart-container/Chart";
import Header from "./components/header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <ChartContainer />
      <WidgetContainer />
    </>
  );
}
