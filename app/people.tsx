import PeoplePage from "@/Pages/People/People";
import { ServiceProvider } from "@/Shared/Context/ServiceProvider";

export default function People() {
  return (
    <ServiceProvider>
      <PeoplePage />
    </ServiceProvider>
  );
}
