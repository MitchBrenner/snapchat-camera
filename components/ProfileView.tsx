import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import IconButton from "./IconButton";

const ProfileView = () => {
  return (
    <View style={styles.container}>
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
      <IconButton
        onPress={() => {}}
        iosName={"magnifyingglass"}
        androidName="close"
        width={25}
      />
    </View>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 12,
    flexDirection: "row",
    gap: 8,
  },
});
