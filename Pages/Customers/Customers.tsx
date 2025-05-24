import { View, FlatList } from "react-native";
import useCustomersService from "./Customers.service";
import styles from "./Customers.style";
import AccordionComponent from "@/Components/Reusables/AccordionComponent/AccordionComponent";
import { EditCustomer } from "@/Components/Customer/Edit/EditCustomer";
import Constants from "@/Global/Constants/Constants";
import { FAB } from "react-native-paper";
import React from "react";
import AddCustomer from "@/Components/Customer/Add/AddCustomer";
import CustomModal from "@/Components/Reusables/CustomModalComponent/CustomModalComponent";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";

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
          <AccordionComponent
            key={item.customerId}
            headerColor={Constants.colors.customers}
            iconColor={Constants.colors.lightGray}
            headerText={item.customerName as string}
            id={item.customerId as number}
            handleDelete={service.handleDeleteCustomer}
          >
            <EditCustomer
              id={item.customerId as number}
              updateFromCustomersList={service.updateFromCustomersList}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={i18n.t("add-customer")}
        isVisible={service.modalVisible}
        onClose={service.toggleModal}
      >
        <AddCustomer
          addToCustomersList={service.addToCustomersList}
          toggleModal={service.toggleModal}
        />
      </CustomModal>
      <FAB
        onPress={service.toggleModal}
        color={Constants.colors.lightGray}
        style={[pageStyle.fab, styles.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
