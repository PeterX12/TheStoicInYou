import AppBar from "@components/AppBar";
import Button from "@components/Button";
import HourglassIcon from "@components/icons/HourglassIcon";
import InfoModal from "@components/InfoModal";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { Strings } from "constants/strings";
import { AppStyles } from "constants/styles";
import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation();
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
        contentContainerStyle={[AppStyles.fullScreen, { padding: 0 }]}
      >
        <HourglassIcon size={250} />

        <Text style={styles.mori}>Memento Mori. You must die.</Text>
        <Text style={styles.vivere}>Memento Vivere. You must live.</Text>
        <Text style={styles.intro}>
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

        <Text style={styles.countdown}>
          Your time: 72 years, 11 months, 54 days
        </Text>
        <Text style={styles.quote}>Today matters</Text>

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
  vivere: {
    fontSize: 20,
    fontWeight: "600",
    color: AppColors.White,
    marginBottom: 16,
    textAlign: "center",
  },
  intro: {
    fontSize: 16,
    color: AppColors.White,
    textAlign: "center",
    marginBottom: 16,
    fontStyle: "italic",
  },
  countdown: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: AppColors.White,
    marginVertical: 12,
  },
  quote: {
    fontSize: 16,
    color: AppColors.White,
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
  },
});
