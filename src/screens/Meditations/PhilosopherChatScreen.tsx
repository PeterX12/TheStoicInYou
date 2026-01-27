import AppBar from "@components/AppBar";
import { AppStyles } from "constants/styles";
import { View, Text } from "react-native";

export default function PhilosopherChatScreen() {
  return (
    <View style={AppStyles.scrollViewContainer}>
      <AppBar title={"Talk to a Philosopher"} showBackButton={true} />
    </View>
  );
}
