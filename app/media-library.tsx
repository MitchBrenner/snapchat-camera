import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import * as MediaLibrary from "expo-media-library";
import { Image } from "expo-image";

const MediaLibraryScreen = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
      mediaType: "photo",
      sortBy: ["creationTime"],
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
    <>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          paddingTop: 50,
          flexWrap: "wrap",
        }}
      >
        {assets.map((photo) => (
          <Image
            key={photo.id}
            source={photo.uri}
            style={{ width: "25%", height: 100 }}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default MediaLibraryScreen;

const styles = StyleSheet.create({});
