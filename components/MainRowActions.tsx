import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CameraMode } from "expo-camera";
import { Colors } from "@/constants/Colors";
import { SymbolView } from "expo-symbols";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import * as MediaLibrary from "expo-media-library";

type MainRowActionsProps = {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
};

const MainRowActions = ({
  handleTakePicture,
  cameraMode,
  isRecording,
}: MainRowActionsProps) => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
      mediaType: "photo",
      sortBy: ["creationTime"],
      first: 6,
    });

    // sometimes the the asset is an unsuitable uri and must be fetched to get the correct uri
    const assetDetails = await Promise.all(
      albumAssets.assets.map(async (asset) => {
        const info = await MediaLibrary.getAssetInfoAsync(asset.id);
        return { ...asset, uri: info.localUri || info.uri };
      })
    );

    setAssets(assetDetails);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        inverted
        renderItem={({ item }) => (
          <Image
            key={item.id}
            source={{ uri: item.uri }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
              margin: 3,
            }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 6,
        }}
      />
      <TouchableOpacity
        onPress={handleTakePicture}
        style={{ marginHorizontal: 12 }}
      >
        <SymbolView
          name={
            cameraMode === "picture"
              ? "circle"
              : isRecording
              ? "record.circle"
              : "circle.circle"
          }
          size={90}
          type="hierarchical"
          tintColor={isRecording ? Colors.light.snapPrimary : "white"}
          animationSpec={{
            effect: {
              type: isRecording ? "pulse" : "bounce",
            },
            repeating: isRecording,
          }}
        />
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SymbolView
            key={i}
            name="face.dashed"
            size={40}
            type="hierarchical"
            tintColor="white"
            style={{ margin: 5 }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MainRowActions;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: 100,
    bottom: 45,
  },
});
