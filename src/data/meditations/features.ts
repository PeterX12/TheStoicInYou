import { MeditationsStackParamList } from "types/meditations-navigation";

export type MeditationFeature = {
  id: string;
  title: string;
  image: any;
  screenName: keyof MeditationsStackParamList;
};

export const meditationFeatures: MeditationFeature[] = [
  {
    id: "mood",
    title: "How are you feeling?",
    image: require("../../../assets/images/Emotions.png"),
    screenName: "MoodTracker",
  },
  {
    id: "chat",
    title: "Talk to a Philosopher",
    image: require("../../../assets/images/AiMarcus.png"),
    screenName: "PhilosopherChat",
  },
  {
    id: "journal",
    title: "Journal",
    image: require("../../../assets/images/Journal.png"),
    screenName: "Journal",
  },
];
