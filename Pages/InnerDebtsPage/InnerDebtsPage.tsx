import { FlatList, View } from "react-native";
import useInnerDebtsPageService from "./InnerDebtsPage.service";
import styles from "./InnerDebtsPage.style";
import React from "react";
import AccordionComponent from "@/Components/Reusables/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import CustomModal from "@/Components/Reusables/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import EditInternalDebt from "@/Components/InternalDebt/Edit/EditInternalDebt";
import AddInternalDebt from "@/Components/InternalDebt/Add/AddInternalDebt";
import IInnerDebt from "@/Global/ViewModels/InnerDebts/IInerDebts";
import { ICustomer_IInnerDebt } from "@/Global/ViewModels/RelationModels/ICustomer_IInnerDebt";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";

export default function InnerDebtsPage() {
  const {
    innerDebts,
    modalVisible,
    toggleModal,
    addToInnerDebtsList,
    updateFromInnerDebtsList,
    handleDeleteInnerDebt,
  } = useInnerDebtsPageService();

  innerDebts?.sort((a, b) => {
    if (a.innerDebtDate && b.innerDebtDate) {
      return (
        new Date(a.innerDebtDate).getTime() -
        new Date(b.innerDebtDate).getTime()
      );
    }
    return 0;
  });

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={innerDebts}
        numColumns={1}
        keyExtractor={(item) => item.innerDebtId?.toString() as string}
        renderItem={({ item }: { item: IInnerDebt }) => (
          <AccordionComponent
            key={item.innerDebtId}
            id={item.innerDebtId as number}
            handleDelete={handleDeleteInnerDebt}
            headerColor={Constants.colors.internalDebts}
            iconColor={Constants.colors.lightGray}
            headerText={`@${(item as ICustomer_IInnerDebt).customerName}`}
          >
            <EditInternalDebt
              id={item.innerDebtId as number}
              updateFromInnerDebtsList={updateFromInnerDebtsList}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={i18n.t("add-debt")}
        isVisible={modalVisible}
        onClose={toggleModal}
      >
        <AddInternalDebt
          addToInnerDebtsList={addToInnerDebtsList}
          toggleModal={toggleModal}
        />
      </CustomModal>
      <FAB
        onPress={toggleModal}
        color={Constants.colors.lightGray}
        style={[pageStyle.fab, styles.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
