import React from "react";
import { View } from "react-native";
import ICustomerFormProps from "@/ViewModels/Customers/ICustomerFormProps";
import TabComponent from "@/Global/Reusable Components/TabComponent/TabComponent";
import CustomerDebtList from "./CustomerDebtList";
import i18n from "@/Global/I18n/I18n";
import CustomerDetails from "./CustomerDetails";
import formStyle from "@/Global/Styles/form.style";
import useCustomerFormService from "./CustomerForm.service";
export function CustomerForm(props: ICustomerFormProps) {
  const service = useCustomerFormService(props);
  return (
    <View
      style={[formStyle.container, props.id ? formStyle.containerWithTab : {}]}
    >
      {props.id ? (
        <TabComponent titles={[i18n.t("details"), i18n.t("borrowed-list")]}>
          <CustomerDetails {...service} />
          <CustomerDebtList {...props} />
        </TabComponent>
      ) : (
        <CustomerDetails {...service} />
      )}
    </View>
  );
}
