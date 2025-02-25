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
import { ThemedText } from "../../HelperComponents/ThemedText";
import ICustomerFormProps from "@/Global/ViewModels/Customers/ICustomerFormProps";
import TabComponent from "@/Components/Reusable Components/TabComponent/TabComponent";
import Constants from "@/Global/Constants/Constants";
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

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <View style={styles.container}>
      <TabComponent titles={["الديون", "التفاصيل"]}>
        <ScrollView style={styles.customerScrollView}>
          {(customer?.borrowList?.length as number) > 0 && (
            <View style={styles.borrowedListContainer}>
              <View>
                <ThemedText style={styles.borrowedListTitle}>
                  قائمة الديون
                </ThemedText>
              </View>
              <View style={styles.borrowedList}>
                {customer.borrowList?.map((item) => {
                  const totalPrice = formatNumber(item.TotalPrice);
                  const pricePaid = formatNumber(item.PricePaid);
                  return (
                    <View
                      key={item.InnerDebtId}
                      style={styles.borrowedListItem}
                    >
                      <ThemedText style={[{ color: Constants.colors.red }]}>
                        {totalPrice}
                      </ThemedText>
                      <ThemedText style={[{ color: Constants.colors.green }]}>
                        {pricePaid}
                      </ThemedText>
                      <ThemedText type="default">
                        {new Date(item.Date ?? "")?.toLocaleDateString(
                          "ar-lb",
                          options
                        )}
                      </ThemedText>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
        <View>
          <View style={styles.pricesRow}>
            <View style={[styles.pricesContainer, styles.borrowedConainer]}>
              <Icon style={styles.priceIcon} name="cash-remove" />
              <ThemedText style={styles.price}>
                ${formatNumber(customer.borrowedPrice)}
              </ThemedText>
            </View>
            <View style={[styles.pricesContainer, styles.payedContainer]}>
              <Icon style={styles.priceIcon} name="cash-check" />
              <ThemedText style={styles.price}>
                ${formatNumber(customer.payedPrice)}
              </ThemedText>
            </View>
            <View style={[styles.pricesContainer, styles.totalContainer]}>
              <Icon style={styles.priceIcon} name="account-cash" />
              <ThemedText style={styles.price}>
                ${formatNumber(customer.borrowedPrice - customer.payedPrice)}
              </ThemedText>
            </View>
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>الاسم</ThemedText>
            <TextInput
              style={styles.textInput as StyleProp<TextStyle>}
              placeholder="أدخل الاسم"
              placeholderTextColor="#999"
              value={customer.name}
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
              value={customer.phoneNumber}
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
              value={customer.notes}
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
