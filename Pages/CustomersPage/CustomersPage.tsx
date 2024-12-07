import { View, Text } from "react-native";
import useCustomersPageService from "./CustomersPage.service";
import styles from "./CustomersPage.style";
import CustomAccordionComponent from "@/Components/AccordionComponent/AccordionComponent";
import { CustomerFormComponent } from "@/Components/CustomerFormComponent/CustomerFormComponent";
import Constants from "@/Global/Constants/Constants";

export default function CustomersPage() {
  const CustomersPageService = useCustomersPageService();
  return (
    <CustomAccordionComponent
      style={{ margin: 10 }}
      headerColor={Constants.colors.blue}
      iconColor={Constants.colors.lightGray}
      header={
        <View>
          <Text style={styles.CustomerHeaderText}> حسن مصطفى </Text>
        </View>
      }
    >
      <CustomerFormComponent />
    </CustomAccordionComponent>
  );
}
