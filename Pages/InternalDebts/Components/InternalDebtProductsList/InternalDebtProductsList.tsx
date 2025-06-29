import { ScrollView } from "react-native";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomDropDown from "@/Shared/Reusable Components/CustomDropDownComponent/CustomDropDownComponent";
import styles from "./InternalDebtProductsList.style";
import { ThemedText } from "@/Shared/Reusable Components/HelperComponents/ThemedText";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { DataTable } from "react-native-paper";
import globalStyles from "@/Shared/Styles/global.style";
import React from "react";
import useDataTable from "@/Shared/Hooks/useDataTable";
import i18n from "@/Shared/I18n/I18n";
import IInternalDebtsProductsListProps from "@/Models/InternalDebts/IInternalDebtsProductsListProps";
export default function InternalDebtProductsList(
  props: IInternalDebtsProductsListProps
) {
  const { from, to, Pagination } = useDataTable(props.internalDebtsProducts);

  return (
    <View style={styles.dataTableContainer}>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={globalStyles.column}>
              <ThemedText fontSize={12}>{i18n.t("product-name")}</ThemedText>
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

          {props.internalDebtsProducts.slice(from, to).map((item) => (
            <DataTable.Row key={item.internalDebtProductId}>
              <DataTable.Cell style={globalStyles.column}>
                <ThemedText>{item.productName}</ThemedText>
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.column} numeric>
                {item.internalDebtProductQuantity}
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.column} numeric>
                {item.internalDebtProductTotalPrice}
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.iconColumn}>
                <TouchableOpacity
                  onPress={() =>
                    props.handleDeleteProduct(item.internalDebtProductId)
                  }
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
              <React.Fragment>
                <DataTable.Cell style={globalStyles.column}>
                  <CustomDropDown
                    dropDownStyle={styles.dropDownStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    placeholderStyle={styles.placeholderStyle}
                    value={-1}
                    setValue={(value) =>
                      props.setInternalDebtsProduct(value as number)
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
                    value={props.newInternalDebtsProduct?.internalDebtProductQuantity?.toString()}
                    onChangeText={props.setNewProductQuantity}
                    onSubmitEditing={props.handleAddProduct}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={globalStyles.column} numeric>
                  <TouchableOpacity onPress={props.handleAddProduct}>
                    <Ionicons name="checkmark" size={24} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.toggleAddProduct(false)}
                  >
                    <Ionicons name="close-sharp" size={24} color="red" />
                  </TouchableOpacity>
                </DataTable.Cell>
              </React.Fragment>
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
