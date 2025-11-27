// src/screens/LoginPage.tsx
import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Input from '../components/Input';
import TouchableButton from '../components/TouchableButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PublicStackParamList } from '../navigation/PublicNavigation';

// Typage du hook navigation
type LoginScreenProp = NativeStackNavigationProp<PublicStackParamList, 'Login'>;

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigation = useNavigation<LoginScreenProp>();

  const handleSubmit = () => {
    if (email === 'ghofrane@gmail.com' && password === '1742') {
      Alert.alert('Succès', 'Connexion réussie !');
      navigation.navigate('Home'); 
    } else {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.spacer} />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableButton
          title="Submit"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
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

export default LoginPage;
