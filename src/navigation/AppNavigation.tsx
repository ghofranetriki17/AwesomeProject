//gerer navigation de lappimport React from "react";
import { NavigationContainer } from "@react-navigation/native";
import PublicNavigation from "./PublicNavigation";
import BootSplash from "react-native-bootsplash";
import { useEffect } from "react";
export default function AppNavigation() {
  useEffect(() => {
           BootSplash.hide({ fade: true });


  }, [])
  return (
      <PublicNavigation />
  );
}
