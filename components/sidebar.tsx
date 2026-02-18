import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/botonBoton";

interface SidebarProps {
  onClose?: () => void; // para ocultar el sidebar
}

export default function Sidebar({ onClose }: SidebarProps) {
  const [usuario, setUsuario] = useState<{ nombre: string; correo: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cargarUsuario = async () => {
      const dato_usuario = await AsyncStorage.getItem("usuario");
      if (dato_usuario) setUsuario(JSON.parse(dato_usuario));
    };
    cargarUsuario();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("usuario");
    router.replace("/login");
    if (onClose) onClose(); // cerrar sidebar
  };

  return (
    <View style={styles.sidebar}>
      {/* Botón para cerrar sidebar */}
      <Pressable style={styles.toggleButton} onPress={onClose}>
        <MaterialIcons name="menu" size={28} color="#fff" />
      </Pressable>

      {/* Datos del usuario */}
      <View style={styles.userInfo}>

        <Text style={styles.userName}>{usuario?.nombre || "Usuario"}</Text>
        <Text style={styles.userEmail}>{usuario?.correo || ""}</Text>
      </View>

      {/* Botones principales */}
      <View style={styles.menuButtons}>
        <CustomButton
          title="Patata "
          onPress={() => router.push("/home")}
          icon={<MaterialIcons name="home" size={24} color="#2e2bff" />}
          style={styles.sidebarButton}
          textStyle={styles.sidebarButtonText}
        />

        <CustomButton
          title="Eventos"
          onPress={() => router.push("/eventos")}
          icon={<MaterialIcons name="event" size={24}  color="#2e2bff" />}
          style={styles.sidebarButton}
          textStyle={styles.sidebarButtonText}
        />

        <CustomButton
          title="Reservas"
          onPress={() => router.push("/reservas")}
          icon={<MaterialIcons name="book-online" size={24}  color="#2e2bff" />}
          style={styles.sidebarButton}
          textStyle={styles.sidebarButtonText}
        />
      </View>

      {/* Logout abajo */}
      <View style={styles.logoutContainer}>
        <CustomButton
          title="Salir"
          onPress={handleLogout}
          icon={<MaterialIcons name="logout" size={24} color="#3f3feb" />}
          textStyle={styles.sidebarButtonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 200,
    backgroundColor: "#3433CD",
    paddingVertical: 20,
    paddingHorizontal: 10,
    zIndex: 10,
    elevation: 10,
  },

  toggleButton: {
    marginTop:10,
    marginBottom: 20,
    alignSelf: "flex-start",
  },

  userInfo: {
    marginBottom: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  userEmail: {
    fontSize: 14,
    color: "#fff",
    marginTop: 2,
  },

  menuButtons: {
    flex: 1,
  },

  sidebarButton: {
    width: "100%",
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 12,
  },

  sidebarButtonText: {
    fontSize: 14,
    color: "#2245e2",
    marginLeft: 10,
  },

  logoutContainer: {
    marginTop: "auto",
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },

  logoutButton: {
    backgroundColor: "#b00020",
  },
});
