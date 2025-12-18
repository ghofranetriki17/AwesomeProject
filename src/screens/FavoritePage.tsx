import React, { useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useApp } from "../context/AppContext";
import { PRODUCTS } from "../data/data";
import ProductCard from "../components/ProductCard";
import { PublicStackParamList } from "../navigation/PublicNavigation";

type Navigation = NativeStackNavigationProp<PublicStackParamList>;

export default function FavoritePage() {
  const navigation = useNavigation<Navigation>();
  const { favorites, toggleFavorite } = useApp();

  const favoriteProducts = useMemo(
    () =>
      favorites
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter(Boolean) as typeof PRODUCTS,
    [favorites]
  );

  const renderProduct = ({ item }: { item: (typeof PRODUCTS)[0] }) => (
    <ProductCard
      product={item}
      isFavorite
      onFavoritePress={() => toggleFavorite(item.id)}
      onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
    />
  );

  if (favoriteProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="local-cafe" size={64} color="#9B9B9B" />
        <Text style={styles.emptyTitle}>No favorites yet</Text>
        <Text style={styles.emptySubtitle}>Add products to favorites from home</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite</Text>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        contentContainerStyle={{ paddingBottom: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2A2A2A",
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#9B9B9B",
  },
});
