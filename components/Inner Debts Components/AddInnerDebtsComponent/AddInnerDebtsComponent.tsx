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
import TabComponent from "@/Components/Reusable Components/TabComponent/TabComponent";
import AddInnerDebtsItemsListComponent from "./AddInnerDebtsItemsListComponent/AddInnerDebtsItemsListComponent";
import useAddInnerDebtsItemsListComponentService from "./AddInnerDebtsItemsListComponent/AddInnerDebtsItemsListComponent.service";

export default function AddInnerDebtsComponent(props: IAddInnerDebtProps) {
  const innerDebtsItemsListService =
    useAddInnerDebtsItemsListComponentService();

  const service = useAddInnerDebtsComponentService({
    ...props,
    innerDebtsItemsListService,
  });

  return (
    <View style={styles.container}>
      <TabComponent titles={["القائمة", "التفاصيل"]}>
        <AddInnerDebtsItemsListComponent {...innerDebtsItemsListService} />
        <View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>الزبون</ThemedText>
            <CustomDropDown
              value={service.innerDebt.customerId as number}
              setValue={(value) => service.setCustomer(value as number)}
              data={service.customers}
            />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>السعر الكلي</ThemedText>
            <TextInput
              style={styles.input as StyleProp<TextStyle>}
              placeholder="أدخل السعر الكلي"
              placeholderTextColor="#999"
              value={service.innerDebt.totalPrice?.toString()}
              keyboardType="numeric"
              onChangeText={(text) => service.setTotalPrice(text)}
            />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>السعر المدفوع</ThemedText>
            <TextInput
              style={styles.input as StyleProp<TextStyle>}
              placeholder="أدخل السعر المدفوع"
              placeholderTextColor="#999"
              value={service.innerDebt.pricePaid?.toString()}
              keyboardType="numeric"
              onChangeText={(text) => service.setPricePaid(text)}
            />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>الملاحظات</ThemedText>
            <TextInput
              style={
                [styles.textInput, styles.textArea] as StyleProp<TextStyle>
              }
              placeholder=" أدخل الملاحظات"
              placeholderTextColor="#999"
              value={service.innerDebt.notes}
              onChangeText={service.setNotes}
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
              onPress={service.addInnerDebt}
            >
              <ThemedText style={styles.saveText}>حفظ</ThemedText>
            </Button>
          </TouchableOpacity>
        </View>
      </TabComponent>
    </View>
  );
}
