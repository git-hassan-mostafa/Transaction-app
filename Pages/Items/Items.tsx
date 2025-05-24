import { FlatList, View } from "react-native";
import useItemsService from "./Items.service";
import styles from "./Items.style";
import React from "react";
import Item from "@/Global/Models/Item";
import AccordionComponent from "@/Components/Reusables/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import { EditProduct } from "@/Components/Products/Edit/EditProduct";
import CustomModal from "@/Components/Reusables/CustomModalComponent/CustomModalComponent";
import AddProduct from "@/Components/Products/Add/AddProduct";
import { FAB } from "react-native-paper";
import IItem from "@/Global/ViewModels/Items/IItem";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";

export default function Items() {
  const service = useItemsService();

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={service.items}
        numColumns={1}
        keyExtractor={(item) => item.itemId?.toString() as string}
        renderItem={({ item }: { item: IItem }) => (
          <AccordionComponent
            key={item.itemId}
            id={item.itemId as number}
            handleDelete={service.handleDeleteItem}
            headerColor={Constants.colors.products}
            iconColor={Constants.colors.lightGray}
            headerText={item.itemName as string}
          >
            <EditProduct
              id={item.itemId as number}
              updateFromProductsList={service.updateFromProductsList}
            />
          </AccordionComponent>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={i18n.t("add-product")}
        isVisible={service.modalVisible}
        onClose={service.toggleModal}
      >
        <AddProduct
          addToItemsList={service.addToItemsList}
          toggleModal={service.toggleModal}
        />
      </CustomModal>
      <FAB
        onPress={service.toggleModal}
        color={Constants.colors.lightGray}
        style={[styles.fab, pageStyle.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
