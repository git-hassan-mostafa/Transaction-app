import React from "react";
import {
  View,
  TextInput,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import useEditProviderService from "./ProviderForm.service";
import { ThemedText } from "../../../Shared/Reusable Components/HelperComponents/ThemedText";
import { IProviderFormProps } from "@/Models/Providers/IProviderFormProps";
import i18n from "@/Shared/I18n/I18n";
import ValidationMessage from "@/Shared/Reusable Components/HelperComponents/ValidationMessage";
import { Button } from "react-native-paper";
import Constants from "@/Shared/Constants/Constants";
import formStyle from "@/Shared/Styles/form.style";
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
            onPress={service.save}
          >
            <ThemedText style={formStyle.saveText}>{i18n.t("save")}</ThemedText>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
}
