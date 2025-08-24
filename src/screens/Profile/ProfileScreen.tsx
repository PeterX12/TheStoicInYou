import AppBar from "@components/AppBar";
import HourglassIcon from "@components/icons/HourglassIcon";
import InfoModal from "@components/InfoModal";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { Strings } from "constants/strings";
import { AppStyles } from "constants/styles";
import { useLifeExpectancy } from "hooks/useLifeExpectancy";
import { useUserProfile } from "hooks/useUserProfile";
import React, { useState } from "react";
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
  const { userProfile } = useUserProfile();
  const {
    result: lifeExpectancy,
    loading,
    error,
  } = useLifeExpectancy(userProfile);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        <HourglassIcon size={220} />
        <View style={styles.section}>
          <Text style={styles.latinText}>Memento Mori.</Text>
          <Text style={styles.translationText}>Remember you must die.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.latinText}>Memento Vivere.</Text>
          <Text style={styles.translationText}>Remember to live.</Text>
        </View>
        <View style={styles.section}>
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
        ;
        <View style={styles.section}>
          <Text style={styles.finalQuote}>Today matters.</Text>
        </View>
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
    marginVertical: 8,
  },
  finalQuote: {
    fontSize: 16,
    color: AppColors.White,
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.9,
    marginTop: 16,
  },
  infoButton: {
    padding: 4,
    alignSelf: "center",
  },
  errorText: {
    color: AppColors.Error,
    textAlign: "center",
    marginVertical: 16,
  },
});
