import { JSX } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle
} from "react-native";

interface Props {
  title?: string;
  icon?: JSX.Element;
  disabled?:boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  title,
  icon,
  onPress,
  style,
  textStyle,
  disabled=false
  
}: Props) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress} disabled={disabled}>
      {/* Icono */}
      {icon}
      
      {/* para que en caso de que solo haya icono no se descuadre */}
      {title && <Text style={[styles.text, textStyle]}>{title}</Text>}
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