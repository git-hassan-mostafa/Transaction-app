import useGlobalContext from "@/Global/Context/ContextProvider";
import { useEffect, useState } from "react";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IProduct from "@/ViewModels/Products/IProduct";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import i18n from "@/Global/I18n/I18n";
import useService from "@/Global/Context/ServiceProvider";
import IProductFormProps from "@/ViewModels/Products/IProductFormProps";

export default function useProductFormService(props: IProductFormProps) {
  // services
  const { productManager } = useService();

  //states
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [providers, setProviders] = useState<IDropDownItem[]>([]);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  // context
  const context = useGlobalContext();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await Promise.all([getProduct(), getAllProviders()]);
  }

  async function getProduct() {
    if (!props.id) return;
    const productDB = await productManager.getProduct(props.id);
    if (!productDB) return;
    setProduct(productDB);
  }

  async function getAllProviders() {
    const providers = await productManager.getAllProviders();
    setProviders([
      { label: "", value: undefined },
      ...(providers?.map((p) => {
        return { label: p.providerName, value: p.providerId };
      }) as IDropDownItem[]),
    ]);
  }

  function setProductName(value: string) {
    setProduct((prev) => {
      return { ...prev, productName: value };
    });
  }

  function setProductQuantity(value: string) {
    setProduct((prev) => {
      return { ...prev, productQuantity: Number(value).toString() };
    });
  }

  function setProductPrice(value: string) {
    setProduct((prev) => {
      return { ...prev, productPrice: value };
    });
  }

  function setProvider(providerId: number) {
    setProduct((prev) => {
      return { ...prev, product_ProviderId: providerId };
    });
  }

  function setProductNotes(value: string) {
    setProduct((prev) => {
      return { ...prev, productNotes: value };
    });
  }

  function save() {
    setProduct(product);
    if (props.id) updateProduct();
    else addProduct();
  }

  async function addProduct() {
    if (!validateProduct()) return;
    const result = await productManager.addProduct(product);
    if (!result.success)
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    product.productId = result?.data;
    props.addToProductsList(product);
    props.toggleModal();
    context.toggleSnackBar({
      visible: true,
      text: result.message,
      type: "success",
    });
  }

  async function updateProduct() {
    if (!validateProduct()) return;
    const result = await productManager.updateProduct(product);
    if (!result.success)
      return context.toggleSnackBar({
        visible: true,
        text: result.message,
        type: "error",
      });
    props.updateFromProductsList(product);
    props.toggleModal();
    context.toggleSnackBar({
      visible: true,
      text: result.message,
      type: "success",
    });
  }

  function validateProduct() {
    if (!product.productName) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-product-name"),
      });
      return false;
    }
    if (!product.productPrice) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-product-price"),
      });
      return false;
    }
    if (!product.productQuantity) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-product-quantity"),
      });
      return false;
    }
    return true;
  }

  return {
    product,
    providers,
    validation,
    setProductName,
    setProductQuantity,
    setProductPrice,
    setProvider,
    setProductNotes,
    save,
  };
}
