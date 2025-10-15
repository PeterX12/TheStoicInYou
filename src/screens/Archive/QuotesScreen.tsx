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

type QuotesRouteProp = RouteProp<{
  Quotes: {
    philosopherId: string;
  };
}>;

export default function QuotesScreen() {
  const route = useRoute<QuotesRouteProp>();
  const philosopherId = route.params.philosopherId;
  const philosopher = getPhilosopherById(philosopherId);

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    if (philosopher?.quotes.length) {
      const randomIndex = Math.floor(Math.random() * philosopher.quotes.length);
      setCurrentQuoteIndex(randomIndex);
    }
  }, [philosopher?.id]);

  const navigateQuotes = (direction: "next" | "prev") => {
    if (!philosopher?.quotes.length) return;

    setCurrentQuoteIndex((current) => {
      if (direction === "next") {
        return current === philosopher.quotes.length - 1 ? 0 : current + 1;
      } else {
        return current === 0 ? philosopher.quotes.length - 1 : current - 1;
      }
    });
  };

  if (philosopher) {
    return (
      <View style={AppStyles.scrollViewContainer}>
        <AppBar title={philosopher?.name} showBackButton={true} />
        <ScrollView
          contentContainerStyle={AppStyles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Image source={philosopher?.quotesImage} />
          <Text style={styles.mainText}>{philosopher?.bio}</Text>

          {/* Quotes Section */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>
              "{philosopher.quotes[currentQuoteIndex]}"
            </Text>

            <View style={styles.quoteNavigation}>
              <TouchableOpacity
                onPress={() => navigateQuotes("prev")}
                style={styles.navButton}
              >
                <Ionicons
                  name="caret-back-outline"
                  size={24}
                  color={AppColors.White}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateQuotes("next")}
                style={styles.navButton}
              >
                <Ionicons
                  name="caret-forward-outline"
                  size={24}
                  color={AppColors.White}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainText: {
    color: AppColors.White,
    fontSize: 16,
    paddingTop: 16,
    textAlign: "center",
  },
  quoteContainer: {
    alignItems: "center",
    marginVertical: 24,
    paddingHorizontal: 20,
  },
  quoteText: {
    color: AppColors.White,
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
  },
  quoteNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  navButton: {
    padding: 8,
  },
});
