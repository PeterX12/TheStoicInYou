import { MeditationsStackParamList } from "types/meditations-navigation";

export type MeditationFeature = {
  id: string;
  title: string;
  image: any;
  screenName: keyof MeditationsStackParamList;
};

export const meditationFeature: MeditationFeature[] = [
  {
    id: "mood",
    title: "How are you feeling?",
    image: require("@assets/images/Emotions.png"),
    screenName: "MoodTracker",
  },
  {
    id: "chat",
    title: "Talk to a Philosopher",
    image: require("@assets/imagesAiMarcus.png"),
    screenName: "PhilosopherChat",
  },
  {
    id: "journal",
    title: "Journal",
    image: require("@assets/Journal.png"),
    screenName: "Journal",
  },
];
