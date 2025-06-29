import { Href, router } from "expo-router";

export default function useCardComponentService() {
  function onNavigationButtonClick(path: string) {
    router.navigate(("/" + path) as Href);
  }

  return { onNavigationButtonClick };
}
