import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { Spacing } from "constants/spacing";
import { Philosopher } from "data/types/philosopher";
import { ScrollView, Text, Image, StyleSheet, View } from "react-native";

interface BioTabProps {
  philosopher: Philosopher | undefined;
}

export default function BioTab({ philosopher }: BioTabProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={philosopher?.quotesImage}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.accentLine} />

      <Text style={styles.bioText}>{philosopher?.bio}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  imageWrapper: {
    width: "100%",
    backgroundColor: AppColors.AccentSoft,
    borderRadius: 24,
    paddingVertical: Spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: 220,
  },
  accentLine: {
    width: 60,
    height: 3,
    borderRadius: 2,
    backgroundColor: AppColors.AccentSoft,
    marginVertical: Spacing.xl,
  },
  bioText: {
    color: AppColors.SoftBlack,
    fontSize: 17,
    lineHeight: 28,
    letterSpacing: -0.2,
    opacity: 0.85,
    textAlign: "left",
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
});
