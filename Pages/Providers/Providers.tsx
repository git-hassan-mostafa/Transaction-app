import { FlatList, View } from "react-native";
import useProvidersService from "./Providers.service";
import styles from "./Providers.style";
import React from "react";
import AccordionComponent from "@/Shared/Reusable Components/AccordionComponent/AccordionComponent";
import Constants from "@/Shared/Constants/Constants";
import CustomModal from "@/Shared/Reusable Components/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import { EditProvider } from "@/Pages/Providers/Component/EditProvider";
import IProvider from "@/Models/Providers/IProvider";
import pageStyle from "@/Shared/Styles/pages.global.style";
import i18n from "@/Shared/I18n/I18n";
import ListItem from "@/Shared/Reusable Components/ListItem/ListItem";

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
        <EditProvider id={service.modalOptions.id} save={service.save} />
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
