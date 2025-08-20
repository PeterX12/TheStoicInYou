import AppBar from "@components/AppBar";
import Button from "@components/Button";
import HourglassIcon from "@components/icons/HourglassIcon";
import InfoModal from "@components/InfoModal";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

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
        <Pressable onPress={() => setIsModalVisible(!isModalVisible)}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={AppColors.White}
          />
        </Pressable>

        <Text>Memento Mori. Your time is limited</Text>
        <Text>Memento Vivere. Use it wisely</Text>
        <Text> Here’s a reminder of the time you have to live fully:</Text>
        <Text>Your time: 72 years, 11 months, 54 days</Text>
        <Text>Today matters</Text>

        <InfoModal
          isVisible={isModalVisible}
          content={
            "Your remaining time is based on average life expectancy. This number is only an estimate, life can be shorter or longer. Its purpose is not to predict your death, but to remind you to live with intention today."
          }
          onClose={() => setIsModalVisible(false)}
        />
      </ScrollView>
    </View>
  );
}
