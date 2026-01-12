import AppBar from "@components/AppBar";
import { AppStyles } from "constants/styles";
import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function MeditationsScreen() {
  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"Meditations"} showBackButton={false} />
      <ScrollView
        contentContainerStyle={[AppStyles.fullScreen, { padding: 0 }]}
      >
        <Text>Meditations Screen</Text>
      </ScrollView>
    </View>
  );
}
