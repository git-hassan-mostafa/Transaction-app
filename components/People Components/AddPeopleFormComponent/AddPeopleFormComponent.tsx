import {
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import useAddPeopleFormComponentService from "./AddPeopleFormComponent.service";
import styles from "./AddPeopleFormComponent.style";
import Constants from "@/Global/Constants/Constants";
import { Button } from "react-native-paper";
import { ThemedText } from "@/Components/HelperComponents/ThemedText";
import IAddPeopleProps from "@/Global/ViewModels/People/IAddPersonProps";

export default function AddPeopleFormComponent({
  addToPeopleList,
  toggleModal,
}: IAddPeopleProps) {
  const { person, setPersonName, setPersonPhoneNumber, addPerson } =
    useAddPeopleFormComponentService({ addToPeopleList, toggleModal });
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الإسم</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder="أدخل الإسم"
          placeholderTextColor="#999"
          value={person.name}
          onChangeText={setPersonName}
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
        />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.lighBlue}
          textColor={Constants.colors.lightGray}
          labelStyle={styles.saveButton}
          onPress={addPerson}
        >
          <ThemedText style={styles.saveText}>حفظ</ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
