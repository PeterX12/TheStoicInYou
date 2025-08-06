import AppBar from "@components/AppBar";
import { AppStyles } from "constants/styles";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function ArchiveScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AppBar title={"Archive"} showBackButton={false} />
      <ScrollView
        contentContainerStyle={[AppStyles.fullScreen, { padding: 0 }]}
      >
        <Text>Archive Screen</Text>
      </ScrollView>
    </View>
  );
}
