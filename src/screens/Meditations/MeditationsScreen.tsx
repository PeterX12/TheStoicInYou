import AppBar from "@components/AppBar";
import ImageWithText from "@components/ImageWithText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";
import { AppStyles } from "constants/styles";
import { meditationFeatures } from "data/meditations/features";
import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { MeditationsStackParamList } from "types/navigation";

type NavigationProp = NativeStackNavigationProp<MeditationsStackParamList>;

export default function MeditationsScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"Meditations"} showBackButton={false} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Meditations</Text>
          <Text style={styles.heroSubtitle}>Pause. Reflect. Recenter.</Text>
        </View>
        <View style={styles.featuresContainer}>
          {meditationFeatures.map((feature) => (
            <ImageWithText
              key={feature.id}
              imageSource={feature.image}
              text={feature.title}
              onPress={() => {
                if (feature.screenName === "JournalEntry") {
                  navigation.navigate("JournalEntry", { entryId: null });
                } else {
                  navigation.navigate(feature.screenName as any);
                }
              }}
              containerStyle={styles.featureCard}
              iconColor={AppColors.White}
              iconSize={20}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  heroTitle: {
    color: AppColors.SoftBlack,
    fontSize: 28,
    fontWeight: "500",
    letterSpacing: -0.5,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    color: AppColors.SoftBlack,
    fontSize: 16,
    textAlign: "center",
    opacity: 0.65,
    lineHeight: Spacing.lg,
  },
  featuresContainer: {
    width: "100%",
  },
  featureCard: {
    marginBottom: Spacing.lg,
  },
});
