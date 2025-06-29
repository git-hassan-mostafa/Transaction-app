import React from "react";
import { View } from "react-native";
import TabComponent from "@/Shared/Reusable Components/TabComponent/TabComponent";
import CustomerDebtList from "./CustomerDebtList";
import i18n from "@/Shared/I18n/I18n";
import CustomerDetails from "./CustomerDetails";
import formStyle from "@/Shared/Styles/form.style";
import useCustomerFormService from "./CustomerForm.service";
import ICustomerFormProps from "@/Models/Customers/ICustomerFormProps";
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
