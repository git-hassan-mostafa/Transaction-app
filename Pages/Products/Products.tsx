import { FlatList, View } from "react-native";
import useProductsService from "./Products.service";
import styles from "./Products.style";
import React from "react";
import Item from "@/Models/Item";
import AccordionComponent from "@/Global/Reusable Components/AccordionComponent/AccordionComponent";
import Constants from "@/Global/Constants/Constants";
import { EditProduct } from "@/Components/Products/Edit/EditProduct";
import CustomModal from "@/Global/Reusable Components/CustomModalComponent/CustomModalComponent";
import AddProduct from "@/Components/Products/Add/AddProduct";
import { FAB } from "react-native-paper";
import IProduct from "@/ViewModels/Products/IProduct";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";

export default function Products() {
  const service = useProductsService();

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={service.items}
        numColumns={1}
        keyExtractor={(item) => item.productId?.toString() as string}
        renderItem={({ item }: { item: IProduct }) => (
          <AccordionComponent
            key={item.productId}
            id={item.productId as number}
            handleDelete={service.handleDeleteItem}
            headerColor={Constants.colors.products}
            iconColor={Constants.colors.lightGray}
            headerText={item.productName as string}
          >
            <EditProduct
              id={item.productId as number}
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
          addToProductsList={service.addToProductsList}
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
