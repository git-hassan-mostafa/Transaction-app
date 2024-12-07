import { useEffect, useState } from "react";
import ICustomer from "./CustomerFormComponent.types";

export default function useCustomerFormComponentService() {
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);

  useEffect(() => {
    setCustomer((prev) => {
      return {
        ...prev,
        name: "حسن مصطفى",
        phoneNumber: "81446801",
        borrowList: [
          { item: "جافيل", price: 15 },
          { item: "بيكون", price: 20 },
        ],
      };
    });
  }, []);

  function setCustomerName(value: string) {
    setCustomer((prev) => {
      return { ...prev, name: value };
    });
  }

  function setCustomerPhoneNumber(value: string) {
    setCustomer((prev) => {
      return { ...prev, phoneNumber: value };
    });
  }

  return { customer, setCustomerName, setCustomerPhoneNumber };
}
