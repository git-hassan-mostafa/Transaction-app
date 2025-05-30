import { FlatList, View } from "react-native";
import useInnerDebtsService from "./InternalDebts.service";
import styles from "./InternalDebts.style";
import React from "react";
import AccordionComponent from "@/Global/Reusable Components/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import CustomModal from "@/Global/Reusable Components/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import EditInternalDebt from "@/Components/InternalDebt/Edit/EditInternalDebt";
import AddInternalDebt from "@/Components/InternalDebt/Add/AddInternalDebt";
import IInnerDebt from "@/ViewModels/InnerDebts/IInerDebts";
import { ICustomer_IInnerDebt } from "@/ViewModels/RelationModels/ICustomer_IInnerDebt";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";

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
          <AccordionComponent
            key={item.innerDebtId}
            id={item.innerDebtId as number}
            handleDelete={service.handleDeleteInnerDebt}
            headerColor={Constants.colors.internalDebts}
            iconColor={Constants.colors.lightGray}
            headerText={`@${item.customerName}`}
          >
            <EditInternalDebt
              id={item.innerDebtId as number}
              updateFromInnerDebtsList={service.updateFromInnerDebtsList}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={i18n.t("add-debt")}
        isVisible={service.modalVisible}
        onClose={service.toggleModal}
      >
        <AddInternalDebt
          addToInnerDebtsList={service.addToInnerDebtsList}
          toggleModal={service.toggleModal}
        />
      </CustomModal>
      <FAB
        onPress={service.toggleModal}
        color={Constants.colors.lightGray}
        style={[pageStyle.fab, styles.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
