import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlashMode } from "expo-camera";
import IconButton from "./IconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CameraToolsProps = {
  cameraZoom: number;
  cameraTorch: boolean;
  cameraFlash: FlashMode;
  cameraFacing: "back" | "front";
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<"back" | "front">>;
};

const CameraTools = ({
  cameraZoom,
  cameraTorch,
  cameraFlash,
  cameraFacing,
  setCameraZoom,
  setCameraTorch,
  setCameraFlash,
  setCameraFacing,
}: CameraToolsProps) => {
  return (
    <View
      style={{
        position: "absolute",
        right: 6,
        gap: 16,
        zIndex: 100,
      }}
    >
      {/* <IconButton
        onPress={() => setCameraTorch((prevValue) => !prevValue)}
        iosName={
          cameraTorch ? "flashlight.off.circle" : "flashlight.slash.circle"
        }
        androidName={cameraTorch ? "flash" : "flash-off"}
      /> */}
      <IconButton
        onPress={() =>
          setCameraFacing((prevValue) =>
            prevValue === "back" ? "front" : "back"
          )
        }
        iosName={"arrow.triangle.2.circlepath"}
        androidName="close"
        // width={25}
        // height={21}
      />
      <IconButton
        onPress={() =>
          setCameraFlash((prevValue) => (prevValue === "off" ? "on" : "off"))
        }
        iosName={cameraFlash === "on" ? "bolt.fill" : "bolt.slash"}
        androidName={cameraFlash === "on" ? "flash" : "flash-off"}
      />

      <IconButton
        onPress={() => {}}
        iosName={"speaker"}
        // iosName={"speaker.slash"}
        androidName="volume-high"
      />

      <IconButton onPress={() => {}} iosName={"moon"} androidName="moon" />
      <IconButton
        onPress={() => {}}
        iosName={"chevron.down"}
        androidName="chevron-down"
      />
    </View>
  );
};

export default CameraTools;

const styles = StyleSheet.create({});
