import AppBar from "@components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { getPhilosopherById } from "data/philosophers";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
            style={[styles.tab, activeTab == "quotes" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "quotes" && styles.activeTabText,
              ]}
            >
              Quotes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("bio")}
            style={[styles.tab, activeTab == "bio" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "bio" && styles.activeTabText,
              ]}
            >
              Bio
            </Text>
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
  container: {
    flex: 1,
    backgroundColor: AppColors.White,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: AppColors.White,
  },
  tabText: {
    color: AppColors.White,
    fontSize: 16,
    fontWeight: "500",
  },
  activeTabText: {
    color: AppColors.White,
    fontWeight: "600",
  },
});
