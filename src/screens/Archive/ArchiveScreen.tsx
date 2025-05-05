import { AppColors } from "constants/colors";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ArchiveScreen() {
  return (
    <View style={styles.container}>
      <Text>Archive Screen</Text>
    </View>
  );
}
// Make these styles global in a reusable file.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.AppBackground,
  },
});
