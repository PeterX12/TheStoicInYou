import * as Location from "expo-location";
import { LifeExpectancyData } from "../constants/lifeExpectancyData";

export interface TimeRemaining {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  lifeExpectancy: number;
}

export interface LifeExpectancyResult {
  timeRemaining: TimeRemaining;
  countryCode?: string;
  isGlobalFallback: boolean;
}

export const calculateLifeExpectancy = async (
  dateOfBirth: string,
  gender: "male" | "female" | "other"
): Promise<LifeExpectancyResult> => {
  try {
    let countryCode: string = "GLOBAL";

    //Try get users location for more accurate calculation
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status == "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const reverseGeocode = await Location.reverseGeocodeAsync(
          location.coords
        );
        const userCountryCode = reverseGeocode[0]?.isoCountryCode;

        if (userCountryCode && userCountryCode in LifeExpectancyData) {
          countryCode = userCountryCode;
        }
      }
    } catch (error) {
      console.error("Location not available, using global average", error);
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    const countryLifeExpectancyData = LifeExpectancyData[countryCode];

    const lifeExpectancy = gender
      ? countryLifeExpectancyData[gender]
      : countryLifeExpectancyData.other;

    const totalDaysInLife = lifeExpectancy * 365;
    const daysLived = Math.floor(
      (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysRemaining = Math.max(0, totalDaysInLife - daysLived);

    const years = Math.floor(daysRemaining / 365);
    const months = Math.floor((daysRemaining % 365) / 30);
    const days = daysRemaining % 30;

    return {
      timeRemaining: {
        years,
        months,
        days,
        totalDays: daysRemaining,
        lifeExpectancy,
      },
      countryCode: countryCode !== "GLOBAL" ? countryCode : undefined,
      isGlobalFallback: countryCode === "GLOBAL",
    };
  } catch (error) {
    console.error("Error calculating life expectancy", error);
    throw new Error("Could not calculate life expectancy");
  }
};

export const formatTimeRemaining = (time: TimeRemaining): string => {
  if (time.totalDays <= 0) {
    return "Today is your day to live fully";
  }

  const parts = [];
  if (time.years > 0)
    parts.push(`${time.years} year${time.years !== 1 ? "s" : ""}`);
  if (time.months > 0)
    parts.push(`${time.months} month${time.months !== 1 ? "s" : ""}`);
  if (time.days > 0)
    parts.push(`${time.days} day${time.days !== 1 ? "s" : ""}`);

  return parts.join(", ") || "Less than a day";
};
