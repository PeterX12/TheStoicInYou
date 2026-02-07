import AppBar from "@components/AppBar";
import Button from "@components/Button"; // Import the Button component
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { getEmotionById } from "data/emotions";
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

  const { emotion: emotionId } = route.params;
  const emotion = getEmotionById(emotionId);

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
    navigation.navigate("JournalEntry", { entryId: null });
  };

  const handleTalkThrough = () => {
    const isPremium = false;

    if (!isPremium) {
      Alert.alert(
        "Premium Feature",
        "Talk with AI Philosophers is a premium feature. Upgrade to access guided conversations about your emotions.",
        [
          { text: "Not now", style: "cancel" },
          {
            text: "Upgrade",
            style: "default",
            onPress: () => {
              // navigation.navigate("Upgrade");
            },
          },
        ],
      );
    } else {
      //   navigation.navigate("PhilosopherChat", {
      //     initialContext: `I'm feeling ${emotion.name.toLocaleLowerCase()}. Can you help me process this from a Stoic perspective?`,
      //   });
    }
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={emotion.name} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.imageContainer}>
            <Image
              source={emotion.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.emotionTitle}>{emotion.name}</Text>
        </View>

        <View style={styles.insightsContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this feeling</Text>
            <Text style={styles.sectionText}>{emotion.explanation}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>A Stoic perspective</Text>
            <Text style={styles.sectionText}>{emotion.stoicPerspective}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reflection prompt</Text>
            <Text style={styles.sectionPrompt}>"{emotion.prompt}"</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Button
            text="Reflect in Journal"
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
  topSection: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: AppColors.White + "20",
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  emotionTitle: {
    color: AppColors.White,
    fontSize: 32,
    fontWeight: "700",
  },
  insightsContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    color: AppColors.White,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  sectionText: {
    color: AppColors.White,
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  sectionPrompt: {
    color: AppColors.White,
    fontSize: 18,
    fontStyle: "italic",
    lineHeight: 26,
    marginTop: 8,
  },
  actionsContainer: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
});
