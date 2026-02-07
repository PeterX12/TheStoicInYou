import { Text, Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "constants/colors";

interface ButtonProps {
  text: string;
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

const Button = ({
  text,
  onPress,
  iconName,
  iconPosition = "left",
  disabled = false,
  variant = "primary",
  fullWidth = true,
}: ButtonProps) => {
  const getBackgroundColor = () => {
    if (disabled) return AppColors.PlaceHolder;
    return variant === "primary" ? AppColors.White : AppColors.Black;
  };

  const getTextColor = () => {
    if (disabled) return AppColors.White;
    return variant === "primary" ? AppColors.Black : AppColors.White;
  };

  const getIconColor = () => {
    if (disabled) return AppColors.White;
    return variant === "primary" ? AppColors.Black : AppColors.White;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          width: fullWidth ? "100%" : "auto",
        },
        pressed && styles.buttonPressed,
        disabled && styles.disabled,
        !fullWidth && styles.notFullWidth,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={[
          styles.content,
          iconPosition === "right" && styles.contentReverse,
        ]}
      >
        {iconName && iconPosition === "left" && (
          <Ionicons
            name={iconName}
            size={20}
            color={getIconColor()}
            style={styles.iconLeft}
          />
        )}
        <Text style={[styles.text, { color: getTextColor() }]}>{text}</Text>
        {iconName && iconPosition === "right" && (
          <Ionicons
            name={iconName}
            size={20}
            color={getIconColor()}
            style={styles.iconRight}
          />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  notFullWidth: {
    alignSelf: "flex-start",
    paddingHorizontal: 32,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contentReverse: {
    flexDirection: "row-reverse",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  iconLeft: {
    marginRight: 12,
  },
  iconRight: {
    marginLeft: 12,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
