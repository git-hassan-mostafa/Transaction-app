import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import Constants from "@/Global/Constants/Constants";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "../../HelperComponents/ThemedText";
import styles from "./AddInnerDebtsComponent.style";
import useAddInnerDebtsComponentService from "./AddInnerDebtsComponent.service";
import CustomDropDown from "@/Components/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import { IAddInnerDebtProps } from "@/Global/ViewModels/InnerDebts/IAddInnerDebtsProps";

export default function AddInnerDebtsComponent({
  toggleModal,
  addToInnerDebtsList,
}: IAddInnerDebtProps) {
  const {
    innerDebt,
    customers,
    setTotalPrice,
    setPricePaid,
    setCustomer,
    setNotes,
    addInnerDebt,
  } = useAddInnerDebtsComponentService({
    toggleModal,
    addToInnerDebtsList,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الزبون</ThemedText>
        <CustomDropDown
          value={innerDebt.customerId as number}
          setValue={(value) => setCustomer(value as number)}
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
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الملاحظات</ThemedText>
        <TextInput
          style={[styles.textInput, styles.textArea] as StyleProp<TextStyle>}
          placeholder=" أدخل الملاحظات"
          placeholderTextColor="#999"
          value={innerDebt.notes}
          onChangeText={setNotes}
        />
      </View>
      <View style={styles.row}>
        <ThemedText></ThemedText>
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.red}
          textColor={Constants.colors.lightGray}
          labelStyle={styles.saveButton}
          onPress={addInnerDebt}
        >
          <ThemedText style={styles.saveText}>حفظ</ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
