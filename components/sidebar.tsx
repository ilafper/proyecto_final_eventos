import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/botonBoton";
import useDatosUsuario from "../hooks/usuarioDatos";

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter();

  
  const usuario = useDatosUsuario();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("usuario");
    router.replace("/login");
    if (onClose) onClose();
  };

  return (
    <View style={styles.sidebar}>
      {/* Botón cerrar */}
      <Pressable style={styles.toggleButton} onPress={onClose}>
        <MaterialIcons name="menu" size={28} color="#fff" />
      </Pressable>

      {/* Info usuario */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{usuario?.nombre || "Usuario"}</Text>
        <Text style={styles.userEmail}>{usuario?.correo || ""}</Text>
      </View>

      
      <View style={styles.menuButtons}>
        {usuario?.rol === "user" && (
          <>
            <CustomButton
              title="Home"
              onPress={() => router.push("/home")}
              icon={<MaterialIcons name="home" size={24} color="#2e2bff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
            <CustomButton
              title="Eventos"
              onPress={() => router.push("/eventos")}
              icon={<MaterialIcons name="event" size={24} color="#2e2bff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
            <CustomButton
              title="Reservas"
              onPress={() => router.push("/reservas")}
              icon={<MaterialIcons name="book-online" size={24} color="#2e2bff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
          </>
        )}
        {/* sidebard del admin */}
        {usuario?.rol === "admin" && (
          <>
            <CustomButton
              title="Panel Admin"
              onPress={() => router.push("/admin")}
              icon={<MaterialIcons name="dashboard" size={24} color="#2e2bff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
            <CustomButton
              title="Gestion Eventos"
              onPress={() => router.push("/gestionEventos")}
              icon={<MaterialIcons name="edit-calendar" size={24} color="#2e2bff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
            <CustomButton
              title="Gestion Reservas"
              onPress={() => router.push("/gestionReservas")}
              icon={<MaterialIcons name="list-alt" size={24} color="#2e2bff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
          </>
        )}
      </View>

      {/* Logout */}
      <View style={styles.logoutContainer}>
        <CustomButton
          title="Salir"
          onPress={handleLogout}
          icon={<MaterialIcons name="logout" size={24} color="#ffffff" />}
          style={styles.salirBoton}
          textStyle={styles.salirText}
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
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  userInfo: { marginBottom: 30 },
  userName: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  userEmail: { fontSize: 14, color: "#fff", marginTop: 2 },
  menuButtons: { flex: 1 , gap:10},
  sidebarButton: {
    display:"flex",
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-evenly",
    paddingLeft: 1,
  },
  salirText: {color:"white"},
  sidebarButtonText: { fontSize: 14, color: "#0a4bff", marginLeft: 2 },
  logoutContainer: { marginTop: "auto", width: "100%", alignItems: "center", paddingBottom: 20, color:"white" },
  salirBoton: {backgroundColor:"#fa2a0f", width:150, marginBottom:30}
});
