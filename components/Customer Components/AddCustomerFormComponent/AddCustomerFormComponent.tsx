import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import useAddCustomerFormComponentService from "./AddCustomerFormComponent.service";
import styles from "./AddCustomerFormComponent.style";
import Constants from "@/Global/Constants/Constants";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "../../Reusable Components/HelperComponents/ThemedText";
import IAddCustomerProps from "@/Global/ViewModels/Customers/IAddCustomerProps";
import ValidationMessage from "@/Components/Reusable Components/HelperComponents/ValidationMessage";
import i18n from "@/Global/I18n/I18n";

export default function AddCustomerFormComponent({
  toggleModal,
  addToCustomersList,
}: IAddCustomerProps) {
  const {
    customer,
    validation,
    setCustomerName,
    setCustomerPhoneNumber,
    addCustomer,
    setCustomerNotes,
  } = useAddCustomerFormComponentService({
    toggleModal,
    addToCustomersList,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("customer-name")}</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-customer-name") + "..."}
          placeholderTextColor="#999"
          value={customer.customerName}
          onChangeText={setCustomerName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("phone-number")} </ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-phone-number") + "..."}
          placeholderTextColor="#999"
          value={customer.customerPhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={setCustomerPhoneNumber}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("notes")}</ThemedText>
        <TextInput
          style={[styles.input, styles.textArea] as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-notes") + "..."}
          placeholderTextColor="#999"
          value={customer.customerNotes}
          onChangeText={setCustomerNotes}
          multiline
        />
      </View>
      <View style={styles.row}>
        <ValidationMessage validation={validation} />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.blue}
          textColor={Constants.colors.lightGray}
          labelStyle={styles.saveButton}
          onPress={addCustomer}
        >
          <ThemedText style={styles.saveText}>{i18n.t("save")}</ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
