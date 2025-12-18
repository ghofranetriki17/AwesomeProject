import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartItem as CartItemType, Product } from "../data/data";

interface CartItemProps {
  cartItem: CartItemType;
  product: Product;
  onQuantityChange: (quantity: number) => void;
  onToggleFavorite: () => void;
}

function CartItem({
  cartItem,
  product,
  onQuantityChange,
  onToggleFavorite,
}: CartItemProps) {
  const priceLabel = `Rp ${product.price.toLocaleString("en-US")}`;

  const handleDecrease = () =>
    onQuantityChange(Math.max(0, cartItem.quantity - 1));
  const handleIncrease = () => onQuantityChange(cartItem.quantity + 1);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />

      <View style={styles.info}>
        <View style={styles.infoHeader}>
          <Text style={styles.name}>{product.name}</Text>
          <TouchableOpacity onPress={onToggleFavorite} hitSlop={8}>
            <Text style={styles.heart}>🤍</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.meta}>
          Size: {cartItem.size} · Sugar: {cartItem.sugar}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.price}>{priceLabel}</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity style={styles.qtyButton} onPress={handleDecrease}>
            <Text style={styles.qtyIcon}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{cartItem.quantity}</Text>
          <TouchableOpacity style={styles.qtyButton} onPress={handleIncrease}>
            <Text style={styles.qtyIcon}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginBottom: 12,
    gap: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  description: {
    fontSize: 12,
    color: "#9B9B9B",
  },
  meta: {
    fontSize: 12,
    color: "#2A2A2A",
  },
  right: {
    alignItems: "flex-end",
    gap: 8,
  },
  heart: {
    fontSize: 18,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  qtyIcon: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  quantity: {
    minWidth: 20,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "#2A2A2A",
  },
});

export default CartItem;
