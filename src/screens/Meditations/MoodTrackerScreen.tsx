import AppBar from "@components/AppBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { emotions } from "data/emotions";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
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
      <AppBar title={"How are you Feeling?"} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>How are you feeling?</Text>
          <Text style={styles.subtitle}>
            Take a moment to notice what’s present.
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
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    color: AppColors.White,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: AppColors.White,
    fontSize: 16,
    opacity: 0.8,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emotionCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    backgroundColor: AppColors.White,
    elevation: 2,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  emotionName: {
    color: AppColors.Black,
    fontSize: 16,
    fontWeight: "600",
  },
});
