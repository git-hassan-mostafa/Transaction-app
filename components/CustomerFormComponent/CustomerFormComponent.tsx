import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./CustomerFormComponent.style";
import React, { useState } from "react";
import { View, Text, TextInput, StyleProp, TextStyle } from "react-native";
import useCustomerFormComponentService from "./CustomerFormComponent.service";

export function CustomerFormComponent() {
  const { customer, setCustomerName, setCustomerPhoneNumber } =
    useCustomerFormComponentService();

  return (
    <View style={styles.container}>
      <View style={styles.pricesRow}>
        <View style={[styles.pricesContainer, styles.borrowedConainer]}>
          <Icon style={styles.priceIcon} name="cash-remove" />
          <Text style={styles.price}>$100.0</Text>
        </View>
        <View style={[styles.pricesContainer, styles.payedContainer]}>
          <Icon style={styles.priceIcon} name="cash-check" />
          <Text style={styles.price}>$50.0</Text>
        </View>
        <View style={[styles.pricesContainer, styles.totalContainer]}>
          <Icon style={styles.priceIcon} name="account-cash" />
          <Text style={styles.price}>$50.0</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>الاسم</Text>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder="أدخل الاسم"
          placeholderTextColor="#999"
          value={customer.name}
          onChangeText={setCustomerName}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>رقم الهاتف</Text>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل رقم الهاتف"
          placeholderTextColor="#999"
          value={customer.phoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={setCustomerPhoneNumber}
        />
      </View>
      <View style={styles.borrowedListContainer}>
        <View>
          <Text style={styles.borrowedListTitle}>قائمة الديون</Text>
        </View>
        <View style={styles.borrowedList}>
          {customer.borrowList?.map((item) => (
            <View style={styles.borrowedListItem}>
              <Text style={styles.borrowedListText}>{item.item}</Text>
              <Text> --- </Text>
              <Text style={styles.borrowedListText}>{item.price}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
