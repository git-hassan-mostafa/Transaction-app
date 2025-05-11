import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./CustomerFormComponent.style";
import React from "react";
import {
  View,
  TextInput,
  StyleProp,
  TextStyle,
  ScrollView,
} from "react-native";
import useCustomerFormComponentService from "./CustomerFormComponent.service";
import { ThemedText } from "../../Reusable Components/HelperComponents/ThemedText";
import ICustomerFormProps from "@/Global/ViewModels/Customers/ICustomerFormProps";
import TabComponent from "@/Components/Reusable Components/TabComponent/TabComponent";
import Constants from "@/Global/Constants/Constants";
import CustomerDebtsListComponent from "./CustomerDebtsListComponent";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import i18n from "@/Global/I18n/I18n";
import CustomerDetailsComponent from "./CustomerDetailsComponent";
export function CustomerFormComponent({
  id,
  updateFromCustomersList,
}: ICustomerFormProps) {
  const service = useCustomerFormComponentService({
    id,
    updateFromCustomersList,
  });

  return (
    <View style={styles.container}>
      <TabComponent titles={[i18n.t("details"), i18n.t("borrowed-list")]}>
        <CustomerDetailsComponent {...service} />
        <CustomerDebtsListComponent
          id={id}
          updateFromCustomersList={updateFromCustomersList}
        />
      </TabComponent>
    </View>
  );
}
