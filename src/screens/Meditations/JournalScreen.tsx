import AppBar from "@components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { Spacing } from "constants/spacing";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  Pressable,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MeditationsStackParamList } from "types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "constants/strings";
import { JournalEntry } from "types/journal";

type NavigationProp = NativeStackNavigationProp<MeditationsStackParamList>;

export default function JournalScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entryToDelete, setEntryToDelete] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const timer = setTimeout(() => {
        loadEntries();
      }, 50);
      return () => clearTimeout(timer);
    }, []),
  );

  const loadEntries = async () => {
    setIsLoading(true);
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      if (stored) {
        const parsedEntries = JSON.parse(stored).map((entry: any) => ({
          ...entry,
          createdAt: new Date(entry.createdAt),
          updatedAt: new Date(entry.updatedAt),
        }));
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

  const handleCreateNew = () => {
    navigation.navigate("JournalEntry", { entryId: null });
  };

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

  const confirmDelete = async () => {
    if (entryToDelete) {
      const updatedEntries = entries.filter((e) => e.id !== entryToDelete.id);
      setEntries(updatedEntries);
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.JOURNAL_ENTRIES,
          JSON.stringify(updatedEntries),
        );
      } catch (error) {
        console.error("Failed to delete entry:", error);
      }
      setEntryToDelete(null);
    }
  };

  const getPreview = (text: string) => {
    const firstLine = text.split("\n")[0];
    return firstLine.length > 80
      ? firstLine.substring(0, 80) + "..."
      : firstLine;
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"Journal"} showBackButton={true} />

      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={18}
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
            hitSlop={{
              top: Spacing.sm,
              bottom: Spacing.sm,
              left: Spacing.sm,
              right: Spacing.sm,
            }}
          >
            <Ionicons
              name="close-circle"
              size={18}
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
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateSubtitle}>
              Loading your reflections...
            </Text>
          </View>
        ) : filteredEntries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEyebrow}>
              {searchQuery.length > 0 ? "NO MATCHES" : "BEGIN HERE"}
            </Text>
            <Text style={styles.emptyStateTitle}>
              {searchQuery.length > 0 ? "No notes found" : "No reflections yet"}
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              {searchQuery.length > 0
                ? "Try a different search term"
                : "Your first entry awaits. The unexamined life is not worth living."}
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
                    <View style={styles.editedTag}>
                      <Text style={styles.editedText}>Edited</Text>
                    </View>
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

      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={handleCreateNew}
      >
        <Ionicons name="add" size={28} color={AppColors.White} />
      </Pressable>

      <Modal visible={entryToDelete !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons
              name="trash-outline"
              size={40}
              color={AppColors.Error}
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>Delete Reflection</Text>
            <Text style={styles.modalText}>
              Delete "{entryToDelete?.title || "Untitled Reflection"}"? This
              action cannot be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEntryToDelete(null)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.deleteButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.Black10,
  },
  searchInput: {
    flex: 1,
    color: AppColors.SoftBlack,
    fontSize: 15,
    marginLeft: Spacing.xs,
    paddingVertical: Spacing.xs,
    paddingHorizontal: 0,
    height: 36,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  clearButton: {
    padding: Spacing.xs,
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
  },
  emptyStateEyebrow: {
    fontSize: 11,
    fontWeight: "500",
    color: AppColors.Accent,
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  emptyStateTitle: {
    color: AppColors.SoftBlack,
    fontSize: 20,
    fontWeight: "500",
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  emptyStateSubtitle: {
    color: AppColors.SoftBlack,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 280,
    opacity: 0.6,
    fontStyle: "italic",
  },
  noteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.White,
    borderRadius: 24,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.Black10,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  noteCardContent: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  noteTitle: {
    color: AppColors.SoftBlack,
    fontSize: 17,
    fontWeight: "500",
    marginBottom: Spacing.xs,
    letterSpacing: -0.3,
  },
  notePreview: {
    color: AppColors.SoftBlack,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: Spacing.md,
    opacity: 0.7,
  },
  noteFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noteDate: {
    color: AppColors.PlaceHolder,
    fontSize: 13,
  },
  editedTag: {
    backgroundColor: AppColors.AccentSoft,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: 12,
  },
  editedText: {
    color: AppColors.AccentDark,
    fontSize: 11,
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    bottom: Spacing.xl,
    right: Spacing.lg,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.Accent,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: AppColors.AccentDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  fabPressed: {
    transform: [{ scale: 0.94 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: AppColors.Black60,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.lg,
  },
  modalContent: {
    backgroundColor: AppColors.White,
    borderRadius: 20,
    padding: Spacing.xl,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
  },
  modalIcon: {
    marginBottom: Spacing.sm,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: Spacing.xs,
    color: AppColors.SoftBlack,
  },
  modalText: {
    fontSize: 15,
    textAlign: "center",
    color: AppColors.SoftBlack,
    marginBottom: Spacing.lg,
    lineHeight: 22,
    opacity: 0.8,
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: Spacing.sm,
  },
  modalButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: AppColors.AccentSoft,
    marginRight: Spacing.xs,
  },
  cancelButtonText: {
    color: AppColors.AccentDark,
    fontSize: 16,
    fontWeight: "500",
  },
  deleteButton: {
    backgroundColor: AppColors.Error,
  },
  deleteButtonText: {
    color: AppColors.White,
    fontSize: 16,
    fontWeight: "600",
  },
});
