import useGlobalContext from "@/Global/Context/ContextProvider";
import Mapper from "@/Global/Helpers/MapService";
import InnerDebtsManager from "@/Global/Services/innerDebts.service";
import { ICustomer_IInnerDebt } from "@/Global/ViewModels/RelationModels/ICustomer_IInnerDebt";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import i18n from "@/Global/I18n/I18n";

export default function useInnerDebtsPageService() {
  //services
  const innerDebtsManager = new InnerDebtsManager();
  const mapper = new Mapper();

  //states
  const [innerDebts, setInnerDebts] = useState<ICustomer_IInnerDebt[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // context
  const { toggleSnackBar } = useGlobalContext();
  useEffect(() => {
    getAllInnerDebts();
  }, []);

  async function addToInnerDebtsList(debt: ICustomer_IInnerDebt) {
    setInnerDebts((prev) => [...prev, debt]);
  }

  function deleteFromInnerDebtsList(id: number) {
    setInnerDebts((prev) => prev.filter((c) => c.innerDebtId !== id));
  }

  async function updateFromInnerDebtsList(value: ICustomer_IInnerDebt) {
    const debt = value;
    setInnerDebts((prev) =>
      prev.map((innerDebt) =>
        innerDebt.innerDebtId === value.innerDebtId
          ? { ...innerDebt, ...debt }
          : innerDebt
      )
    );
  }

  async function getAllInnerDebts() {
    const innerDebtsDB = await innerDebtsManager.getAllInnerDebts();
    const innerDebts = innerDebtsDB?.map((c) => {
      return mapper.mapToICustomer_IInnerDebt(c);
    });
    setInnerDebts(innerDebts as ICustomer_IInnerDebt[]);
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
    const result = await innerDebtsManager.deleteInnerDebt(id);
    if ((result?.changes || 0) > 0) {
      deleteFromInnerDebtsList(id);
      toggleSnackBar({
        text: i18n.t("internal-debt-deleted-successfully"),
        type: "success",
        visible: true,
      });
    } else
      toggleSnackBar({
        text: i18n.t("error-deleting-internal-debt"),
        type: "error",
        visible: true,
      });
  }

  function toggleModal() {
    setModalVisible((prev) => !prev);
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
