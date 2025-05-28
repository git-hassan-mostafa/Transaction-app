import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import { ThemedText } from "../../../Global/Reusable Components/HelperComponents/ThemedText";
import useEditInternalDebtService from "./EditInternalDebt.service";
import styles from "./EditInternalDebt.style";
import CustomDropDown from "@/Global/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import { IInnerDebtFormProps } from "@/ViewModels/InnerDebts/IInerDebtsFormProps";
import InternalDebtProductsList from "./InternalDebtProductsList/InternalDebtProductsList";
import TabComponent from "@/Global/Reusable Components/TabComponent/TabComponent";
import useInnerDebtsItemsListFormComponentService from "./InternalDebtProductsList/InternalDebtProductsList.service";
import i18n from "@/Global/I18n/I18n";
import { dateOptionsWithDay } from "@/Global/Constants/DateOptions";

export default function EditInternalDebt(props: IInnerDebtFormProps) {
  const internalDebtsItemsListService =
    useInnerDebtsItemsListFormComponentService(props.id);

  const service = useEditInternalDebtService({
    ...props,
    internalDebtsItemsListService,
  });
  const date = new Date(service.internalDebt.innerDebtDate);
  return (
    <View style={styles.container}>
      <TabComponent titles={[i18n.t("details"), i18n.t("products-list")]}>
        <View>
          <View style={styles.debtDate}>
            <ThemedText style={styles.date}>
              {date?.toLocaleDateString(i18n.locale, dateOptionsWithDay)}
            </ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>
              {i18n.t("select-customer")}
            </ThemedText>
            <CustomDropDown
              value={service.internalDebt.innerDebt_CustomerId as number}
              setValue={(value) => {
                service.setCustomer(value as number);
                service.updateCustomer(value as number);
              }}
              data={service.customersDropDown}
            />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>
              {i18n.t("total-price")}
            </ThemedText>
            <TextInput
              readOnly
              style={styles.input as StyleProp<TextStyle>}
              placeholder={i18n.t("enter-total-price")}
              placeholderTextColor="#999"
              value={service.internalDebt.innerDebtTotalPrice?.toString()}
              keyboardType="numeric"
              onChangeText={(text) => service.setTotalPrice(text)}
              onEndEditing={service.updateTotalPrice}
            />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>
              {i18n.t("payed-price")}
            </ThemedText>
            <TextInput
              readOnly
              style={styles.input as StyleProp<TextStyle>}
              placeholder={i18n.t("enter-paid-price")}
              placeholderTextColor="#999"
              value={service.internalDebt.innerDebtPricePaid?.toString()}
              keyboardType="numeric"
              onChangeText={(text) => service.setPricePaid(text)}
              onEndEditing={service.updatePricePaid}
            />
          </View>

          <View style={styles.row}>
            <ThemedText style={styles.label}>{i18n.t("notes")}</ThemedText>
            <TextInput
              style={
                [styles.textInput, styles.textArea] as StyleProp<TextStyle>
              }
              placeholder={i18n.t("enter-notes")}
              placeholderTextColor="#999"
              value={service.internalDebt.innerDebtNotes}
              onChangeText={service.setNotes}
              onEndEditing={service.updateNotes}
            />
          </View>
        </View>
        <InternalDebtProductsList {...internalDebtsItemsListService} />
      </TabComponent>
    </View>
  );
}
