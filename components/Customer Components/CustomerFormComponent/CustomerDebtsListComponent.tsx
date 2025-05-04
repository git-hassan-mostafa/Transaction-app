import { ScrollView, View } from "react-native";
import styles from "./CustomerFormComponent.style";
import { ThemedText } from "@/Components/HelperComponents/ThemedText";
import Constants from "@/Global/Constants/Constants";
import useCustomerFormComponentService from "./CustomerFormComponent.service";
import ICustomerFormProps from "@/Global/ViewModels/Customers/ICustomerFormProps";

export default function CustomerDebtsListComponent({
  id,
  updateFromCustomersList,
}: ICustomerFormProps) {
  const { customer, borrowList, options } = useCustomerFormComponentService({
    id,
    updateFromCustomersList,
  });
  return (
    <ScrollView style={styles.customerScrollView}>
      {(borrowList?.length as number) > 0 && (
        <View style={styles.borrowedListContainer}>
          <View style={styles.borrowedList}>
            <View style={styles.itemRowTitle}>
              <ThemedText type="small" style={[styles.itemName]}>
                اسم المنتج
              </ThemedText>
              <ThemedText style={styles.column} type="small">
                السعر
              </ThemedText>
              <ThemedText style={styles.column} type="small">
                الكمية
              </ThemedText>
              <ThemedText style={styles.dateColumn} type="small">
                التاريخ
              </ThemedText>
            </View>
            <View style={styles.borrowedList}>
              {borrowList?.map((item) => {
                return (
                  <View key={item.innerDebtItemId} style={styles.itemRow}>
                    <ThemedText
                      type="medium"
                      style={[
                        styles.itemName,
                        { color: Constants.colors.darkGray },
                      ]}
                    >
                      {item.itemName.length > 10
                        ? item.itemName.slice(0, 7) + "..."
                        : item.itemName}
                    </ThemedText>
                    <ThemedText
                      type="medium"
                      style={[styles.column, { color: Constants.colors.red }]}
                    >
                      ${item.innerDebtItemTotalPrice}
                    </ThemedText>
                    <ThemedText
                      type="medium"
                      style={[styles.column, { color: Constants.colors.blue }]}
                    >
                      {item.innerDebtItemQuantity}
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.dateColumn,
                        { color: Constants.colors.darkGray },
                      ]}
                      type="medium"
                    >
                      {new Date(item.innerDebtDate ?? "")?.toLocaleDateString(
                        "ar-lb",
                        options
                      )}
                    </ThemedText>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
