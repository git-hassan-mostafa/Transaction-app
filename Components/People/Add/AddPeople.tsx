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

export default function AddPeople({
  addToPeopleList,
  toggleModal,
}: IAddPeopleProps) {
  const service = useAddPeopleService({ addToPeopleList, toggleModal });
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("person-name")}</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder={i18n.t("please-enter-the-name")}
          placeholderTextColor="#999"
          value={service.person.personName}
          onChangeText={service.setPersonName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("person-phone")}</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder={i18n.t("please-enter-the-phone-number")}
          placeholderTextColor="#999"
          value={service.person.personPhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={service.setPersonPhoneNumber}
        />
      </View>
      <View style={styles.row}>
        <ValidationMessage validation={service.validation} />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.people}
          textColor={Constants.colors.lightGray}
          labelStyle={styles.saveButton}
          onPress={service.addPerson}
        >
          <ThemedText style={styles.saveText}>{i18n.t("save")}</ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
