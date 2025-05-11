import { FlatList, View } from "react-native";
import useProvidersPageService from "./ProvidersPage.service";
import styles from "./ProvidersPage.style";
import React from "react";
import AccordionComponent from "@/Components/Reusable Components/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import AddProviderFormComponent from "@/Components/Provider Components/AddProviderComponent/AddProviderFormComponent";
import CustomModal from "@/Components/Reusable Components/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import { ProviderFormComponent } from "@/Components/Provider Components/ProviderFormComponent/ProviderFormComponent";
import IProvider from "@/Global/ViewModels/Providers/IProvider";
import pageStyle from "@/Global/Styles/pages.global.style";
import pages from "@/Global/Constants/Pages";

export default function ProvidersPage() {
  const {
    providers,
    modalVisible,
    toggleModal,
    addToProvidersList,
    deleteFromProvidersList,
    updateFromProvidersList,
    handleDeleteProvider,
  } = useProvidersPageService();

  providers.sort((a, b) => {
    if (a.providerName && b.providerName) {
      return a.providerName
        .toString()
        .localeCompare(b.providerName.toString(), undefined, {
          sensitivity: "base",
        });
    }
    return 0;
  });

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={providers}
        numColumns={1}
        keyExtractor={(item) => item.providerId?.toString() as string}
        renderItem={({ item }: { item: IProvider }) => (
          <AccordionComponent
            key={item.providerId}
            headerColor={Constants.colors.brown}
            iconColor={Constants.colors.lightGray}
            headerText={item.providerName as string}
            id={item.providerId as number}
            handleDelete={handleDeleteProvider}
          >
            <ProviderFormComponent
              id={item.providerId as number}
              deleteFromProvidersList={deleteFromProvidersList}
              updateFromProvidersList={updateFromProvidersList}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <CustomModal
        title="اضافة تاجر"
        isVisible={modalVisible}
        onClose={toggleModal}
      >
        <AddProviderFormComponent
          addToProvidersList={addToProvidersList}
          toggleModal={toggleModal}
        />
      </CustomModal>
      <FAB
        onPress={toggleModal}
        color={Constants.colors.lightGray}
        style={[styles.fab, pageStyle.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
