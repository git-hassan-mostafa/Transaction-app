import React from "react";
import { View, TextInput, StyleProp, TextStyle } from "react-native";
import { ThemedText } from "../../HelperComponents/ThemedText";
import { IItemProps } from "./ItemFormComponent.types";
import useItemFormComponentService from "./ItemFormComponent.service";
import styles from "./ItemFormComponent.style";
import CustomDropDown from "@/Components/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";

export function ItemFormComponent({ id, updateFromItemsList }: IItemProps) {
  const {
    item,
    setItemName,
    setItemPrice,
    setItemQuantity,
    setProvider,
    setItemNotes,
    updateItemName,
    updateItemPrice,
    updateItemQuantity,
    updateItemProvider,
    updateItemNotes,
    providers,
  } = useItemFormComponentService({
    id,
    updateFromItemsList,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>اسم المنتج</ThemedText>
        <TextInput
          style={styles.textInput as StyleProp<TextStyle>}
          placeholder="أدخل الإسم"
          placeholderTextColor="#999"
          value={item.name}
          onChangeText={setItemName}
          onEndEditing={updateItemName}
        />
      </View>

      <View style={styles.row}>
        <ThemedText style={styles.label}>السعر</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل السعر"
          placeholderTextColor="#999"
          value={item.price?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setItemPrice(text)}
          onEndEditing={updateItemPrice}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الكمية</ThemedText>
        <TextInput
          style={styles.input as StyleProp<TextStyle>}
          placeholder="أدخل الكمية"
          placeholderTextColor="#999"
          value={item.quantity?.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setItemQuantity(text)}
          onEndEditing={updateItemQuantity}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>التاجر</ThemedText>
        <CustomDropDown
          value={item.providerId}
          setValue={(value) => {
            setProvider(value as number);
            updateItemProvider(value as number);
          }}
          data={providers}
        />
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>الملاحظات</ThemedText>
        <TextInput
          style={[styles.textInput, styles.textArea] as StyleProp<TextStyle>}
          placeholder="أدخل الملاحظات"
          placeholderTextColor="#999"
          value={item.name}
          onChangeText={setItemNotes}
          onEndEditing={updateItemNotes}
        />
      </View>
    </View>
  );
}
