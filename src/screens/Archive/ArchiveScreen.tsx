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

  const handleFramePress = (id: string) => {
    navigation.navigate("Quotes", { philosopherId: id });
  };

  const handleBooksPress = () => {};

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"Archive"} showBackButton={false} />
      <ScrollView
        contentContainerStyle={[
          AppStyles.contentContainer,
          { padding: 48, alignItems: "flex-start" },
        ]}
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
          <Button text="Books" onPress={handleBooksPress} />
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
    paddingHorizontal: 16,
    width: "100%",
  },
  item: {
    width: "48%",
    marginBottom: 24,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 32,
  },
});
