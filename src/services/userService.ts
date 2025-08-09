import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "types/user";

export const saveUserProfile = async (data: UserProfile): Promise<boolean> => {
  try {
    await AsyncStorage.setItem("@user_profile", JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const userData = await AsyncStorage.getItem("@user_profile");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    throw error;
  }
};

export const clearUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem("@user_profile");
  } catch (error) {
    console.error("Error clearing user data:", error);
    throw error;
  }
};
