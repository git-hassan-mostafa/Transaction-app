import useService from "@/Shared/Context/ServiceProvider";
import IFlatListHeaderService from "@/Models/Home/IFlatListHeaderService";
import { ICustomer_IInternalDebt_IInternalDebtProduct_IProduct } from "@/Models/RelationModels/ICustomer_IInternalDebt_IInternalDebtProduct_IProduct";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function useFlatListHeaderService(): IFlatListHeaderService {
  const { customerManager } = useService();
  const [borrowedPrice, setBorrowedPrice] = useState<number>(0);

  useEffect(() => {
    fetchBorrowedList();
  }, []);

  async function fetchBorrowedList() {
    const borrowedList = await customerManager.getAllCustomersBorrowedList();
    setAllCustomersBorrowedPrice(borrowedList);
  }

  const setAllCustomersBorrowedPrice = useCallback(
    (borrowedList: ICustomer_IInternalDebt_IInternalDebtProduct_IProduct[]) => {
      const sum = customerManager.getBorrowedPrice(borrowedList);
      setBorrowedPrice(sum);
    },
    [borrowedPrice]
  );

  return { borrowedPrice };
}
