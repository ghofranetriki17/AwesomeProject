/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppTemplate from './src/templates/AppTemplate';
import ScreenTemplate from './src/templates/ScreenTemplate';
import Input from './src/components/Input';

function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <AppTemplate>
      <ScreenTemplate>
        <View style={styles.inputContainer}>
          <Input 
            placeholder="Email" 
            value={email}
            onChangeText={setEmail}
          />
          <Input 
            placeholder="Password" 
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <AppContent />
      </ScreenTemplate>
    </AppTemplate>
  );
}

function AppContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ghofrane</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    padding: 20,
    width: '100%',
  },
  text: {
    fontSize: 20,
  },
});

export default App;