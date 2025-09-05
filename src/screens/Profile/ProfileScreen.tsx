import AppBar from "@components/AppBar";
import HourglassIcon from "@components/icons/HourglassIcon";
import InfoModal from "@components/InfoModal";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { getRandomProfileQuote } from "constants/profileQuotes";
import { Strings } from "constants/strings";
import { AppStyles } from "constants/styles";
import { useLifeExpectancy } from "hooks/useLifeExpectancy";
import { useUserProfile } from "hooks/useUserProfile";
import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { formatTimeRemaining } from "utils/lifeExpectancy";

export default function ProfileScreen() {
  const navigation = useNavigation();
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
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      refreshProfile();
    }, [refreshProfile])
  );

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title={"Profile"}
        showBackButton={false}
        rightIcon={
          <Ionicons name="settings-outline" size={24} color={AppColors.White} />
        }
        onRightIconPress={() => navigation.navigate("Settings")}
      />
      <ScrollView
        contentContainerStyle={[
          AppStyles.fullScreen,
          { padding: 0, paddingHorizontal: 16 },
        ]}
      >
        <HourglassIcon size={240} />

        <View style={[styles.section, { marginTop: 16 }]}>
          <Text style={styles.latinText}>Memento Mori.</Text>
          <Text style={styles.translationText}>Remember you must die.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.latinText}>Memento Vivere.</Text>
          <Text style={styles.translationText}>Remember to live.</Text>
        </View>

        <View style={styles.infoIconSection}>
          <Text style={styles.introText}>
            {" "}
            Here’s a reminder of the time you have to live fully:
          </Text>

          <Pressable onPress={() => setIsModalVisible(!isModalVisible)}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={AppColors.White}
            />
          </Pressable>
        </View>
        {loading ? (
          <ActivityIndicator color={AppColors.White} size="large" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : lifeExpectancy ? (
          <View style={styles.section}>
            <Text style={styles.countdownText}>
              {formatTimeRemaining(lifeExpectancy.timeRemaining)}
            </Text>
          </View>
        ) : (
          <Text style={styles.introText}>
            Complete your profile to see your time
          </Text>
        )}

        {randomProfileQuote && (
          <View style={styles.section}>
            <Text style={styles.finalQuote}>{randomProfileQuote}</Text>
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
  mori: {
    fontSize: 20,
    fontWeight: "600",
    color: AppColors.White,
    marginTop: 16,
    textAlign: "center",
  },
  section: {
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  infoIconSection: {
    alignItems: "center",
    width: "100%",
  },
  latinText: {
    fontSize: 22,
    fontWeight: "600",
    color: AppColors.White,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  translationText: {
    fontSize: 16,
    color: AppColors.White,
    textAlign: "center",
    opacity: 0.9,
    marginTop: 4,
    fontStyle: "italic",
  },
  introText: {
    fontSize: 16,
    color: AppColors.White,
    textAlign: "center",
    marginBottom: 16,
    fontStyle: "italic",
  },
  countdownText: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: AppColors.White,
  },
  finalQuote: {
    fontSize: 16,
    color: AppColors.White,
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.9,
  },
  infoButton: {
    padding: 4,
  },
  errorText: {
    color: AppColors.Error,
    textAlign: "center",
    marginVertical: 16,
  },
});
