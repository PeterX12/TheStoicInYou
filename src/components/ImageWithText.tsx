import React from "react";
import {
  TouchableOpacity,
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
  iconSize = 16,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={imageSource}
        style={[styles.image, imageStyle]}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
        <Ionicons
          name="arrow-forward"
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  icon: {
    marginLeft: 12,
  },
});

export default ImageWithText;
