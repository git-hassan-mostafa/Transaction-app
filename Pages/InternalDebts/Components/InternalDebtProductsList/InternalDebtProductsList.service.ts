import IDropDownItem from "@/Shared/Types/IDropDownItem";
import IProduct from "@/Models/Products/IProduct";
import IInternalDebtProduct_IInternalDebt_IProduct from "@/Models/RelationModels/IInternalDebtProduct_IInternalDebt_IProduct";
import i18n from "@/Shared/I18n/I18n";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useService from "@/Shared/Context/ServiceProvider";
import IInternalDebtsProductsListProps from "@/Models/InternalDebts/IInternalDebtsProductsListProps";
import { IInternalDebtFormProps } from "@/Models/InternalDebts/IInternalDebtsFormProps";

export default function useInternalDebtProductsListService(
  props: IInternalDebtFormProps
): IInternalDebtsProductsListProps {
  //managers
  const { internalDebtManager, productManager } = useService();

  //states
  const [products, setProducts] = useState<IProduct[]>([]);
  const [dropDownItems, setDropDownProducts] = useState<IDropDownItem[]>([]);
  const [internalDebtsProducts, setInternalDebtsProducts] = useState<
    IInternalDebtProduct_IInternalDebt_IProduct[]
  >([]);

  const [showAddProduct, setShowAddProduct] = useState(false);
  var newInternalDebtsProduct: IInternalDebtProduct_IInternalDebt_IProduct =
    {} as IInternalDebtProduct_IInternalDebt_IProduct;

  useEffect(() => {
    fetchAllData();

    return () => {
      props.dirtyChecker.dispose();
    };
  }, []);

  useEffect(() => {
    props.dirtyChecker.pushToCurrentRelated(internalDebtsProducts);
  }, [internalDebtsProducts]);

  async function fetchAllData() {
    await Promise.all([fetchAllProducts(), fetchAllInternalDebtsProducts()]);
  }

  async function fetchAllInternalDebtsProducts() {
    if (!props.formData.internalDebtId) return;
    const internalDebtsProductsDB =
      await internalDebtManager.getInternalDebtsProducts(
        props.formData.internalDebtId
      );
    props.dirtyChecker.pushToOriginalRelated(internalDebtsProductsDB);
    setInternalDebtsProducts(internalDebtsProductsDB);
  }

  async function fetchAllProducts() {
    const productsDB = await productManager.getAllProducts();
    const dropDownProducts = productManager.getDropDownProducts(productsDB);
    setProducts(productsDB);
    setDropDownProducts(dropDownProducts);
  }

  function setNewProductQuantity(value: string) {
    newInternalDebtsProduct.internalDebtProductQuantity = Number(value);
  }

  function setInternalDebtsProduct(id: number) {
    const Product = products.find((i) => i.productId === id);
    newInternalDebtsProduct.internalDebtProduct_ProductId = id;
    newInternalDebtsProduct.productName = Product?.productName || "";
  }

  function toggleAddProduct(value: boolean) {
    setShowAddProduct(value);
  }

  async function handleAddProduct() {
    if (
      !newInternalDebtsProduct.productName ||
      !newInternalDebtsProduct.internalDebtProductQuantity
    )
      return;
    const currentProduct = products.find(
      (i) =>
        i.productId === newInternalDebtsProduct.internalDebtProduct_ProductId
    );
    newInternalDebtsProduct.isNew = true;
    newInternalDebtsProduct.internalDebtProductId = Date.now();
    if (props.formData.internalDebtId) {
      newInternalDebtsProduct.internalDebtProduct_InternalDebtId =
        props.formData.internalDebtId;
    }
    newInternalDebtsProduct.internalDebtProductTotalPrice =
      newInternalDebtsProduct.internalDebtProductQuantity *
      (Number(currentProduct?.productPrice) || 0);

    if (!handleExistingProduct()) {
      setInternalDebtsProducts((prev) => [...prev, newInternalDebtsProduct]);
    }

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

  async function deleteInternalDebtProduct(id: number) {
    return setInternalDebtsProducts((prev) =>
      prev.filter((i) => i.internalDebtProductId !== id)
    );
  }

  function handleExistingProduct() {
    const currentProduct = products.find(
      (i) =>
        i.productId === newInternalDebtsProduct.internalDebtProduct_ProductId
    );
    const productAlreadyExists = internalDebtsProducts.some(
      (i) => i.internalDebtProduct_ProductId === currentProduct?.productId
    );
    if (productAlreadyExists) {
      setInternalDebtsProducts((prev) => {
        const existingProduct = prev.find(
          (i) => i.internalDebtProduct_ProductId === currentProduct?.productId
        );
        const newProduct = existingProduct;
        if (!newProduct) return prev;
        newProduct.internalDebtProductQuantity +=
          newInternalDebtsProduct.internalDebtProductQuantity;
        newProduct.internalDebtProductTotalPrice =
          newProduct.internalDebtProductTotalPrice +
          newInternalDebtsProduct.internalDebtProductQuantity *
            (Number(currentProduct?.productPrice) || 0);
        const result = [
          ...prev.filter(
            (i) => i.internalDebtProduct_ProductId !== currentProduct?.productId
          ),
          newProduct,
        ];
        return result;
      });
      Alert.alert(
        i18n.t("warning"),
        i18n.t("product-alreadyexists-quantity-updated")
      );
    }
    return productAlreadyExists;
  }

  return {
    products,
    dropDownItems,
    internalDebtsProducts,
    newInternalDebtsProduct,
    setInternalDebtsProduct,
    setNewProductQuantity,
    showAddProduct,
    handleAddProduct,
    toggleAddProduct,
    handleDeleteProduct,
  };
}
