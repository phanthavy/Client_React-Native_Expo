import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const textColor = isDark ? "#F5F5F7" : "#1D1D1F";
  const subtitleColor = isDark ? "#A1A1AA" : "#71717A";
  const bgColor = isDark ? "#1C1C1E" : "#FAFAFA";
  const cardBg = isDark ? "#2C2C2E" : "#FFFFFF";

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={[styles.imagePlaceholder, { backgroundColor: isDark ? "#3A3A3C" : "#E4E4E7" }]}>
        <Ionicons name="image-outline" size={48} color={subtitleColor} />
      </View>

      <View style={[styles.infoCard, { backgroundColor: cardBg }]}>
        <Text style={[styles.productTitle, { color: textColor }]}>
          Product #{id}
        </Text>
        <Text style={[styles.price, { color: isDark ? "#60A5FA" : "#2563EB" }]}>
          $1,200
        </Text>

        <View style={styles.divider} />

        <Text style={[styles.descTitle, { color: textColor }]}>Description</Text>
        <Text style={[styles.descBody, { color: subtitleColor }]}>
          Premium quality product crafted with attention to detail. Designed for everyday use with a modern aesthetic.
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.addToCartBtn,
            { opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => router.back()}
        >
          <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePlaceholder: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  infoCard: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
    gap: 8,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(128,128,128,0.3)",
    marginVertical: 16,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  descBody: {
    fontSize: 14,
    lineHeight: 22,
  },
  addToCartBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 24,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
