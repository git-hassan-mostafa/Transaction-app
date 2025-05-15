import { FlatList, View } from "react-native";
import usePeoplePageService from "./PeoplePage.service";
import styles from "./PeoplePage.style";
import React from "react";
import Person from "@/Global/Models/Person";
import AccordionComponent from "@/Components/Reusable Components/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import { FAB } from "react-native-paper";
import PeopleFormComponent from "@/Components/People Components/PeopleFormComponent/PeopleFormComponent";
import CustomModal from "@/Components/Reusable Components/CustomModalComponent/CustomModalComponent";
import AddPeopleFormComponent from "@/Components/People Components/AddPeopleFormComponent/AddPeopleFormComponent";
import IPerson from "@/Global/ViewModels/People/IPerson";
import pageStyle from "@/Global/Styles/pages.global.style";
import pages from "@/Global/Constants/Pages";

export default function PeoplePage() {
  const {
    people,
    modalVisible,
    toggleModal,
    addToPeopleList,
    updateFromPeopleList,
    handleDeletePerson,
  } = usePeoplePageService();

  people?.sort((a, b) => {
    if (a.personName && b.personName) {
      return a.personName
        .toString()
        .localeCompare(b.personName.toString(), undefined, {
          sensitivity: "base",
        });
    }
    return 0;
  });

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={people}
        numColumns={1}
        keyExtractor={(item) => item.id?.toString() as string}
        renderItem={({ item }: { item: IPerson }) => (
          <AccordionComponent
            key={item.id}
            headerColor={Constants.colors.people}
            iconColor={Constants.colors.lightGray}
            headerText={item.personName as string}
            handleDelete={handleDeletePerson}
            id={item.id as number}
          >
            <View></View>
            <PeopleFormComponent
              updateFromPeopleList={updateFromPeopleList}
              id={item.id as number}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title="اضافة شخص"
        isVisible={modalVisible}
        onClose={toggleModal}
      >
        <AddPeopleFormComponent
          addToPeopleList={addToPeopleList}
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
