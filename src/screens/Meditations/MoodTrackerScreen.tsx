import AppBar from "@components/AppBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";
import { AppStyles } from "constants/styles";
import { emotions } from "data/emotions";
import React, { useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Image,
  Animated,
} from "react-native";
import { MeditationsStackParamList } from "types/navigation";

type NavigationProp = NativeStackNavigationProp<MeditationsStackParamList>;

export default function MoodTrackerScreen() {
  const navigation = useNavigation<NavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleEmotionSelect = (emotionId: string) => {
    navigation.navigate("EmotionInsight", { emotion: emotionId });
  };

  const handleBackPress = () => {
    navigation.navigate("MeditationHome");
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar
        title={"How are you feeling?"}
        showBackButton={true}
        onBackPress={handleBackPress}
      />

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroSection}>
            <Text style={styles.title}>How are you feeling?</Text>
            <Text style={styles.subtitle}>
              Take a moment to notice what's present
            </Text>
          </View>

          <View style={styles.grid}>
            {emotions.map((emotion) => (
              <Pressable
                key={emotion.id}
                style={({ pressed }) => [
                  styles.emotionCard,
                  pressed && styles.emotionCardPressed,
                  pressed && { backgroundColor: AppColors.White },
                ]}
                onPress={() => handleEmotionSelect(emotion.id)}
              >
                <View style={styles.imageWrapper}>
                  <View style={styles.imageBackground}>
                    <Image
                      source={emotion.image}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <Text style={styles.emotionName}>{emotion.name}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  heroSection: {
    backgroundColor: AppColors.AccentSoft,
    borderRadius: 28,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.White20,
  },
  title: {
    color: AppColors.SoftBlack,
    fontSize: 28,
    fontWeight: "500",
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subtitle: {
    color: AppColors.SoftBlack,
    fontSize: 16,
    textAlign: "center",
    opacity: 0.65,
    lineHeight: Spacing.lg,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emotionCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 24,
    padding: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: AppColors.White,
    borderWidth: 1,
    borderColor: AppColors.Black10,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  emotionCardPressed: {
    transform: [{ scale: 0.96 }],
  },
  imageWrapper: {
    width: 96,
    height: 96,
    marginBottom: Spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  imageBackground: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: AppColors.AccentSoft,
    padding: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  emotionName: {
    color: AppColors.SoftBlack,
    fontSize: 16,
    fontWeight: "500",
    marginTop: Spacing.xs,
    textAlign: "center",
  },
});
