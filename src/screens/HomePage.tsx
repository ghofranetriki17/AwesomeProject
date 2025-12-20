// Docs: https://reactnative.dev/docs/flatlist | https://reactnative.dev/docs/scrollview | https://reactnative.dev/docs/image | https://reactnative.dev/docs/text
import React, { useMemo } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useApp } from "../context/AppContext";
import { CATEGORIES, USER, getProductsByCategory } from "../data/data";
import ProductCard from "../components/ProductCard";
import CategoryButton from "../components/CategoryButton";
import { PublicStackParamList } from "../navigation/PublicNavigation";

type Navigation = NativeStackNavigationProp<PublicStackParamList>;

function HomePage() {
  const navigation = useNavigation<Navigation>();
  const {
    favorites,
    toggleFavorite,
    selectedCategory,
    setSelectedCategory,
  } = useApp();

  const categories = useMemo(() => ["All", ...CATEGORIES], []);
  const filteredProducts = useMemo(
    () => getProductsByCategory(selectedCategory),
    [selectedCategory]
  );
  const featuredProducts = useMemo(
    () => filteredProducts.slice(0, 3),
    [filteredProducts]
  );
  const specialOfferProducts = useMemo(
    () => filteredProducts.slice(3),
    [filteredProducts]
  );

  const handleProductPress = (productId: string) =>
    navigation.navigate("ProductDetail", { productId });

  const renderCategory = (title: string) => (
    <CategoryButton
      key={title}
      title={title}
      isSelected={selectedCategory === title}
      onPress={() => setSelectedCategory(title)}
      style={{ marginRight: 10 }}
    />
  );

  const renderFeatured = ({ item }: { item: (typeof filteredProducts)[0] }) => (
    <ProductCard
      product={item}
      isFavorite={favorites.includes(item.id)}
      onFavoritePress={() => toggleFavorite(item.id)}
      onPress={() => handleProductPress(item.id)}
    />
  );

  const renderSpecial = ({ item }: { item: (typeof filteredProducts)[0] }) => (
    <ProductCard
      product={item}
      isFavorite={favorites.includes(item.id)}
      onFavoritePress={() => toggleFavorite(item.id)}
      onPress={() => handleProductPress(item.id)}
    />
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image source={{ uri: USER.profileImage }} style={styles.avatar} />
        <View style={styles.locationRow}>
          <Text style={styles.icon}>📍</Text>
          <Text style={styles.locationText}>{USER.location}</Text>
        </View>
        <Text style={[styles.icon, styles.bellIcon]}>🔔</Text>
      </View>

      <Text style={styles.greeting}>Good morning, {USER.name}</Text>

      <View style={styles.searchBar}>
        <Text style={styles.icon}>🔍</Text>
        <Text style={styles.searchPlaceholder}>Search Coffee...</Text>
        <View style={{ flex: 1 }} />
        <Text style={styles.icon}>⚙️</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 12 }}
        >
          {categories.map(renderCategory)}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <FlatList
          data={featuredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderFeatured}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          contentContainerStyle={{ paddingRight: 12 }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Offer</Text>
        <FlatList
          data={specialOfferProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderSpecial}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          contentContainerStyle={{ paddingBottom: 12 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  icon: {
    fontSize: 18,
  },
  bellIcon: {
    fontSize: 22,
  },
  locationText: {
    fontSize: 14,
    color: "#2A2A2A",
    fontWeight: "600",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2A2A2A",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: "#9B9B9B",
    fontSize: 14,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2A2A2A",
  },
});

export default HomePage;
