import { FlatList, View } from "react-native";
import usePeopleService from "./People.service";
import styles from "./People.style";
import React from "react";
import AccordionComponent from "@/Global/Reusable Components/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import { FAB } from "react-native-paper";
import EditPeople from "@/Components/People/Edit/EditPeople";
import CustomModal from "@/Global/Reusable Components/CustomModalComponent/CustomModalComponent";
import AddPeople from "@/Components/People/Add/AddPeople";
import IPerson from "@/ViewModels/People/IPerson";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";

export default function People() {
  const service = usePeopleService();

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={service.people}
        numColumns={1}
        keyExtractor={(item) => item.id?.toString() as string}
        renderItem={({ item }: { item: IPerson }) => (
          <AccordionComponent
            key={item.id}
            headerColor={Constants.colors.people}
            iconColor={Constants.colors.lightGray}
            headerText={item.personName as string}
            handleDelete={service.handleDeletePerson}
            id={item.id as number}
          >
            <View></View>
            <EditPeople
              updateFromPeopleList={service.updateFromPeopleList}
              id={item.id as number}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={i18n.t("add-person")}
        isVisible={service.modalVisible}
        onClose={service.toggleModal}
      >
        <AddPeople
          addToPeopleList={service.addToPeopleList}
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
