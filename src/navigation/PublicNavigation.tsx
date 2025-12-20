// Docs: https://reactnative.dev/docs/navigation | https://reactnative.dev/docs/text
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import LoginPage from "../screens/Login Page";
import HomePage from "../screens/HomePage";
import FavoritePage from "../screens/FavoritePage";
import CartPage from "../screens/CartPage";
import ProfilePage from "../screens/ProfilePage";
import ProductDetailPage from "../screens/ProductDetailPage";
import WelcomeScreen from "../screens/WelcomeScreen";
import { useApp } from '../context/AppContext';

// Typage du stack pour TS
export type PublicStackParamList = {
  Welcome: undefined;
  Login: undefined;
  MainTabs: undefined;
  ProductDetail: { productId?: string };
};

export type TabParamList = {
  Home: undefined;
  Favorite: undefined;
  Cart: undefined;
  Profile: undefined;
};

const PublicStack = createNativeStackNavigator<PublicStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Bottom Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2F4B26',
        tabBarInactiveTintColor: '#9B9B9B',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          headerShown: true,
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritePage}
        options={{
          tabBarLabel: 'Favorites',
          headerShown: true,
          title: 'Favoris',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>❤️</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartPage}
        options={{
          tabBarLabel: 'Cart',
          headerShown: true,
          title: 'Panier',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🛒</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profile',
          headerShown: true,
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function PublicNavigation() {
  const { isLoggedIn, login, authHydrated } = useApp();

  if (!authHydrated) {
    return null;
  }

  return (
    <PublicStack.Navigator
      initialRouteName={isLoggedIn ? "MainTabs" : "Welcome"}
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      {!isLoggedIn ? (
        <>
          <PublicStack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <PublicStack.Screen
            name="Login"
            options={{
              header: () => null,
              gestureEnabled: false,
            }}
          >
            {(props) => <LoginPage {...props} onLogin={() => login()} />}
          </PublicStack.Screen>
        </>
      ) : (
        <>
          <PublicStack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <PublicStack.Screen
            name="ProductDetail"
            component={ProductDetailPage}
            options={{
              headerShown: true,
              title: 'Details du Produit',
              headerBackTitle: 'Retour',
              presentation: 'card',
            }}
          />
        </>
      )}
    </PublicStack.Navigator>
  );
}
