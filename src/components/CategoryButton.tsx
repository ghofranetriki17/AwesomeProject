import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface CategoryButtonProps {
  title: string;
  isSelected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

function CategoryButton({
  title,
  isSelected,
  onPress,
  style,
}: CategoryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.button,
        isSelected ? styles.selected : styles.unselected,
        style,
      ]}
    >
      <Text style={[styles.label, isSelected ? styles.labelSelected : undefined]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: "#2F4B26",
    borderColor: "#2F4B26",
  },
  unselected: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2A2A2A",
  },
  labelSelected: {
    color: "#FFFFFF",
  },
});

export default CategoryButton;
