import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import useAddCustomerService from "./AddCustomer.service";
import Constants from "@/Global/Constants/Constants";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "../../../Global/Reusable Components/HelperComponents/ThemedText";
import IAddCustomerProps from "@/ViewModels/Customers/IAddCustomerProps";
import ValidationMessage from "@/Global/Reusable Components/HelperComponents/ValidationMessage";
import i18n from "@/Global/I18n/I18n";
import formStyle from "@/Global/Styles/form.style";

export default function AddCustomer(props: IAddCustomerProps) {
  const service = useAddCustomerService(props);

  return (
    <View style={formStyle.container}>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("customer-name")}
        </ThemedText>
        <TextInput
          style={formStyle.input}
          placeholder={i18n.t("enter-customer-name") + "..."}
          placeholderTextColor="#999"
          value={service.customer.customerName}
          onChangeText={service.setCustomerName}
        />
      </View>

      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("phone-number")}{" "}
        </ThemedText>
        <TextInput
          style={formStyle.input as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-phone-number") + "..."}
          placeholderTextColor="#999"
          value={service.customer.customerPhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={service.setCustomerPhoneNumber}
        />
      </View>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>{i18n.t("notes")}</ThemedText>
        <TextInput
          style={[formStyle.input, formStyle.textArea] as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-notes") + "..."}
          placeholderTextColor="#999"
          value={service.customer.customerNotes}
          onChangeText={service.setCustomerNotes}
          multiline
        />
      </View>
      <View style={formStyle.row}>
        <ValidationMessage validation={service.validation} />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.customers}
          textColor={Constants.colors.lightGray}
          labelStyle={formStyle.saveButton}
          onPress={service.addCustomer}
        >
          <ThemedText weight={400} style={formStyle.saveText}>
            {i18n.t("save")}
          </ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
