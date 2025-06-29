import ExternalDebtsPage from "@/Pages/ExternalDebts/ExternalDebts";
import { ServiceProvider } from "@/Shared/Context/ServiceProvider";

export default function ExternalDebts() {
  return (
    <ServiceProvider>
      <ExternalDebtsPage />
    </ServiceProvider>
  );
}
