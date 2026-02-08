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
            onPress: () => {
              // navigation.navigate("Upgrade");
            },
          },
        ],
      );
    } else {
      // navigation.navigate("PhilosopherChat", {
      //   initialContext: `I'm feeling ${emotion.name.toLocaleLowerCase()}. Can you help me process this from a Stoic perspective?`,
      // });
    }
  };

  const handleBackPress = () => {
    navigation.navigate("MoodTracker");
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={""} showBackButton={true} onBackPress={handleBackPress} />

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
          />

          <Button
            text="Talk this through"
            onPress={handleTalkThrough}
            iconName="chatbubble-outline"
            iconPosition="left"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: AppColors.White,
    fontSize: 18,
  },
  heroSection: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: AppColors.White10,
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
    padding: 32,
    paddingTop: 40,
  },
  emotionTitle: {
    color: AppColors.White,
    fontSize: 36,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: -0.5,
  },
  section: {
    marginBottom: 32,
  },
  sectionText: {
    color: AppColors.White,
    fontSize: 17,
    lineHeight: 26,
    opacity: 0.9,
  },
  promptText: {
    color: AppColors.White,
    fontSize: 19,
    fontStyle: "italic",
    lineHeight: 28,
    textAlign: "center",
    marginTop: 8,
    opacity: 0.95,
  },
  actionsContainer: {
    padding: 32,
    paddingBottom: 48,
    gap: 16,
  },
});
