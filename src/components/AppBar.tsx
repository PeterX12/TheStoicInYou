import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppBarProps {
  title: string;
  showBackButton?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  onBackPress?: () => void;
}

const AppBar = ({
  title,
  showBackButton = false,
  rightIcon,
  onRightIconPress,
  onBackPress,
}: AppBarProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
      accessibilityRole="header"
    >
      <View style={styles.content}>
        {showBackButton && (
          <Pressable
            onPress={handleBackPress}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
            accessibilityLabel="Go back"
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
          >
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={AppColors.SoftBlack}
            />
          </Pressable>
        )}

        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>

        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            style={({ pressed }) => [
              styles.rightIconContainer,
              pressed && styles.rightIconPressed,
            ]}
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.AppBackground,
    borderBottomWidth: 0.5,
    borderBottomColor: AppColors.Black10,
    zIndex: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    marginRight: 12,
    padding: 6,
    borderRadius: 8,
  },
  backButtonPressed: {
    backgroundColor: AppColors.Black10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: -0.3,
    color: AppColors.SoftBlack,
    lineHeight: 22,
  },
  rightIconContainer: {
    marginRight: Spacing.sm,
    padding: Spacing.xs,
    borderRadius: 8,
  },
  rightIconPressed: {
    backgroundColor: AppColors.Black10,
  },
});

export default AppBar;
