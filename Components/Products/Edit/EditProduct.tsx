import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import { ThemedText } from "../../Reusables/HelperComponents/ThemedText";
import useEditProductService from "./EditProduct.service";
import styles from "./EditProduct.style";
import CustomDropDown from "@/Components/Reusables/CustomDropDownComponent/CustomDropDownComponent";
import IEditProductProps from "@/Global/ViewModels/Items/IItemFormProps";
import ValidationMessage from "@/Components/Reusables/HelperComponents/ValidationMessage";
import { Button } from "react-native-paper";
import Constants from "@/Global/Constants/Constants";

export function EditProduct({ id, updateFromProductsList }: IEditProductProps) {
  const service = useEditProductService({
    id,
    updateFromProductsList,
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 20,
        }}
      >
        <Button
          buttonColor={Constants.colors.products}
          textColor={Constants.colors.lightGray}
          labelStyle={styles.saveButton}
          style={{ width: 100 }}
          onPress={service.updateItem}
        >
          <ThemedText style={styles.saveText}>حفظ</ThemedText>
        </Button>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>اسم المنتج</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder="أدخل الإسم"
          placeholderTextColor="#999"
          value={service.item.itemName}
          onChangeText={service.setItemName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>السعر</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل السعر"
          placeholderTextColor="#999"
          value={service.item.itemPrice?.toString()}
          keyboardType="decimal-pad"
          onChangeText={service.setItemPrice}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الكمية</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل الكمية"
          placeholderTextColor="#999"
          value={service.item.itemQuantity?.toString()}
          keyboardType="numeric"
          onChangeText={service.setItemQuantity}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>التاجر</ThemedText>
        <CustomDropDown
          value={service.item.item_ProviderId}
          setValue={(value) => service.setProvider(value as number)}
          data={service.providers}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الملاحظات</ThemedText>
        <TextInput
          style={[styles.textInput, styles.textArea] as StyleProp<TextStyle>}
          placeholder="أدخل الملاحظات"
          placeholderTextColor="#999"
          value={service.item.itemNotes}
          onChangeText={service.setItemNotes}
        />
      </View>
      <View style={styles.row}>
        <ValidationMessage validation={service.validation} />
      </View>
    </View>
  );
}
