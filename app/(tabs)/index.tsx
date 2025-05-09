import { Image, StyleSheet, Platform, View, SafeAreaView } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import {
  BarcodeScanningResult,
  Camera,
  CameraMode,
  CameraView,
  FlashMode,
} from "expo-camera";
import * as WebBrowser from "expo-web-browser";
import { useRef, useState } from "react";
// import IconButton from "@/components/Iconbutton";
import BottomRowTools from "@/components/BottomRowTools";
import MainRowActions from "@/components/MainRowActions";
import QRCodeButton from "@/components/QRCodeButton";
import CameraTools from "@/components/CameraTools";
import PictureView from "@/components/PictureView";
import VideoViewComponent from "@/components/VideoViewComponent";
import ZoomView from "@/components/ZoomView";
import ProfileView from "@/components/ProfileView";

export default function HomeScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = useState<CameraMode>("picture");
  const [qrCodeDetected, setQrCodeDetected] = useState<string>("");
  const [isBrowsing, setIsBrowsing] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [cameraZoom, setCameraZoom] = useState<number>(0);
  const [cameraTorch, setCameraTorch] = useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = useState<"back" | "front">("back");
  const [picture, setPicture] = useState<string | null>("");
  const [video, setVideo] = useState<string | null>(null);

  async function handleOpenQRCode() {
    setIsBrowsing(true);
    const browserResult = await WebBrowser.openBrowserAsync(qrCodeDetected, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
    });
    if (browserResult.type === "cancel") {
      setIsBrowsing(false);
    }
  }

  function handleBarcodeScanned(scanningResult: BarcodeScanningResult) {
    if (scanningResult.data) {
      // console.log(scanningResult.data);
      setQrCodeDetected(scanningResult.data);
    }

    // clears prev timeout if it exists
    // since this function is called everytime a QRCODE is scanned this if statement will prevent the timeout from clearing the QRcode
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // sets a timeout to clear the QR code detected state after 1 second
    timeoutRef.current = setTimeout(() => {
      setQrCodeDetected("");
    }, 1000);
  }

  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    console.log(response!.uri);
    setPicture(response!.uri);
  }

  async function toggleRecord() {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const response = await cameraRef.current?.recordAsync({
        maxDuration: 60,
      });
      setVideo(response!.uri);
    }
  }

  if (isBrowsing) return <></>;
  if (picture) {
    return <PictureView picture={picture} setPicture={setPicture} />;
  }
  if (video) {
    return <VideoViewComponent video={video} setVideo={setVideo} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        mode={cameraMode}
        style={{ flex: 1 }}
        zoom={cameraZoom}
        flash={cameraFlash}
        enableTorch={cameraTorch}
        facing={cameraFacing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {qrCodeDetected && (
              <QRCodeButton handleOpenQRCode={handleOpenQRCode} />
            )}
            <ProfileView />
            <CameraTools
              cameraFacing={cameraFacing}
              setCameraFacing={setCameraFacing}
              cameraTorch={cameraTorch}
              setCameraTorch={setCameraTorch}
              cameraFlash={cameraFlash}
              setCameraFlash={setCameraFlash}
              cameraZoom={cameraZoom}
              setCameraZoom={setCameraZoom}
            />
            <ZoomView zoom={cameraZoom} setZoom={setCameraZoom} />
            <MainRowActions
              cameraMode={cameraMode}
              handleTakePicture={
                cameraMode === "picture" ? handleTakePicture : toggleRecord
              }
              isRecording={isRecording}
            />
            <BottomRowTools
              setCameraMode={setCameraMode}
              cameraMode={cameraMode}
            />
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
