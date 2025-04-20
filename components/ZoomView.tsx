import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";

type ZoomViewComponents = {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
};

const ZoomView = ({ zoom, setZoom }: ZoomViewComponents) => {
  const [zoomValue, setZoomValue] = React.useState<".5" | "1" | "2">("1");

  return (
    <View style={styles.container}>
      <View style={styles.zoomContainer}>
        <TouchableOpacity
          style={styles.numberContainer}
          onPress={() => {
            setZoom(0);
            setZoomValue(".5");
          }}
        >
          <Text
            style={[
              styles.text,
              zoomValue === ".5"
                ? { color: Colors.dark.snapPrimary, fontWeight: "bold" }
                : {},
            ]}
          >
            .5x
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.numberContainer}
          onPress={() => {
            setZoom(0);
            setZoomValue("1");
          }}
        >
          <Text
            style={[
              styles.text,
              zoomValue === "1"
                ? { color: Colors.dark.snapPrimary, fontWeight: "bold" }
                : {},
            ]}
          >
            1x
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.numberContainer}
          onPress={() => {
            setZoom(0.2);
            setZoomValue("2");
          }}
        >
          <Text
            style={[
              styles.text,
              zoomValue === "2"
                ? { color: Colors.dark.snapPrimary, fontWeight: "bold" }
                : {},
            ]}
          >
            2x
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ZoomView;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomContainer: {
    flexDirection: "row",
    backgroundColor: "#1f1e1d90",
    borderRadius: 100,
    padding: 2,
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 100,
    height: 36,
  },
  text: {
    color: "white",
    fontSize: 12,
  },
  numberContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    padding: 6,
    width: 28,
    height: 28,
  },
});
