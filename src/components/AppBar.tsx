import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { StyleSheet, Dimensions, View, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "types/navigation";

interface AppBarProps {
  title: string;
  showBackButton?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

const AppBar = ({
  title,
  showBackButton = false,
  rightIcon,
  onRightIconPress,
}: AppBarProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
      accessibilityRole="header"
    >
      <View style={styles.content}>
        {showBackButton && (
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color={AppColors.White}
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
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
    color: AppColors.White,
  },
  rightIconContainer: {
    marginLeft: 16,
  },
});

export default AppBar;
