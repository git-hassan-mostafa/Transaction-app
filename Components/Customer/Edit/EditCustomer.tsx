import styles from "./EditCustomer.style";
import React from "react";
import { View } from "react-native";
import useEditCustomerService from "./EditCustomer.service";
import ICustomerFormProps from "@/ViewModels/Customers/ICustomerFormProps";
import TabComponent from "@/Global/Reusable Components/TabComponent/TabComponent";
import CustomerDebtList from "./CustomerDebtList";
import i18n from "@/Global/I18n/I18n";
import CustomerDetails from "./CustomerDetails";
export function EditCustomer({
  id,
  updateFromCustomersList,
}: ICustomerFormProps) {
  const service = useEditCustomerService({
    id,
    updateFromCustomersList,
  });

  return (
    <View style={styles.container}>
      <TabComponent titles={[i18n.t("details"), i18n.t("borrowed-list")]}>
        <CustomerDetails {...service} />
        <CustomerDebtList
          id={id}
          updateFromCustomersList={updateFromCustomersList}
        />
      </TabComponent>
    </View>
  );
}
