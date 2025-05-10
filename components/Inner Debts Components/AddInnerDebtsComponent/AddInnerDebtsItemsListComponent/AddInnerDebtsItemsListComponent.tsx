import { ScrollView } from "react-native";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomDropDown from "@/Components/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import IInnerDebtsItemsListProps from "@/Global/ViewModels/InnerDebts/IInnerDebtsItemsListProps";
import styles from "./AddInnerDebtsItemsListComponent.style";
import { ThemedText } from "@/Components/Reusable Components/HelperComponents/ThemedText";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AddInnerDebtsItemsListComponent(
  props: IInnerDebtsItemsListProps
) {
  return (
    <ScrollView style={{ height: 500 }}>
      <View>
        <View style={styles.itemsRow}>
          <View style={styles.itemRowTitle}>
            <ThemedText type="small" style={[styles.item]}>
              اسم المنتج
            </ThemedText>
            <ThemedText type="small">السعر</ThemedText>
            <ThemedText type="small">الكمية</ThemedText>
            <ThemedText></ThemedText>
          </View>
          {props.innerDebtsItems.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <ThemedText style={styles.item}>
                {item?.itemName?.slice(0, 10)}
                {item?.itemName?.length > 10 ? "..." : ""}
              </ThemedText>
              <ThemedText>{item?.itemPrice}</ThemedText>
              <ThemedText>{item?.innerDebtItemQuantity}</ThemedText>
              <TouchableOpacity
                onPress={() => props.handleDeleteItem(item.innerDebtItemId)}
              >
                <MaterialIcon style={styles.delete} name="delete-forever" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {props.showAddItem ? (
          <View style={styles.addItemRow}>
            <CustomDropDown
              dropDownStyle={styles.dropDownStyle}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              placeholderStyle={styles.placeholderStyle}
              value={-1}
              setValue={(value) => props.setInnerDebtsItem(value as number)}
              data={props.dropDownItems}
              placeholder="اختر منتج"
            />
            <TextInput
              keyboardType="numeric"
              style={styles.textInput}
              placeholder="الكمية"
              value={props.newInnerDebtsItem?.innerDebtItemQuantity?.toString()}
              onChangeText={props.setNewItemQuantity}
              onSubmitEditing={props.handleAddItem}
            />
            <TouchableOpacity onPress={props.handleAddItem}>
              <Ionicons name="checkmark" size={20} color="green" />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Ionicons
              style={styles.addIcon}
              onPress={() => props.toggleAddItem(true)}
              name="add"
              size={24}
              color="green"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
