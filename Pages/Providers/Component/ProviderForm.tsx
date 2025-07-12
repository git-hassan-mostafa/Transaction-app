import React from "react";
import {
  View,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TextInput,
} from "react-native";
import useEditProviderService from "./ProviderForm.service";
import { ThemedText } from "../../../Shared/Components/ThemedText";
import { IProviderFormProps } from "@/Models/Providers/IProviderFormProps";
import i18n from "@/Shared/I18n/I18n";
import ValidationMessage from "@/Shared/Components/ValidationMessage";
import { Button } from "react-native-paper";
import Constants from "@/Shared/Constants/Constants";
import formStyle from "@/Shared/Styles/form.style";
import IInput from "@/Shared/Components/IInput";

export function EditProvider(props: IProviderFormProps) {
  const service = useEditProviderService(props);

  return (
    <View style={formStyle.container}>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("provider-name")}
        </ThemedText>
        <IInput
          style={formStyle.input}
          placeholder={i18n.t("please-enter-provider-name") + "..."}
          placeholderTextColor="#999"
          value={service.provider.Name}
          onChangeText={service.setProviderName}
        />
      </View>

      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("phone-number")}
        </ThemedText>
        <IInput
          style={formStyle.input}
          placeholder={i18n.t("enter-phone-number")}
          placeholderTextColor="#999"
          value={service.provider.PhoneNumber}
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
          value={service.provider.Notes}
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
