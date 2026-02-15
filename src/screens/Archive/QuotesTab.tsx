import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";
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
      <View style={styles.quoteContent}>
        <View>
          <Text style={styles.quoteText}>
            "{philosopher.quotes[currentQuoteIndex]}"
          </Text>
          <View style={styles.accentLine} />
        </View>

        <Text style={styles.quoteCounter}>
          {currentQuoteIndex + 1} / {philosopher.quotes.length}
        </Text>
      </View>

      <View style={styles.quoteNavigation}>
        <TouchableOpacity
          onPress={() => navigateQuotes("prev")}
          style={styles.navButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color={AppColors.Accent} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateQuotes("next")}
          style={styles.navButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-forward" size={20} color={AppColors.Accent} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quoteContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
  quoteContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  quoteText: {
    color: AppColors.SoftBlack,
    fontSize: 22,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 34,
    letterSpacing: -0.3,
    opacity: 0.9,
    maxWidth: "90%",
    fontWeight: "400",
    marginBottom: Spacing.md,
  },
  accentLine: {
    width: 60,
    height: 3,
    borderRadius: 2,
    backgroundColor: AppColors.AccentSoft,
    alignSelf: "center",
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  quoteCounter: {
    color: AppColors.Accent,
    fontSize: 13,
    opacity: 0.6,
    fontWeight: "400",
    textAlign: "center",
  },
  quoteNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.lg,
    marginTop: Spacing.xl,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.AccentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
});
