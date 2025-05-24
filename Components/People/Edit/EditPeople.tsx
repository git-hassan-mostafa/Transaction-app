import { StyleProp, TextInput, TextStyle, View } from "react-native";
import useEditPeopleService from "./EditPeople.service";
import styles from "./EditPeople.style";
import { ThemedText } from "../../Reusables/HelperComponents/ThemedText";
import IPeopleFormProps from "@/Global/ViewModels/People/IPersonFormProps";
import i18n from "@/Global/I18n/I18n";

export default function EditPeople(props: IPeopleFormProps) {
  const service = useEditPeopleService(props);
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
          onEndEditing={service.updatePersonName}
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
          onEndEditing={service.updatePersonPhoneNumber}
        />
      </View>
    </View>
  );
}
