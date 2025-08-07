import AppBar from "@components/AppBar";
import { AppStyles } from "constants/styles";
import { ScrollView, View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <AppBar title={"Settings"} showBackButton={true} />
      <ScrollView
        contentContainerStyle={[AppStyles.fullScreen, { padding: 0 }]}
      >
        <Text>Settings Screen</Text>
      </ScrollView>
    </View>
  );
}
