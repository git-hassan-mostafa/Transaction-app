import ICustomerFormProps from "@/Models/Customers/ICustomerFormProps";
import useCustomerFormService from "./CustomerForm.service";
import useDataTable from "@/Shared/Hooks/useDataTable";
import React from "react";
import { ScrollView, View } from "react-native";
import { DataTable } from "react-native-paper";
import { ThemedText } from "@/Shared/Components/ThemedText";
import globalStyles from "@/Shared/Styles/global.style";
import { fromatLocaleDate } from "@/Shared/Helpers/Functions/FormatDate";
import i18n from "@/Shared/I18n/I18n";
import styles from "./CustomerForm.style";

export default function CustomerPayments(props: ICustomerFormProps) {
  const service = useCustomerFormService(props);
  const { from, to, Pagination } = useDataTable(service.customer.Debts || []);

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
          </DataTable.Header>

          {(props.formData.Debts?.flatMap((i) => i.InternalDebtPayments) || [])
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
              </DataTable.Row>
            ))}
        </DataTable>
      </ScrollView>
      <Pagination />
    </View>
  );
}
