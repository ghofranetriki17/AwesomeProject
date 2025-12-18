import React, { useEffect } from 'react';
import AppTemplate from './src/templates/AppTemplate';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { AppProvider } from './src/context/AppContext';
import BootSplash from 'react-native-bootsplash';

function App() {
  useEffect(() => {
    // Fallback hide in case NavigationContainer onReady is delayed
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <AppTemplate>
      <AppProvider>
        <NavigationContainer
          onReady={() => {
            BootSplash.hide({ fade: true });
          }}
        >
          <AppNavigation />
        </NavigationContainer>
      </AppProvider>
    </AppTemplate>
  );
}

export default App;
