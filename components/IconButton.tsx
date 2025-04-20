import {
  StyleProp,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { ComponentProps } from "react";
import { SFSymbol, SymbolView } from "expo-symbols";
import { Ionicons } from "@expo/vector-icons";

const CONTAINER_PADDING = 5;
const CONTAINER_WIDTH = 40;
const ICON_SIZE = 30;

type IconButtonProps = {
  iosName: SFSymbol;
  androidName: ComponentProps<typeof Ionicons>["name"];
  containerStyler?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: number;
  height?: number;
};

const IconButton = ({
  iosName,
  androidName,
  containerStyler,
  onPress,
  width,
  height,
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          // backgroundColor: "#00000050",
          padding: CONTAINER_PADDING,
          borderRadius: 50,
          width: CONTAINER_WIDTH,
        },
        containerStyler,
      ]}
    >
      <SymbolView
        name={iosName}
        size={ICON_SIZE}
        style={[
          width && height ? { width, height } : {},
          { shadowColor: "black" },
          { shadowOpacity: 0.5, shadowRadius: 5 },
        ]}
        tintColor={"white"}
        weight="semibold"
        fallback={
          <Ionicons size={ICON_SIZE} name={androidName} color={"white"} />
        }
      />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
