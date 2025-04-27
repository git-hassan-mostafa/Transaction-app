import { FlatList, View } from "react-native";
import styles from "./HomePage.style";
import useHomeService from "./HomePage.service";
import CardComponent from "@/Components/Reusable Components/CardComponent/CardComponent";
import FlatListHeaderComponent from "@/Components/Reusable Components/FlatListHeaderComponent/FlatListHeaderComponent";
import pages from "@/Global/Constants/Pages";
import { ThemedText } from "@/Components/HelperComponents/ThemedText";

export default function HomePage() {
  const homeService = useHomeService();

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <FlatListHeaderComponent />
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
        data={pages.filter((p) => p.route != "index")}
        keyExtractor={(item) => item.title}
        numColumns={2}
        renderItem={({ item }) => <CardComponent key={item.title} {...item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{ marginBottom: 24 }}
      />
    </View>
  );
}
