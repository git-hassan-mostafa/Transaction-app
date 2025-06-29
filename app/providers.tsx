import ProviderPage from "@/Pages/Providers/Providers";
import { ServiceProvider } from "@/Shared/Context/ServiceProvider";

export default function Providers() {
  return (
    <ServiceProvider>
      <ProviderPage />
    </ServiceProvider>
  );
}
