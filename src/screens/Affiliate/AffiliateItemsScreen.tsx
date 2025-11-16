import { RouteProp, useRoute } from "@react-navigation/native";

export type AffiliateItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // or require() for local images
  affiliateLink: string;
  price?: string;
};

type AffiliateItemsRouteProp = RouteProp<{
  AffiliateItems: {
    title: string;
    items: AffiliateItem[];
  };
}>;

export default function AffiliateItemsScreen() {
  const route = useRoute<AffiliateItemsRouteProp>();
}
