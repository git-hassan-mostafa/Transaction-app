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

export default function EditInternalDebt({
  id,
  updateFromInnerDebtsList,
}: IInnerDebtFormProps) {
  const innerDebtsItemsListFormService =
    useInnerDebtsItemsListFormComponentService(id);

  const {
    innerDebt,
    setTotalPrice,
    setPricePaid,
    setCustomer,
    setNotes,
    updateTotalPrice,
    updatePricePaid,
    updateCustomer,
    updateNotes,
    customersDropDown,
  } = useEditInternalDebtService({
    id,
    updateFromInnerDebtsList,
    innerDebtsItemsListService: innerDebtsItemsListFormService,
  });
  const date = new Date(innerDebt.innerDebtDate);
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
              value={innerDebt.innerDebt_CustomerId as number}
              setValue={(value) => {
                setCustomer(value as number);
                updateCustomer(value as number);
              }}
              data={customersDropDown}
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
              value={innerDebt.innerDebtTotalPrice?.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setTotalPrice(text)}
              onEndEditing={updateTotalPrice}
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
              value={innerDebt.innerDebtPricePaid?.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setPricePaid(text)}
              onEndEditing={updatePricePaid}
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
              value={innerDebt.innerDebtNotes}
              onChangeText={setNotes}
              onEndEditing={updateNotes}
            />
          </View>
        </View>
        <InternalDebtProductsList {...innerDebtsItemsListFormService} />
      </TabComponent>
    </View>
  );
}
