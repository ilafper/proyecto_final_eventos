import { JSX } from "react";
import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

interface propBoton {
  title: string;
  icon?: JSX.Element;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({ title, onPress, style, textStyle, icon }: propBoton) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#1055a0",
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 10,           
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
