import { FlatList, View } from "react-native";
import useItemsPageService from "./ItemsPage.service";
import styles from "./ItemsPage.style";
import React from "react";
import Item from "@/Global/Models/Item";
import AccordionComponent from "@/Components/Reusable Components/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import { ItemFormComponent } from "@/Components/Items Components/ItemFormComponent/ItemFormComponent";
import CustomModal from "@/Components/Reusable Components/CustomModalComponent/CustomModalComponent";
import AddItemFormComponent from "@/Components/Items Components/AddItemFormComponent/AddItemFormComponent";
import { FAB } from "react-native-paper";
import IItem from "@/Global/ViewModels/Items/IItem";
import pageStyle from "@/Global/Styles/pages.global.style";
import pages from "@/Global/Constants/Pages";

export default function ItemsPage() {
  const {
    items,
    modalVisible,
    toggleModal,
    addToItemsList,
    updateFromItemsList,
    handleDeleteItem,
  } = useItemsPageService();

  items?.sort((a, b) => {
    if (a.itemName && b.itemName) {
      return a.itemName
        .toString()
        .localeCompare(b.itemName.toString(), undefined, {
          sensitivity: "base",
        });
    }
    return 0;
  });
  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={items}
        numColumns={1}
        keyExtractor={(item) => item.itemId?.toString() as string}
        renderItem={({ item }: { item: IItem }) => (
          <AccordionComponent
            key={item.itemId}
            id={item.itemId as number}
            handleDelete={handleDeleteItem}
            headerColor={Constants.colors.products}
            iconColor={Constants.colors.lightGray}
            headerText={item.itemName as string}
          >
            <ItemFormComponent
              id={item.itemId as number}
              updateFromItemsList={updateFromItemsList}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title="اضافة منتج"
        isVisible={modalVisible}
        onClose={toggleModal}
      >
        <AddItemFormComponent
          addToItemsList={addToItemsList}
          toggleModal={toggleModal}
        />
      </CustomModal>
      <FAB
        onPress={toggleModal}
        color={Constants.colors.lightGray}
        style={[styles.fab, pageStyle.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
