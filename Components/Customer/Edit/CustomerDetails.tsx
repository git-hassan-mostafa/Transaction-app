import {
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./EditCustomer.style";
import { ThemedText } from "@/Global/Reusable Components/HelperComponents/ThemedText";
import ICustomerDetailsProps from "@/ViewModels/Customers/ICustomerDetailsProps";
import i18n from "@/Global/I18n/I18n";
import Constants from "@/Global/Constants/Constants";
import formatBigNumber from "@/Global/Helpers/Functions/FormatBigNumber";
import { Button } from "react-native-paper";
import ValidationMessage from "@/Global/Reusable Components/HelperComponents/ValidationMessage";

export default function CustomerDetails(props: ICustomerDetailsProps) {
  return (
    <View>
      <View style={styles.pricesRow}>
        <ThemedText
          weight={600}
          fontSize={12}
          style={[styles.price, styles.payedPrice]}
        >
          ${props.customer.customerPayedPrice}
        </ThemedText>
        <ThemedText
          weight={600}
          fontSize={12}
          style={[styles.price, styles.totalDebtPrice]}
        >
          ${props.customer.customerBorrowedPrice}
        </ThemedText>
        <ThemedText
          weight={600}
          fontSize={12}
          style={[styles.price, styles.remainingPrice]}
        >
          $
          {props.customer.customerBorrowedPrice -
            props.customer.customerPayedPrice}
        </ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("customer-name")}</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-customer-name") + "..."}
          placeholderTextColor="#999"
          value={props.customer.customerName}
          onChangeText={props.setCustomerName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("phone-number")}</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-phone-number") + "..."}
          placeholderTextColor="#999"
          value={props.customer.customerPhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={props.setCustomerPhoneNumber}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("notes")}</ThemedText>
        <TextInput
          style={[styles.textInput, styles.textArea] as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-notes") + "..."}
          placeholderTextColor="#999"
          value={props.customer.customerNotes}
          onChangeText={props.setCustomerNotes}
          multiline
        />
      </View>
      <View style={styles.row}>
        <ValidationMessage validation={props.validation} />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.customers}
          textColor={Constants.colors.lightGray}
          labelStyle={styles.saveButton}
          onPress={props.updateCustomer}
        >
          <ThemedText weight={400} style={styles.saveText}>
            {i18n.t("save")}
          </ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
