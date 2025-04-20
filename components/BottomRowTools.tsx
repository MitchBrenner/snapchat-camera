import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Dispatch } from "react";
import IconButton from "./IconButton";
import { Link } from "expo-router";
import { ThemedText } from "./ThemedText";
import { CameraMode } from "expo-camera";

type BottomRowToolsProps = {
  cameraMode: CameraMode;
  setCameraMode: Dispatch<React.SetStateAction<CameraMode>>;
};

const BottomRowTools = ({ setCameraMode, cameraMode }: BottomRowToolsProps) => {
  return (
    <View style={[styles.bottomContainer, styles.directionRowItemsCenter]}>
      <Link href={"/media-library"} asChild>
        <IconButton
          iosName="photo.stack"
          androidName="library"
          onPress={() => {}}
        />
      </Link>
      <View style={styles.directionRowItemsCenter}>
        <TouchableOpacity
          onPress={() => {
            setCameraMode("picture");
          }}
        >
          <ThemedText
            style={{
              color: "white",
              fontWeight: cameraMode === "picture" ? "bold" : 100,
            }}
          >
            Snap
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCameraMode("video");
          }}
        >
          <ThemedText
            style={{
              color: "white",
              fontWeight: cameraMode === "video" ? "bold" : 100,
            }}
          >
            Video
          </ThemedText>
        </TouchableOpacity>
      </View>
      <IconButton androidName="add" iosName="magnifyingglass" />
    </View>
  );
};

export default BottomRowTools;

const styles = StyleSheet.create({
  directionRowItemsCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    alignSelf: "center",
    bottom: 6,
    padding: 3,
  },
});
