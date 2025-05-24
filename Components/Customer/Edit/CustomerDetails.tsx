import { StyleProp, TextInput, TextStyle, View } from "react-native";
import styles from "./EditCustomer.style";
import { ThemedText } from "@/Components/Reusables/HelperComponents/ThemedText";
import ICustomerDetailsProps from "@/Global/ViewModels/Customers/ICustomerDetailsProps";
import i18n from "@/Global/I18n/I18n";

export default function CustomerDetails(props: ICustomerDetailsProps) {
  return (
    <View>
      <View style={styles.pricesRow}>
        <View style={styles.pricesContainer}>
          <ThemedText style={styles.payedPrice} type="medium">
            {i18n.t("payed-price")}
          </ThemedText>
          <ThemedText style={[styles.price, styles.payedPrice]}>
            ${props.formatNumber(props.customer.customerPayedPrice)}
          </ThemedText>
        </View>
        <View style={styles.pricesContainer}>
          <ThemedText style={styles.remainingPrice} type="medium">
            {i18n.t("remaining-price")}
          </ThemedText>
          <ThemedText style={[styles.price, styles.remainingPrice]}>
            $
            {props.formatNumber(
              props.customer.customerBorrowedPrice -
                props.customer.customerPayedPrice
            )}
          </ThemedText>
        </View>
        <View style={styles.pricesContainer}>
          {/* <Icon style={styles.priceIcon} name="cash-remove" /> */}
          <ThemedText style={styles.totalDebtPrice} type="medium">
            {i18n.t("total-debt")}
          </ThemedText>
          <ThemedText style={[styles.price, styles.totalDebtPrice]}>
            ${props.formatNumber(props.customer.customerBorrowedPrice)}
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
