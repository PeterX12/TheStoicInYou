import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "constants/colors";
import { Spacing } from "constants/spacing";
import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  View,
  Text,
  StyleSheet,
} from "react-native";

export type AffiliateItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  affiliateLink: string;
  price?: string;
};

interface AffiliateCardProps extends TouchableOpacityProps {
  item: AffiliateItem;
}

export default function AffiliateCard({
  item,
  style,
  ...props
}: AffiliateCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={0.7}
      {...props}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        {item.price && <Text style={styles.price}>{item.price}</Text>}
      </View>

      <View style={styles.arrowContainer}>
        <Ionicons name="chevron-forward" size={20} color={AppColors.Accent} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: AppColors.White,
    borderRadius: 22,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    alignItems: "center",
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  image: {
    width: 64,
    height: 84,
    borderRadius: 14,
    marginRight: Spacing.md,
    backgroundColor: AppColors.AccentSoft,
  },
  content: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  title: {
    color: AppColors.SoftBlack,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: Spacing.xs,
    letterSpacing: -0.2,
  },
  description: {
    color: AppColors.SoftBlack,
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.55,
    marginBottom: Spacing.xs,
  },
  price: {
    color: AppColors.Accent,
    fontSize: 14,
    fontWeight: "500",
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppColors.AccentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
});
