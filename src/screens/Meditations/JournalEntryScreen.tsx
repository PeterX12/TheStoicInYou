import AppBar from "@components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppColors } from "constants/colors";
import { STORAGE_KEYS } from "constants/strings";
import { AppStyles } from "constants/styles";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View, StyleSheet } from "react-native";
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

  useEffect(() => {
    if (entryId) {
    await loadEntry(entryId);
      setIsNewEntry(false);
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
        }
    }
    } catch (error) {
      console.error("Failed to load entry:", error);
    }
  };

  const saveEntry = async (): Promise<boolean> => {
    try {
      if (!title.trim() && !content.trim()) {
        return false;
      }

      const stored = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      const entries: JournalEntry[] = stored ? JSON.parse(stored) : [];

      const now = new Date();
      const entryData: JournalEntry = {
        id: entryId || Date.now().toString(),
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
      return true;
    }
    catch (error) {
      console.error("Failed to save entry:", error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      await saveEntry();
      navigation.dispatch(e.data.action);
      
    });

    return unsubscribe;

  }, [navigation, title, content])

  const handleDelete = () => {
    Alert.alert(
      "Delete Reflection",
      "Are you sure you want to delete this reflection? This cannot be undone.",
      [
        {
          text: "Cancel", style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
          try{
            const stored = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
            if (stored) {
              const entries: JournalEntry[] = JSON.parse(stored);
              const filteredEntries = entries.filter((entry) => entry.id !== entryId);

              await AsyncStorage.setItem(STORAGE_KEYS.JOURNAL_ENTRIES, JSON.stringify(filteredEntries));
            }
          }
          catch(error){
            Alert.alert("Error", "Failed to delete the reflection.");
          }
          },
        }
      ]
    );
  };


  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={isNewEntry ? "New Reflection" : "Edit Reflection"} showBackButton={true} rightIcon={<Ionicons name="trash-outline" size={22} color={AppColors.White} />}/>

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        >

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
});
