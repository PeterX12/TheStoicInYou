import { Text, Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";

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
    if (disabled) return AppColors.Black20;

    switch (variant) {
      case "primary":
        return AppColors.Accent;
      case "secondary":
        return AppColors.White90;
      case "outline":
        return AppColors.Transparent;
      default:
        return AppColors.Accent;
    }
  };

  const getTextColor = () => {
    if (disabled) return AppColors.White50;

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
    if (disabled) return AppColors.White50;

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
          variant === "secondary" && { backgroundColor: AppColors.White },
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
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  notFullWidth: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.xl,
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
    letterSpacing: -0.3,
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
  buttonPressed: {
    opacity: 0.92,
  },
  disabled: {
    opacity: 1,
  },
});

export default Button;
