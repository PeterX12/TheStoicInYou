import AppBar from "@components/AppBar";
import Button from "@components/Button";
import HourglassIcon from "@components/icons/HourglassIcon";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function ProfileScreen() {
  const navigation = useNavigation();
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
        <Text>Memento Mori. Your time is limited</Text>
        <Text>Memento Vivere. Use it wisely</Text>
        <Text> Here’s a reminder of the time you have to live fully:</Text>
        <Text>Your time: 72 years, 11 months, 54 days</Text>
        <Text>Today matters</Text>
      </ScrollView>
    </View>
  );
}
