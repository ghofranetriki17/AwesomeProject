import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
}

function Input(props: InputProps) {
  return (
    <TextInput
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
      style={styles.input}
      placeholderTextColor="#888"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: '100%',
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#333',
    color: 'white',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default Input;
