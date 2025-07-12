import Tabs from "@/Shared/Components/Tabs";
import { View } from "react-native";
import i18n from "@/Shared/I18n/I18n";
import useInternalDebtProductsListService from "./InternalDebtProductsList/InternalDebtProductsList.service";
import useInternalDebtDetailsService from "./InternalDebtDetails/InternalDebtDetails.service";
import formStyle from "@/Shared/Styles/form.style";
import InternalDebtProductsList from "./InternalDebtProductsList/InternalDebtProductsList";
import InternalDebtDetails from "./InternalDebtDetails/InternalDebtDetails";
import { IInternalDebtFormProps } from "@/Models/InternalDebts/IInternalDebtsFormProps";

export default function InternalDebtForm(props: IInternalDebtFormProps) {
  const detailsService = useInternalDebtDetailsService(props);
  const listService = useInternalDebtProductsListService(detailsService);
  return (
    <View style={[formStyle.container, formStyle.containerWithTab]}>
      <Tabs titles={[i18n.t("details"), i18n.t("products-list")]}>
        <InternalDebtDetails {...detailsService} />
        <InternalDebtProductsList {...listService} />
      </Tabs>
    </View>
  );
}
