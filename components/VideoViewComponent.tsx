import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import IconButton from "./IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { useVideoPlayer, VideoView } from "expo-video";

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
          right: 6,
          zIndex: 1,
          gap: 16,
        }}
      >
        <IconButton
          iosName="arrow.down.to.line"
          androidName="save"
          onPress={async () => {
            await saveToLibraryAsync(video!);
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
            await shareAsync(video!);
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
          backgroundColor: "blue",
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
    </View>
  );
};

export default VideoViewComponent;

const styles = StyleSheet.create({});
