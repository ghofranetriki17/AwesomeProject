import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoginPage from "../screens/Login Page";
import HomePage from "../screens/HomePage";

// Typage du stack pour TS
export type PublicStackParamList = {
  Login: undefined;
  Home: undefined;
};

const PublicStack = createNativeStackNavigator<PublicStackParamList>();

export default function PublicNavigation() {
  return (
    <PublicStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <PublicStack.Screen
        name="Login"
        component={LoginPage}
        options={{ header: () => null }}
      />
      <PublicStack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: true, title: "Accueil" }}
      />
    </PublicStack.Navigator>
  );
}
