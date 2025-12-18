import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useApp } from "../context/AppContext";
import { CartItem, PRODUCTS, getProductById } from "../data/data";
import { PublicStackParamList } from "../navigation/PublicNavigation";

type Route = RouteProp<PublicStackParamList, "ProductDetail">;
type Navigation = NativeStackNavigationProp<PublicStackParamList>;

const sizeOptions: CartItem["size"][] = ["Small", "Medium", "Large"];
const sugarOptions: CartItem["sugar"][] = ["No Sugar", "Low", "Medium"];

export default function ProductDetailPage() {
  const route = useRoute<Route>();
  const navigation = useNavigation<Navigation>();
  const { favorites, toggleFavorite, addToCart } = useApp();

  const product = useMemo(() => {
    const id = route.params?.productId;
    return id ? getProductById(id) : undefined;
  }, [route.params?.productId]);

  // Fallback to first product to avoid crash if undefined
  const safeProduct = product ?? PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState<CartItem["size"]>("Small");
  const [selectedSugar, setSelectedSugar] = useState<CartItem["sugar"]>("No Sugar");

  const priceLabel = `Rp ${safeProduct.price.toLocaleString("en-US")}`;
  const isFavorite = favorites.includes(safeProduct.id);

  const handleAddToCart = () => {
    addToCart(safeProduct.id, selectedSize, selectedSugar, 1);
    Alert.alert("Added to cart!", "Your coffee was added to the cart.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: safeProduct.imageUrl }} style={styles.image} />
          <TouchableOpacity
            style={[styles.iconButton, styles.backButton]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.iconText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, styles.favoriteButton]}
            onPress={() => toggleFavorite(safeProduct.id)}
            activeOpacity={0.85}
          >
            <Text style={[styles.iconText, { color: isFavorite ? "#DC143C" : "#2A2A2A" }]}>
              {isFavorite ? "❤️" : "🤍"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>{safeProduct.name}</Text>
          <Text style={styles.rating}>⭐ {safeProduct.rating}</Text>
          <Text style={styles.description}>{safeProduct.description}</Text>

          <Text style={styles.label}>Cup Size</Text>
          <View style={styles.optionRow}>
            {sizeOptions.map((option) => {
              const selected = selectedSize === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selected ? styles.optionSelected : styles.optionUnselected,
                  ]}
                  onPress={() => setSelectedSize(option)}
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected ? styles.optionTextSelected : undefined,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Level Sugar</Text>
          <View style={styles.optionRow}>
            {sugarOptions.map((option) => {
              const selected = selectedSugar === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    selected ? styles.optionSelected : styles.optionUnselected,
                  ]}
                  onPress={() => setSelectedSugar(option)}
                  activeOpacity={0.85}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selected ? styles.optionTextSelected : undefined,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>About</Text>
          <Text style={styles.about}>{safeProduct.about}</Text>
          <Text style={styles.readMore}>Read More</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>{priceLabel}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          activeOpacity={0.9}
        >
          <Text style={styles.addButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  iconText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  content: {
    paddingBottom: 100,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 400,
  },
  iconButton: {
    position: "absolute",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  backButton: {
    top: 20,
    left: 16,
  },
  favoriteButton: {
    top: 20,
    right: 16,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2A2A2A",
  },
  rating: {
    fontSize: 14,
    color: "#2A2A2A",
  },
  description: {
    fontSize: 14,
    color: "#2A2A2A",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2A2A2A",
    marginTop: 6,
  },
  optionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  optionSelected: {
    backgroundColor: "#2F4B26",
    borderColor: "#2F4B26",
  },
  optionUnselected: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
  },
  optionText: {
    fontSize: 14,
    color: "#2A2A2A",
    fontWeight: "600",
  },
  optionTextSelected: {
    color: "#FFFFFF",
  },
  about: {
    fontSize: 14,
    color: "#2A2A2A",
    lineHeight: 20,
  },
  readMore: {
    fontSize: 14,
    color: "#2F4B26",
    fontWeight: "700",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 6,
  },
  priceLabel: {
    fontSize: 12,
    color: "#9B9B9B",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  addButton: {
    backgroundColor: "#2F4B26",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: "60%",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
