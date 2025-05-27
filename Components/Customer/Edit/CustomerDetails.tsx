import { StyleProp, TextInput, TextStyle, View } from "react-native";
import styles from "./EditCustomer.style";
import { ThemedText } from "@/Global/Reusable Components/HelperComponents/ThemedText";
import ICustomerDetailsProps from "@/ViewModels/Customers/ICustomerDetailsProps";
import i18n from "@/Global/I18n/I18n";
import Icon from "react-native-vector-icons/Entypo";
import Constants from "@/Global/Constants/Constants";

export default function CustomerDetails(props: ICustomerDetailsProps) {
  return (
    <View>
      <View style={styles.pricesRow}>
        <View style={styles.pricesContainer}>
          <Icon
            size={16}
            color={Constants.colors.darkGreen}
            name="arrow-with-circle-up"
          />
          <ThemedText fontSize={14} style={[styles.price, styles.payedPrice]}>
            ${props.formatNumber(props.customer.customerPayedPrice)}
          </ThemedText>
        </View>
        <View style={styles.pricesContainer}>
          {/* <Icon
            size={16}
            name="select-arrows"
            color={Constants.colors.darkGray}
          /> */}
          <ThemedText
            fontSize={14}
            style={[styles.price, styles.totalDebtPrice]}
          >
            ${props.formatNumber(props.customer.customerBorrowedPrice)}
          </ThemedText>
        </View>
        <View style={styles.pricesContainer}>
          <Icon
            size={16}
            color={Constants.colors.red}
            name="arrow-with-circle-down"
          />
          <ThemedText
            fontSize={14}
            style={[styles.price, styles.remainingPrice]}
          >
            $
            {props.formatNumber(
              props.customer.customerBorrowedPrice -
                props.customer.customerPayedPrice
            )}
          </ThemedText>
        </View>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>{i18n.t("customer-name")}</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder={i18n.t("enter-customer-name") + "..."}
          placeholderTextColor="#999"
          value={props.customer.customerName}
          onChangeText={props.setCustomerName}
          onEndEditing={props.updateCustomerName}
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
          onEndEditing={props.updateCustomerPhoneNumber}
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
          onEndEditing={props.updateCustomerNotes}
          onBlur={props.updateCustomerNotes}
          multiline
        />
      </View>
    </View>
  );
}
