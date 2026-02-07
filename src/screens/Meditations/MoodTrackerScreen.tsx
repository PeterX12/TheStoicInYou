import AppBar from "@components/AppBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { emotions } from "data/emotions";
import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { MeditationsStackParamList } from "types/navigation";

type NavigationProp = NativeStackNavigationProp<MeditationsStackParamList>;

export default function MoodTrackerScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleEmotionSelect = (emotionId: string) => {
    navigation.navigate("EmotionInsight", { emotion: emotionId });
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"How are you feeling?"} showBackButton={true} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>How are you feeling?</Text>
          <Text style={styles.subtitle}>
            Take a moment to notice what's present
          </Text>
        </View>

        <View style={styles.grid}>
          {emotions.map((emotion) => (
            <TouchableOpacity
              key={emotion.id}
              style={styles.emotionCard}
              onPress={() => handleEmotionSelect(emotion.id)}
              activeOpacity={0.7}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={emotion.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.emotionName}>{emotion.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
    paddingHorizontal: 16,
  },
  title: {
    color: AppColors.White,
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: AppColors.White,
    fontSize: 16,
    opacity: 0.8,
    textAlign: "center",
    lineHeight: 22,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emotionCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: AppColors.White90,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: 72,
    height: 72,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  emotionName: {
    color: AppColors.Black,
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
