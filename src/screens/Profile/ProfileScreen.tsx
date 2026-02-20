import AppBar from "@components/AppBar";
import HourglassIcon from "@components/icons/HourglassIcon";
import InfoModal from "@components/InfoModal";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { getRandomProfileQuote } from "constants/profileQuotes";
import { Strings } from "constants/strings";
import { AppStyles } from "constants/styles";
import { Spacing } from "constants/spacing";
import { useLifeExpectancy } from "hooks/useLifeExpectancy";
import { useUserProfile } from "hooks/useUserProfile";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { formatTimeRemaining } from "utils/lifeExpectancy";
import { ProfileStackParamList } from "types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "ProfileHome"
>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { userProfile, refreshProfile } = useUserProfile();
  const {
    result: lifeExpectancy,
    loading,
    error,
  } = useLifeExpectancy(userProfile);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [randomProfileQuote, setRandomProfileQuote] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      setRandomProfileQuote(getRandomProfileQuote());
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      refreshProfile();
    }, [refreshProfile]),
  );

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar
        title={"Profile"}
        showBackButton={false}
        rightIconName="settings-outline"
        onRightIconPress={() => navigation.navigate("Settings")}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Hourglass Icon */}
        <View style={styles.iconSection}>
          <HourglassIcon size={180} />
        </View>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>
            A reminder of the time you have to live fully
          </Text>
          <Pressable
            onPress={() => setIsModalVisible(true)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={AppColors.SoftBlack}
              opacity={0.5}
            />
          </Pressable>
        </View>

        {/* Countdown Card */}
        <View style={styles.countdownCard}>
          {loading ? (
            <ActivityIndicator color={AppColors.Accent} size="large" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : lifeExpectancy ? (
            <View style={styles.countdownContent}>
              <Text style={styles.countdownLabel}>TIME REMAINING</Text>
              <Text style={styles.countdownText}>
                {formatTimeRemaining(lifeExpectancy.timeRemaining)}
              </Text>
            </View>
          ) : (
            <Text style={styles.placeholderText}>
              Complete your profile to see your time
            </Text>
          )}
        </View>

        {/* Latin Mottos Section */}
        <View style={styles.mottoSection}>
          <View style={styles.mottoItem}>
            <Text style={styles.latinText}>Memento Mori</Text>
            <Text style={styles.translationText}>Remember you must die</Text>
          </View>

          <View style={styles.mottoDivider} />

          <View style={styles.mottoItem}>
            <Text style={styles.latinText}>Memento Vivere</Text>
            <Text style={styles.translationText}>Remember to live</Text>
          </View>
        </View>

        {/* Quote Section */}
        {randomProfileQuote && (
          <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>"{randomProfileQuote}"</Text>
          </View>
        )}

        <InfoModal
          isVisible={isModalVisible}
          content={Strings.MODAL.timerInfoText}
          onClose={() => setIsModalVisible(false)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    alignItems: "center",
  },
  iconSection: {
    marginBottom: Spacing.md,
    backgroundColor: AppColors.AccentSoft,
    borderRadius: 120,
    padding: Spacing.lg,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  infoText: {
    fontSize: 14,
    color: AppColors.SoftBlack,
    opacity: 0.7,
    textAlign: "center",
    marginRight: Spacing.xs,
  },
  countdownCard: {
    width: "100%",
    backgroundColor: AppColors.White,
    borderRadius: 28,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  countdownContent: {
    alignItems: "center",
  },
  countdownLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: AppColors.Accent,
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
  },
  countdownText: {
    fontSize: 32,
    fontWeight: "500",
    textAlign: "center",
    color: AppColors.SoftBlack,
    letterSpacing: -0.5,
  },
  placeholderText: {
    fontSize: 16,
    color: AppColors.SoftBlack,
    textAlign: "center",
    opacity: 0.6,
    lineHeight: 24,
  },
  mottoSection: {
    width: "100%",
    backgroundColor: AppColors.White,
    borderRadius: 28,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  mottoItem: {
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },
  mottoDivider: {
    height: 1,
    backgroundColor: AppColors.Black10,
    marginVertical: Spacing.md,
  },
  latinText: {
    fontSize: 20,
    fontWeight: "500",
    color: AppColors.SoftBlack,
    textAlign: "center",
    letterSpacing: 0.3,
    marginBottom: Spacing.xs,
  },
  translationText: {
    fontSize: 15,
    color: AppColors.SoftBlack,
    textAlign: "center",
    opacity: 0.6,
    fontStyle: "italic",
  },
  quoteCard: {
    width: "100%",
    backgroundColor: AppColors.White,
    borderRadius: 28,
    padding: Spacing.lg,
    shadowColor: AppColors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  quoteText: {
    fontSize: 16,
    color: AppColors.SoftBlack,
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.8,
    lineHeight: 24,
  },
  errorText: {
    color: AppColors.Error,
    textAlign: "center",
    fontSize: 15,
  },
});
