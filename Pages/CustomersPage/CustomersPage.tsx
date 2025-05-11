import { View, FlatList } from "react-native";
import useCustomersPageService from "./CustomersPage.service";
import styles from "./CustomersPage.style";
import AccordionComponent from "@/Components/Reusable Components/AccordionComponent/AccordionComponent";
import { CustomerFormComponent } from "@/Components/Customer Components/CustomerFormComponent/CustomerFormComponent";
import Constants from "@/Global/Constants/Constants";
import { FAB } from "react-native-paper";
import React from "react";
import AddCustomerFormComponent from "@/Components/Customer Components/AddCustomerFormComponent/AddCustomerFormComponent";
import CustomModal from "@/Components/Reusable Components/CustomModalComponent/CustomModalComponent";
import ICustomer from "@/Global/ViewModels/Customers/ICustomer";
import pageStyle from "@/Global/Styles/pages.global.style";

export default function CustomersPage() {
  const {
    customers,
    modalVisible,
    toggleModal,
    addToCustomersList,
    updateFromCustomersList,
    handleDeleteCustomer,
  } = useCustomersPageService();

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={customers}
        numColumns={1}
        keyExtractor={(item) => item.customerId?.toString() as string}
        renderItem={({ item }: { item: ICustomer }) => (
          <AccordionComponent
            key={item.customerId}
            headerColor={Constants.colors.blue}
            iconColor={Constants.colors.lightGray}
            headerText={item.customerName as string}
            id={item.customerId as number}
            handleDelete={handleDeleteCustomer}
          >
            <CustomerFormComponent
              id={item.customerId as number}
              updateFromCustomersList={updateFromCustomersList}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <CustomModal
        title="اضافة زبون"
        isVisible={modalVisible}
        onClose={toggleModal}
      >
        <AddCustomerFormComponent
          addToCustomersList={addToCustomersList}
          toggleModal={toggleModal}
        />
      </CustomModal>
      <FAB
        onPress={toggleModal}
        color={Constants.colors.lightGray}
        style={[pageStyle.fab, styles.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
