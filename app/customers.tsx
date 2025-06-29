import CustomersPage from "@/Pages/Customers/Customers";
import { ServiceProvider } from "@/Shared/Context/ServiceProvider";

export default function Customers() {
  return (
    <ServiceProvider>
      <CustomersPage />
    </ServiceProvider>
  );
}
