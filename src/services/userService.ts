import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "constants/strings";
import { UserProfile } from "types/user";

export const saveUserProfile = async (data: UserProfile): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    throw error;
  }
};

export const clearUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  } catch (error) {
    console.error("Error clearing user data:", error);
    throw error;
  }
};
