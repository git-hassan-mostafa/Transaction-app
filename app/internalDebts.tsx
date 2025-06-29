import InternalDebtsPage from "@/Pages/InternalDebts/InternalDebts";
import { ServiceProvider } from "@/Shared/Context/ServiceProvider";

export default function InternalDebts() {
  return (
    <ServiceProvider>
      <InternalDebtsPage />
    </ServiceProvider>
  );
}
