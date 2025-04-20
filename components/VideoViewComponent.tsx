import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import IconButton from "./IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { useVideoPlayer, VideoView } from "expo-video";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/constants/Colors";

type VideoViewComponentProps = {
  video: string | null;
  setVideo: React.Dispatch<React.SetStateAction<string | null>>;
};

const VideoViewComponent = ({ video, setVideo }: VideoViewComponentProps) => {
  const ref = useRef<VideoView>(null);
  const player = useVideoPlayer(video, (player) => {
    setTimeout(() => {
      player.play();
      player.loop = true;
    }, 1000);
  });
  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   const subscription = player.addListener("playingChange", (isPlaying) => {
  //     setIsPlaying(isPlaying);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, [player]);

  return (
    <View style={{ flex: 1 }}>
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
            setVideo(null);
          }}
        />
      </View>
      <VideoView
        player={player}
        ref={ref}
        style={{
          width: "130%",
          height: "130%",
          position: "absolute",
          top: -120,
          alignSelf: "center",
        }}
        onTouchEnd={() => {
          if (isPlaying) {
            player.pause();
          } else {
            player.play();
          }
          setIsPlaying(!isPlaying);
        }}
        nativeControls={false}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={async () => {
            await saveToLibraryAsync(video!);
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
            await shareAsync(video!);
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

export default VideoViewComponent;

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
