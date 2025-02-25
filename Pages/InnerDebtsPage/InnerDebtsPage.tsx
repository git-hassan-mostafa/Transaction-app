import { FlatList, View } from "react-native";
import useInnerDebtsPageService from "./InnerDebtsPage.service";
import styles from "./InnerDebtsPage.style";
import React from "react";
import AccordionComponent from "@/Components/Reusable Components/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import CustomModal from "@/Components/Reusable Components/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import InnerDebtsFormComponent from "@/Components/Inner Debts Components/InnerDebtsFormComponent/InnerDebtsFormComponent";
import AddInnerDebtsComponent from "@/Components/Inner Debts Components/AddInnerDebtsComponent/AddInnerDebtsComponent";
import IInnerDebt from "@/Global/ViewModels/InnerDebts/IInerDebts";
import { ICustomerInnerDebt } from "@/Global/ViewModels/RelationModels/ICustomerInnerDebt";

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
    if (a.date && b.date) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  return (
    <React.Fragment>
      <FlatList
        style={styles.flatList}
        data={innerDebts}
        numColumns={1}
        keyExtractor={(item) => item.innerDebtId?.toString() as string}
        renderItem={({ item }: { item: IInnerDebt }) => (
          <AccordionComponent
            key={item.innerDebtId}
            id={item.innerDebtId as number}
            handleDelete={handleDeleteInnerDebt}
            headerColor={Constants.colors.red}
            iconColor={Constants.colors.lightGray}
            headerText={`@${(item as ICustomerInnerDebt).name}`}
          >
            <InnerDebtsFormComponent
              id={item.innerDebtId as number}
              updateFromInnerDebtsList={updateFromInnerDebtsList}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <CustomModal
        title="اضافة دين"
        isVisible={modalVisible}
        onClose={toggleModal}
      >
        <View style={{ backgroundColor: Constants.colors.lightGray }}>
          <AddInnerDebtsComponent
            addToInnerDebtsList={addToInnerDebtsList}
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
