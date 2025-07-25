import { FlatList, View } from "react-native";
import useInternalDebtsService from "./InternalDebts.service";
import styles from "./InternalDebts.style";
import React from "react";
import Constants from "@/Shared/Constants/Constants";
import IModal from "@/Shared/Components/IModal";
import { FAB } from "react-native-paper";
import pageStyle from "@/Shared/Styles/pages.global.style";
import i18n from "@/Shared/I18n/I18n";
import ListItem from "@/Shared/Components/ListItem";
import { fromatLocaleDate } from "@/Shared/Helpers/Functions/FormatDate";
import InternalDebtForm from "./Components/InternalDebtForm";
import { useDirtyChecker } from "@/Shared/Hooks/useDirtyChecker";
import IInternalDebt from "@/Models/InternalDebts/IInternalDebts";
import IActivityIndicator from "@/Shared/Components/IActivityIndicator";

export default function InternalDebts() {
  const service = useInternalDebtsService();
  const dirtyChecker = useDirtyChecker();
  if (service.isLoading) {
    return <IActivityIndicator />;
  }
  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={service.internalDebts}
        numColumns={1}
        keyExtractor={(item) => item.Id?.toString() as string}
        renderItem={({ item }: { item: IInternalDebt }) => (
          <ListItem
            title={"@" + item.Customer?.Name}
            subTitle={{
              text: "$" + item.TotalPrice?.toString(),
              color: Constants.colors.red,
            }}
            subTitle2={{
              text: fromatLocaleDate(item.Date),
              color: Constants.colors.darkGray,
            }}
            sign={{ color: Constants.colors.green, visible: true }}
            color={Constants.colors.internalDebts}
            onEdit={() => service.onEdit(item)}
            onDelete={() => service.handleDeleteInternalDebt(item.Id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <IModal
        title={
          service.modalOptions.formData.Id
            ? i18n.t("edit-internal-debt")
            : i18n.t("add-internal-debt")
        }
        isVisible={service.modalOptions.visible}
        onClose={() => dirtyChecker.showAlertIfDirty(service.toggleModal)}
      >
        <InternalDebtForm
          formData={service.modalOptions.formData}
          save={service.save}
          dirtyChecker={dirtyChecker}
        />
      </IModal>
      <FAB
        onPress={() => service.toggleModal()}
        color={Constants.colors.lightGray}
        style={[pageStyle.fab, styles.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
