import AppBar from "@components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppColors } from "constants/colors";
import { STORAGE_KEYS } from "constants/strings";
import { AppStyles } from "constants/styles";
import { Spacing } from "constants/spacing";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Modal,
  TouchableOpacity,
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
  const { entryId, emotionId } = route.params;

  const [isNewEntry, setIsNewEntry] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entryTitle, setEntryTitle] = useState("");

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
          setEntryTitle(entryToEdit.title);
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

    if (emotionId) {
      navigation.replace("EmotionInsight", {
        emotion: emotionId,
        journalSaved: true,
      });
    } else {
      navigation.goBack();
    }
  }, [saveEntry, navigation, title, content, emotionId]);

  const handleDeletePress = () => {
    if (!entryId) {
      navigation.goBack();
      return;
    }
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.JOURNAL_ENTRIES);
      if (stored) {
        const entries: JournalEntry[] = JSON.parse(stored);
        const filteredEntries = entries.filter((entry) => entry.id !== entryId);

        await AsyncStorage.setItem(
          STORAGE_KEYS.JOURNAL_ENTRIES,
          JSON.stringify(filteredEntries),
        );
      }
      setShowDeleteModal(false);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to delete the reflection.");
      setShowDeleteModal(false);
    }
  };

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar
        title={isNewEntry ? "New Reflection" : "Edit Reflection"}
        showBackButton={true}
        rightIconName="trash-outline"
        onRightIconPress={handleDeletePress}
        onBackPress={handleBackPress}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Title (Optional)"
          placeholderTextColor={AppColors.PlaceHolder}
          autoFocus={isNewEntry}
          selectionColor={AppColors.Accent}
        />

        <View style={styles.divider} />

        <TextInput
          style={styles.contentInput}
          value={content}
          onChangeText={setContent}
          placeholder="Write your reflection here..."
          placeholderTextColor={AppColors.PlaceHolder + "80"}
          multiline
          textAlignVertical="top"
          selectionColor={AppColors.Accent}
        />

        {content.length > 0 && (
          <View style={styles.footer}>
            <Text style={styles.counterText}>{content.length} / 5000</Text>
          </View>
        )}
      </ScrollView>

      <Modal visible={showDeleteModal} transparent animationType="fade">
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
              Delete "{entryTitle || "Untitled Reflection"}"? This action cannot
              be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowDeleteModal(false)}
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
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  titleInput: {
    color: AppColors.SoftBlack,
    fontSize: 28,
    fontWeight: "500",
    letterSpacing: -0.5,
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.Black10,
    marginBottom: Spacing.lg,
  },
  contentInput: {
    color: AppColors.SoftBlack,
    fontSize: 17,
    lineHeight: 28,
    minHeight: 300,
    paddingVertical: Spacing.xs,
    textAlignVertical: "top",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: Spacing.lg,
  },
  counterText: {
    color: AppColors.PlaceHolder,
    fontSize: 13,
    opacity: 0.7,
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
