import styles from "./EditCustomer.style";
import React from "react";
import { View } from "react-native";
import useEditCustomerService from "./EditCustomer.service";
import IEditCustomerProps from "@/ViewModels/Customers/IEditCustomerProps";
import TabComponent from "@/Global/Reusable Components/TabComponent/TabComponent";
import CustomerDebtList from "./CustomerDebtList";
import i18n from "@/Global/I18n/I18n";
import CustomerDetails from "./CustomerDetails";
export function EditCustomer(props: IEditCustomerProps) {
  const service = useEditCustomerService(props);

  return (
    <View style={styles.container}>
      <TabComponent titles={[i18n.t("details"), i18n.t("borrowed-list")]}>
        <CustomerDetails {...service} />
        <CustomerDebtList
          id={props.id}
          toggleModal={props.toggleModal}
          updateFromCustomersList={props.updateFromCustomersList}
        />
      </TabComponent>
    </View>
  );
}
