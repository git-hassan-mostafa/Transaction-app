import useGlobalContext from "@/Global/Context/ContextProvider";
import SortList from "@/Global/Helpers/Functions/SortList";
import i18n from "@/Global/I18n/I18n";
import IProduct from "@/ViewModels/Products/IProduct";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useService from "@/Global/Context/ServiceProvider";
import IFormModalType from "@/Global/Types/IEditModalType";

export default function useProductsService() {
  //services
  const { productManager } = useService();

  //states
  const [products, setProducts] = useState<IProduct[]>([]);
  const [modalOptions, setModalOptions] = useState<IFormModalType>({
    visible: false,
    id: -1,
  });

  // context
  const context = useGlobalContext();

  //constructor
  sortProducts();
  useEffect(() => {
    getAllProducts();
  }, []);

  function sortProducts() {
    SortList(products, (e) => e.productName);
  }

  function addToProductsList(value: IProduct) {
    setProducts((prev) => [...prev, value]);
  }

  function deleteFromProductsList(id: number) {
    setProducts((prev) => prev.filter((c) => c.productId !== id));
  }

  function updateFromProductsList(value: IProduct) {
    setProducts((prev) =>
      prev.map((item) =>
        item.productId === value.productId ? { ...item, ...value } : item
      )
    );
  }

  async function getAllProducts() {
    const productsDB = await productManager.getAllProducts();
    setProducts(productsDB);
  }

  async function handleDeleteItem(id: number) {
    Alert.alert(
      i18n.t("delete-product"),
      i18n.t("are-you-sure-you-want-to-delete-this-product"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        { text: i18n.t("confirm"), onPress: () => deleteItem(id) },
      ]
    );
  }

  async function deleteItem(id: number) {
    const result = await productManager.deleteProduct(id);
    if (!result.success)
      return context.toggleSnackBar({
        text: result.message,
        type: "error",
        visible: true,
      });
    deleteFromProductsList(id);
    context.toggleSnackBar({
      text: result.message,
      type: "success",
      visible: true,
    });
  }

  async function onEdit(id: number) {
    toggleModal(id);
  }

  function toggleModal(id: number | undefined = undefined) {
    setModalOptions((prev) => ({ visible: !prev.visible, id }));
  }

  return {
    products,
    modalOptions,
    toggleModal,
    addToProductsList,
    deleteFromProductsList,
    updateFromProductsList,
    handleDeleteItem,
    onEdit,
  };
}
