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
  const { customer, formatNumber, options } = useCustomerFormComponentService({
    id,
    updateFromCustomersList,
  });
  return (
    <ScrollView style={styles.customerScrollView}>
      {(customer?.borrowList?.length as number) > 0 && (
        <View style={styles.borrowedListContainer}>
          <View>
            <ThemedText style={styles.borrowedListTitle}>
              قائمة الديون
            </ThemedText>
          </View>
          <View style={styles.borrowedList}>
            {customer.borrowList?.map((item) => {
              const totalPrice = formatNumber(item.TotalPrice);
              const pricePaid = formatNumber(item.PricePaid);
              return (
                <View key={item.InnerDebtId} style={styles.borrowedListItem}>
                  <ThemedText style={[{ color: Constants.colors.red }]}>
                    {totalPrice}
                  </ThemedText>
                  <ThemedText style={[{ color: Constants.colors.green }]}>
                    {pricePaid}
                  </ThemedText>
                  <ThemedText type="default">
                    {new Date(item.Date ?? "")?.toLocaleDateString(
                      "ar-lb",
                      options
                    )}
                  </ThemedText>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
