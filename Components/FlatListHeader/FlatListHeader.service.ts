import useService from "@/Global/Context/ServiceProvider";
import IFlatListHeaderService from "@/ViewModels/Home/IFlatListHeaderService";
import { ICustomer_IInternalDebt_IInternalDebtProduct_IProduct } from "@/ViewModels/RelationModels/ICustomer_IInternalDebt_IInternalDebtProduct_IProduct";
import { useEffect, useState } from "react";

export default function useFlatListHeaderService(): IFlatListHeaderService {
  const { customerManager } = useService();
  const [borrowedPrice, setBorrowedPrice] = useState<number>(0);

  useEffect(() => {
    fetchBorrowedList();
  }, []);

  async function fetchBorrowedList() {
    const borrowedList = await customerManager.getAllCustomersBorrowedList();
    setCustomerBorrowedPrice(borrowedList);
  }

  function setCustomerBorrowedPrice(
    borrowedList: ICustomer_IInternalDebt_IInternalDebtProduct_IProduct[]
  ) {
    const sum = customerManager.getBorrowedPrice(borrowedList);
    setBorrowedPrice(sum);
  }

  return { borrowedPrice };
}
