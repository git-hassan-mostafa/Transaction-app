import useGlobalContext from "@/Global/Context/ContextProvider";
import SortList from "@/Global/Helpers/Functions/SortList";
import i18n from "@/Global/I18n/I18n";
import IProduct from "@/ViewModels/Products/IProduct";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useService from "@/Global/Context/ServiceProvider";

export default function useProductsService() {
  //services
  const { productManager } = useService();

  //states
  const [products, setProducts] = useState<IProduct[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // context
  const { toggleSnackBar } = useGlobalContext();

  //constructor
  sortItems();
  useEffect(() => {
    getAllProducts();
  }, []);

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
      return toggleSnackBar({
        text: result.message,
        type: "error",
        visible: true,
      });
    deleteFromProductsList(id);
    toggleSnackBar({
      text: result.message,
      type: "success",
      visible: true,
    });
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  function sortItems() {
    SortList(products, (e) => e.productName);
  }

  return {
    items: products,
    modalVisible,
    toggleModal,
    addToProductsList,
    deleteFromProductsList,
    updateFromProductsList,
    handleDeleteItem,
  };
}
