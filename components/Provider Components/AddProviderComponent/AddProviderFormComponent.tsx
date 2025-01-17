import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import useAddProviderFormComponentService from "./AddProviderFormComponent.service";
import styles from "./AddProviderFormComponent.style";
import Constants from "@/Global/Constants/Constants";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { IAddProviderProps } from "./AddProviderFormComponent.types";
import { ThemedText } from "../../HelperComponents/ThemedText";

export default function AddProviderFormComponent({
  toggleModal,
  addToProvidersList,
}: IAddProviderProps) {
  const { provider, setProviderName, setProviderPhoneNumber, addProvider } =
    useAddProviderFormComponentService({
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
          value={provider.name}
          onChangeText={setProviderName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>رقم الهاتف</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل رقم الهاتف"
          placeholderTextColor="#999"
          value={provider.phoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={setProviderPhoneNumber}
        />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.brown}
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
