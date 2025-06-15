import { View, FlatList } from "react-native";
import useCustomersService from "./Customers.service";
import styles from "./Customers.style";
import { CustomerForm } from "@/Components/Customer/CustomerForm";
import Constants from "@/Global/Constants/Constants";
import { FAB } from "react-native-paper";
import React from "react";
import CustomModal from "@/Global/Reusable Components/CustomModalComponent/CustomModalComponent";
import ICustomer from "@/ViewModels/Customers/ICustomer";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";
import ListItem from "@/Global/Reusable Components/ListItem/ListItem";

export default function Customers() {
  const service = useCustomersService();

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
            onEdit={() => service.onEdit(item.customerId)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={
          service.modalOptions.id
            ? i18n.t("edit-customer")
            : i18n.t("add-customer")
        }
        isVisible={service.modalOptions.visible}
        onClose={service.toggleModal}
      >
        <CustomerForm
          toggleModal={service.toggleModal}
          id={service.modalOptions.id}
          updateFromCustomersList={service.updateFromCustomersList}
          addToCustomersList={service.addToCustomersList}
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
