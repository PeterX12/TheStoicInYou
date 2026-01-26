import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JournalEntryScreen from "@screens/Meditations/JournalEntryScreen";
import JournalScreen from "@screens/Meditations/JournalScreen";
import MeditationsScreen from "@screens/Meditations/MeditationsScreen";
import MoodTrackerScreen from "@screens/Meditations/MoodTrackerScreen";
import PhilosopherChatScreen from "@screens/Meditations/PhilosopherChatScreen";
import { MeditationsStackParamList } from "types/navigation";

const MeditationStack = createNativeStackNavigator<MeditationsStackParamList>();

export const MeditationsStackScreen = () => {
  return (
    <MeditationStack.Navigator screenOptions={{ headerShown: false }}>
      <MeditationStack.Screen
        name="MeditationHome"
        component={MeditationsScreen}
      />
      <MeditationStack.Screen
        name="MoodTracker"
        component={MoodTrackerScreen}
      />
      <MeditationStack.Screen
        name="PhilosopherChat"
        component={PhilosopherChatScreen}
      />
      <MeditationStack.Screen name="Journal" component={JournalScreen} />
      <MeditationStack.Screen
        name="JournalEntry"
        component={JournalEntryScreen}
      />
    </MeditationStack.Navigator>
  );
};
