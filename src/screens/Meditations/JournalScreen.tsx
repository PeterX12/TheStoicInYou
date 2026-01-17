import AppBar from "@components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from "react-native";

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  date: Date;
};

export default function JournalScreen() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([
    // Entry for testing
    {
      id: "1",
      title: "First Reflection",
      content:
        "Today I practiced accepting what I cannot change. The weather was bad, but my attitude was good.",
      date: new Date(2024, 10, 15),
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entryToDelete, setEntryToDelete] = useState<JournalEntry | null>(null);

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()) ||
      entry.content
        .toLocaleLowerCase()
        .includes(searchQuery.toLocaleLowerCase()),
  );

  const hasUnsavedChanges =
    title.trim().length > 0 || content.trim().length > 0;

  return (
    <KeyboardAvoidingView
      style={AppStyles.scrollViewContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <AppBar title={"Journal"} showBackButton={true} />

      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="rgba(255,255,255,0.5)"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search notes"
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color="rgba(255,255,255,0.5)"
            />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.container}></ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  searchInput: {
    flex: 1,
    color: AppColors.White,
    fontSize: 16,
    marginLeft: 12,
  },
  container: {
    paddingBottom: 40,
  },
});
