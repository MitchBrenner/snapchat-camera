import {
  Alert,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import IconButton from "./IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/constants/Colors";

type PictureViewProps = {
  picture: string | null;
  setPicture: React.Dispatch<React.SetStateAction<string | null>>;
};

const PictureView = ({ picture, setPicture }: PictureViewProps) => {
  return (
    <View>
      <View
        style={{
          position: "absolute",
          paddingTop: 64,
          right: 12,
          zIndex: 1,
          gap: 16,
        }}
      >
        <IconButton iosName="sparkle.magnifyingglass" androidName="save" />
        <IconButton iosName="highlighter" androidName="save" />
        <IconButton iosName="scissors" androidName="save" />
        <IconButton iosName="music.note" androidName="save" />
        <IconButton iosName="crop" androidName="save" />
        <IconButton iosName="timer" androidName="save" />
        <IconButton iosName="chevron.down" androidName="save" />
      </View>
      <View
        style={{
          position: "absolute",
          paddingTop: 64,
          left: 12,
          zIndex: 1,
          gap: 16,
        }}
      >
        <IconButton
          iosName="xmark"
          androidName="close"
          onPress={() => {
            setPicture(null);
          }}
        />
      </View>
      <Image
        source={picture}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={async () => {
            await saveToLibraryAsync(picture!);
            Alert.alert("Saved");
          }}
          style={{
            backgroundColor: "#575551",
            padding: 8,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            width: 65,
            height: 50,
          }}
        >
          <SymbolView name="arrow.down.to.line" tintColor={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 2,
            backgroundColor: "#575551",
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 12,
          }}
        >
          <Image
            source={
              "https://pbs.twimg.com/profile_images/1593304942210478080/TUYae5z7_400x400.jpg"
            }
            style={{
              height: 35,
              width: 35,
              borderRadius: 100,
              borderColor: "#1f1e1d",
            }}
          />
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Stories
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await shareAsync(picture!);
          }}
          style={{
            flex: 2,
            backgroundColor: Colors.dark.snapPrimary,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 12,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Send To
          </Text>
          <SymbolView
            name="arrow.right"
            tintColor={"black"}
            weight="black"
            size={28}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PictureView;

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    position: "absolute",
    alignSelf: "center",
    paddingBottom: 48,
    padding: 12,
    bottom: 0,
    backgroundColor: "#1f1e1d",
    flexDirection: "row",
    gap: 12,
  },
});
