import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { Philosopher } from "data/types/philosopher";
import { ScrollView, Text, Image, StyleSheet } from "react-native";

interface BioTabProps {
  philosopher: Philosopher | undefined;
}

export default function BioTab({ philosopher }: BioTabProps) {
  return (
    <ScrollView
      contentContainerStyle={[AppStyles.contentContainer, { paddingTop: 16 }]}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={philosopher?.quotesImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.mainText}>{philosopher?.bio}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 340,
    borderRadius: 8,
  },
  mainText: {
    color: AppColors.White,
    fontSize: 16,
    paddingTop: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
