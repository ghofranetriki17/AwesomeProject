import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { ReactNode } from "react";

interface AppTemplateProps {
  children: ReactNode;
}

function AppTemplate(props: AppTemplateProps) {
  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {props.children}
    </SafeAreaProvider>
  );
}

export default AppTemplate;