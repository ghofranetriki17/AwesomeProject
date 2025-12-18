import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Product } from "../data/data";

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

function ProductCard({
  product,
  isFavorite,
  onPress,
  onFavoritePress,
}: ProductCardProps) {
  const priceLabel = `Rp ${product.price.toLocaleString("en-US")}`;

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onFavoritePress();
          }}
          style={styles.favoriteButton}
          activeOpacity={0.8}
        >
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={22}
            color={isFavorite ? "#DC143C" : "#2A2A2A"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{priceLabel}</Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onPress();
            }}
            style={styles.addButton}
            activeOpacity={0.85}
          >
            <MaterialIcons name="add" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    width: 180,
    marginRight: 12,
  },
  imageWrapper: {
    position: "relative",
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  description: {
    fontSize: 12,
    color: "#9B9B9B",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2F4B26",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductCard;
