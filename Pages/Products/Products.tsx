import { FlatList, View } from "react-native";
import useProductsService from "./Products.service";
import styles from "./Products.style";
import React from "react";
import Constants from "@/Shared/Constants/Constants";
import IModal from "@/Shared/Components/IModal";
import { FAB } from "react-native-paper";
import IProduct from "@/Models/Products/IProduct";
import pageStyle from "@/Shared/Styles/pages.global.style";
import i18n from "@/Shared/I18n/I18n";
import ListItem from "@/Shared/Components/ListItem";
import ProductForm from "@/Pages/Products/Components/ProductForm";
import { useDirtyChecker } from "@/Shared/Hooks/useDirtyState";

export default function Products() {
  const service = useProductsService();
  const dirtyChecker = useDirtyChecker();
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
      <IModal
        title={
          service.modalOptions.formData.productId
            ? i18n.t("edit-product")
            : i18n.t("add-product")
        }
        isVisible={service.modalOptions.visible}
        onClose={() => dirtyChecker.showAlertIfDirty(service.toggleModal)}
      >
        <ProductForm
          formData={service.modalOptions.formData}
          save={service.save}
          dirtyChecker={dirtyChecker}
        />
      </IModal>
      <FAB
        onPress={() => service.toggleModal()}
        color={Constants.colors.lightGray}
        style={[styles.fab, pageStyle.fab]}
        icon="plus"
      />
    </React.Fragment>
  );
}
