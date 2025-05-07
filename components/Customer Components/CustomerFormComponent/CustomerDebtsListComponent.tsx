import { ScrollView, View } from "react-native";
import styles from "./CustomerFormComponent.style";
import { ThemedText } from "@/Components/HelperComponents/ThemedText";
import Constants from "@/Global/Constants/Constants";
import useCustomerFormComponentService from "./CustomerFormComponent.service";
import ICustomerFormProps from "@/Global/ViewModels/Customers/ICustomerFormProps";
import { DataTable } from "react-native-paper";
import useDataTable from "@/Global/Hooks/useDataTable";

export default function CustomerDebtsListComponent({
  id,
  updateFromCustomersList,
}: ICustomerFormProps) {
  const { borrowList, options } = useCustomerFormComponentService({
    id,
    updateFromCustomersList,
  });

  const { from, to, Pagination } = useDataTable(borrowList);

  return (
    <View style={styles.dataTableContainer}>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.column}>
              <ThemedText type="medium">Product Name</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={styles.column} numeric>
              <ThemedText type="medium">Price</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={styles.column} numeric>
              <ThemedText type="medium">Quantity</ThemedText>
            </DataTable.Title>
            <DataTable.Title style={styles.dateColumn}>
              <ThemedText type="medium">Date</ThemedText>
            </DataTable.Title>
          </DataTable.Header>

          {borrowList.slice(from, to).map((item) => (
            <DataTable.Row key={item.innerDebtItemId}>
              <DataTable.Cell style={styles.column}>
                <ThemedText type="small">{item.itemName}</ThemedText>
              </DataTable.Cell>
              <DataTable.Cell style={styles.column} numeric>
                {item.innerDebtItemTotalPrice}
              </DataTable.Cell>
              <DataTable.Cell style={styles.column} numeric>
                {item.innerDebtItemQuantity}
              </DataTable.Cell>
              <DataTable.Cell style={styles.dateColumn} numeric>
                {new Date(item.innerDebtDate ?? "")?.toLocaleDateString(
                  "en-US",
                  options
                )}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
      {Pagination()}
    </View>
  );
}
