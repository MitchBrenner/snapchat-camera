import { Image, StyleSheet, Platform, Button, Alert } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/constants/Colors";
import { usePermissions } from "expo-media-library";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function OnboardingScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicroPermission] =
    useMicrophonePermissions();
  const [mediaLibraryPermisions, requestMediaLibraryPermisions] =
    usePermissions();

  async function handleContinue() {
    const allPermissions = await requestAllPermissions();
    if (allPermissions) {
      // navigate to the main app
      router.replace("/(tabs)");
    } else {
      Alert.alert("To continue please provide permissions in settings");
    }
  }

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert("Error", "Camera permission is required");
      return false;
    }
    const microphoneStatus = await requestMicroPermission();
    if (!microphoneStatus.granted) {
      Alert.alert("Error", "Microphone permission is required");
      return false;
    }
    const mediaLibraryStatus = await requestMediaLibraryPermisions();
    if (!mediaLibraryStatus.granted) {
      Alert.alert("Error", "Media Library permission is required");
      return false;
    }

    await AsyncStorage.setItem("hasOpened", "ture");
    return true;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <SymbolView
          name="camera.circle"
          size={250}
          type="hierarchical"
          tintColor={Colors.light.snapPrimary}
          animationSpec={{
            effect: {
              type: "bounce",
            },
          }}
          fallback={
            <Image
              source={require("@/assets/images/react-logo.png")}
              style={styles.reactLogo}
            />
          }
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Snapchat Camera!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>
        Welcome friend! To provide the best experience, this app requires
        permissions for the following:
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Camera Permissions</ThemedText>
        <ThemedText>📸 For taking pictures</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Microphone</ThemedText>
        <ThemedText>🎙️ For taking videos with audio</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Media Library Permissions </ThemedText>
        <ThemedText>🎞️ To save/view your amazing shots</ThemedText>
      </ThemedView>
      <Button title="Continue" onPress={handleContinue} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
