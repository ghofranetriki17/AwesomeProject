import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ScreenTemplate from '../templates/ScreenTemplate';
import Input from '../components/Input';
import TouchableButton from '../components/TouchableButton';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    console.log('Email:', email);
    console.log('Password:', password);
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
            secureTextEntry={true}
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