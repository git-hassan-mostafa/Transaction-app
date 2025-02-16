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
    if (a.name && b.name) {
      return a.name.toString().localeCompare(b.name.toString(), undefined, {
        sensitivity: "base",
      });
    }
    return 0;
  });
  return (
    <React.Fragment>
      <FlatList
        style={styles.flatList}
        data={items}
        numColumns={1}
        keyExtractor={(item) => item.id?.toString() as string}
        renderItem={({ item }: { item: IItem }) => (
          <AccordionComponent
            key={item.id}
            id={item.id as number}
            handleDelete={handleDeleteItem}
            headerColor={Constants.colors.orange}
            iconColor={Constants.colors.lightGray}
            headerText={item.name as string}
          >
            <ItemFormComponent
              id={item.id as number}
              updateFromItemsList={updateFromItemsList}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      <CustomModal
        title="اضافة منتج"
        isVisible={modalVisible}
        onClose={toggleModal}
      >
        <View style={{ backgroundColor: Constants.colors.lightGray }}>
          <AddItemFormComponent
            addToItemsList={addToItemsList}
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
