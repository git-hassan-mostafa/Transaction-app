import { FlatList, View } from "react-native";
import useProvidersService from "./Providers.service";
import styles from "./Providers.style";
import React from "react";
import AccordionComponent from "@/Components/Reusables/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import AddProvider from "@/Components/Provider/Add/AddProvider";
import CustomModal from "@/Components/Reusables/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import { EditProvider } from "@/Components/Provider/Edit/EditProvider";
import IProvider from "@/Global/ViewModels/Providers/IProvider";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";

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
          <AccordionComponent
            key={item.providerId}
            headerColor={Constants.colors.providers}
            iconColor={Constants.colors.lightGray}
            headerText={item.providerName as string}
            id={item.providerId as number}
            handleDelete={service.handleDeleteProvider}
          >
            <EditProvider
              id={item.providerId as number}
              deleteFromProvidersList={service.deleteFromProvidersList}
              updateFromProvidersList={service.updateFromProvidersList}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={i18n.t("add-provider")}
        isVisible={service.modalVisible}
        onClose={service.toggleModal}
      >
        <AddProvider
          addToProvidersList={service.addToProvidersList}
          toggleModal={service.toggleModal}
        />
      </CustomModal>
      <FAB
        onPress={service.toggleModal}
        color={Constants.colors.lightGray}
        style={[styles.fab, pageStyle.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
