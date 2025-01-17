import { FlatList, View } from "react-native";
import useProvidersPageService from "./ProvidersPage.service";
import styles from "./ProvidersPage.style";
import React from "react";
import Provider from "@/Global/Models/Provider";
import AccordionComponent from "@/Components/Reusable Components/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import AddProviderFormComponent from "@/Components/Provider Components/AddProviderComponent/AddProviderFormComponent";
import CustomModal from "@/Components/Reusable Components/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import { ProviderFormComponent } from "@/Components/Provider Components/ProviderFormComponent/ProviderFormComponent";

export default function ProvidersPage() {
  const {
    providers,
    modalVisible,
    toggleModal,
    addToProvidersList,
    deleteFromProvidersList,
    updateFromProvidersList,
  } = useProvidersPageService();
  return (
    <React.Fragment>
      <FlatList
        style={styles.flatList}
        data={providers}
        numColumns={1}
        keyExtractor={(item) => item.id?.toString() as string}
        renderItem={({ item }: { item: Provider }) => (
          <AccordionComponent
            key={item.id}
            headerColor={Constants.colors.brown}
            iconColor={Constants.colors.lightGray}
            headerText={item.name as string}
          >
            <ProviderFormComponent
              id={item.id as number}
              deleteFromProviderList={deleteFromProvidersList}
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
        <View style={{ backgroundColor: Constants.colors.lightGray }}>
          <AddProviderFormComponent
            addToProvidersList={addToProvidersList}
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
