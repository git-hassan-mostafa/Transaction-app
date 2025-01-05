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

export default function PeoplePage() {
  const {
    people,
    modalVisible,
    toggleModal,
    addToPeopleList,
    deleteFromPeopleList,
    updateFromPeopleList,
  } = usePeoplePageService();
  return (
    <React.Fragment>
      <FlatList
        style={styles.flatList}
        data={people}
        numColumns={1}
        keyExtractor={(item) => item.id?.toString() as string}
        renderItem={({ item }: { item: Person }) => (
          <AccordionComponent
            key={item.id}
            headerColor={Constants.colors.lighBlue}
            iconColor={Constants.colors.lightGray}
            headerText={item.name as string}
          >
            <View></View>
            <PeopleFormComponent
              updateFromPeopleList={updateFromPeopleList}
              id={item.id as number}
              deleteFromPeopleList={deleteFromPeopleList}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <CustomModal
        title="اضافة شخص"
        isVisible={modalVisible}
        onClose={toggleModal}
      >
        <View style={{ backgroundColor: Constants.colors.lightGray }}>
          <AddPeopleFormComponent
            addToPeopleList={addToPeopleList}
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
