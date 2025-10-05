import AppBar from "@components/AppBar";
import Button from "@components/Button";
import ImageWithText from "@components/ImageWithText";
import { useNavigation } from "@react-navigation/native";
import { AppStyles } from "constants/styles";
import { philosophers } from "data";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

export default function ArchiveScreen() {
  const navigation = useNavigation();

  const handleFramePress = (id: string) => {};

  return (
    <View style={{ flex: 1 }}>
      <AppBar title={"Archive"} showBackButton={false} />
      <ScrollView
        contentContainerStyle={[AppStyles.fullScreen, { padding: 0 }]}
      >
        <View style={styles.gridContainer}>
          {philosophers.map((philosopher) => (
            <ImageWithText
              key={philosopher.id}
              imageSource={philosopher.image}
              text={philosopher.name}
              onPress={() => handleFramePress(philosopher.id)}
              containerStyle={styles.item}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Books"
            onPress={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: "48%",
    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 76,
    paddingTop: 24,
  },
});
