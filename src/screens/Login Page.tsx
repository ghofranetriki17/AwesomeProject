import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Input from '../components/Input';
import TouchableButton from '../components/TouchableButton';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    // Votre logique de connexion statique
    if (email === 'ghofrane@gmail.com' && password === '1742') {
      Alert.alert('Succès', 'Connexion réussie !');
      onLogin(); // Déclenche la navigation vers MainTabs
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