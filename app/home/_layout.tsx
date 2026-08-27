import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, useColorScheme } from "react-native";

export type TabIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
};

export type TabScreenProps = {
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const TabIcon = ({ name, color, size }: TabIconProps) => {
  return <Ionicons name={name} size={size} color={color} />;
};

const TabScreen: TabScreenProps[] = [
  { name: "index", title: "Home", icon: "home" },
  { name: "searchs", title: "Searchs", icon: "search" },
  { name: "carts", title: "Cart", icon: "cart" },
  { name: "history", title: "History", icon: "time" },
  { name: "profile", title: "Profile", icon: "person" },
];

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? "#60A5FA" : "#2563EB",
        tabBarInactiveTintColor: isDark ? "#71717A" : "#A1A1AA",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.2,
        },
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF",
          borderTopWidth: isDark ? 0 : StyleSheet.hairlineWidth,
          borderTopColor: "rgba(0,0,0,0.06)",
          elevation: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
      }}
    >
      {TabScreen.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ size, color }) => (
              <TabIcon name={icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
