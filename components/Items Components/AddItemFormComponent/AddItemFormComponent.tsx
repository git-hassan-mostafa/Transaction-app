import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import Constants from "@/Global/Constants/Constants";
import { TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { ThemedText } from "../../HelperComponents/ThemedText";
import styles from "./AddItemFormComponent.style";
import useAddItemFormComponentService from "./AddItemFormComponent.service";
import CustomDropDown from "@/Components/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import IAddItemProps from "@/Global/ViewModels/Items/IAddItemProps";

export default function AddItemFormComponent({
  toggleModal,
  addToItemsList,
}: IAddItemProps) {
  const {
    item,
    providers,
    setItemName,
    setItemQuantity,
    setItemPrice,
    setProvider,
    setcustomerNotes,
    addItem,
  } = useAddItemFormComponentService({
    toggleModal,
    addToItemsList,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>اسم المنتج</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder="أدخل الإسم"
          placeholderTextColor="#999"
          value={item.itemName}
          onChangeText={setItemName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>السعر</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل السعر"
          placeholderTextColor="#999"
          value={item.itemPrice?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setItemPrice(text)}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الكمية</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل الكمية"
          placeholderTextColor="#999"
          value={item.itemQuantity?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setItemQuantity(text)}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>التاجر</ThemedText>
        <CustomDropDown
          value={item.item_ProviderId}
          setValue={(value) => setProvider(value as number)}
          data={providers}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الملاحظات</ThemedText>
        <TextInput
          style={[styles.textInput, styles.textArea] as StyleProp<TextStyle>}
          placeholder=" أدخل الملاحظات"
          placeholderTextColor="#999"
          value={item.itemNotes}
          onChangeText={setcustomerNotes}
        />
      </View>
      <TouchableOpacity>
        <Button
          buttonColor={Constants.colors.orange}
          textColor={Constants.colors.lightGray}
          labelStyle={styles.saveButton}
          onPress={addItem}
        >
          <ThemedText style={styles.saveText}>حفظ</ThemedText>
        </Button>
      </TouchableOpacity>
    </View>
  );
}
