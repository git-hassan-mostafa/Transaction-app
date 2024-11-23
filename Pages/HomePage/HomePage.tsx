import { Dimensions, FlatList, ScrollView, View } from "react-native";
import styles from "./HomePage.style";
import useHomeService from "./HomePage.service";
import CardComponent from "@/components/CardComponent/CardComponent";
import { useEffect } from "react";

export default function HomePage() {
  const homeService = useHomeService();

  return (
    <FlatList
      style={styles.flatListView}
      data={homeService.pages}
      keyExtractor={(item) => item.title}
      numColumns={1}
      renderItem={({ item }) => <CardComponent key={item.title} {...item} />}
      ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
    />
  );
}
