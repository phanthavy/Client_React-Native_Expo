import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

export type ProductCategory = "all" | "watch" | "shirt" | "bag" | "glasses";

type ProductTypes = {
  id: number;
  name: string;
  price: number;
  category: Exclude<ProductCategory, "all">;
  img: ImageSourcePropType;
};

const products: ProductTypes[] = [
  {
    id: 1,
    name: "Classic Watch",
    price: 1200,
    category: "watch",
    img: require("@/assets/images/watch/watch1.jpg"),
  },
  {
    id: 2,
    name: "Sport Watch",
    price: 1999,
    category: "watch",
    img: require("@/assets/images/watch/watch2.jpg"),
  },
  {
    id: 3,
    name: "Dive Watch",
    price: 1999,
    category: "watch",
    img: require("@/assets/images/watch/watch3.webp"),
  },
  {
    id: 4,
    name: "Leather Bag",
    price: 1999,
    category: "shirt",
    img: require("@/assets/images/shirt/shirt1.avif"),
  },
  {
    id: 5,
    name: "Formal Shirt",
    price: 1999,
    category: "shirt",
    img: require("@/assets/images/shirt/shirt2.jpg"),
  },
];

type ProductScreenProps = {
  selectedCategory?: ProductCategory;
};

export default function ProductScreen({
  selectedCategory = "all",
}: Readonly<ProductScreenProps>) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const textColor = isDark ? "#F5F5F7" : "#1D1D1F";
  const subtitleColor = isDark ? "#A1A1AA" : "#71717A";
  const cardBg = isDark ? "#2C2C2E" : "#FFFFFF";
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((item) => item.category === selectedCategory);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: textColor }]}>
              No products found
            </Text>
            <Text style={[styles.emptyText, { color: subtitleColor }]}>
              There are no items in this category yet.
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 90 }}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: cardBg,
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
            onPress={() => router.push(`/product/${item.id}`)}
          >
            <Pressable
              style={({ pressed }) => [
                {
                  position: "absolute",
                  right: 10,
                  top: 10,
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "#131313",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  transform: [{ scale: pressed ? 0.9 : 1 }],
                },
              ]}
              onPress={(e) => {
                e.stopPropagation(); // don't open product detail
              }}
            >
              <Ionicons name="heart-outline" size={20} color="#FFFFFF" />
            </Pressable>
            <Image source={item.img} style={styles.image} />
            <View style={styles.cardBody}>
              <Text
                style={[styles.productName, { color: textColor }]}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text style={[styles.productPrice, { color: subtitleColor }]}>
                ${item.price.toLocaleString()}
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                {
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#353535",
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginBottom: 20,
                  marginHorizontal: 10,
                  opacity: pressed ? 0.7 : 1,
                  transform: [{ scale: pressed ? 0.9 : 1 }],
                },
              ]}
            >
              <Ionicons name="cart-outline" style={{ color: "#B7C4FF" }} />
              <Text style={{ color: "#B7C4FF" }}>Add to cart</Text>
            </Pressable>
          </Pressable>
        )}
      />
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          {
            opacity: pressed ? 0.85 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
        onPress={() => router.push("/product/createproduct/CreateProduct")}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  cardBody: {
    padding: 12,
    gap: 4,
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
});
