import AppBar from "@components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppColors } from "constants/colors";
import { STORAGE_KEYS } from "constants/strings";
import { AppStyles } from "constants/styles";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";
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

  const loadEntry = useCallback(async (id: string): Promise<void> => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      if (stored) {
        const entries: JournalEntry[] = JSON.parse(stored).map(
          (entry: any) => ({
            ...entry,
            createdAt: new Date(entry.createdAt),
            updatedAt: new Date(entry.updatedAt),
          }),
        );

        const entryToEdit = entries.find((entry) => entry.id === id);
        if (entryToEdit) {
          setTitle(entryToEdit.title);
          setContent(entryToEdit.content);
        }
      }
    } catch (error) {
      console.error("Failed to load entry:", error);
    }
  }, []);

  useEffect(() => {
    if (entryId) {
      loadEntry(entryId);
      setIsNewEntry(false);
    }
  }, [entryId, loadEntry]);

  const saveEntry = useCallback(async (): Promise<boolean> => {
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
        createdAt: entryId
          ? entries.find((entry) => entry.id === entryId)?.createdAt || now
          : now,
        updatedAt: now,
      };

      const entryIndex = entries.findIndex(
        (entry) => entry.id === entryData.id,
      );
      if (entryIndex >= 0) {
        entries[entryIndex] = entryData;
      } else {
        entries.unshift(entryData);
      }

      await AsyncStorage.setItem(
        STORAGE_KEYS.JOURNAL_ENTRIES,
        JSON.stringify(entries),
      );
      return true;
    } catch (error) {
      console.error("Failed to save entry:", error);
      return false;
    }
  }, [title, content, entryId]);

  const handleBackPress = useCallback(async () => {
    if (title.trim() || content.trim()) {
      await saveEntry();
    }
    navigation.goBack();
  }, [saveEntry, navigation, title, content]);

  const handleDelete = () => {
    if (!entryId) {
      navigation.goBack();
      return;
    }

    Alert.alert(
      "Delete Reflection",
      "Are you sure you want to delete this reflection? This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const stored = await AsyncStorage.getItem(
                STORAGE_KEYS.JOURNAL_ENTRIES,
              );
              if (stored) {
                const entries: JournalEntry[] = JSON.parse(stored);
                const filteredEntries = entries.filter(
                  (entry) => entry.id !== entryId,
                );

                await AsyncStorage.setItem(
                  STORAGE_KEYS.JOURNAL_ENTRIES,
                  JSON.stringify(filteredEntries),
                );
              }
              navigation.goBack();
            } catch (error) {
              Alert.alert("Error", "Failed to delete the reflection.");
            }
          },
        },
      ],
    );
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar
        title={isNewEntry ? "New Reflection" : "Edit Reflection"}
        showBackButton={true}
        rightIcon={
          <Ionicons name="trash-outline" size={22} color={AppColors.White} />
        }
        onRightIconPress={handleDelete}
        onBackPress={handleBackPress}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Title (Optional)"
          placeholderTextColor={AppColors.PlaceHolder}
          autoFocus={isNewEntry}
        />

        <TextInput
          style={styles.contentInput}
          value={content}
          onChangeText={setContent}
          placeholder="Write your reflection here..."
          placeholderTextColor={AppColors.PlaceHolder}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.footer}>
          <Text style={styles.counterText}>
            {} {content.length} / 5000 characters
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  titleInput: {
    color: AppColors.Black,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.PlaceHolder,
  },
  contentInput: {
    color: AppColors.Black,
    fontSize: 16,
    lineHeight: 26,
    minHeight: 400,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  counterText: {
    color: AppColors.PlaceHolder,
    fontSize: 12,
  },
});
