import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavbarProps = {
  colorScheme: "light" | "dark" | null | undefined;
};

export default function Navbar({ colorScheme }: Readonly<NavbarProps>) {
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const textColor = isDark ? "#F5F5F7" : "#1D1D1F";
  const backgroundColor = isDark ? "#1C1C1E" : "#FFFFFF";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  return (
    <View
      style={[
        styles.navbar,
        { backgroundColor, borderBottomColor: borderColor, paddingTop: insets.top },
      ]}
    >
      <Ionicons name="menu-outline" size={24} color={textColor} />
      <Text style={[styles.title, { color: isDark ? "#60A5FA" : "#2563EB" }]}>
        Ruxery
      </Text>
      <View style={styles.notifWrapper}>
        <Ionicons name="notifications-outline" size={22} color={textColor} />
        <View style={styles.notifBadge} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  notifWrapper: {
    position: "relative",
  },
  notifBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
});
