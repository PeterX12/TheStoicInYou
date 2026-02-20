import AffiliateCard from "@components/AffiliateCard";
import AppBar from "@components/AppBar";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";
import { AppStyles } from "constants/styles";
import React from "react";
import { Linking, ScrollView, View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "types/navigation";

type AffiliateItemsRouteProp = RouteProp<RootStackParamList, "AffiliateItems">;

export default function AffiliateItemsScreen() {
  const route = useRoute<AffiliateItemsRouteProp>();
  const { title, items } = route.params;

  const handleItemPress = async (affiliateLink: string) => {
    try {
      await Linking.openURL(affiliateLink);
    } catch (error) {
      console.error("Failed to open link:", error);
    }
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={title} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            Disclosure: As an Amazon Associate I earn from qualifying purchases.
            I only recommend books I genuinely believe will help your Stoic
            journey.
          </Text>
        </View>

        {/* Books List */}
        {items.map((item) => (
          <AffiliateCard
            key={item.id}
            item={item}
            onPress={() => handleItemPress(item.affiliateLink)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  disclaimer: {
    backgroundColor: AppColors.AccentSoft,
    padding: Spacing.lg,
    borderRadius: 20,
    marginBottom: Spacing.xl,
  },
  disclaimerText: {
    color: AppColors.SoftBlack,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    opacity: 0.8,
  },
});
