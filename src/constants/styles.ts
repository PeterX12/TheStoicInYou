import { StyleSheet } from "react-native";
import { AppColors } from "./colors";
import { Spacing } from "./spacing";

export const AppStyles = StyleSheet.create({
  // Containers
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContainer: {
    flex: 1,
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
    backgroundColor: AppColors.AppBackground,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },

  // Inputs
  inputText: {
    color: AppColors.SoftBlack,
    fontSize: 16,
    marginBottom: Spacing.xs,
  },
  input: {
    backgroundColor: AppColors.White,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    color: AppColors.SoftBlack,
  },
  inputContainer: {
    width: "100%",
  },
  inputErrorText: {
    color: AppColors.Error,
    fontSize: 14,
    marginTop: Spacing.xs,
  },
});
