import AppBar from "@components/AppBar";
import ImageWithText from "@components/ImageWithText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStyles } from "constants/styles";
import { meditationFeatures } from "data/meditations/features";
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { MeditationsStackParamList } from "types/navigation";

type NavigationProp = NativeStackNavigationProp<MeditationsStackParamList>;

export default function MeditationsScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"Meditations"} showBackButton={false} />
      <ScrollView
        contentContainerStyle={[AppStyles.fullScreen, { padding: 0 }]}
      >
        {meditationFeatures.map((feature) => (
          <ImageWithText
            key={feature.id}
            imageSource={feature.image}
            text={feature.title}
            onPress={() => {
              if (feature.screenName === "JournalEntry") {
                navigation.navigate("JournalEntry", { entryId: null });
              } else {
                navigation.navigate(feature.screenName as any);
              }
            }}
            containerStyle={styles.featureItem}
            imageStyle={styles.imageStyle}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  featureItem: {
    marginBottom: 32,
    width: "100%",
  },
  imageStyle: {
    width: "100%",
    paddingHorizontal: 50,
  },
});
