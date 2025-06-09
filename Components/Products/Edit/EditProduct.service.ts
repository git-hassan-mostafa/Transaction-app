import { useEffect, useState } from "react";
import IDropDownItem from "@/Global/Types/IDropDownItem";
import IProduct from "@/ViewModels/Products/IProduct";
import IEditProductProps from "@/ViewModels/Products/IProductFormProps";
import { IValidationErrorType } from "@/Global/Types/IValidationErrorType";
import useGlobalContext from "@/Global/Context/ContextProvider";
import i18n from "@/Global/I18n/I18n";
import ProviderDataAccess from "@/DAL/ProviderDataAccess";
import useService from "@/Global/Context/ServiceProvider";

export default function useEditProductService(props: IEditProductProps) {
  //services
  const { productManager } = useService();

  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [providers, setProviders] = useState<IDropDownItem[]>([]);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  //context
  const context = useGlobalContext();

  useEffect(() => {
    getProduct();
    getAllProviders();
  }, []);

  async function getAllProviders() {
    const providers = await productManager.getAllProviders();
    const sortedProviders = [
      { label: "", value: undefined },
      ...(providers?.map((p) => {
        return { label: p.providerName, value: p.providerId };
      }) as IDropDownItem[]),
    ];
    setProviders(sortedProviders);
  }

  async function getProduct() {
    const productDB = await productManager.getProduct(props.id);
    if (!productDB) return;
    setProduct(productDB);
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
    if (!product.productQuantity || Number(product.productQuantity) < 1) {
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
    validation,
    providers,
    updateProduct,
    setProductName,
    setProductPrice,
    setProductQuantity,
    setProvider,
    setProductNotes,
  };
}
