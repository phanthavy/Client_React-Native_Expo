import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import ProductScreen, { ProductCategory } from "../product";

type Category = {
  id: number;
  name: string;
  value: ProductCategory;
};

const categoryData: Category[] = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "Shirt", value: "shirt" },
  { id: 3, name: "Bag", value: "bag" },
  { id: 4, name: "Watch", value: "watch" },
  { id: 5, name: "Glasses", value: "glasses" },
];

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  All: "grid-outline",
  Shirt: "shirt-outline",
  Bag: "bag-outline",
  Watch: "watch-outline",
  Glasses: "glasses-outline",
};

const HomePage = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");

  const textColor = isDark ? "#F5F5F7" : "#1D1D1F";
  const subtitleColor = isDark ? "#A1A1AA" : "#71717A";
  const iconBg = isDark ? "#3A3A3C" : "#E4E4E7";

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#1C1C1E" : "#FAFAFA" }]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.title, { color: textColor }]}>Categories</Text>
        <Pressable>
          <Text style={[styles.seeAll, { color: isDark ? "#60A5FA" : "#2563EB" }]}>
            See all
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={categoryData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        style={{ flexGrow: 0 }}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => {
          const isSelected = selectedCategory === item.value;
          let iconColor = "#3F3F46";

          if (isDark) {
            iconColor = "#F5F5F7";
          }

          if (isSelected) {
            iconColor = "#FFFFFF";
          }

          return (
            <Pressable
              onPress={() => setSelectedCategory(item.value)}
              style={({ pressed }) => [styles.category, { opacity: pressed ? 0.7 : 1 }]}
            >
              <View
                style={[
                  styles.categoryIcon,
                  {
                    backgroundColor: isSelected ? "#2563EB" : iconBg,
                  },
                ]}
              >
                <Ionicons
                  name={iconMap[item.name] ?? "ellipsis-horizontal-outline"}
                  color={iconColor}
                  size={28}
                />
              </View>
              <Text
                style={[
                  styles.categoryName,
                  { color: isSelected ? textColor : subtitleColor },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />

      <View style={[styles.sectionHeader, { marginTop: 24 }]}>
        <Text style={[styles.title, { color: textColor }]}>Popular</Text>
        <Pressable>
          <Text style={[styles.seeAll, { color: isDark ? "#60A5FA" : "#2563EB" }]}>
            See all
          </Text>
        </Pressable>
      </View>

      <ProductScreen selectedCategory={selectedCategory} />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
  },
  categoryList: {
    gap: 16,
    paddingBottom: 4,
  },
  category: {
    alignItems: "center",
    gap: 8,
    width: 72,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "500",
  },
});
