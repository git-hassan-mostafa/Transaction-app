import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { ThemedText } from "../../../Global/Reusable Components/HelperComponents/ThemedText";
import styles from "./InternalDebtDetails.style";
import CustomDropDown from "@/Global/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import i18n from "@/Global/I18n/I18n";
import { Button } from "react-native-paper";
import ValidationMessage from "@/Global/Reusable Components/HelperComponents/ValidationMessage";
import Constants from "@/Global/Constants/Constants";
import formStyle from "@/Global/Styles/form.style";
import { fromatLocaleDateWithDay } from "@/Global/Helpers/Functions/FormatDate";
import IInternalDebtDetailsService from "@/ViewModels/InnerDebts/IInternalDebtDetailsService";

export default function InternalDebtDetails(
  service: IInternalDebtDetailsService
) {
  return (
    <View style={styles.content}>
      {service.internalDebt.innerDebtId && (
        <View style={styles.debtDate}>
          <ThemedText
            fontSize={12}
            weight={600}
            color={Constants.colors.darkGray}
          >
            {fromatLocaleDateWithDay(service.internalDebt.innerDebtDate)}
          </ThemedText>
        </View>
      )}

      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
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
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>{i18n.t("total-price")}</ThemedText>
        <TextInput
          readOnly
          style={formStyle.input}
          placeholder={i18n.t("enter-total-price")}
          placeholderTextColor="#999"
          value={service.internalDebt.innerDebtTotalPrice?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => service.setTotalPrice(text)}
        />
      </View>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>{i18n.t("payed-price")}</ThemedText>
        <TextInput
          readOnly
          style={formStyle.input}
          placeholder={i18n.t("enter-paid-price")}
          placeholderTextColor="#999"
          value={service.internalDebt.innerDebtPricePaid?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => service.setPricePaid(text)}
        />
      </View>

      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>{i18n.t("notes")}</ThemedText>
        <TextInput
          style={[formStyle.input, formStyle.textArea]}
          placeholder={i18n.t("enter-notes")}
          placeholderTextColor="#999"
          value={service.internalDebt.innerDebtNotes}
          onChangeText={service.setNotes}
        />
      </View>
      <View style={formStyle.row}>
        <ValidationMessage validation={service.validation} />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.internalDebts}
          textColor={Constants.colors.lightGray}
          labelStyle={formStyle.saveButton}
          onPress={service.save}
        >
          <ThemedText style={formStyle.saveText}>{i18n.t("save")}</ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
