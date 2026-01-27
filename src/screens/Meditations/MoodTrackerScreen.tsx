import AppBar from "@components/AppBar";
import { AppStyles } from "constants/styles";
import { View, Text } from "react-native";

export default function MoodTrackerScreen() {
  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"How are you Feeling?"} showBackButton={true} />
    </View>
  );
}
