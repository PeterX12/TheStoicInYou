import { Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import App from "../../App";
import { AppColors } from "constants/colors";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

const Button = ({ text, onPress }: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.White,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 24,
    height: 48,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  text: {
    color: AppColors.Black,
    fontSize: 16,
  },
});

export default Button;
