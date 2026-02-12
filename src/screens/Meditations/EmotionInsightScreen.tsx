import AppBar from "@components/AppBar";
import Button from "@components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";
import { STORAGE_KEYS } from "constants/strings";
import { AppStyles } from "constants/styles";
import { getEmotionById } from "data/emotions";
import React, { useCallback, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Alert, Image } from "react-native";
import { MeditationsStackParamList } from "types/navigation";

type EmotionInsightRouteProp = RouteProp<
  MeditationsStackParamList,
  "EmotionInsight"
>;

type NavigationProp = NativeStackNavigationProp<MeditationsStackParamList>;

export default function EmotionInsightScreen() {
  const route = useRoute<EmotionInsightRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { emotion: emotionId, journalSaved } = route.params;
  const emotion = getEmotionById(emotionId);

  const [hasJournaled, setHasJournaled] = useState(journalSaved || false);

  useFocusEffect(
    useCallback(() => {
      const checkIfJournaled = async () => {
        if (!emotion) return;

        try {
          const stored = await AsyncStorage.getItem(
            STORAGE_KEYS.JOURNAL_ENTRIES,
          );

          if (stored) {
            const entries = JSON.parse(stored);

            const now = new Date();
            const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

            const hasJournaledForThisEmotion = entries.some((entry: any) => {
              const entryDate = new Date(entry.updatedAt);
              const isRecent = entryDate > oneDayAgo;
              const mentionsEmotion =
                entry.content
                  .toLowerCase()
                  .includes(emotion.name.toLowerCase()) ||
                entry.title.toLowerCase().includes(emotion.name.toLowerCase());

              return isRecent && mentionsEmotion;
            });

            setHasJournaled(hasJournaledForThisEmotion || journalSaved);
          }
        } catch (error) {
          console.error("Error checking journal entries:", error);
        }
      };

      checkIfJournaled();
    }, [emotion, journalSaved]),
  );

  if (!emotion) {
    return (
      <View style={AppStyles.scrollViewContainer}>
        <AppBar title={"Emotion Not Found"} showBackButton={true} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Emotion not found</Text>
        </View>
      </View>
    );
  }

  const handleJournalReflect = () => {
    navigation.navigate("JournalEntry", {
      entryId: null,
      emotionId: emotion.id,
    });
    setHasJournaled(true);
  };

  const handleTalkThrough = () => {
    const isPremium = false;

    if (!isPremium) {
      Alert.alert(
        "Guided Conversation",
        "Talk with AI Philosophers is available with a premium subscription. Would you like to learn more?",
        [
          {
            text: "Not now",
            style: "cancel",
          },
          {
            text: "Learn more",
            style: "default",
            onPress: () => {},
          },
        ],
      );
    } else {
    }
  };

  const handleBackPress = () => {
    navigation.navigate("MoodTracker");
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar
        title={emotion.name}
        showBackButton={true}
        onBackPress={handleBackPress}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.imageContainer}>
            <Image
              source={emotion.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.emotionTitle}>{emotion.name}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionText}>{emotion.explanation}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionText}>{emotion.stoicPerspective}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.promptText}>"{emotion.prompt}"</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            text={
              hasJournaled ? "Add another reflection" : "Reflect in Journal"
            }
            onPress={handleJournalReflect}
            iconName="journal-outline"
            iconPosition="left"
            variant="primary"
          />
          <Button
            text="Talk this through"
            onPress={handleTalkThrough}
            iconName="chatbubble-outline"
            iconPosition="left"
            variant="outline"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: Spacing.xxl,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: AppColors.SoftBlack,
    fontSize: 18,
  },
  heroSection: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    backgroundColor: AppColors.AccentSoft,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: AppColors.White20,
  },
  imageContainer: {
    width: 140,
    height: 140,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  emotionTitle: {
    color: AppColors.SoftBlack,
    fontSize: 32,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: Spacing.xxl,
    letterSpacing: -0.5,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionText: {
    color: AppColors.SoftBlack,
    fontSize: 17,
    lineHeight: 28,
    opacity: 0.8,
  },
  promptText: {
    color: AppColors.SoftBlack,
    fontSize: 19,
    fontStyle: "italic",
    lineHeight: 30,
    textAlign: "center",
    marginTop: Spacing.xs,
    opacity: 0.85,
  },
  actionsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
  },
});
