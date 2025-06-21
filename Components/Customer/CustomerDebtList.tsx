import { ScrollView, View } from "react-native";
import styles from "./CustomerForm.style";
import { ThemedText } from "@/Global/Reusable Components/HelperComponents/ThemedText";
import ICustomerFormProps from "@/ViewModels/Customers/ICustomerFormProps";
import { DataTable } from "react-native-paper";
import useDataTable from "@/Global/Hooks/useDataTable";
import globalStyles from "@/Global/Styles/global.style";
import i18n from "@/Global/I18n/I18n";
import { dateOptions } from "@/Global/Constants/DateOptions";
import useCustomerFormService from "./CustomerForm.service";

export default function CustomerDebtList(props: ICustomerFormProps) {
  const { borrowList } = useCustomerFormService(props);

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
            <DataTable.Row key={item.internalDebtProductId}>
              <DataTable.Cell style={globalStyles.column}>
                <ThemedText>{item.productName}</ThemedText>
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.column}>
                <ThemedText>${item.productPrice}</ThemedText>
              </DataTable.Cell>

              <DataTable.Cell style={globalStyles.column} numeric>
                <ThemedText>{item.internalDebtProductQuantity}</ThemedText>
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.column} numeric>
                <ThemedText>
                  ${item.internalDebtProductTotalPrice.toFixed(2)}
                </ThemedText>
              </DataTable.Cell>
              <DataTable.Cell style={globalStyles.dateColumn} numeric>
                <ThemedText>
                  {new Date(item.internalDebtDate ?? "")?.toLocaleDateString(
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
