import { FlatList, View } from "react-native";
import useInternalDebtsService from "./InternalDebts.service";
import styles from "./InternalDebts.style";
import React from "react";
import Constants from "@/Shared/Constants/Constants";
import CustomModal from "@/Shared/Reusable Components/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import { ICustomer_IInnternalDebt } from "@/Models/RelationModels/ICustomer_IInnternalDebt";
import pageStyle from "@/Shared/Styles/pages.global.style";
import i18n from "@/Shared/I18n/I18n";
import ListItem from "@/Shared/Reusable Components/ListItem/ListItem";
import { fromatLocaleDate } from "@/Shared/Helpers/Functions/FormatDate";
import InternalDebtForm from "./Components/InternalDebtForm";
import { useDirtyChecker } from "@/Shared/Hooks/useDirtyState";

export default function InternalDebts() {
  const service = useInternalDebtsService();
  const dirtyChecker = useDirtyChecker();

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={service.internalDebts}
        numColumns={1}
        keyExtractor={(item) => item.internalDebtId?.toString() as string}
        renderItem={({ item }: { item: ICustomer_IInnternalDebt }) => (
          <ListItem
            title={"@" + item.customerName}
            subTitle={{
              text: "$" + item.internalDebtTotalPrice?.toString(),
              color: Constants.colors.red,
            }}
            subTitle2={{
              text: fromatLocaleDate(item.internalDebtDate),
              color: Constants.colors.darkGray,
            }}
            sign={{ color: Constants.colors.green, visible: true }}
            color={Constants.colors.internalDebts}
            onEdit={() => service.onEdit(item)}
            onDelete={() =>
              service.handleDeleteInternalDebt(item.internalDebtId)
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={
          service.modalOptions.formData.internalDebtId
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
      </CustomModal>
      <FAB
        onPress={() => service.toggleModal()}
        color={Constants.colors.lightGray}
        style={[pageStyle.fab, styles.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
