import React from "react";
import {
  Pressable,
  Image,
  Text,
  View,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "constants/colors";

interface ImageWithTextProps {
  imageSource: ImageSourcePropType;
  text: string;
  onPress: () => void;
  imageStyle?: object;
  textStyle?: object;
  containerStyle?: object;
  iconColor?: string;
  iconSize?: number;
}

const ImageWithText: React.FC<ImageWithTextProps> = ({
  imageSource,
  text,
  onPress,
  imageStyle = {},
  textStyle = {},
  containerStyle = {},
  iconColor = AppColors.White,
  iconSize = 20,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        containerStyle,
        pressed && styles.cardPressed,
        pressed && { opacity: 0.95 },
      ]}
      onPress={onPress}
    >
      <Image
        source={imageSource}
        style={[styles.image, imageStyle]}
        resizeMode="cover"
      />

      <View style={styles.overlay} />

      <View style={styles.contentContainer}>
        <Text style={[styles.title, textStyle]} numberOfLines={1}>
          {text}
        </Text>
        <View style={styles.iconContainer}>
          <Ionicons name="arrow-forward" size={iconSize} color={iconColor} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 180,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,

    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: AppColors.Black40,
  },
  contentContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: AppColors.White,
    flex: 1,
    marginRight: 16,
    letterSpacing: -0.3,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppColors.White20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ImageWithText;
