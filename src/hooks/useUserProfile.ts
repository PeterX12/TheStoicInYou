import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "types/user";
import { clearUserData, saveUserProfile } from "services/userService";

export const useUserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await AsyncStorage.getItem("@user_profile");
        if (userData) {
          const parsedData: UserProfile = JSON.parse(userData);
          setUserProfile(parsedData);
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const updateProfile = async (profile: UserProfile) => {
    setIsLoading(true);
    try {
      await saveUserProfile(profile);
    } catch (error) {
      console.error("Error saving user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await clearUserData();
    } catch (error) {
      console.error("Error clearing user data:", error);
    } finally {
      setIsLoading(true);
    }
  };

  return {
    isLoading,
    isUserSetup: !!userProfile,
    userProfile,
    updateProfile,
    logout,
  };
};
