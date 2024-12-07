import { FlatList, View } from "react-native";
import styles from "./HomePage.style";
import useHomeService from "./HomePage.service";
import CardComponent from "@/Components/CardComponent/CardComponent";
import FlatListHeaderComponent from "@/Components/FlatListHeaderComponent/FlatListHeaderComponent";

export default function HomePage() {
  const homeService = useHomeService();

  return (
    <FlatList
      ListHeaderComponent={() => {
        return <FlatListHeaderComponent />;
      }}
      style={styles.flatListView}
      data={homeService.pages}
      keyExtractor={(item) => item.title}
      numColumns={1}
      renderItem={({ item }) => <CardComponent key={item.title} {...item} />}
      ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
}
