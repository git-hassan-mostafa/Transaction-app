import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./CustomerFormComponent.style";
import React from "react";
import {
  View,
  TextInput,
  StyleProp,
  TextStyle,
  ScrollView,
} from "react-native";
import useCustomerFormComponentService from "./CustomerFormComponent.service";
import { ThemedText } from "../../Reusable Components/HelperComponents/ThemedText";
import ICustomerFormProps from "@/Global/ViewModels/Customers/ICustomerFormProps";
import TabComponent from "@/Components/Reusable Components/TabComponent/TabComponent";
import Constants from "@/Global/Constants/Constants";
import CustomerDebtsListComponent from "./CustomerDebtsListComponent";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
export function CustomerFormComponent({
  id,
  updateFromCustomersList,
}: ICustomerFormProps) {
  const {
    customer,
    setCustomerName,
    setCustomerPhoneNumber,
    setCustomerNotes,
    updateCustomerName,
    updateCustomerPhoneNumber,
    updateCustomerNotes,
    formatNumber,
  } = useCustomerFormComponentService({
    id,
    updateFromCustomersList,
  });

  return (
    <View style={styles.container}>
      <TabComponent titles={["قائمة الديون", "التفاصيل"]}>
        <CustomerDebtsListComponent
          id={id}
          updateFromCustomersList={updateFromCustomersList}
        />
        <View>
          <View style={styles.pricesRow}>
            <View style={styles.pricesContainer}>
              {/* <Icon style={styles.priceIcon} name="cash-remove" /> */}
              <ThemedText style={styles.totalDebtPrice} type="medium">
                الدين الكامل
              </ThemedText>
              <ThemedText style={[styles.price, styles.totalDebtPrice]}>
                ${formatNumber(customer.customerBorrowedPrice)}
              </ThemedText>
            </View>
            <View style={styles.pricesContainer}>
              <ThemedText style={styles.payedPrice} type="medium">
                المبلغ المدفوع
              </ThemedText>
              <ThemedText style={[styles.price, styles.payedPrice]}>
                ${formatNumber(customer.customerPayedPrice)}
              </ThemedText>
            </View>
            <View style={styles.pricesContainer}>
              <ThemedText style={styles.remainingPrice} type="medium">
                المبلغ المتبقي
              </ThemedText>
              <ThemedText style={[styles.price, styles.remainingPrice]}>
                $
                {formatNumber(
                  customer.customerBorrowedPrice - customer.customerPayedPrice
                )}
              </ThemedText>
            </View>
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>الاسم</ThemedText>
            <TextInput
              style={styles.textInput as StyleProp<TextStyle>}
              placeholder="أدخل الاسم"
              placeholderTextColor="#999"
              value={customer.customerName}
              onChangeText={setCustomerName}
              onEndEditing={updateCustomerName}
            />
          </View>

          <View style={styles.row}>
            <ThemedText style={styles.label}>رقم الهاتف</ThemedText>
            <TextInput
              style={styles.input as StyleProp<TextStyle>}
              placeholder="أدخل رقم الهاتف"
              placeholderTextColor="#999"
              value={customer.customerPhoneNumber}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              onChangeText={setCustomerPhoneNumber}
              onEndEditing={updateCustomerPhoneNumber}
            />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>الملاحظات</ThemedText>
            <TextInput
              style={
                [styles.textInput, styles.textArea] as StyleProp<TextStyle>
              }
              placeholder="أدخل الملاحظات"
              placeholderTextColor="#999"
              value={customer.customerNotes}
              onChangeText={setCustomerNotes}
              onEndEditing={updateCustomerNotes}
              onBlur={updateCustomerNotes}
              multiline
            />
          </View>
        </View>
      </TabComponent>
    </View>
  );
}
