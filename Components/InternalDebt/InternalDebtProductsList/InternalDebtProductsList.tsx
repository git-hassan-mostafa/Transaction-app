import { ScrollView } from "react-native";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomDropDown from "@/Global/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import IInnerDebtsItemsListProps from "@/ViewModels/InnerDebts/IInnerDebtsItemsListProps";
import styles from "./InternalDebtProductsList.style";
import { ThemedText } from "@/Global/Reusable Components/HelperComponents/ThemedText";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { DataTable } from "react-native-paper";
import globalStyles from "@/Global/Styles/global.style";
import React from "react";
import useDataTable from "@/Global/Hooks/useDataTable";
import i18n from "@/Global/I18n/I18n";
export default function InternalDebtProductsList(
  props: IInnerDebtsItemsListProps
) {
  const { from, to, Pagination } = useDataTable(props.innerDebtsItems);

  return (
    <View style={styles.dataTableContainer}>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={globalStyles.column}>
              <ThemedText>{i18n.t("product-name")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.column} numeric>
              <ThemedText>{i18n.t("quantity")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.column} numeric>
              <ThemedText>{i18n.t("total-price")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.iconColumn}>
              <View />
            </DataTable.Title>
          </DataTable.Header>

          {props.innerDebtsItems.slice(from, to).map((item) => (
            <DataTable.Row key={item.innerDebtItemId}>
              <DataTable.Cell style={globalStyles.column}>
                <ThemedText>{item.productName}</ThemedText>
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.column} numeric>
                {item.innerDebtItemQuantity}
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.column} numeric>
                {item.innerDebtItemTotalPrice}
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.iconColumn}>
                <TouchableOpacity
                  onPress={() => props.handleDeleteItem(item.innerDebtItemId)}
                >
                  <MaterialIcon
                    style={globalStyles.delete}
                    name="delete-forever"
                  />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Row>
            {props.showAddItem ? (
              <React.Fragment>
                <DataTable.Cell style={globalStyles.column}>
                  <CustomDropDown
                    dropDownStyle={styles.dropDownStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    placeholderStyle={styles.placeholderStyle}
                    value={-1}
                    setValue={(value) =>
                      props.setInnerDebtsItem(value as number)
                    }
                    data={props.dropDownItems}
                    placeholder={i18n.t("select-product")}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={globalStyles.column} numeric>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.textInput}
                    placeholder={i18n.t("quantity")}
                    value={props.newInnerDebtsItem?.innerDebtItemQuantity?.toString()}
                    onChangeText={props.setNewItemQuantity}
                    onSubmitEditing={props.handleAddItem}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={globalStyles.column} numeric>
                  <TouchableOpacity onPress={props.handleAddItem}>
                    <Ionicons name="checkmark" size={24} color="green" />
                  </TouchableOpacity>
                </DataTable.Cell>
              </React.Fragment>
            ) : (
              <DataTable.Cell style={globalStyles.column}>
                <Ionicons
                  style={styles.addIcon}
                  onPress={() => props.toggleAddItem(true)}
                  name="add"
                  size={24}
                  color="green"
                />
              </DataTable.Cell>
            )}
          </DataTable.Row>
        </DataTable>
      </ScrollView>
      {!props.showAddItem && <Pagination />}
    </View>
  );
}
