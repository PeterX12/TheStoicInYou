import AppBar from "@components/AppBar";
import Button from "@components/Button";
import ImageWithText from "@components/ImageWithText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStyles } from "constants/styles";
import { philosophers } from "data";
import { stoicBooks } from "data/products/books";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { RootStackParamList } from "types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ArchiveScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleFramePress = (id: string) => {
    navigation.navigate("Quotes", { philosopherId: id });
  };

  const handleItemPress = () => {
    navigation.navigate("AffiliateItems", {
      title: "Stoic Books",
      items: stoicBooks,
    });
  };

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
          <Button text="Books" onPress={handleItemPress} />
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
