import AppBar from "@components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { Spacing } from "constants/spacing";
import { getPhilosopherById } from "data/philosophers";
import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import QuotesTab from "./QuotesTab";
import BioTab from "./BioTab";

type QuotesRouteProp = RouteProp<{
  Quotes: {
    philosopherId: string;
  };
}>;

export default function QuotesScreen() {
  const route = useRoute<QuotesRouteProp>();
  const philosopherId = route.params.philosopherId;
  const philosopher = getPhilosopherById(philosopherId);

  const [activeTab, setActiveTab] = useState<"bio" | "quotes">("quotes");

  if (philosopher) {
    return (
      <View style={AppStyles.scrollViewContainer}>
        <AppBar title={philosopher?.name} showBackButton={true} />

        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setActiveTab("quotes")}
            style={({ pressed }) => [
              styles.tab,
              activeTab === "quotes" && styles.activeTab,
              pressed && styles.tabPressed,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "quotes" && styles.activeTabText,
              ]}
            >
              Quotes
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("bio")}
            style={({ pressed }) => [
              styles.tab,
              activeTab === "bio" && styles.activeTab,
              pressed && styles.tabPressed,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "bio" && styles.activeTabText,
              ]}
            >
              Bio
            </Text>
          </Pressable>
        </View>

        {activeTab === "quotes" ? (
          <QuotesTab philosopher={philosopher} />
        ) : (
          <BioTab philosopher={philosopher} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: AppColors.AccentSoft,
    borderRadius: 28,
    padding: Spacing.xs,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  activeTab: {
    backgroundColor: AppColors.Accent,
  },
  tabPressed: {
    transform: [{ scale: 0.97 }],
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: AppColors.SoftBlack,
    opacity: 0.6,
  },
  activeTabText: {
    color: AppColors.White,
    fontWeight: "600",
    opacity: 1,
  },
});
