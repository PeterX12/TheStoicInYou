import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Onboarding: undefined;
  MainTab: NavigatorScreenParams<TabParamList>;
  Settings: undefined;
};

export type TabParamList = {
  Archive: undefined;
  Meditations: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
