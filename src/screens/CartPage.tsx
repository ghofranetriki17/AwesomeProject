// Docs: https://reactnative.dev/docs/scrollview | https://reactnative.dev/docs/alert | https://reactnative.dev/docs/text | https://reactnative.dev/docs/touchableopacity | https://reactnative.dev/docs/view
import React, { useMemo } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useApp } from "../context/AppContext";
import { PRODUCTS, getProductById } from "../data/data";
import CartItem from "../components/CartItem";
import { PublicStackParamList, TabParamList } from "../navigation/PublicNavigation";

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, "Cart">,
  NativeStackNavigationProp<PublicStackParamList>
>;

const formatPrice = (price: number) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default function CartPage() {
  const navigation = useNavigation<Navigation>();
  const {
    cart,
    updateCartQuantity,
    clearCart,
    getCartSubtotal,
    getCartTotal,
    toggleFavorite,
  } = useApp();

  const cartWithProducts = useMemo(
    () =>
      cart
        .map((item) => ({
          ...item,
          product: getProductById(item.productId),
        }))
        .filter((entry) => entry.product) as Array<
        (typeof cart)[0] & { product: (typeof PRODUCTS)[0] }
      >,
    [cart]
  );

  const handleBuy = () => {
    Alert.alert("Order placed successfully!");
    clearCart();
    navigation.navigate("Home");
  };

  if (cartWithProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add products from home</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 16, gap: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {cartWithProducts.map((item) => (
          <CartItem
            key={`${item.productId}-${item.size}-${item.sugar}`}
            cartItem={item}
            product={item.product}
            onToggleFavorite={() => toggleFavorite(item.productId)}
            onQuantityChange={(qty) => {
              const nextQty = Math.max(1, qty);
              updateCartQuantity(item.productId, nextQty);
            }}
          />
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Payment</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>
            د.ت{formatPrice(getCartSubtotal())}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount</Text>
          <Text style={styles.summaryValue}>د.ت25,000</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, styles.totalLabel]}>Total</Text>
          <Text style={[styles.summaryValue, styles.totalValue]}>
            د.ت{formatPrice(getCartTotal())}
          </Text>
        </View>

        <View style={styles.paymentMethods}>
          <Text style={styles.summaryLabel}>Payment</Text>
          <View style={styles.paymentRow}>
            <View style={styles.paymentChip}>
              <Text style={styles.paymentText}>Visa</Text>
            </View>
            <View style={styles.paymentChip}>
              <Text style={styles.paymentText}>PayPal</Text>
            </View>
            <View style={styles.paymentChip}>
              <Text style={styles.paymentText}>Mastercard</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuy} activeOpacity={0.9}>
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2A2A2A",
    marginBottom: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#9B9B9B",
  },
  summary: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#2A2A2A",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2A2A2A",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 6,
  },
  totalLabel: {
    fontWeight: "700",
    fontSize: 16,
  },
  totalValue: {
    fontWeight: "700",
    fontSize: 16,
  },
  paymentMethods: {
    gap: 8,
  },
  paymentRow: {
    flexDirection: "row",
    gap: 8,
  },
  paymentChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  paymentText: {
    fontSize: 13,
    color: "#2A2A2A",
    fontWeight: "600",
  },
  buyButton: {
    backgroundColor: "#2F4B26",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
