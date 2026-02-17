import { JSX } from "react";
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";


// compoente boton para login y registro

// las prpiedades del  boton como  tal, el titulo la funcion y estilos, que no son obligatorios, el comopente tiene unos de base
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
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",         
    paddingVertical: 14,  
    borderRadius: 8,       
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1055a0", 
    marginVertical: 8,
  },
  pressed: {
    opacity: 0.7,          
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
