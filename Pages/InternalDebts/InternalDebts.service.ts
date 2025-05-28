import useGlobalContext from "@/Global/Context/ContextProvider";
import { ICustomer_IInnerDebt } from "@/ViewModels/RelationModels/ICustomer_IInnerDebt";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import i18n from "@/Global/I18n/I18n";
import SortList from "@/Global/Helpers/Functions/SortList";
import useService from "@/Global/Context/ServiceProvider";

export default function useInnerDebtsService() {
  //services
  const { internalDebtManager } = useService();

  //states
  const [innerDebts, setInnerDebts] = useState<ICustomer_IInnerDebt[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // context
  const { toggleSnackBar } = useGlobalContext();

  //constructor
  sortInternalDebts();

  useEffect(() => {
    getAllInternalerDebts();
  }, []);

  async function addToInnerDebtsList(debt: ICustomer_IInnerDebt) {
    setInnerDebts((prev) => [...prev, debt]);
  }

  function deleteFromInnerDebtsList(id: number) {
    setInnerDebts((prev) => prev.filter((c) => c.innerDebtId !== id));
  }

  async function updateFromInnerDebtsList(value: ICustomer_IInnerDebt) {
    setInnerDebts((prev) =>
      prev.map((innerDebt) =>
        innerDebt.innerDebtId === value.innerDebtId
          ? { ...innerDebt, ...value }
          : innerDebt
      )
    );
  }

  async function getAllInternalerDebts() {
    const internalDebtsDB = await internalDebtManager.getAllInternalDebts();
    setInnerDebts(internalDebtsDB);
  }

  async function handleDeleteInnerDebt(id: number) {
    Alert.alert(
      i18n.t("delete-debt"),
      i18n.t("are-you-sure-you-want-to-delete-this-debt"),
      [
        {
          text: i18n.t("cancel"),
          style: "cancel",
        },
        { text: i18n.t("confirm"), onPress: () => deleteInnerDebt(id) },
      ]
    );
  }

  async function deleteInnerDebt(id: number) {
    const result = await internalDebtManager.deleteInternalDebt(id);
    if (!result.success) {
      toggleSnackBar({ visible: true, type: "error", text: result.message });
    }
    deleteFromInnerDebtsList(id);
    toggleSnackBar({ visible: true, type: "success", text: result.message });
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
  }

  function sortInternalDebts() {
    SortList(innerDebts, (e) => e.innerDebtDate);
  }

  return {
    innerDebts,
    modalVisible,
    toggleModal,
    addToInnerDebtsList,
    deleteFromInnerDebtsList,
    updateFromInnerDebtsList,
    handleDeleteInnerDebt,
  };
}
