import { View, FlatList } from "react-native";
import useCustomersService from "./Customers.service";
import styles from "./Customers.style";
import { CustomerForm } from "@/Pages/Customers/Components/CustomerForm";
import Constants from "@/Shared/Constants/Constants";
import { FAB } from "react-native-paper";
import React from "react";
import CustomModal from "@/Shared/Reusable Components/CustomModalComponent/CustomModalComponent";
import pageStyle from "@/Shared/Styles/pages.global.style";
import i18n from "@/Shared/I18n/I18n";
import ListItem from "@/Shared/Reusable Components/ListItem/ListItem";
import ICustomer from "@/Models/Customers/ICustomer";
import { useDirtyChecker } from "@/Shared/Hooks/useDirtyState";
import CustomActivityIndicatorComponent from "@/Shared/Reusable Components/CustomActivityIndicatorComponent/CustomActivityIndicatorComponent";
import { ThemedText } from "@/Shared/Reusable Components/HelperComponents/ThemedText";

export default function Customers() {
  const service = useCustomersService();
  const dirtyChecker = useDirtyChecker<ICustomer>();

  // Show loading indicator
  if (service.isLoading) {
    return (
      <View
        style={[
          pageStyle.flatList,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <CustomActivityIndicatorComponent size="large" />
        <ThemedText style={{ marginTop: 10 }}>Loading customers...</ThemedText>
      </View>
    );
  }

  // Show error state
  if (service.error) {
    return (
      <View
        style={[
          pageStyle.flatList,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ThemedText
          style={{
            color: Constants.colors.red,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {service.error}
        </ThemedText>
        <FAB
          onPress={() => service.getAllCustomers()}
          color={Constants.colors.lightGray}
          style={[pageStyle.fab, styles.fab]}
          icon="refresh"
        />
      </View>
    );
  }

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={service.customers}
        numColumns={1}
        keyExtractor={(item) => item.customerId?.toString() as string}
        renderItem={({ item }: { item: ICustomer }) => (
          <ListItem
            sign={{ visible: true, color: Constants.colors.customers }}
            color={Constants.colors.customers}
            title={item.customerName}
            subTitle={{
              text: "$" + item.customerBorrowedPrice?.toString(),
              color: Constants.colors.red,
            }}
            onDelete={() => service.handleDeleteCustomer(item.customerId)}
            onEdit={() => service.onEdit(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 50,
            }}
          >
            <ThemedText style={{ color: Constants.colors.darkGray }}>
              No customers found
            </ThemedText>
          </View>
        )}
      />
      <CustomModal
        title={
          service.modalOptions.formData.customerId
            ? i18n.t("edit-customer")
            : i18n.t("add-customer")
        }
        isVisible={service.modalOptions.visible}
        onClose={() => dirtyChecker.showAlertIfDirty(service.toggleModal)}
      >
        <CustomerForm
          formData={service.modalOptions.formData}
          dirtyChecker={dirtyChecker}
          save={service.save}
        />
      </CustomModal>
      <FAB
        onPress={() => service.toggleModal()}
        color={Constants.colors.lightGray}
        style={[pageStyle.fab, styles.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
