import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem, PRODUCTS } from "../data/data";

type AppState = {
  favorites: string[];
  cart: CartItem[];
  selectedCategory: string;
  isLoggedIn: boolean;
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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

  useEffect(() => {
    AsyncStorage.setItem("app_favorites", JSON.stringify(favorites)).catch(() => {});
  }, [favorites]);

  useEffect(() => {
    AsyncStorage.setItem("app_cart", JSON.stringify(cart)).catch(() => {});
  }, [cart]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

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

  const getCartSubtotal = () =>
    cart.reduce((sum, item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      const price = product ? product.price : 0;
      return sum + price * item.quantity;
    }, 0);

  const getCartTotal = () => getCartSubtotal() - 25000;

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const value = useMemo(
    () => ({
      favorites,
      cart,
      selectedCategory,
      isLoggedIn,
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
    [favorites, cart, selectedCategory, isLoggedIn]
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
