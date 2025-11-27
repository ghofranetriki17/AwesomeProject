import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur HomePage !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
  },
});

export default HomePage;
