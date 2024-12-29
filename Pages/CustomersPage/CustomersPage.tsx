import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import useCustomersPageService from "./CustomersPage.service";
import styles from "./CustomersPage.style";
import AccordionComponent from "@/Components/AccordionComponent/AccordionComponent";
import { CustomerFormComponent } from "@/Components/CustomerFormComponent/CustomerFormComponent";
import Constants from "@/Global/Constants/Constants";
import Customer from "@/Global/Models/Customer";
import { FAB } from "react-native-paper";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import AddCustomerFormComponent from "@/Components/AddCustomerFormComponent/AddCustomerFormComponent";
import CustomModal from "@/Components/CustomModalComponent/CustomModalComponent";

export default function CustomersPage() {
  const {
    customers,
    modalVisible,
    toggleModal,
    addToCustomersList,
    deleteFromCustomerList,
    updateFromCustomersList,
  } = useCustomersPageService();
  return (
    <React.Fragment>
      <FlatList
        style={styles.flatList}
        data={customers}
        numColumns={1}
        keyExtractor={(item) => item.id?.toString() as string}
        renderItem={({ item }: { item: Customer }) => (
          <AccordionComponent
            key={item.id}
            headerColor={Constants.colors.blue}
            iconColor={Constants.colors.lightGray}
            headerText={item.name as string}
          >
            <CustomerFormComponent
              id={item.id as number}
              deleteFromCustomerList={deleteFromCustomerList}
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
        <View style={{ backgroundColor: Constants.colors.lightGray }}>
          <AddCustomerFormComponent
            addToCustomersList={addToCustomersList}
            toggleModal={toggleModal}
          />
        </View>
      </CustomModal>
      <FAB
        onPress={toggleModal}
        color={Constants.colors.lightGray}
        style={styles.fab}
        icon="plus"
      />
    </React.Fragment>
  );
}
