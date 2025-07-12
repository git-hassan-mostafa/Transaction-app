import {
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./CustomerForm.style";
import { ThemedText } from "@/Shared/Components/ThemedText";
import i18n from "@/Shared/I18n/I18n";
import Constants from "@/Shared/Constants/Constants";
import { Button } from "react-native-paper";
import ValidationMessage from "@/Shared/Components/ValidationMessage";
import formStyle from "@/Shared/Styles/form.style";
import ICustomerDetailsProps from "@/Models/Customers/ICustomerDetailsProps";
import IInput from "@/Shared/Components/IInput";

export default function CustomerDetails(props: ICustomerDetailsProps) {
  return (
    <View>
      {props.customer.Id > 0 && (
        <View style={styles.pricesRow}>
          <ThemedText
            weight={600}
            fontSize={12}
            style={[styles.price, styles.payedPrice]}
          >
            ${props.customer.PayedPrice}
          </ThemedText>
          <ThemedText
            weight={600}
            fontSize={12}
            style={[styles.price, styles.totalDebtPrice]}
          >
            ${props.customer.BorrowedPrice}
          </ThemedText>
          <ThemedText
            weight={600}
            fontSize={12}
            style={[styles.price, styles.remainingPrice]}
          >
            ${props.customer.BorrowedPrice - props.customer.PayedPrice}
          </ThemedText>
        </View>
      )}
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("customer-name")}
        </ThemedText>
        <IInput
          style={formStyle.input as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-customer-name") + "..."}
          placeholderTextColor="#999"
          value={props.customer.Name}
          onChangeText={props.setCustomerName}
        />
      </View>

      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>
          {i18n.t("phone-number")}
        </ThemedText>
        <IInput
          style={formStyle.input as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-phone-number") + "..."}
          placeholderTextColor="#999"
          value={props.customer.PhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={props.setCustomerPhoneNumber}
        />
      </View>
      <View style={formStyle.row}>
        <ThemedText style={formStyle.label}>{i18n.t("notes")}</ThemedText>
        <TextInput
          style={[formStyle.input, formStyle.textArea]}
          placeholder={i18n.t("enter-notes") + "..."}
          placeholderTextColor="#999"
          value={props.customer.Notes}
          onChangeText={props.setCustomerNotes}
          multiline
        />
      </View>
      <View style={formStyle.row}>
        <ValidationMessage validation={props.validation} />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.customers}
          textColor={Constants.colors.lightGray}
          labelStyle={formStyle.saveButton}
          onPress={props.save}
        >
          <ThemedText weight={400} style={formStyle.saveText}>
            {i18n.t("save")}
          </ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
