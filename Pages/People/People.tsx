import { FlatList, View } from "react-native";
import usePeopleService from "./People.service";
import styles from "./People.style";
import React from "react";
import Constants from "@/Global/Constants/Constants";
import { FAB } from "react-native-paper";
import CustomModal from "@/Global/Reusable Components/CustomModalComponent/CustomModalComponent";
import IPerson from "@/ViewModels/People/IPerson";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";
import ListItem from "@/Global/Reusable Components/ListItem/ListItem";
import PeopleForm from "@/Components/People/PeopleForm";

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
          <ListItem
            color={Constants.colors.people}
            title={item.personName}
            subTitle={{
              text: item.personPhoneNumber?.toString(),
              color: Constants.colors.darkGray,
            }}
            onDelete={() => service.handleDeletePerson(item.id)}
            onEdit={() => service.onEdit(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={
          service.modalOptions.id ? i18n.t("edit-person") : i18n.t("add-person")
        }
        isVisible={service.modalOptions.visible}
        onClose={service.toggleModal}
      >
        <PeopleForm
          toggleModal={service.toggleModal}
          id={service.modalOptions.id}
          updateFromPeopleList={service.updateFromPeopleList}
          addToPeopleList={service.addToPeopleList}
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
