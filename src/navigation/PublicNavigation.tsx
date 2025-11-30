import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from "../screens/Login Page";
import HomePage from "../screens/HomePage";
import FavoritePage from "../screens/FavoritePage";
import CartPage from "../screens/CartPage";
import ProfilePage from "../screens/ProfilePage";
import ProductDetailPage from "../screens/ProductDetailPage";

// Typage du stack pour TS
export type PublicStackParamList = {
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

// Bottom Tab Navigator nestamlouh les pages principales mouch lgin
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6F4E37',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomePage}
        options={{ 
          tabBarLabel: 'Home',
          headerShown: true,
          title: 'Accueil'
        }}
      />
      <Tab.Screen 
        name="Favorite" 
        component={FavoritePage}
        options={{ 
          tabBarLabel: 'Favorites',
          headerShown: true,
          title: 'Favoris'
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartPage}
        options={{ 
          tabBarLabel: 'Cart',
          headerShown: true,
          title: 'Panier'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfilePage}
        options={{ 
          tabBarLabel: 'Profile',
          headerShown: true,
          title: 'Profil'
        }}
      />
    </Tab.Navigator>
  );
}

export default function PublicNavigation() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <PublicStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      {!isLoggedIn ? (
        // Auth Stack - Login Screen ONLY
        <PublicStack.Screen
          name="Login"
          options={{ 
            header: () => null,
            gestureEnabled: false, // Empêche le swipe back
          }}
        >
          {(props) => <LoginPage {...props} onLogin={() => setIsLoggedIn(true)} />}
        </PublicStack.Screen>
      ) : (
        //login screen mahouch fmain tabs 
        <>
          <PublicStack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ 
              headerShown: false,
              gestureEnabled: false, // matkhalikech tarjaa ll login
            }}
          />
          <PublicStack.Screen
            name="ProductDetail"
            component={ProductDetailPage}
            options={{ 
              headerShown: true, 
              title: 'Détails du Produit',
              headerBackTitle: 'Retour',
              presentation: 'card', // narja btwel mn item details 
            }}
          />
        </>
      )}
    </PublicStack.Navigator>
  );
}