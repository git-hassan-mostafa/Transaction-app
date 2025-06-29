import { FlatList, View } from "react-native";
import usePeopleService from "./People.service";
import styles from "./People.style";
import React from "react";
import Constants from "@/Shared/Constants/Constants";
import { FAB } from "react-native-paper";
import CustomModal from "@/Shared/Reusable Components/CustomModalComponent/CustomModalComponent";
import IPerson from "@/Models/People/IPerson";
import pageStyle from "@/Shared/Styles/pages.global.style";
import i18n from "@/Shared/I18n/I18n";
import ListItem from "@/Shared/Reusable Components/ListItem/ListItem";
import PeopleForm from "@/Pages/People/Components/PeopleForm";

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
        <PeopleForm id={service.modalOptions.id} save={service.save} />
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
