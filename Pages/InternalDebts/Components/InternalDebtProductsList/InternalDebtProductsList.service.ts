import IDropDownItem from "@/Shared/Types/IDropDownItem";
import IProduct from "@/Models/Products/IProduct";
import i18n from "@/Shared/I18n/I18n";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useService from "@/Shared/Context/ServiceProvider";
import IInternalDebtsProductsListService from "@/Models/InternalDebts/IInternalDebtsProductsListService";
import IInternalDebtProduct from "@/Models/InternalDebts/IInternalDebtProduct";
import { IInternalDebtsProductsListServiceProps } from "@/Models/InternalDebts/IInternalDebtsFormServiceProps";

export default function useInternalDebtProductsListService(
  props: IInternalDebtsProductsListServiceProps
): IInternalDebtsProductsListService {
  //managers
  const { productManager } = useService();

  //states
  const [products, setProducts] = useState<IProduct[]>([]);
  const [dropDownItems, setDropDownProducts] = useState<IDropDownItem[]>([]);

  const [showAddProduct, setShowAddProduct] = useState(false);
  var newInternalDebtsProduct: IInternalDebtProduct =
    {} as IInternalDebtProduct;

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    await fetchAllProducts();
  }

  async function fetchAllProducts() {
    const productsDB = await productManager.getAllProducts();
    const dropDownProducts = productManager.getDropDownProducts(productsDB);
    setProducts(productsDB);
    setDropDownProducts(dropDownProducts);
  }

  function setInternalProductQuantity(value: string) {
    newInternalDebtsProduct.Quantity = Number(value);
  }

  function setInternalDebtsProduct(id: number) {
    const product = products.find((i) => i.Id === id);
    newInternalDebtsProduct.ProductId = id;
    newInternalDebtsProduct.Product = product;
  }

  function toggleAddProduct(value: boolean) {
    setShowAddProduct(value);
  }

  async function handleAddProduct() {
    if (!newInternalDebtsProduct.Product || !newInternalDebtsProduct.Quantity)
      return;
    const currentProduct = products.find(
      (i) => i.Id === newInternalDebtsProduct.ProductId
    );
    newInternalDebtsProduct.IsNew = true;
    newInternalDebtsProduct.Id = Date.now();
    if (props.internalDebt.Id) {
      newInternalDebtsProduct.InternalDebtId = props.internalDebt.Id;
    }
    newInternalDebtsProduct.TotalPrice =
      newInternalDebtsProduct.Quantity * (Number(currentProduct?.Price) || 0);

    if (!handleExistingProduct()) {
      props.addInternalDebtProduct(newInternalDebtsProduct);
    }

    newInternalDebtsProduct = {} as IInternalDebtProduct;
    setShowAddProduct(false);
  }

  function handleDeleteProduct(id: number) {
    Alert.alert(
      i18n.t("remove-product"),
      i18n.t("are-you-sureyou-want-to-remove-this-product"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        {
          text: i18n.t("confirm"),
          onPress: () => deleteInternalDebtProduct(id),
        },
      ]
    );
  }

  function deleteInternalDebtProduct(id: number) {
    props.deleteInternalDebtProduct(id);
  }

  function handleExistingProduct() {
    const currentProduct = products.find(
      (i) => i.Id === newInternalDebtsProduct.ProductId
    );
    const existingProduct = (
      props.internalDebt.InternalDebtProducts || []
    ).find((i) => i.ProductId === currentProduct?.Id);
    if (existingProduct) {
      existingProduct.Quantity += newInternalDebtsProduct.Quantity;
      existingProduct.TotalPrice =
        existingProduct.TotalPrice +
        newInternalDebtsProduct.Quantity * (Number(currentProduct?.Price) || 0);
      props.updateInternalDebtProduct(existingProduct);
      Alert.alert(
        i18n.t("warning"),
        i18n.t("product-alreadyexists-quantity-updated")
      );
    }
    return !!existingProduct;
  }

  return {
    internalDebt: props.internalDebt,
    products,
    dropDownItems,
    newInternalDebtsProduct,
    setInternalDebtsProduct,
    setInternalProductQuantity,
    showAddProduct,
    handleAddProduct,
    toggleAddProduct,
    handleDeleteProduct,
  };
}
