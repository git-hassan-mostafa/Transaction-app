import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import { ThemedText } from "../../HelperComponents/ThemedText";
import useInnerDebtsFormComponentService from "./InnerDebtsFormComponent.service";
import styles from "./InnerDebtsFormComponent.style";
import CustomDropDown from "@/Components/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import { IInnerDebtFormProps } from "@/Global/ViewModels/InnerDebts/IInerDebtsFormProps";
import InnerDebtsItemsListFormComponent from "./InnerDebtsItemsListFormComponent/InnerDebtsItemsListFormComponent";
import TabComponent from "@/Components/Reusable Components/TabComponent/TabComponent";
import useInnerDebtsItemsListFormComponentService from "./InnerDebtsItemsListFormComponent/InnerDebtsItemsListFormComponent.service";

export default function InnerDebtsFormComponent({
  id,
  updateFromInnerDebtsList,
}: IInnerDebtFormProps) {
  const innerDebtsItemsListFormService =
    useInnerDebtsItemsListFormComponentService(id);

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
    customersDropDown,
  } = useInnerDebtsFormComponentService({
    id,
    updateFromInnerDebtsList,
    innerDebtsItemsListService: innerDebtsItemsListFormService,
  });
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const date = new Date(innerDebt.innerDebtDate);
  return (
    <View style={styles.container}>
      <TabComponent titles={["القائمة", "التفاصيل"]}>
        <InnerDebtsItemsListFormComponent {...innerDebtsItemsListFormService} />
        <View>
          <View style={styles.debtDate}>
            <ThemedText style={styles.date}>
              {date?.toLocaleDateString("ar-lb", options)}
            </ThemedText>
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>الزبون</ThemedText>
            <CustomDropDown
              value={innerDebt.innerDebt_CustomerId as number}
              setValue={(value) => {
                setCustomer(value as number);
                updateCustomer(value as number);
              }}
              data={customersDropDown}
            />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>السعر الكلي</ThemedText>
            <TextInput
              style={styles.input as StyleProp<TextStyle>}
              placeholder="أدخل السعر الكلي"
              placeholderTextColor="#999"
              value={innerDebt.innerDebtTotalPrice?.toString()}
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
              value={innerDebt.innerDebtPricePaid?.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setPricePaid(text)}
              onEndEditing={updatePricePaid}
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
              value={innerDebt.innerDebtNotes}
              onChangeText={setNotes}
              onEndEditing={updateNotes}
            />
          </View>
        </View>
      </TabComponent>
    </View>
  );
}
