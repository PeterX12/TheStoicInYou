import { StyleSheet } from "react-native";
import { AppColors } from "./colors";

export const AppStyles = StyleSheet.create({
  // Containers
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.AppBackground,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.AppBackground,
    paddingHorizontal: 76,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: AppColors.AppBackground,
    width: "100%",
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },

  //Inputs
  inputText: {
    color: AppColors.White,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: AppColors.White,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
  },
  inputErrorText: {
    color: AppColors.Error,
    fontSize: 14,
    marginTop: 8,
  },
});
