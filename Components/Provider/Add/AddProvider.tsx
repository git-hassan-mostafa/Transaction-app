import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import useAddProviderService from "./AddProvider.service";
import Constants from "@/Global/Constants/Constants";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "../../../Global/Reusable Components/HelperComponents/ThemedText";
import IAddProviderProps from "@/ViewModels/Providers/IAddProviderProps";
import ValidationMessage from "@/Global/Reusable Components/HelperComponents/ValidationMessage";
import i18n from "@/Global/I18n/I18n";
import formStyle from "@/Global/Styles/form.style";

export default function AddProvider(props: IAddProviderProps) {
  const service = useAddProviderService(props);

  return (
    <View style={formStyle.container}>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("provider-name")}
        </ThemedText>
        <TextInput
          style={formStyle.input}
          placeholder={i18n.t("please-enter-provider-name") + "..."}
          placeholderTextColor="#999"
          value={service.provider.providerName}
          onChangeText={service.setProviderName}
        />
      </View>

      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("phone-number")}
        </ThemedText>
        <TextInput
          style={formStyle.input}
          placeholder={i18n.t("enter-phone-number")}
          placeholderTextColor="#999"
          value={service.provider.providerPhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={service.setProviderPhoneNumber}
        />
      </View>

      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>{i18n.t("notes")}</ThemedText>
        <TextInput
          style={[formStyle.input, formStyle.textArea] as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-notes")}
          placeholderTextColor="#999"
          value={service.provider.providerNotes}
          onChangeText={service.setProviderNotes}
        />
      </View>
      <View style={formStyle.row}>
        <ValidationMessage validation={service.validation} />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.providers}
          textColor={Constants.colors.lightGray}
          labelStyle={formStyle.saveButton}
          onPress={service.addProvider}
        >
          <ThemedText style={formStyle.saveText}>{i18n.t("save")}</ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
