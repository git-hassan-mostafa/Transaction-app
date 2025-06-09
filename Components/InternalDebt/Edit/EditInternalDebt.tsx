import React from "react";
import {
  View,
  TextInput,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "../../../Global/Reusable Components/HelperComponents/ThemedText";
import useEditInternalDebtService from "./EditInternalDebt.service";
import styles from "./EditInternalDebt.style";
import CustomDropDown from "@/Global/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import { IEditInnerDebtProps } from "@/ViewModels/InnerDebts/IInerDebtsFormProps";
import InternalDebtProductsList from "./InternalDebtProductsList/InternalDebtProductsList";
import TabComponent from "@/Global/Reusable Components/TabComponent/TabComponent";
import useInnerDebtsItemsListFormComponentService from "./InternalDebtProductsList/InternalDebtProductsList.service";
import i18n from "@/Global/I18n/I18n";
import { dateOptionsWithDay } from "@/Global/Constants/DateOptions";
import { Button } from "react-native-paper";
import ValidationMessage from "@/Global/Reusable Components/HelperComponents/ValidationMessage";
import Constants from "@/Global/Constants/Constants";
import formStyle from "@/Global/Styles/form.style";
import {
  fromatLocaleDate,
  fromatLocaleDateWithDay,
} from "@/Global/Helpers/Functions/FormatDate";

export default function EditInternalDebt(props: IEditInnerDebtProps) {
  const internalDebtsItemsListService =
    useInnerDebtsItemsListFormComponentService(props.id);

  const service = useEditInternalDebtService({
    ...props,
    internalDebtsItemsListService,
  });
  return (
    <View style={styles.container}>
      <TabComponent titles={[i18n.t("details"), i18n.t("products-list")]}>
        <View style={styles.content}>
          <View style={styles.debtDate}>
            <ThemedText
              fontSize={12}
              weight={600}
              color={Constants.colors.darkGray}
            >
              {fromatLocaleDateWithDay(service.internalDebt.innerDebtDate)}
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
            />
          </View>
          <View style={styles.row}>
            <ValidationMessage validation={service.validation} />
          </View>
          <TouchableOpacity>
            <Button
              buttonColor={Constants.colors.internalDebts}
              textColor={Constants.colors.lightGray}
              labelStyle={formStyle.saveButton}
              onPress={service.updateInnerDebt}
            >
              <ThemedText style={formStyle.saveText}>
                {i18n.t("save")}
              </ThemedText>
            </Button>
          </TouchableOpacity>
        </View>
        <InternalDebtProductsList {...internalDebtsItemsListService} />
      </TabComponent>
    </View>
  );
}
