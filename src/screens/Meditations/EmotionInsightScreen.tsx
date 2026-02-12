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
    <View style={[AppStyles.scrollViewContainer, styles.screenContainer]}>
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
  screenContainer: {
    backgroundColor: AppColors.AppBackground,
  },
  container: {
    flexGrow: 1,
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
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: AppColors.AccentSoft,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 28,

    shadowColor: AppColors.AccentDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
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
    color: AppColors.SoftBlack,
    fontSize: 32,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: -0.5,
  },
  section: {
    marginBottom: 32,
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
    marginTop: 8,
    opacity: 0.85,
  },
  actionsContainer: {
    padding: 32,
    paddingBottom: 48,
    gap: 12,
  },
});
