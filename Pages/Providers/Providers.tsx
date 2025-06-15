import { FlatList, View } from "react-native";
import useProvidersService from "./Providers.service";
import styles from "./Providers.style";
import React from "react";
import AccordionComponent from "@/Global/Reusable Components/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import CustomModal from "@/Global/Reusable Components/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import { EditProvider } from "@/Components/Provider/EditProvider";
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
        title={
          service.modalOptions.id
            ? i18n.t("edit-provider")
            : i18n.t("add-provider")
        }
        isVisible={service.modalOptions.visible}
        onClose={service.toggleModal}
      >
        <EditProvider
          toggleModal={service.toggleModal}
          id={service.modalOptions.id}
          updateFromProvidersList={service.updateFromProvidersList}
          addToProvidersList={service.addToProvidersList}
        />
      </CustomModal>
      <FAB
        onPress={() => service.toggleModal()}
        color={Constants.colors.lightGray}
        style={[styles.fab, pageStyle.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
