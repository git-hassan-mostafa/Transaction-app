import {
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import usePeopleFormService from "./PeopleForm.service";
import { ThemedText } from "../../Global/Reusable Components/HelperComponents/ThemedText";
import IPeopleFormProps from "@/ViewModels/People/IPersonFormProps";
import i18n from "@/Global/I18n/I18n";
import { Button } from "react-native-paper";
import ValidationMessage from "@/Global/Reusable Components/HelperComponents/ValidationMessage";
import Constants from "@/Global/Constants/Constants";
import formStyle from "@/Global/Styles/form.style";

export default function PeopleForm(props: IPeopleFormProps) {
  const service = usePeopleFormService(props);
  return (
    <View style={formStyle.container}>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>{i18n.t("person-name")}</ThemedText>
        <TextInput
          style={formStyle.input}
          placeholder={i18n.t("please-enter-the-name")}
          placeholderTextColor="#999"
          value={service.person.personName}
          onChangeText={service.setPersonName}
        />
      </View>

      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("person-phone")}
        </ThemedText>
        <TextInput
          style={formStyle.input as StyleProp<TextStyle>}
          placeholder={i18n.t("please-enter-the-phone-number")}
          placeholderTextColor="#999"
          value={service.person.personPhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={service.setPersonPhoneNumber}
        />
        <View style={formStyle.row}>
          <ValidationMessage validation={service.validation} />
        </View>
        <TouchableOpacity>
          <Button
            buttonColor={Constants.colors.people}
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
