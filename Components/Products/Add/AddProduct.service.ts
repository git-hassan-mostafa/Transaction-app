import useGlobalContext from "@/Global/Context/ContextProvider";
import { useEffect, useState } from "react";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IAddProductProps from "@/ViewModels/Products/IAddProductProps";
import IProduct from "@/ViewModels/Products/IProduct";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import i18n from "@/Global/I18n/I18n";
import useService from "@/Global/Context/ServiceProvider";

export default function useAddProductService(props: IAddProductProps) {
  // services
  const { productManager } = useService();

  //states
  const [productState, setProductState] = useState<IProduct>({} as IProduct);
  var product: IProduct = productState;
  const [providers, setProviders] = useState<IDropDownItem[]>([]);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  // context
  const context = useGlobalContext();

  useEffect(() => {
    getAllProviders();
  }, []);

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
    product = { ...product, productName: value };
  }

  function setProductQuantity(value: string) {
    product.productQuantity = value;
  }

  function setProductPrice(value: string) {
    product.productPrice = Number(value).toString();
  }

  function setProvider(providerId: number) {
    product.product_ProviderId = providerId;
  }

  function setProductNotes(value: string) {
    product.productNotes = value;
  }

  async function addProduct() {
    setProductState(product);
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
    addProduct,
  };
}
