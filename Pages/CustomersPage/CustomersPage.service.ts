import useContextProvider from "@/Global/ContextApi/ContextApi";
import { useEffect } from "react";

export default function useCustomersPageService() {
  const { customerManager } = useContextProvider();

  useEffect(() => {
    // customerService
    //   .addCustomer({
    //     name: "hassan mostafa",
    //     borrowedPrice: 10,
    //     payedPrice: 5,
    //     phoneNumber: "81446801",
    //     borrowList: [{ item: "javel", price: 10 }],
    //   })
    //   .then(() => {
    customerManager.getAllCustomers().then((c) => {
      console.log(c);
    });
    // });
  }, []);
}
