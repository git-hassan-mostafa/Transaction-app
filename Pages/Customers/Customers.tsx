import { View, FlatList } from "react-native";
import useCustomersService from "./Customers.service";
import styles from "./Customers.style";
import { CustomerForm } from "@/Pages/Customers/Components/CustomerForm";
import Constants from "@/Shared/Constants/Constants";
import { FAB } from "react-native-paper";
import React from "react";
import IModal from "@/Shared/Components/IModal";
import pageStyle from "@/Shared/Styles/pages.global.style";
import i18n from "@/Shared/I18n/I18n";
import ListItem from "@/Shared/Components/ListItem";
import ICustomer from "@/Models/Customers/ICustomer";
import { useDirtyChecker } from "@/Shared/Hooks/useDirtyChecker";

export default function Customers() {
  const service = useCustomersService();
  const dirtyChecker = useDirtyChecker<ICustomer>();
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
      />
      <IModal
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
      </IModal>
      <FAB
        onPress={() => service.toggleModal()}
        color={Constants.colors.lightGray}
        style={[pageStyle.fab, styles.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
