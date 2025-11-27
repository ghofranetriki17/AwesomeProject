import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TouchableButtonProps {
  title: string;
  onPress: () => void;
}

function TouchableButton(props: TouchableButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TouchableButton;