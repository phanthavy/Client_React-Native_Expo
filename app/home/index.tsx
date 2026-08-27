import axiosInstance from "@/service/axiosInstance";
import Ionicons from "@expo/vector-icons/Ionicons";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import ProductScreen from "../product";

type CategoryType = {
  cat_id: number;
  cat_name: string;
};

const HomePage = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const textColor = isDark ? "#F5F5F7" : "#1D1D1F";
  const subtitleColor = isDark ? "#A1A1AA" : "#71717A";
  const iconBg = isDark ? "#3A3A3C" : "#E4E4E7";

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">(
    "all",
  );

  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    all: "grid-outline",
    shirt: "shirt-outline",
    pant: "body-outline",
    watch: "watch-outline",
    accessories: "bag-outline",
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axiosInstance.get("/categories");
        setCategories(result.data.data ?? []);
      } catch (error) {
        if (isAxiosError(error)) {
          console.error(error.response?.data?.message || error.message);
        }
      }
    };
    fetchCategories();
  }, []);

  const categoryData = [
    { cat_id: 0, cat_name: "all", value: "all" as const },
    ...categories.map((c) => ({
      ...c,
      value: c.cat_id,
    })),
  ];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1C1C1E" : "#FAFAFA" },
      ]}
    >
      <View style={styles.sectionHeader}>
        <Text style={[styles.title, { color: textColor }]}>Categories</Text>
        <Pressable>
          <Text
            style={[styles.seeAll, { color: isDark ? "#60A5FA" : "#2563EB" }]}
          >
            See all
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={categoryData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.cat_id.toString()}
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
              style={({ pressed }) => [
                styles.category,
                { opacity: pressed ? 0.7 : 1 },
              ]}
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
                  name={iconMap[item.cat_name] ?? "ellipsis-horizontal-outline"}
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
                {item.cat_name}
              </Text>
            </Pressable>
          );
        }}
      />

      <View style={[styles.sectionHeader, { marginTop: 24 }]}>
        <Text style={[styles.title, { color: textColor }]}>Popular</Text>
        <Pressable>
          <Text
            style={[styles.seeAll, { color: isDark ? "#60A5FA" : "#2563EB" }]}
          >
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
