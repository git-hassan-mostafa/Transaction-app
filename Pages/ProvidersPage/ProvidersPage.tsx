import { FlatList, View } from "react-native";
import useProvidersPageService from "./ProvidersPage.service";
import styles from "./ProvidersPage.style";
import React from "react";
import AccordionComponent from "@/Components/Reusables/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import AddProvider from "@/Components/Provider/Add/AddProvider";
import CustomModal from "@/Components/Reusables/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import { ProviderFormComponent } from "@/Components/Provider/Edit/ProviderFormComponent";
import IProvider from "@/Global/ViewModels/Providers/IProvider";
import pageStyle from "@/Global/Styles/pages.global.style";

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
            headerColor={Constants.colors.providers}
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
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title="اضافة تاجر"
        isVisible={modalVisible}
        onClose={toggleModal}
      >
        <AddProvider
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
