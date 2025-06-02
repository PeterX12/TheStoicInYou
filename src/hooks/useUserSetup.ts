import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "types/user";

export const useUserSetup = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserSetup, setIsUserSetup] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const checkUserSetup = async () => {
      try {
        const userData = await AsyncStorage.getItem("@user_profile");
        if (userData) {
          const parsedData: UserProfile = JSON.parse(userData);
          setUserProfile(parsedData);
          setIsUserSetup(!!parsedData);
        }
      } catch (error) {
        console.error("Error checking user setup:", error);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSetup();
  }, []);
  return { isLoading, isUserSetup, userProfile };
};
