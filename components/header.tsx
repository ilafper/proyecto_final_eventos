import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  title: string;
  onMenuPress: () => void; // función que controla la barra lateral
}

export default function Header({ title, onMenuPress }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onMenuPress} style={styles.menuButton}>
        <MaterialIcons name="menu" size={30} color="#fff" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display:"flex",
    padding:10,
    height: 90,
    paddingTop:20,
    paddingLeft:30,
    backgroundColor: "#1055a0",
    flexDirection: "row",
    alignItems:"flex-end",
    justifyContent:"flex-start"
  },
  menuButton:{
    marginRight:10
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
