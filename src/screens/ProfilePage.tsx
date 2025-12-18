import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { USER } from "../data/data";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PublicStackParamList } from "../navigation/PublicNavigation";

type Navigation = NativeStackNavigationProp<PublicStackParamList>;

const menuItems = [
  { icon: "receipt", label: "My Orders" },
  { icon: "payment", label: "Payment Methods" },
  { icon: "settings", label: "Settings" },
  { icon: "help", label: "Help & Support" },
];

export default function ProfilePage() {
  const navigation = useNavigation<Navigation>();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <Image source={{ uri: USER.profileImage }} style={styles.avatar} />
          <Text style={styles.name}>{USER.name}</Text>
          <Text style={styles.email}>{USER.email}</Text>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.label} style={styles.menuItem} activeOpacity={0.85}>
              <View style={styles.menuLeft}>
                <MaterialIcons name={item.icon as any} size={22} color="#2A2A2A" />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color="#9B9B9B" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.9}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
    gap: 16,
  },
  profileSection: {
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E0E0E0",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2A2A2A",
  },
  email: {
    fontSize: 14,
    color: "#9B9B9B",
  },
  menuSection: {
    gap: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuLabel: {
    fontSize: 16,
    color: "#2A2A2A",
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#DC143C",
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
