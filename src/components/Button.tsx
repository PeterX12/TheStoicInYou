import { Text, Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "constants/colors";

interface ButtonProps {
  text: string;
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
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
    if (disabled) return AppColors.PlaceHolder + "80";

    switch (variant) {
      case "primary":
        return AppColors.Accent;
      case "secondary":
        return AppColors.White;
      case "outline":
        return AppColors.Transparent;
      default:
        return AppColors.Accent;
    }
  };

  const getTextColor = () => {
    if (disabled) return AppColors.White;

    switch (variant) {
      case "primary":
        return AppColors.White;
      case "secondary":
        return AppColors.SoftBlack;
      case "outline":
        return AppColors.AccentDark;
      default:
        return AppColors.White;
    }
  };

  const getIconColor = () => {
    if (disabled) return AppColors.White;

    switch (variant) {
      case "primary":
        return AppColors.White;
      case "secondary":
        return AppColors.SoftBlack;
      case "outline":
        return AppColors.AccentDark;
      default:
        return AppColors.White;
    }
  };

  const getBorderStyle = () => {
    if (variant === "outline" && !disabled) {
      return {
        borderWidth: 1.5,
        borderColor: AppColors.Accent,
      };
    }
    return {};
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          width: fullWidth ? "100%" : "auto",
          ...getBorderStyle(),
        },
        pressed && !disabled && styles.buttonPressed,
        pressed &&
          variant === "primary" && { backgroundColor: AppColors.AccentDark },
        pressed &&
          variant === "outline" && {
            backgroundColor: AppColors.AccentSoft,
            borderColor: AppColors.AccentDark,
          },
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
    borderRadius: 14,
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
    fontWeight: "500",
  },
  iconLeft: {
    marginRight: 12,
  },
  iconRight: {
    marginLeft: 12,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
