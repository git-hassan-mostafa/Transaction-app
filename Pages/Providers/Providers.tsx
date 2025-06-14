import { FlatList, View } from "react-native";
import useProvidersService from "./Providers.service";
import styles from "./Providers.style";
import React from "react";
import AccordionComponent from "@/Global/Reusable Components/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import AddProvider from "@/Components/Provider/Add/AddProvider";
import CustomModal from "@/Global/Reusable Components/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import { EditProvider } from "@/Components/Provider/Edit/EditProvider";
import IProvider from "@/ViewModels/Providers/IProvider";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";
import ListItem from "@/Global/Reusable Components/ListItem/ListItem";

export default function Providers() {
  const service = useProvidersService();

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={service.providers}
        numColumns={1}
        keyExtractor={(item) => item.providerId?.toString() as string}
        renderItem={({ item }: { item: IProvider }) => (
          <ListItem
            // sign={{ visible: true, color: Constants.colors.products }}
            color={Constants.colors.providers}
            title={item.providerName}
            subTitle={{
              text: "$" + item.providerBorrowedPrice?.toString(),
              color: Constants.colors.green,
            }}
            onDelete={() => service.handleDeleteProvider(item.providerId)}
            onEdit={() => service.onEdit(item.providerId)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={i18n.t("edit-provider")}
        isVisible={service.editModalOptions.visible}
        onClose={service.toggleEditModal}
      >
        <EditProvider
          toggleModal={service.toggleEditModal}
          id={service.editModalOptions.id}
          updateFromProvidersList={service.updateFromProvidersList}
        />
      </CustomModal>
      <CustomModal
        title={i18n.t("add-provider")}
        isVisible={service.modalVisible}
        onClose={service.toggleAddModal}
      >
        <AddProvider
          addToProvidersList={service.addToProvidersList}
          toggleModal={service.toggleAddModal}
        />
      </CustomModal>
      <FAB
        onPress={service.toggleAddModal}
        color={Constants.colors.lightGray}
        style={[styles.fab, pageStyle.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
