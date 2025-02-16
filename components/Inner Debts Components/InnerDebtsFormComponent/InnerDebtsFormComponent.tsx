import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import { ThemedText } from "../../HelperComponents/ThemedText";
import useInnerDebtsFormComponentService from "./InnerDebtsFormComponent.service";
import styles from "./InnerDebtsFormComponent.style";
import CustomDropDown from "@/Components/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import { IInnerDebtFormProps } from "@/Global/ViewModels/InnerDebts/IInerDebtsFormProps";

export default function InnerDebtsFormComponent({
  id,
  updateFromInnerDebtsList,
}: IInnerDebtFormProps) {
  const {
    innerDebt,
    setTotalPrice,
    setPricePaid,
    setCustomer,
    setNotes,
    updateTotalPrice,
    updatePricePaid,
    updateCustomer,
    updateNotes,
    customers,
  } = useInnerDebtsFormComponentService({
    id,
    updateFromInnerDebtsList,
  });
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(innerDebt.date);
  return (
    <View style={styles.container}>
      <View style={styles.debtDate}>
        <ThemedText style={styles.date}>
          {date?.toLocaleDateString("ar-lb", options)}
        </ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الزبون</ThemedText>
        <CustomDropDown
          value={innerDebt.customerId as number}
          setValue={(value) => {
            setCustomer(value as number);
            updateCustomer(value as number);
          }}
          data={customers}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>السعر الكلي</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل السعر الكلي"
          placeholderTextColor="#999"
          value={innerDebt.totalPrice?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setTotalPrice(text)}
          onEndEditing={updateTotalPrice}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>السعر المدفوع</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل السعر المدفوع"
          placeholderTextColor="#999"
          value={innerDebt.pricePaid?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setPricePaid(text)}
          onEndEditing={updatePricePaid}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>الملاحظات</ThemedText>
        <TextInput
          style={[styles.textInput, styles.textArea] as StyleProp<TextStyle>}
          placeholder="أدخل الملاحظات"
          placeholderTextColor="#999"
          value={innerDebt.notes}
          onChangeText={setNotes}
          onEndEditing={updateNotes}
        />
      </View>
    </View>
  );
}
