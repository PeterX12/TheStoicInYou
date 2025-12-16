import { Ionicons } from "@expo/vector-icons";
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
  const [imageError, setImageError] = React.useState(false);

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      {...props}
      activeOpacity={0.7}
    >
      {imageError ? (
        <View style={styles.iconContainer}>
          <Ionicons
            name="book-outline"
            size={40}
            color="rgba(255,255,255,0.3)"
          />
        </View>
      ) : (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          resizeMode="contain"
          onError={() => setImageError(true)}
        />
      )}

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
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 80,
    borderRadius: 6,
    marginRight: 16,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  content: {
    flex: 1,
    marginRight: 12,
  },

  title: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    lineHeight: 18,
  },
  price: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  arrowContainer: {
    padding: 4,
  },
  iconContainer: {
    width: 60,
    height: 80,
    borderRadius: 6,
    marginRight: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
});
