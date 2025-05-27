import styles from "./EditProvider.style";
import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import useEditProviderService from "./EditProvider.service";
import { ThemedText } from "../../../Global/Reusable Components/HelperComponents/ThemedText";
import { IProviderFormProps } from "@/ViewModels/Providers/IProviderFormProps";
import i18n from "@/Global/I18n/I18n";
export function EditProvider({
  id,
  updateFromProvidersList,
  deleteFromProvidersList,
}: IProviderFormProps) {
  const {
    provider,
    setProviderName,
    setProviderPhoneNumber,
    updateProviderName,
    updateProviderPhonember,
    setProviderNotes,
    updateProviderNotes,
  } = useEditProviderService({
    id,
    updateFromProvidersList,
    deleteFromProvidersList,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("provider-name")}</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder={i18n.t("please-enter-provider-name") + "..."}
          placeholderTextColor="#999"
          value={provider.providerName}
          onChangeText={setProviderName}
          onEndEditing={updateProviderName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("phone-number")}</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-phone-number")}
          placeholderTextColor="#999"
          value={provider.providerPhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={setProviderPhoneNumber}
          onEndEditing={updateProviderPhonember}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("notes")}</ThemedText>
        <TextInput
          style={[styles.textInput, styles.textArea] as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-notes")}
          placeholderTextColor="#999"
          value={provider.providerNotes}
          onChangeText={setProviderNotes}
          onEndEditing={updateProviderNotes}
        />
      </View>
    </View>
  );
}
