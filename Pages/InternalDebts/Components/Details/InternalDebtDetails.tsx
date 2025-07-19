import React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import styles from "./InternalDebtDetails.style";
import DropDown from "@/Shared/Components/DropDown";
import i18n from "@/Shared/I18n/I18n";
import { Button } from "react-native-paper";
import ValidationMessage from "@/Shared/Components/ValidationMessage";
import Constants from "@/Shared/Constants/Constants";
import formStyle from "@/Shared/Styles/form.style";
import { fromatLocaleDateWithDay } from "@/Shared/Helpers/Functions/FormatDate";
import IInternalDebtDetailsService from "@/Models/InternalDebts/IInternalDebtDetailsService";
import { ThemedText } from "@/Shared/Components/ThemedText";
import IInput from "@/Shared/Components/IInput";

export default function InternalDebtDetails(
  service: IInternalDebtDetailsService
) {
  return (
    <View style={styles.content}>
      {service.internalDebt.Id && (
        <View style={styles.debtDate}>
          <ThemedText
            fontSize={12}
            weight={600}
            color={Constants.colors.darkGray}
          >
            {fromatLocaleDateWithDay(service.internalDebt.Date)}
          </ThemedText>
        </View>
      )}

      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("select-customer")}
        </ThemedText>
        <DropDown
          placeholder={i18n.t("select-customer")}
          value={service.internalDebt.CustomerId as number}
          setValue={(value) => {
            service.setCustomer(value as number);
          }}
          data={service.customersDropDown}
        />
      </View>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>{i18n.t("total-price")}</ThemedText>
        <IInput
          readOnly
          style={formStyle.input}
          placeholder={i18n.t("enter-total-price")}
          placeholderTextColor="#999"
          value={(service.internalDebt.TotalPrice ?? 0)?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => service.setTotalPrice(text)}
        />
      </View>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>{i18n.t("payed-price")}</ThemedText>
        <IInput
          readOnly
          style={formStyle.input}
          placeholder={i18n.t("enter-paid-price")}
          placeholderTextColor="#999"
          value={(service.internalDebt.PaidPrice ?? 0)?.toString()}
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
          value={service.internalDebt.Notes}
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
