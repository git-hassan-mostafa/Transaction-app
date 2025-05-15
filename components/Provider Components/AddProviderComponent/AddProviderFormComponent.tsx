import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import useAddProviderFormComponentService from "./AddProviderFormComponent.service";
import styles from "./AddProviderFormComponent.style";
import Constants from "@/Global/Constants/Constants";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "../../Reusable Components/HelperComponents/ThemedText";
import IAddProviderProps from "@/Global/ViewModels/Providers/IAddProviderProps";
import ValidationMessage from "@/Components/Reusable Components/HelperComponents/ValidationMessage";

export default function AddProviderFormComponent({
  toggleModal,
  addToProvidersList,
}: IAddProviderProps) {
  const {
    provider,
    validation,
    setProviderName,
    setProviderPhoneNumber,
    setProviderNotes,
    addProvider,
  } = useAddProviderFormComponentService({
    toggleModal,
    addToProvidersList,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الإسم</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder="أدخل الإسم"
          placeholderTextColor="#999"
          value={provider.providerName}
          onChangeText={setProviderName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>رقم الهاتف</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل رقم الهاتف"
          placeholderTextColor="#999"
          value={provider.providerPhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={setProviderPhoneNumber}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>الملاحظات</ThemedText>
        <TextInput
          style={[styles.textInput, styles.textArea] as StyleProp<TextStyle>}
          placeholder=" أدخل الملاحظات"
          placeholderTextColor="#999"
          value={provider.providerNotes}
          onChangeText={setProviderNotes}
        />
      </View>
      <View style={styles.row}>
        <ValidationMessage validation={validation} />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.providers}
          textColor={Constants.colors.lightGray}
          labelStyle={styles.saveButton}
          onPress={addProvider}
        >
          <ThemedText style={styles.saveText}>حفظ</ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
