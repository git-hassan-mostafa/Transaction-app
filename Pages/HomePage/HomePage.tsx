import { FlatList, View } from "react-native";
import styles from "./HomePage.style";
import useHomeService from "./HomePage.service";
import CardComponent from "@/Components/Reusable Components/CardComponent/CardComponent";
import FlatListHeaderComponent from "@/Components/Reusable Components/FlatListHeaderComponent/FlatListHeaderComponent";
import pages from "@/Global/Constants/Pages";

export default function HomePage() {
  const homeService = useHomeService();

  return (
    <FlatList
      ListHeaderComponent={() => {
        return <FlatListHeaderComponent />;
      }}
      style={styles.flatListView}
      data={pages.filter((p) => p.route != "index")}
      keyExtractor={(item) => item.title}
      numColumns={1}
      renderItem={({ item }) => <CardComponent key={item.title} {...item} />}
      ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
}
