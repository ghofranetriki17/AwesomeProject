// Docs: https://reactnative.dev/docs/imagebackground | https://reactnative.dev/docs/image | https://reactnative.dev/docs/touchableopacity | https://reactnative.dev/docs/text | https://reactnative.dev/docs/view
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PublicStackParamList } from "../navigation/PublicNavigation";

const pattern =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=60";
const cupsImage =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop&q=60";

type Navigation = NativeStackNavigationProp<PublicStackParamList>;

export default function WelcomeScreen() {
  const navigation = useNavigation<Navigation>();

  const handleGetStarted = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={{ uri: pattern }}
      style={styles.background}
      imageStyle={{ opacity: 0.35 }}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Image source={{ uri: cupsImage }} style={styles.image} />

        <View style={styles.textBlock}>
          <Text style={styles.title}>Coffee so good,</Text>
          <Text style={styles.title}>your taste buds</Text>
          <Text style={styles.title}>will love it</Text>
          <Text style={styles.subtitle}>
            The best grain, the finest roast, the most powerful flavor.
          </Text>
        </View>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={handleGetStarted}
        >
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#D4A574",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(212,165,116,0.6)",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  textBlock: {
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 16,
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.8,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotActive: {
    backgroundColor: "#2F4B26",
  },
  button: {
    width: "85%",
    height: 56,
    borderRadius: 16,
    backgroundColor: "#2F4B26",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
