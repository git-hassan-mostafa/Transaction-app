import ResultsPage from "@/Pages/Results/Results";
import { ServiceProvider } from "@/Shared/Context/ServiceProvider";

export default function Results() {
  return (
    <ServiceProvider>
      <ResultsPage />
    </ServiceProvider>
  );
}
