import { ScrollView } from "react-native";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDown from "@/Shared/Components/DropDown";
import styles from "./InternalDebtProductsList.style";
import { ThemedText } from "@/Shared/Components/ThemedText";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { DataTable } from "react-native-paper";
import globalStyles from "@/Shared/Styles/global.style";
import React from "react";
import useDataTable from "@/Shared/Hooks/useDataTable";
import i18n from "@/Shared/I18n/I18n";
import IInternalDebtsProductsListService from "@/Models/InternalDebts/IInternalDebtsProductsListService";
import IInput from "@/Shared/Components/IInput";
export default function InternalDebtProductsList(
  props: IInternalDebtsProductsListService
) {
  const { from, to, Pagination } = useDataTable(
    props.internalDebt.InternalDebtProducts || []
  );

  return (
    <View style={styles.dataTableContainer}>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={globalStyles.column}>
              <ThemedText fontSize={12}>{i18n.t("product-name")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.column}>
              <ThemedText fontSize={12}>{i18n.t("product-price")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.column} numeric>
              <ThemedText fontSize={12}>{i18n.t("quantity")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.column} numeric>
              <ThemedText fontSize={12}>{i18n.t("total-price")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.iconColumn}>
              <View />
            </DataTable.Title>
          </DataTable.Header>

          {(props.internalDebt.InternalDebtProducts || [])
            .slice(from, to)
            .map((item) => (
              <DataTable.Row key={item.Id}>
                <DataTable.Cell style={globalStyles.column}>
                  <ThemedText>{item.Product?.Name}</ThemedText>
                </DataTable.Cell>
                <DataTable.Cell style={globalStyles.column}>
                  <ThemedText>{item.Product?.Price}</ThemedText>
                </DataTable.Cell>
                <DataTable.Cell style={globalStyles.column} numeric>
                  {item.Quantity}
                </DataTable.Cell>
                <DataTable.Cell style={globalStyles.column} numeric>
                  {item.TotalPrice}
                </DataTable.Cell>
                <DataTable.Cell style={globalStyles.iconColumn}>
                  <TouchableOpacity
                    onPress={() => props.handleDeleteProduct(item.Id)}
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
            {props.showAddProduct ? (
              <View style={styles.addProducts}>
                <DropDown
                  style={globalStyles.column}
                  value={-1}
                  setValue={(value) =>
                    props.setInternalDebtsProduct(value as number)
                  }
                  data={props.dropDownItems}
                  placeholder={i18n.t("select-product")}
                />
                <IInput
                  style={[globalStyles.column, styles.textInput]}
                  size="medium"
                  keyboardType="numeric"
                  placeholder={i18n.t("quantity")}
                  value={props.newInternalDebtsProduct?.Quantity?.toString()}
                  onChangeText={props.setInternalProductQuantity}
                  onSubmitEditing={props.handleAddProduct}
                />
                <View style={{ gap: 10, flexDirection: "row" }}>
                  <TouchableOpacity onPress={props.handleAddProduct}>
                    <Ionicons name="checkmark" size={24} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.toggleAddProduct(false)}
                  >
                    <Ionicons name="close-sharp" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <DataTable.Cell style={globalStyles.column}>
                <Ionicons
                  style={styles.addIcon}
                  onPress={() => props.toggleAddProduct(true)}
                  name="add"
                  size={24}
                  color="green"
                />
              </DataTable.Cell>
            )}
          </DataTable.Row>
        </DataTable>
      </ScrollView>
      {!props.showAddProduct && <Pagination />}
    </View>
  );
}
