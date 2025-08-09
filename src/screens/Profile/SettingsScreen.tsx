import AppBar from "@components/AppBar";
import DatePicker from "@components/DatePicker";
import { AppColors } from "constants/colors";
import { AppStyles } from "constants/styles";
import { useUserProfile } from "hooks/useUserProfile";
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TextInput } from "react-native";

export default function SettingsScreen() {
  const { userProfile } = useUserProfile();
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    birthDate: "",
    gender: "",
  });

  useEffect(() => {
    if (userProfile?.dateOfBirth) {
      setBirthDate(new Date(userProfile.dateOfBirth));
    }
  }, [userProfile?.dateOfBirth]);

  useEffect(() => {
    if (userProfile?.name) {
      setName(userProfile.name);
    }
  }, [userProfile?.name]);

  return (
    <View style={{ flex: 1 }}>
      <AppBar title={"Settings"} showBackButton={true} />
      <ScrollView contentContainerStyle={AppStyles.buttonContainer}>
        <View style={[AppStyles.inputContainer, { marginBottom: 24 }]}>
          <Text style={AppStyles.inputText}>Your Name</Text>
          <TextInput
            placeholder="Enter your full name"
            value={name}
            style={AppStyles.input}
            placeholderTextColor={AppColors.PlaceHolder}
            autoCapitalize="words"
            onChangeText={(text) => {
              setName(text);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
          />
          {errors.name && (
            <Text style={AppStyles.inputErrorText}>{errors.name}</Text>
          )}
        </View>

        <View style={[AppStyles.inputContainer, { marginBottom: 24 }]}>
          <DatePicker
            label="Date of Birth"
            value={birthDate}
            onChange={(date) => {
              setBirthDate(date);
              setErrors((prev) => ({ ...prev, birthDate: "" }));
            }}
            maxDate={new Date()}
          />
          {errors.birthDate && (
            <Text style={AppStyles.inputErrorText}>{errors.birthDate}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
