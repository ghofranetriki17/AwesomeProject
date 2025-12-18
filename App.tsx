import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppTemplate from './src/templates/AppTemplate';
import ScreenTemplate from './src/templates/ScreenTemplate';
import Input from './src/components/Input';
import TouchableButton from './src/components/TouchableButton';
import LoginPage from './src/screens/Login Page';
import { NavigationContainer } from '@react-navigation/native';
import PublicNavigation from './src/navigation/PublicNavigation';
import AppNavigation from './src/navigation/AppNavigation';
import { AppProvider } from './src/context/AppContext';

function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <AppTemplate>
      <AppProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </AppProvider>
    </AppTemplate>
  );//hatina haka khater fl installation kali neshak save area provider
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  form: {
    width: '80%',
  },
  spacer: {
    height: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
});

export default App;
