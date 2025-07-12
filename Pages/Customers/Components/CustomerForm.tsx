import React from "react";
import { View } from "react-native";
import Tabs from "@/Shared/Components/Tabs";
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
      style={[
        formStyle.container,
        props.formData.Id ? formStyle.containerWithTab : {},
      ]}
    >
      {props.formData.Id ? (
        <Tabs titles={[i18n.t("details"), i18n.t("borrowed-list")]}>
          <CustomerDetails {...service} />
          <CustomerDebtList {...props} />
        </Tabs>
      ) : (
        <CustomerDetails {...service} />
      )}
    </View>
  );
}
