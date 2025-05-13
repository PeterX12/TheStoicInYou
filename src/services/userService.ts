import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "types/user";

export const saveUserProfile = async (data: UserProfile) => {
  try {
    await AsyncStorage.setItem("@user_profile", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
};

export const getUserProfile = async () => {
  try {
    const userData = await AsyncStorage.getItem("@user_profile");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return null;
  }
};
