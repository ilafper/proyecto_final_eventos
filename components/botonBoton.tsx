import { JSX } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  title?: string;
  icon?: JSX.Element;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  title,
  icon,
  onPress,
  style,
  textStyle,
}: Props) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      {/* Icono */}
      {icon && <View>{icon}</View>}

      {/* Texto opcional */}
      {title ? <Text style={[styles.text, textStyle]}>{title}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#1055a0",
  },

  text: {
    marginLeft: 8,
    color: "#fff",
    fontWeight: "bold",
  },
});
