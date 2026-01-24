import AppBar from "@components/AppBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { STORAGE_KEYS } from "constants/strings";
import { AppStyles } from "constants/styles";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { JournalEntry } from "types/journal";
import { MeditationsStackParamList } from "types/navigation";

type JournalEntryRouteProp = RouteProp<
  MeditationsStackParamList,
  "JournalEntry"
>;
type NavigationProp = NativeStackNavigationProp<MeditationsStackParamList>;

export default function JournalEntryScreen() {
  const route = useRoute<JournalEntryRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { entryId } = route.params;

  const [isNewEntry, setIsNewEntry] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (entryId) {
    await loadEntry(entryId);
      setIsNewEntry(false);
    } else {
      setIsNewEntry(true);
    }
  }, [entryId]);

  const loadEntry = async (id: string): Promise<void> => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
        if (stored) {
        const entries: JournalEntry[] = JSON.parse(stored).map((entry: any) => ({
            ...entry,
            createdAt: new Date(entry.createdAt);
            updatedAt: new Date(entry.updatedAt),
        }));

        const entryToEdit = entries.find((entry) => entry.id === id)
        if (entryToEdit) {
            setTitle(entryToEdit.title);
            setContent(entryToEdit.content);
            setHasChanges(false)
        }
    }
    } catch (error) {
      console.error("Failed to load entry:", error);
    }
  };

  const saveEntry = async (): Promise<boolean> => {
    if (!title.trim() && !content.trim()) return false;

    try {
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
        const entries: JournalEntry[] = stored ? JSON.parse(stored) : [];

        const now = new Date();
        const entryData: JournalEntry = {
            id: entryId || Date.now().toLocaleString(),
            title: title.trim() || "Untitled Reflection",
            content: content.trim(),
            createdAt: entryId ? (entries.find((entry) => entry.id === entryId)?.createdAt || now) || now,
            updatedAt: now,
        }

        const entryIndex = entries.findIndex((entry) => entry.id === entryData.id);
        if (entryIndex >= 0) {
            entries[entryIndex] = entryData
        }
        else {
            entries.unshift(entryData);
        } 

        await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(entries));
        setHasChanges(false);
        return true;

    }
    catch (error) {
      console.error("Failed to save entry:", error);
      Alert.alert("Error", "Failed to save your reflection.");
      return false;
    }
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={isNewEntry ? "" : ""} showBackButton={true} />
    </View>
  );
}
