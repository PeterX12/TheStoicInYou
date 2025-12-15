import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "constants/colors";
import { Philosopher } from "data";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

interface QuotesTabProps {
  philosopher: Philosopher;
}

export default function QuotesTab({ philosopher }: QuotesTabProps) {
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

  return (
    <View style={styles.quoteContainer}>
      <Text style={styles.quoteText}>
        "{philosopher.quotes[currentQuoteIndex]}"
      </Text>

      {/* Add quote counter */}
      <Text style={styles.quoteCounter}>
        {currentQuoteIndex + 1} / {philosopher.quotes.length}
      </Text>

      <View style={styles.quoteNavigation}>
        <TouchableOpacity
          onPress={() => navigateQuotes("prev")}
          style={styles.navButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="caret-back-outline"
            size={28}
            color={AppColors.White}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateQuotes("next")}
          style={styles.navButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="caret-forward-outline"
            size={28}
            color={AppColors.White}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quoteContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  quoteCounter: {
    color: AppColors.White,
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 20,
  },
});
