import AppBar from "@components/AppBar";
import Button from "@components/Button";
import ImageWithText from "@components/ImageWithText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { Spacing } from "constants/spacing";
import { philosophers } from "data";
import { stoicBooks } from "data/products/books";
import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { RootStackParamList } from "types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ArchiveScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleFramePress = (id: string) => {
    navigation.navigate("Quotes", { philosopherId: id });
  };

  const handleItemPress = () => {
    navigation.navigate("AffiliateItems", {
      title: "Stoic Books",
      items: stoicBooks,
    });
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"Archive"} showBackButton={false} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Label */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Philosophers</Text>
          <View style={styles.sectionLine} />
        </View>

        {/* Grid Container */}
        <View style={styles.gridContainer}>
          {philosophers.map((philosopher) => (
            <ImageWithText
              key={philosopher.id}
              imageSource={philosopher.image}
              text={philosopher.name}
              onPress={() => handleFramePress(philosopher.id)}
              containerStyle={styles.item}
              imageStyle={styles.philosopherImage}
              iconColor={AppColors.Accent}
              variant="grid"
            />
          ))}
        </View>

        {/* Books Button */}
        <View style={styles.buttonContainer}>
          <Button
            text="Books"
            onPress={handleItemPress}
            variant="primary"
            fullWidth
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
    alignItems: "flex-start",
  },
  sectionHeader: {
    width: "100%",
    marginBottom: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: AppColors.SoftBlack,
    letterSpacing: 0.5,
    opacity: 0.7,
    textTransform: "uppercase",
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: AppColors.Black10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  item: {
    width: "48%",
    marginBottom: Spacing.lg,
  },
  philosopherImage: {
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: AppColors.White,
  },
  buttonContainer: {
    width: "100%",
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.xs,
  },
});
