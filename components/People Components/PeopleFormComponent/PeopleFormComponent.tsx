import { StyleProp, TextInput, TextStyle, View } from "react-native";
import usePeopleFormComponentService from "./PeopleFormComponent.service";
import styles from "./PeopleFormComponent.style";
import { ThemedText } from "../../Reusable Components/HelperComponents/ThemedText";
import IPeopleFormProps from "@/Global/ViewModels/People/IPersonFormProps";

export default function PeopleFormComponent({
  id,
  updateFromPeopleList,
}: IPeopleFormProps) {
  const {
    person,
    setPersonName,
    updatePersonName,
    setPersonPhoneNumber,
    updatePersonPhoneNumber,
  } = usePeopleFormComponentService({
    id,
    updateFromPeopleList,
  });
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الاسم</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder="أدخل الاسم"
          placeholderTextColor="#999"
          value={person.personName}
          onChangeText={setPersonName}
          onEndEditing={updatePersonName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>رقم الهاتف</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل رقم الهاتف"
          placeholderTextColor="#999"
          value={person.personPhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={setPersonPhoneNumber}
          onEndEditing={updatePersonPhoneNumber}
        />
      </View>
    </View>
  );
}
