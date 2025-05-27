import { FlatList, useWindowDimensions, View } from "react-native";
import styles from "./Home.style";
import useHomeService from "./Home.service";
import CardComponent from "@/Global/Reusable Components/CardComponent/CardComponent";
import FlatListHeader from "@/Components/FlatListHeader/FlatListHeader";
import pages from "@/Global/Constants/Pages";

export default function Home() {
  const homeService = useHomeService();

  const { width } = useWindowDimensions();

  // Adjust columns based on width (e.g., landscape = 3 columns)
  const numColumns = Math.floor(width / 170); // Adjust the divisor based on your design
  return (
    <View style={styles.container}>
      <FlatList
        key={numColumns}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <FlatListHeader />
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
        data={pages.filter((p) => p.route != "index")}
        keyExtractor={(item) => item.title}
        numColumns={numColumns}
        renderItem={({ item }) => <CardComponent key={item.title} {...item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ marginBottom: 24 }}
      />
    </View>
  );
}
