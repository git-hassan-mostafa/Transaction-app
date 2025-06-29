import SettingsPage from "@/Pages/Settings/Settings";
import { ServiceProvider } from "@/Shared/Context/ServiceProvider";

export default function Settings() {
  return (
    <ServiceProvider>
      <SettingsPage />
    </ServiceProvider>
  );
}
