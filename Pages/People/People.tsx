import { FlatList, View } from "react-native";
import usePeopleService from "./People.service";
import styles from "./People.style";
import React from "react";
import Constants from "@/Shared/Constants/Constants";
import { FAB } from "react-native-paper";
import IModal from "@/Shared/Components/IModal";
import IPerson from "@/Models/People/IPerson";
import pageStyle from "@/Shared/Styles/pages.global.style";
import i18n from "@/Shared/I18n/I18n";
import ListItem from "@/Shared/Components/ListItem";
import PeopleForm from "@/Pages/People/Components/PeopleForm";
import { useDirtyChecker } from "@/Shared/Hooks/useDirtyChecker";
import IActivityIndicator from "@/Shared/Components/IActivityIndicator";

export default function People() {
  const service = usePeopleService();
  const dirtyChecker = useDirtyChecker();
  if (service.isLoading) {
    return <IActivityIndicator />;
  }
  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={service.people}
        numColumns={1}
        keyExtractor={(item) => item.Id?.toString() as string}
        renderItem={({ item }: { item: IPerson }) => (
          <ListItem
            color={Constants.colors.people}
            title={item.Name}
            subTitle={{
              text: item.PhoneNumber?.toString(),
              color: Constants.colors.darkGray,
            }}
            onDelete={() => service.handleDeletePerson(item.Id)}
            onEdit={() => service.onEdit(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <IModal
        title={
          service.modalOptions.formData.Id
            ? i18n.t("edit-person")
            : i18n.t("add-person")
        }
        isVisible={service.modalOptions.visible}
        onClose={() => dirtyChecker.showAlertIfDirty(service.toggleModal)}
      >
        <PeopleForm
          formData={service.modalOptions.formData}
          save={service.save}
          dirtyChecker={dirtyChecker}
        />
      </IModal>
      <FAB
        onPress={() => service.toggleModal()}
        color={Constants.colors.lightGray}
        style={[styles.fab, pageStyle.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
