import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import Constants from "@/Global/Constants/Constants";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "../../Reusable Components/HelperComponents/ThemedText";
import styles from "./AddInnerDebtsComponent.style";
import useAddInnerDebtsComponentService from "./AddInnerDebtsComponent.service";
import CustomDropDown from "@/Components/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import { IAddInnerDebtProps } from "@/Global/ViewModels/InnerDebts/IAddInnerDebtsProps";
import TabComponent from "@/Components/Reusable Components/TabComponent/TabComponent";
import AddInnerDebtsItemsListComponent from "./AddInnerDebtsItemsListComponent/AddInnerDebtsItemsListComponent";
import useAddInnerDebtsItemsListComponentService from "./AddInnerDebtsItemsListComponent/AddInnerDebtsItemsListComponent.service";
import ValidationMessage from "@/Components/Reusable Components/HelperComponents/ValidationMessage";
import i18n from "@/Global/I18n/I18n";

export default function AddInnerDebtsComponent(props: IAddInnerDebtProps) {
  const innerDebtsItemsListService =
    useAddInnerDebtsItemsListComponentService();

  const service = useAddInnerDebtsComponentService({
    ...props,
    innerDebtsItemsListService,
  });

  return (
    <View style={styles.container}>
      <TabComponent titles={[i18n.t("details"), i18n.t("products-list")]}>
        <View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>
              {i18n.t("select-customer")}
            </ThemedText>
            <CustomDropDown
              value={service.innerDebt.innerDebt_CustomerId as number}
              setValue={(value) => service.setCustomer(value as number)}
              data={service.customersDropDown}
            />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>
              {i18n.t("total-price")}
            </ThemedText>
            <TextInput
              style={styles.input as StyleProp<TextStyle>}
              placeholder={i18n.t("enter-total-price")}
              placeholderTextColor="#999"
              value={service.innerDebt.innerDebtTotalPrice?.toString()}
              keyboardType="numeric"
              onChangeText={(text) => service.setTotalPrice(text)}
            />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>
              {i18n.t("payed-price")}
            </ThemedText>
            <TextInput
              style={styles.input as StyleProp<TextStyle>}
              placeholder={i18n.t("enter-paid-price")}
              placeholderTextColor="#999"
              value={service.innerDebt.innerDebtPricePaid?.toString()}
              keyboardType="numeric"
              onChangeText={(text) => service.setPricePaid(text)}
            />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.label}>{i18n.t("notes")}</ThemedText>
            <TextInput
              style={
                [styles.textInput, styles.textArea] as StyleProp<TextStyle>
              }
              placeholder={i18n.t("enter-notes")}
              placeholderTextColor="#999"
              value={service.innerDebt.innerDebtNotes}
              onChangeText={service.setNotes}
            />
          </View>
          <View style={styles.row}>
            <ValidationMessage validation={service.validation} />
          </View>
          <TouchableOpacity>
            <Button
              buttonColor={Constants.colors.red}
              textColor={Constants.colors.lightGray}
              labelStyle={styles.saveButton}
              onPress={service.addInnerDebt}
            >
              <ThemedText style={styles.saveText}>{i18n.t("save")}</ThemedText>
            </Button>
          </TouchableOpacity>
        </View>
        <AddInnerDebtsItemsListComponent {...innerDebtsItemsListService} />
      </TabComponent>
    </View>
  );
}
