import AppBar from "@components/AppBar";
import { AppStyles } from "constants/styles";
import React from "react";
import { ScrollView, View, Text, TextInput } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AppBar title={"Settings"} showBackButton={true} />
      <ScrollView
        contentContainerStyle={[AppStyles.fullScreen, { padding: 0 }]}
      >
        <View>
          <Text>Your Name</Text>
          <TextInput placeholder="hi" />
        </View>
      </ScrollView>
    </View>
  );
}
