import { ScrollView, View } from "react-native";
import styles from "./CustomerForm.style";
import { ThemedText } from "@/Shared/Reusable Components/HelperComponents/ThemedText";
import { DataTable } from "react-native-paper";
import useDataTable from "@/Shared/Hooks/useDataTable";
import globalStyles from "@/Shared/Styles/global.style";
import i18n from "@/Shared/I18n/I18n";
import { dateOptions } from "@/Shared/Constants/DateOptions";
import useCustomerFormService from "./CustomerForm.service";
import ICustomerFormProps from "@/Models/Customers/ICustomerFormProps";

export default function CustomerDebtList(props: ICustomerFormProps) {
  const { borrowList } = useCustomerFormService(props);

  const { from, to, Pagination } = useDataTable(borrowList);

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
              <ThemedText fontSize={12}>{i18n.t("price")}</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={globalStyles.dateColumn}>
              <ThemedText fontSize={12}>{i18n.t("date")}</ThemedText>
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
