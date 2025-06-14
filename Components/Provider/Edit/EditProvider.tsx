import React from "react";
import {
  View,
  TextInput,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import useEditProviderService from "./EditProvider.service";
import { ThemedText } from "../../../Global/Reusable Components/HelperComponents/ThemedText";
import { IProviderFormProps } from "@/ViewModels/Providers/IProviderFormProps";
import i18n from "@/Global/I18n/I18n";
import ValidationMessage from "@/Global/Reusable Components/HelperComponents/ValidationMessage";
import { Button } from "react-native-paper";
import Constants from "@/Global/Constants/Constants";
import formStyle from "@/Global/Styles/form.style";
export function EditProvider(props: IProviderFormProps) {
  const service = useEditProviderService(props);

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
        <View style={formStyle.row}>
          <ValidationMessage validation={service.validation} />
        </View>
        <TouchableOpacity>
          <Button
            buttonColor={Constants.colors.providers}
            textColor={Constants.colors.lightGray}
            labelStyle={formStyle.saveButton}
            onPress={service.updateProvider}
          >
            <ThemedText style={formStyle.saveText}>{i18n.t("save")}</ThemedText>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}
