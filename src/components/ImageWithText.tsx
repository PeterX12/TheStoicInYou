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
import { Spacing } from "constants/spacing";

interface ImageWithTextProps {
  imageSource: ImageSourcePropType;
  text: string;
  onPress: () => void;
  imageStyle?: object;
  textStyle?: object;
  containerStyle?: object;
  iconColor?: string;
  iconSize?: number;
  variant?: "grid" | "feature";
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
  variant = "feature",
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.baseCard,
        variant === "grid" ? styles.gridCard : styles.featureCard,
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

      <View
        style={[styles.overlay, variant === "grid" && styles.gridOverlay]}
      />

      <View
        style={[
          styles.contentContainer,
          variant === "grid" && styles.gridContentContainer,
        ]}
      >
        <Text
          style={[
            styles.baseTitle,
            variant === "grid" ? styles.gridTitle : styles.featureTitle,
            textStyle,
          ]}
          numberOfLines={1}
        >
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
  // Base styles
  baseCard: {
    width: "100%",
    overflow: "hidden",
    marginBottom: Spacing.lg,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  featureCard: {
    height: 180,
    borderRadius: 24,
  },
  gridCard: {
    height: 160,
    borderRadius: 20,
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
    backgroundColor: AppColors.Black30,
  },
  contentContainer: {
    position: "absolute",
    bottom: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridContentContainer: {
    bottom: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
  },
  baseTitle: {
    fontWeight: "500",
    color: AppColors.White,
    flex: 1,
    marginRight: Spacing.sm,
    letterSpacing: -0.3,
  },
  featureTitle: {
    fontSize: 20,
  },
  gridTitle: {
    fontSize: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppColors.White15,
    alignItems: "center",
    justifyContent: "center",
  },
  gridOverlay: {
    backgroundColor: AppColors.Black20,
  },
});

export default ImageWithText;
