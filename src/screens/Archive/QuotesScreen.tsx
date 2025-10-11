import AppBar from "@components/AppBar";
import Button from "@components/Button";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppStyles } from "constants/styles";
import { getPhilosopherById } from "data/philosophers";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

type QuotesRouteProp = RouteProp<{
  Quotes: {
    philosopherId: string;
  };
}>;

export default function QuotesScreen() {
  const route = useRoute<QuotesRouteProp>();
  const philosopherId = route.params.philosopherId;

  const philosopher = getPhilosopherById(philosopherId);

  return (
    <View style={{ flex: 1 }}>
      <AppBar title={"Quotes"} showBackButton={true} />
      <View style={AppStyles.contentContainer}>
        <Image source={philosopher?.quotesImage} />
        <Text>Some stuff about Marcus Aurelius</Text>
        <Text>Quote</Text>
        <Button text="New Quote" onPress={() => {}} />
      </View>
    </View>
  );
}
