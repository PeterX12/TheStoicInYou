import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "types/navigation";

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
            style={styles.backButton}
            accessibilityLabel="Go back"
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
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
            style={styles.rightIconContainer}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
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
    backgroundColor: AppColors.AppBackground + "F2",
    borderBottomWidth: 1,
    borderBottomColor: AppColors.White20,
    zIndex: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: -0.3,
    color: AppColors.SoftBlack,
  },
  rightIconContainer: {
    marginLeft: 12,
    padding: 4,
  },
});

export default AppBar;
