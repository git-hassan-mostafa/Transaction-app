import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import useAddCustomerFormComponentService from "./AddCustomerFormComponent.service";
import styles from "./AddCustomerFormComponent.style";
import Constants from "@/Global/Constants/Constants";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "../../HelperComponents/ThemedText";
import IAddCustomerProps from "@/Global/ViewModels/Customers/IAddCustomerProps";

export default function AddCustomerFormComponent({
  toggleModal,
  addToCustomersList,
}: IAddCustomerProps) {
  const {
    customer,
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
        <ThemedText style={styles.label}>الإسم</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder="أدخل الإسم"
          placeholderTextColor="#999"
          value={customer.name}
          onChangeText={setCustomerName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>رقم الهاتف</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل رقم الهاتف"
          placeholderTextColor="#999"
          value={customer.phoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={setCustomerPhoneNumber}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الملاحظات</ThemedText>
        <TextInput
          style={[styles.input, styles.textArea] as StyleProp<TextStyle>}
          placeholder="أدخل الملاحظات"
          placeholderTextColor="#999"
          value={customer.notes}
          onChangeText={setCustomerNotes}
          multiline
        />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.blue}
          textColor={Constants.colors.lightGray}
          labelStyle={styles.saveButton}
          onPress={addCustomer}
        >
          <ThemedText style={styles.saveText}>حفظ</ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
