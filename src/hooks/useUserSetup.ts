import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserSetup = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserSetup, setIsUserSetup] = useState(false);

  useEffect(() => {
    const checkUserSetup = async () => {
      try {
        const userData = await AsyncStorage.getItem("@user_profile");
        setIsUserSetup(!!userData);
      } catch (error) {
        console.error("Error checking user setup:", error);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSetup();
  }, []);
  return { isLoading, isUserSetup };
};
