import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, PRODUCTS } from "../data/data";
import { useAuthStore } from "../store/authStore";

// App-wide state container for favorites, cart, category filter, and login (auth comes from Zustand).
// Context docs: https://reactnative.dev/docs/context | AsyncStorage: https://https://reactnative.directory/?search=storage
type AppState = {
  favorites: string[];
  cart: CartItem[];
  selectedCategory: string;
  isLoggedIn: boolean;
  authHydrated: boolean;
  toggleFavorite: (productId: string) => void;
  addToCart: (
    productId: string,
    size: CartItem["size"],
    sugar: CartItem["sugar"],
    quantity: number
  ) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setSelectedCategory: (category: string) => void;
  getCartSubtotal: () => number;
  getCartTotal: () => number;
  login: () => void;
  logout: () => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  // Login state comes from Zustand store (persisted separately).
  const { isLoggedIn, login, logout, hasHydrated } = useAuthStore();

  // Hydrate favorites/cart once from AsyncStorage (best-effort, silent on failure).
  useEffect(() => {
    const hydrate = async () => {
      try {
        const [favRaw, cartRaw] = await Promise.all([
          AsyncStorage.getItem("app_favorites"),
          AsyncStorage.getItem("app_cart"),
        ]);
        if (favRaw) {
          setFavorites(JSON.parse(favRaw));
        }
        if (cartRaw) {
          setCart(JSON.parse(cartRaw));
        }
      } catch {
        // ignore hydration errors
      }
    };
    hydrate();
  }, []);

  // Persist favorites whenever they change (AsyncStorage is key/value, string only).
  useEffect(() => {
    AsyncStorage.setItem("app_favorites", JSON.stringify(favorites)).catch(() => {});
  }, [favorites]);

  // Persist cart whenever it changes.
  useEffect(() => {
    AsyncStorage.setItem("app_cart", JSON.stringify(cart)).catch(() => {});
  }, [cart]);

  // Toggle product id in favorites list.
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Add item to cart; merge if same product/size/sugar already exists.
  const addToCart = (
    productId: string,
    size: CartItem["size"],
    sugar: CartItem["sugar"],
    quantity: number
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === productId &&
          item.size === size &&
          item.sugar === sugar
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [...prev, { productId, size, sugar, quantity }];
    });
  };

  // Replace quantity for a product and drop zero/negative rows.
  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => setCart([]);

  // Sum price * quantity using static PRODUCTS lookup; default to 0 if missing.
  const getCartSubtotal = () =>
    cart.reduce((sum, item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      const price = product ? product.price : 0;
      return sum + price * item.quantity;
    }, 0);

  // Apply mock discount of 2 to subtotal.
  const getCartTotal = () => getCartSubtotal() - 2;

  const value = useMemo(
    () => ({
      favorites,
      cart,
      selectedCategory,
      isLoggedIn,
      authHydrated: hasHydrated,
      toggleFavorite,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      setSelectedCategory,
      getCartSubtotal,
      getCartTotal,
      login,
      logout,
    }),
    [favorites, cart, selectedCategory, isLoggedIn, hasHydrated]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
