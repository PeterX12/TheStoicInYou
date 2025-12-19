import AffiliateCard from "@components/AffiliateCard";
import AppBar from "@components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { Strings } from "constants/strings";
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
        <View style={styles.disclaimer}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={AppColors.Black}
          />
          <Text style={styles.disclaimerText}>
            {Strings.MODAL.timerInfoText}
          </Text>
        </View>

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
    padding: 16,
    paddingBottom: 32,
  },
  disclaimer: {
    backgroundColor: AppColors.White,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  disclaimerText: {
    color: AppColors.Black,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
