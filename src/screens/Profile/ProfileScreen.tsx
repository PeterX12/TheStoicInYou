import AppBar from "@components/AppBar";
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
        <Text>Profile Screen</Text>
      </ScrollView>
    </View>
  );
}
