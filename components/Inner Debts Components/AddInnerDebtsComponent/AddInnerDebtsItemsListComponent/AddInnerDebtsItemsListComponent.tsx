import { ScrollView } from "react-native";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomDropDown from "@/Components/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import IAddInnerDebtsItemsListProps from "@/Global/ViewModels/InnerDebts/IAddInnerDebtsItemsProps";
import styles from "./AddInnerDebtsItemsListComponent.style";
import { ThemedText } from "@/Components/HelperComponents/ThemedText";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AddInnerDebtsItemsListComponent(
  props: IAddInnerDebtsItemsListProps
) {
  return (
    <ScrollView style={{ height: 500 }}>
      <View>
        <View style={styles.itemsRow}>
          {props.innerDebtsItems.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <ThemedText style={styles.item}>
                {item?.itemName?.slice(0, 12)}
                {item?.itemName?.length > 12 ? "..." : ""}
              </ThemedText>
              <ThemedText>{item?.price}</ThemedText>
              <ThemedText>{item?.innerDebtQuantity}</ThemedText>
              <TouchableOpacity onPress={props.handleAddItem}>
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
              data={props.items}
              placeholder="اختر منتج"
            />
            <TextInput
              keyboardType="numeric"
              style={styles.textInput}
              // placeholder="Price"
              value={props.newInnerDebtsItem?.price?.toString()}
              onChangeText={props.setNewItemPrice}
            />
            <TextInput
              keyboardType="numeric"
              style={styles.textInput}
              // placeholder="Quantity"
              value={props.newInnerDebtsItem?.innerDebtQuantity?.toString()}
              onChangeText={props.setNewItemQuantity}
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
