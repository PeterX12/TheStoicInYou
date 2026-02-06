import AppBar from "@components/AppBar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { View, Text, ScrollView, StyleSheet } from "react-native";
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
});
