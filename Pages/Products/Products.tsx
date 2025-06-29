import { FlatList, View } from "react-native";
import useProductsService from "./Products.service";
import styles from "./Products.style";
import React from "react";
import Constants from "@/Shared/Constants/Constants";
import CustomModal from "@/Shared/Reusable Components/CustomModalComponent/CustomModalComponent";
import { FAB } from "react-native-paper";
import IProduct from "@/Models/Products/IProduct";
import pageStyle from "@/Shared/Styles/pages.global.style";
import i18n from "@/Shared/I18n/I18n";
import ListItem from "@/Shared/Reusable Components/ListItem/ListItem";
import ProductForm from "@/Pages/Products/Components/ProductForm";

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
            onEdit={() => service.onEdit(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
      <CustomModal
        title={
          service.modalOptions.formData.productId
            ? i18n.t("edit-product")
            : i18n.t("add-product")
        }
        isVisible={service.modalOptions.visible}
        onClose={service.toggleModal}
      >
        <ProductForm
          formData={service.modalOptions.formData}
          save={service.save}
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
