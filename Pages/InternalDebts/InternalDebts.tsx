import { FlatList, View } from "react-native";
import useInnerDebtsService from "./InternalDebts.service";
import styles from "./InternalDebts.style";
import React from "react";
import Constants from "@/Global/Constants/Constants";
import CustomModal from "@/Global/Reusable Components/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import { ICustomer_IInnerDebt } from "@/ViewModels/RelationModels/ICustomer_IInnerDebt";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";
import ListItem from "@/Global/Reusable Components/ListItem/ListItem";
import { fromatLocaleDate } from "@/Global/Helpers/Functions/FormatDate";
import InternalDebtForm from "@/Components/InternalDebt/InternalDebtForm";

export default function InnerDebts() {
  const service = useInnerDebtsService();

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={service.innerDebts}
        numColumns={1}
        keyExtractor={(item) => item.innerDebtId?.toString() as string}
        renderItem={({ item }: { item: ICustomer_IInnerDebt }) => (
          <ListItem
            title={"@" + item.customerName}
            subTitle={{
              text: "$" + item.innerDebtTotalPrice?.toString(),
              color: Constants.colors.red,
            }}
            subTitle2={{
              text: fromatLocaleDate(item.innerDebtDate),
              color: Constants.colors.darkGray,
            }}
            sign={{ color: Constants.colors.green, visible: true }}
            color={Constants.colors.internalDebts}
            onEdit={() => service.onEdit(item.innerDebtId)}
            onDelete={() => service.handleDeleteInnerDebt(item.innerDebtId)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={
          service.modalOptions.id
            ? i18n.t("edit-internal-debt")
            : i18n.t("add-internal-debt")
        }
        isVisible={service.modalOptions.visible}
        onClose={() => service.toggleModal()}
      >
        <InternalDebtForm
          toggleModal={() => service.toggleModal()}
          id={service.modalOptions.id}
          updateFromInnerDebtsList={service.updateFromInnerDebtsList}
          addToInnerDebtsList={service.addToInnerDebtsList}
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
