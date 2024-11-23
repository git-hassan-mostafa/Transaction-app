import { Href, router } from "expo-router";
import { Dimensions } from "react-native";
const pages = [
  {
    title: "العملاء",
    route: "users",
    image: require("../../assets/navigation-icons/clients.webp"),
    color: "#081230",
  },
  {
    title: "البضاعة",
    route: "products",
    image: require("../../assets/navigation-icons/products.webp"),
    color: "#01611f",
  },
  {
    title: "الديون",
    route: "products",
    image: require("../../assets/navigation-icons/debts.webp"),
    color: "#c2281d",
  },
  {
    title: "النتائج",
    route: "products",
    image: require("../../assets/navigation-icons/results.webp"),
    color: "#065661",
  },
];

export default function useHomeService() {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = Math.floor(screenWidth / 150);

  function onNavigationButtonClick(path: string) {
    router.navigate(("/" + path) as Href);
  }

  return { numColumns, pages, onNavigationButtonClick };
}
