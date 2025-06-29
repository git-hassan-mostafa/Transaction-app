import Home from "@/Pages/Home/Home";
import { ServiceProvider } from "@/Shared/Context/ServiceProvider";

export default function Index() {
  return (
    <ServiceProvider>
      <Home />
    </ServiceProvider>
  );
}
