import { FlatList, View } from "react-native";
import useProductsService from "./Products.service";
import styles from "./Products.style";
import React from "react";
import Constants from "@/Global/Constants/Constants";
import CustomModal from "@/Global/Reusable Components/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import IProduct from "@/ViewModels/Products/IProduct";
import pageStyle from "@/Global/Styles/pages.global.style";
import i18n from "@/Global/I18n/I18n";
import ListItem from "@/Global/Reusable Components/ListItem/ListItem";
import ProductForm from "@/Components/Products/ProductForm";

export default function Products() {
  const service = useProductsService();

  return (
    <React.Fragment>
      <FlatList
        style={pageStyle.flatList}
        data={service.products}
        numColumns={1}
        keyExtractor={(item) => item.productId?.toString() as string}
        renderItem={({ item }: { item: IProduct }) => (
          <ListItem
            // sign={{ visible: true, color: Constants.colors.products }}
            color={Constants.colors.products}
            title={item.productName}
            subTitle={{
              text: "$" + item.productPrice?.toString(),
              color: Constants.colors.green,
            }}
            onDelete={() => service.handleDeleteProduct(item.productId)}
            onEdit={() => service.onEdit(item.productId)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={
          service.modalOptions.id
            ? i18n.t("edit-product")
            : i18n.t("add-product")
        }
        isVisible={service.modalOptions.visible}
        onClose={() => service.toggleModal(-1)}
      >
        <ProductForm
          id={service.modalOptions.id}
          updateFromProductsList={service.updateFromProductsList}
          toggleModal={service.toggleModal}
          addToProductsList={service.addToProductsList}
        />
      </CustomModal>
      <FAB
        onPress={() => service.toggleModal()}
        color={Constants.colors.lightGray}
        style={[styles.fab, pageStyle.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
