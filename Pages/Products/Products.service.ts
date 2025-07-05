import useGlobalContext from "@/Shared/Context/ContextProvider";
import SortList from "@/Shared/Helpers/Functions/SortList";
import i18n from "@/Shared/I18n/I18n";
import IProduct from "@/Models/Products/IProduct";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useService from "@/Shared/Context/ServiceProvider";
import IFormModalType from "@/Shared/Types/IEditModalType";

export default function useProductsService() {
  //services
  const { productManager } = useService();

  //states
  const [products, setProducts] = useState<IProduct[]>([]);
  const [modalOptions, setModalOptions] = useState<IFormModalType<IProduct>>({
    visible: false,
    formData: {} as IProduct,
  });

  // context
  const context = useGlobalContext();

  //constructor
  useEffect(() => {
    fetchAllProducts();
  }, []);

  async function fetchAllProducts() {
    const productsDB = await productManager.getAllProducts();
    setProducts(productsDB);
  }

  async function save(
    product: IProduct,
    validationCallback: (product: IProduct) => boolean
  ) {
    if (!validationCallback(product)) return;
    if (product.productId) await updateProduct(product);
    else await addProduct(product);
  }

  async function addProduct(product: IProduct) {
    const result = await productManager.addProduct(product);
    if (!result.success)
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    product.productId = result?.data;
    addToProductsList(product);
    toggleModal();
    context.toggleSnackBar({
      visible: true,
      text: result.message,
      type: "success",
    });
  }

  async function updateProduct(product: IProduct) {
    const result = await productManager.updateProduct(product);
    if (!result.success)
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    updateFromProductsList(product);
    toggleModal();
    context.toggleSnackBar({
      visible: true,
      text: result.message,
      type: "success",
    });
  }

  function addToProductsList(value: IProduct) {
    setProducts((prev) => [...prev, value]);
  }

  function deleteFromProductsList(id: number) {
    setProducts((prev) => prev.filter((c) => c.productId !== id));
  }

  function updateFromProductsList(value: IProduct) {
    setProducts((prev) =>
      prev.map((product) =>
        product.productId === value.productId
          ? { ...product, ...value }
          : product
      )
    );
  }

  async function handleDeleteProduct(id: number) {
    Alert.alert(
      i18n.t("delete-product"),
      i18n.t("are-you-sure-you-want-to-delete-this-product"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        { text: i18n.t("confirm"), onPress: () => deleteProduct(id) },
      ]
    );
  }

  async function deleteProduct(id: number) {
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

  async function onEdit(formData: IProduct) {
    toggleModal(formData);
  }

  function toggleModal(formData: IProduct = {} as IProduct) {
    setModalOptions((prev) => ({ visible: !prev.visible, formData }));
  }

  return {
    products,
    modalOptions,
    toggleModal,
    addToProductsList,
    deleteFromProductsList,
    updateFromProductsList,
    handleDeleteProduct,
    onEdit,
    save,
  };
}
