import TabComponent from "@/Global/Reusable Components/TabComponent/TabComponent";
import { IEditInnerDebtProps } from "@/ViewModels/InnerDebts/IInerDebtsFormProps";
import { View } from "react-native";
import i18n from "@/Global/I18n/I18n";
import useInternalDebtProductsListService from "./InternalDebtProductsList/InternalDebtProductsList.service";
import useInternalDebtDetailsService from "./InternalDebtDetails/InternalDebtDetails.service";
import formStyle from "@/Global/Styles/form.style";
import InternalDebtProductsList from "./InternalDebtProductsList/InternalDebtProductsList";
import InternalDebtDetails from "./InternalDebtDetails/InternalDebtDetails";

export default function EditInternalDebt(props: IEditInnerDebtProps) {
  const internalDebtsItemsListService = useInternalDebtProductsListService(
    props.id
  );

  const internalDebtDetailsService = useInternalDebtDetailsService({
    ...props,
    internalDebtsItemsListService,
  });
  return (
    <View style={[formStyle.container, formStyle.containerWithTab]}>
      <TabComponent titles={[i18n.t("details"), i18n.t("products-list")]}>
        <InternalDebtDetails {...internalDebtDetailsService} />
        <InternalDebtProductsList {...internalDebtsItemsListService} />
      </TabComponent>
    </View>
  );
}
