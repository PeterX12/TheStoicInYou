import { useEffect, useState } from "react";
import { UserProfile } from "types/user";
import {
  calculateLifeExpectancy,
  LifeExpectancyResult,
} from "utils/lifeExpectancy";

export const useLifeExpectancy = (userProfile: UserProfile | null) => {
  const [result, setResult] = useState<LifeExpectancyResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculate = async () => {
      if (!userProfile?.dateOfBirth) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const lifeExpectancy = await calculateLifeExpectancy(
          userProfile.dateOfBirth,
          userProfile.gender
        );
        setResult(lifeExpectancy);
      } catch (err) {
        setError("Could not calculate life expectancy");
        console.error("Life expectancy calculation error:", err);
      } finally {
        setLoading(false);
      }
    };

    calculate();
  }, [userProfile?.dateOfBirth, userProfile?.gender]);
  return { result, loading, error };
};
