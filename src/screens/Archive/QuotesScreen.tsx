import AppBar from "@components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { Spacing } from "constants/spacing";
import { getPhilosopherById } from "data/philosophers";
import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
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
          <TouchableOpacity
            onPress={() => setActiveTab("quotes")}
            style={styles.tab}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "quotes" && styles.activeTabText,
              ]}
            >
              Quotes
            </Text>
            {activeTab === "quotes" && <View style={styles.activeUnderline} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("bio")}
            style={styles.tab}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "bio" && styles.activeTabText,
              ]}
            >
              Bio
            </Text>
            {activeTab === "bio" && <View style={styles.activeUnderline} />}
          </TouchableOpacity>
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
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.Black10,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: "center",
    position: "relative",
  },
  tabText: {
    color: AppColors.SoftBlack,
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.6,
  },
  activeTabText: {
    color: AppColors.Accent,
    fontWeight: "600",
    opacity: 1,
  },
  activeUnderline: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: AppColors.Accent,
  },
});
