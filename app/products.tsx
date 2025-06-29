import ProductsPage from "@/Pages/Products/Products";
import { ServiceProvider } from "@/Shared/Context/ServiceProvider";

export default function Products() {
  return (
    <ServiceProvider>
      <ProductsPage />
    </ServiceProvider>
  );
}
