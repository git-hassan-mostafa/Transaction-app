import CardType from "@/Components/Reusable Components/CardComponent/CardComponent.types";
import Constants from "@/Global/Constants/Constants";
import { Href, router } from "expo-router";
import { Dimensions } from "react-native";
const pages: CardType[] = [
  {
    title: "الزبائن",
    route: "customers",
    color: Constants.colors.blue,
    icon: "people-group",
  },
  {
    title: "البضاعة",
    route: "items",
    color: Constants.colors.orange,
    icon: "basket-shopping",
  },
  {
    title: "الديون الخارجية",
    route: "outerDebts",
    color: Constants.colors.oil,
    icon: "credit-card",
  },
  {
    title: "الديون الداخلية",
    route: "innerDebts",
    color: Constants.colors.red,
    icon: "wallet",
  },
  {
    route: "providers",
    title: "التجار",
    color: Constants.colors.brown,
    icon: "truck-arrow-right",
  },
  {
    title: "الأشخاص",
    route: "people",
    color: Constants.colors.lighBlue,
    icon: "people-carry-box",
  },
  {
    title: "النتائج",
    route: "results",
    color: Constants.colors.green,
    icon: "money-check-dollar",
  },
];

export default function useHomeService() {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = Math.floor(screenWidth / 150);

  return { numColumns, pages };
}
