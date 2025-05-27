import { ScrollView, View } from "react-native";
import styles from "./EditCustomer.style";
import { ThemedText } from "@/Global/Reusable Components/HelperComponents/ThemedText";
import useEditCustomerService from "./EditCustomer.service";
import ICustomerFormProps from "@/ViewModels/Customers/ICustomerFormProps";
import { DataTable } from "react-native-paper";
import useDataTable from "@/Global/Hooks/useDataTable";
import globalStyles from "@/Global/Styles/global.style";
import i18n from "@/Global/I18n/I18n";
import { dateOptions } from "@/Global/Constants/DateOptions";

export default function CustomerDebtList(props: ICustomerFormProps) {
  const { borrowList } = useEditCustomerService(props);

  const { from, to, Pagination } = useDataTable(borrowList);

  return (
    <View style={styles.dataTableContainer}>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={globalStyles.column}>
              <ThemedText>{i18n.t("product-name")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.column}>
              <ThemedText>{i18n.t("product-price")}</ThemedText>
            </DataTable.Title>

            <DataTable.Title style={globalStyles.column} numeric>
              <ThemedText>{i18n.t("quantity")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.column} numeric>
              <ThemedText>{i18n.t("price")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.dateColumn}>
              <ThemedText>{i18n.t("date")}</ThemedText>
            </DataTable.Title>
          </DataTable.Header>

          {borrowList.slice(from, to).map((item) => (
            <DataTable.Row key={item.innerDebtItemId}>
              <DataTable.Cell style={globalStyles.column}>
                <ThemedText>{item.itemName}</ThemedText>
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.column}>
                <ThemedText>${item.itemPrice}</ThemedText>
              </DataTable.Cell>

              <DataTable.Cell style={globalStyles.column} numeric>
                <ThemedText>{item.innerDebtItemQuantity}</ThemedText>
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.column} numeric>
                <ThemedText>
                  ${item.innerDebtItemTotalPrice.toFixed(2)}
                </ThemedText>
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.dateColumn} numeric>
                <ThemedText>
                  {new Date(item.innerDebtDate ?? "")?.toLocaleDateString(
                    i18n.locale,
                    dateOptions
                  )}
                </ThemedText>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      {<Pagination />}
    </View>
  );
}
