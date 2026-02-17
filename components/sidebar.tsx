import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import CustomButton from "./botonBoton";

interface SidebarProps {
  initialExpanded?: boolean;
}

export default function Sidebar({ initialExpanded = true }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const router = useRouter();

  return (
    <View style={[styles.sidebar, isExpanded ? styles.expanded : styles.collapsed]}>
      {/* Botón para expandir/colapsar */}
      <Pressable
        style={styles.toggleButton}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <MaterialIcons name="menu" size={28} color="#fff" />
      </Pressable>

      {/* Botones menú */}
      <CustomButton
        title={isExpanded ? "Home" : ""}
        onPress={() => router.push("/")}
        icon={<MaterialIcons name="home" size={24} color="#fff" />}
        style={styles.sidebarButton}
        textStyle={styles.sidebarButtonText}
      />
      <CustomButton
        title={isExpanded ? "Eventos" : ""}
        onPress={() => router.push("/eventos")}
        icon={<MaterialIcons name="event" size={24} color="#fff" />}
        style={styles.sidebarButton}
        textStyle={styles.sidebarButtonText}
      />
      <CustomButton
        title={isExpanded ? "Reservas" : ""}
        onPress={() => router.push("/reservas")}
        icon={<MaterialIcons name="book-online" size={24} color="#fff" />}
        style={styles.sidebarButton}
        textStyle={styles.sidebarButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: "#1055a0",
    paddingVertical: 20,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  expanded: {
    width: 140,
  },
  collapsed: {
    width: 60,
  },
  toggleButton: {
    marginBottom: 20,
  },
  sidebarButton: {
    width: "90%",
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#0c3d70",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarButtonText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 8,
  },
});
