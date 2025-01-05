import {
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import usePeopleFormComponentService from "./PeopleFormComponent.service";
import styles from "./PeopleFormComponent.style";
import { IPeopleProps } from "./PeopleFormComponent.types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemedText } from "../../HelperComponents/ThemedText";

export default function PeopleFormComponent({
  id,
  deleteFromPeopleList,
  updateFromPeopleList,
}: IPeopleProps) {
  const {
    handleDeletePerson,
    person,
    setPersonName,
    updatePersonName,
    setPersonPhoneNumber,
    updatePersonPhoneNumber,
  } = usePeopleFormComponentService({
    id,
    deleteFromPeopleList,
    updateFromPeopleList,
  });
  return (
    <View style={styles.container}>
      <View style={styles.iconHeader}>
        <TouchableOpacity onPress={handleDeletePerson}>
          <Icon style={styles.deleteCustomer} name="delete-forever" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الاسم</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder="أدخل الاسم"
          placeholderTextColor="#999"
          value={person.name}
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
          value={person.phoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={setPersonPhoneNumber}
          onEndEditing={updatePersonPhoneNumber}
        />
      </View>
    </View>
  );
}
