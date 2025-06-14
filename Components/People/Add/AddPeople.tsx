import {
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import useAddPeopleService from "./AddPeople.service";
import styles from "./AddPeople.style";
import Constants from "@/Global/Constants/Constants";
import { Button } from "react-native-paper";
import { ThemedText } from "@/Global/Reusable Components/HelperComponents/ThemedText";
import IAddPeopleProps from "@/ViewModels/People/IAddPersonProps";
import ValidationMessage from "@/Global/Reusable Components/HelperComponents/ValidationMessage";
import i18n from "@/Global/I18n/I18n";
import formStyle from "@/Global/Styles/form.style";

export default function AddPeople(props: IAddPeopleProps) {
  const service = useAddPeopleService(props);
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
      </View>
      <View style={formStyle.row}>
        <ValidationMessage validation={service.validation} />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.people}
          textColor={Constants.colors.lightGray}
          labelStyle={formStyle.saveButton}
          onPress={service.addPerson}
        >
          <ThemedText style={formStyle.saveText}>{i18n.t("save")}</ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
