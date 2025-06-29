import TabComponent from "@/Shared/Reusable Components/TabComponent/TabComponent";
import { View } from "react-native";
import i18n from "@/Shared/I18n/I18n";
import useInternalDebtProductsListService from "./InternalDebtProductsList/InternalDebtProductsList.service";
import useInternalDebtDetailsService from "./InternalDebtDetails/InternalDebtDetails.service";
import formStyle from "@/Shared/Styles/form.style";
import InternalDebtProductsList from "./InternalDebtProductsList/InternalDebtProductsList";
import InternalDebtDetails from "./InternalDebtDetails/InternalDebtDetails";
import { IInternalDebtFormProps } from "@/Models/InternalDebts/IInternalDebtsFormProps";

export default function InternalDebtForm(props: IInternalDebtFormProps) {
  const internalDebtsProductsListService = useInternalDebtProductsListService(
    props.id
  );

  const internalDebtDetailsService = useInternalDebtDetailsService({
    ...props,
    internalDebtsProductsListService,
  });
  return (
    <View style={[formStyle.container, formStyle.containerWithTab]}>
      <TabComponent titles={[i18n.t("details"), i18n.t("products-list")]}>
        <InternalDebtDetails {...internalDebtDetailsService} />
        <InternalDebtProductsList {...internalDebtsProductsListService} />
      </TabComponent>
    </View>
  );
}
