import useGlobalContext from "@/Shared/Context/ContextProvider";
import { useEffect, useState } from "react";
import IDropDownItem from "@/Shared/Types/IDropDownItem";
import IProduct from "@/Models/Products/IProduct";
import { IValidationErrorType } from "@/Shared/Types/IValidationErrorType";
import i18n from "@/Shared/I18n/I18n";
import useService from "@/Shared/Context/ServiceProvider";
import IProductFormProps from "@/Models/Products/IProductFormProps";

export default function useProductFormService(props: IProductFormProps) {
  // services
  const { productManager } = useService();

  //states
  const [product, setProduct] = useState<IProduct>(props.formData);
  const [providers, setProviders] = useState<IDropDownItem[]>([]);
  const [validation, setValidation] = useState<IValidationErrorType>({
    visible: false,
    text: "",
  });

  // context
  const context = useGlobalContext();

  useEffect(() => {
    props.dirtyChecker.setOriginalState(props.formData);
    fetchData();

    return () => {
      props.dirtyChecker.dispose();
    };
  }, []);

  useEffect(() => {
    props.dirtyChecker.setState(product);
  }, [product]);

  async function fetchData() {
    await getAllProviders();
  }

  async function getAllProviders() {
    const providers = await productManager.getAllProviders();
    setProviders(
      providers?.map((p) => {
        return { label: p.Name, value: p.Id };
      }) as IDropDownItem[]
    );
  }

  function setProductName(value: string) {
    setProduct((prev): IProduct => {
      return { ...prev, Name: value };
    });
  }

  function setProductQuantity(value: string) {
    setProduct((prev): IProduct => {
      return { ...prev, Quantity: Number(value).toString() };
    });
  }

  function setProductPrice(value: string) {
    setProduct((prev): IProduct => {
      return { ...prev, Price: value };
    });
  }

  function setProvider(providerId: number) {
    setProduct((prev): IProduct => {
      return { ...prev, ProviderId: providerId };
    });
  }

  function setProductNotes(value: string) {
    setProduct((prev): IProduct => {
      return { ...prev, Notes: value };
    });
  }

  async function save() {
    await props.save(product, validateProduct);
  }

  function validateProduct(product: IProduct) {
    if (!product.Name) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-product-name"),
      });
      return false;
    }
    if (!product.Price) {
      setValidation({
        visible: true,
        text: i18n.t("please-enter-product-price"),
      });
      return false;
    }
    if (!product.Quantity) {
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
