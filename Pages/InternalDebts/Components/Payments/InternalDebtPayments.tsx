import { ScrollView } from "react-native";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/Shared/Components/ThemedText";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { DataTable } from "react-native-paper";
import globalStyles from "@/Shared/Styles/global.style";
import React from "react";
import useDataTable from "@/Shared/Hooks/useDataTable";
import i18n from "@/Shared/I18n/I18n";
import IInput from "@/Shared/Components/IInput";
import styles from "./InternalDebtPayments.style";
import IInternalDebtsPaymentsService from "@/Models/InternalDebts/IInternalDebtsPaymentsService";
import { fromatLocaleDate } from "@/Shared/Helpers/Functions/FormatDate";
export default function InternalDebtPayments(
  props: IInternalDebtsPaymentsService
) {
  const { from, to, Pagination } = useDataTable(
    props.internalDebt.InternalDebtPayments || []
  );

  return (
    <View style={styles.dataTableContainer}>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={globalStyles.numberColumn}>
              <ThemedText fontSize={12}>{i18n.t("amount")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.dateColumn}>
              <ThemedText fontSize={12}>{i18n.t("date")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.iconColumn}>
              <View />
            </DataTable.Title>
          </DataTable.Header>

          {(props.internalDebt.InternalDebtPayments || [])
            .slice(from, to)
            .map((item) => (
              <DataTable.Row key={item.Id}>
                <DataTable.Cell style={globalStyles.numberColumn}>
                  <ThemedText fontSize={12}>${item.Amount}</ThemedText>
                </DataTable.Cell>
                <DataTable.Cell style={globalStyles.dateColumn}>
                  <ThemedText fontSize={12}>
                    {fromatLocaleDate(item.Date)}
                  </ThemedText>
                </DataTable.Cell>
                <DataTable.Cell style={globalStyles.iconColumn}>
                  <TouchableOpacity
                    onPress={() => props.handleDeletePayment(item.Id)}
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
            {props.showAddPayment ? (
              <View style={styles.addPayment}>
                <IInput
                  style={[globalStyles.numberColumn, styles.textInput]}
                  keyboardType="numeric"
                  // placeholder={i18n.t("amount")}
                  value={props.newPayment?.Amount?.toString()}
                  onChangeText={props.setPaymentAmount}
                  onSubmitEditing={props.handleAddPayment}
                />
                <View style={{ gap: 10, flexDirection: "row" }}>
                  <TouchableOpacity onPress={props.handleAddPayment}>
                    <Ionicons name="checkmark" size={24} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.toggleAddPayment(false)}
                  >
                    <Ionicons name="close-sharp" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <DataTable.Cell style={globalStyles.column}>
                <Ionicons
                  style={styles.addIcon}
                  onPress={() => props.toggleAddPayment(true)}
                  name="add"
                  size={24}
                  color="green"
                />
              </DataTable.Cell>
            )}
          </DataTable.Row>
        </DataTable>
      </ScrollView>
      {!props.showAddPayment && <Pagination />}
    </View>
  );
}
