export interface AffiliateItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  affiliateLink: string;
  price?: string;
  tags?: string[];
}

export interface BookItem extends AffiliateItem {
  author: string;
  pages?: number;
}
