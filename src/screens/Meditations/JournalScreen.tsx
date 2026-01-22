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

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      entry.content
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()),
  );

  const handleEditEntry = (entry: JournalEntry) => {
    navigation.navigate("JournalEntry", { entryId: entry.id });
  };

  const handleDeleteEntry = (entry: JournalEntry) => {
    setEntryToDelete(entry);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getPreview = (text: string) => {
    const firstLine = text.split("\n")[0];
    return firstLine.length > 80
      ? firstLine.substring(0, 80) + "..."
      : firstLine;
  };

  const handleCreateNew = () => {};

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"Journal"} showBackButton={true} />

      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={AppColors.PlaceHolder}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes"
          placeholderTextColor={AppColors.PlaceHolder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="never"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery("")}
            style={styles.clearButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={AppColors.PlaceHolder}
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.listContainer,
          filteredEntries.length === 0 && styles.emptyListContainer,
        ]}
      >
        {isLoading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateSubtitle}>
              Loading your reflections...
            </Text>
          </View>
        ) : filteredEntries.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="document-text-outline"
              size={64}
              color={AppColors.PlaceHolder}
            />
            <Text style={styles.emptyStateTitle}>
              {searchQuery.length > 0 ? "No notes found" : "No reflections yet"}
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              {searchQuery.length > 0
                ? "Try a different search term"
                : "Your Stoic journey begins with reflection"}
            </Text>
          </View>
        ) : (
          filteredEntries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.noteCard}
              onPress={() => handleEditEntry(entry)}
              onLongPress={() => handleDeleteEntry(entry)}
              delayLongPress={500}
              activeOpacity={0.7}
            >
              <View style={styles.noteCardContent}>
                <Text style={styles.noteTitle} numberOfLines={1}>
                  {entry.title || "Untitled Reflection"}
                </Text>
                <Text style={styles.notePreview} numberOfLines={2}>
                  {getPreview(entry.content) || "No content yet"}
                </Text>
                <View style={styles.noteFooter}>
                  <Text style={styles.noteDate}>
                    {formatDate(entry.updatedAt)}
                  </Text>
                  {entry.updatedAt.getTime() !== entry.createdAt.getTime() && (
                    <Text style={styles.editedFont}>Edited</Text>
                  )}
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={AppColors.PlaceHolder}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={handleCreateNew}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color={AppColors.White} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.White,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    color: AppColors.Black,
    fontSize: 16,
    marginLeft: 12,
    padding: 0,
  },
  clearButton: {
    paddingLeft: 8,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyStateTitle: {
    color: AppColors.White,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
  },
  emptyStateSubtitle: {
    color: AppColors.PlaceHolder,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    maxWidth: 280,
  },
  noteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.White,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  noteCardContent: {
    flex: 1,
    marginRight: 12,
  },
  noteTitle: {
    color: AppColors.Black,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  notePreview: {
    color: AppColors.Black,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
    opacity: 0.8,
  },
  noteFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noteDate: {
    color: AppColors.PlaceHolder,
    fontSize: 12,
  },
  editedFont: {
    color: AppColors.PlaceHolder,
    fontSize: 10,
    backgroundColor: AppColors.White,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: AppColors.PlaceHolder,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.Black,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
