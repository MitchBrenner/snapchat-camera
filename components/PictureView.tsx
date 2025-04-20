import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import IconButton from "./IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";

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
          right: 6,
          zIndex: 1,
          gap: 16,
        }}
      >
        <IconButton
          iosName="arrow.down.to.line"
          androidName="save"
          onPress={async () => {
            await saveToLibraryAsync(picture!);
            Alert.alert("Saved");
          }}
        />
        <IconButton iosName="pencil.line" androidName="save" />
        <IconButton iosName="scissors" androidName="save" />
        <IconButton iosName="music.note" androidName="save" />
        <IconButton iosName="crop" androidName="save" />
        <IconButton
          iosName="paperplane"
          androidName="save"
          onPress={async () => {
            await shareAsync(picture!);
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          paddingTop: 64,
          left: 6,
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

        // contentFit="cover"
      />
    </View>
  );
};

export default PictureView;

const styles = StyleSheet.create({});
