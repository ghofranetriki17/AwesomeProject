// stack public

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../screens/Login Page";

const PublicStack = createNativeStackNavigator();

export default function PublicNavigation() {
  return (
    <PublicStack.Navigator
      initialRouteName={"Login"}
      screenOptions={{
        headerShown: false,
        animation: "fade", // ou "slide_from_right", "simple_push"...
      }}
    >
      <PublicStack.Screen
        name={"Login"}
        key={0}
        component={LoginPage}
        options={{
          header:() =>null,
        }}
        initialParams={{undefined }}
      />
    </PublicStack.Navigator>
  );
}
