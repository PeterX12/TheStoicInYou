import { NavigatorScreenParams } from "@react-navigation/native";
import { AffiliateItem } from "data/types/product";

export type RootStackParamList = {
  Onboarding: undefined;
  MainTab: NavigatorScreenParams<TabParamList>;
  Quotes: {
    philosopherId: string;
  };
  AffiliateItems: {
    title: string;
    items: AffiliateItem[];
  };
};

export type ArchiveStackParamList = {
  ArchiveHome: undefined;
  Quotes: {
    philosopherId: string;
  };
  AffiliateItems: {
    title: string;
    items: AffiliateItem[];
  };
};

export type MeditationsStackParamList = {
  MeditationHome: undefined;
  MoodTracker: undefined;
  PhilosopherChat: undefined;
  Journal: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Archive: NavigatorScreenParams<ArchiveStackParamList>;
  Meditations: NavigatorScreenParams<MeditationsStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
