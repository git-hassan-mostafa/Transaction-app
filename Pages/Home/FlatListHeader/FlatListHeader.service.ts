import useService from "@/Shared/Context/ServiceProvider";
import IFlatListHeaderService from "@/Models/Home/IFlatListHeaderService";
import { useCallback, useEffect, useState } from "react";

export default function useFlatListHeaderService(): IFlatListHeaderService {
  const { customerManager } = useService();
  const [borrowedPrice, setBorrowedPrice] = useState<number>(0);

  useEffect(() => {
    fetchBorrowedPrice();
  }, []);

  const fetchBorrowedPrice = useCallback(async () => {
    const price = await customerManager.getTotalCustomersBorrowedPriceAsync();
    setBorrowedPrice(price);
  }, []);

  return { borrowedPrice };
}
