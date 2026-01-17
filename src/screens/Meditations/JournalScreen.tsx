import AppBar from "@components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MeditationsStackParamList } from "types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

type NavigationProp = NativeStackNavigationProp<MeditationsStackParamList>;

const JOURNAL_STORAGE_KEY = "@StoicApp_JournalEntries";

export default function JournalScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entryToDelete, setEntryToDelete] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      loadEntries();
    }, []),
  );

  const loadEntries = async () => {
    setIsLoading(true);
    try {
      const stored = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);

      if (stored) {
        const parsedEntries = JSON.parse(stored).map((entry: any) => ({
          ...entry,
          createdAt: new Date(entry.createdAt),
          updatedAt: new Date(entry.updatedAt),
        }));

        //Sort by most recent
        parsedEntries.sort(
          (a: JournalEntry, b: JournalEntry) =>
            b.updatedAt.getTime() - a.updatedAt.getTime(),
        );
        setEntries(parsedEntries);
      }
    } catch (error) {
      console.error("Failed to load journal entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"Journal"} showBackButton={true} />
    </View>
  );
}

const styles = StyleSheet.create({});
