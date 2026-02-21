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

  // Obtener iniciales para el avatar
  const getIniciales = () => {
    if (!usuario?.nombre) return "U";
    const nombres = usuario.nombre.split(" ");
    if (nombres.length >= 2) {
      return (nombres[0][0] + nombres[1][0]).toUpperCase();
    }
    return usuario.nombre.substring(0, 2).toUpperCase();
  };

  return (
    <View style={styles.sidebar}>
      {/* Header con botón cerrar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menú</Text>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={24} color="#fff" />
        </Pressable>
      </View>

      {/* Avatar e info usuario */}
      <View style={styles.userInfoSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getIniciales()}</Text>
        </View>
        <View style={styles.userTextContainer}>
          <Text style={styles.userName}>{usuario?.nombre || "Usuario"}</Text>
          <Text style={styles.userEmail}>{usuario?.correo || "email@ejemplo.com"}</Text>
          
        </View>
      </View>

      {/* Línea divisoria */}
      <View style={styles.divider} />

      {/* Menú de navegación */}
      <View style={styles.menuButtons}>
        {usuario?.rol === "user" && (
          <>
            <CustomButton
              title="Home"
              onPress={() => {
                router.push("/home");
                if (onClose) onClose();
              }}
              icon={<MaterialIcons name="home" size={22} color="#fff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
            <CustomButton
              title="Eventos"
              onPress={() => {
                router.push("/eventos");
                if (onClose) onClose();
              }}
              icon={<MaterialIcons name="event" size={22} color="#fff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
            <CustomButton
              title="Mis Reservas"
              onPress={() => {
                router.push("/reservas");
                if (onClose) onClose();
              }}
              icon={<MaterialIcons name="book-online" size={22} color="#fff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
          </>
        )}

        {usuario?.rol === "admin" && (
          <>
            <CustomButton
              title="Panel Admin"
              onPress={() => {
                router.push("/admin");
                if (onClose) onClose();
              }}
              icon={<MaterialIcons name="dashboard" size={22} color="#fff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
            <CustomButton
              title="Gestionar Eventos"
              onPress={() => {
                router.push("/gestionEventos");
                if (onClose) onClose();
              }}
              icon={<MaterialIcons name="edit-calendar" size={22} color="#fff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
            <CustomButton
              title="Crear"
              onPress={() => {
                router.push("/nuevoEventoFormu");
                if (onClose) onClose();
              }}
              icon={<MaterialIcons name="bar-chart" size={22} color="#fff" />}
              style={styles.sidebarButton}
              textStyle={styles.sidebarButtonText}
            />
          </>
        )}
      </View>

      {/* Botón de cerrar sesión */}
      <View style={styles.logoutContainer}>
        <CustomButton
          title="Cerrar sesión"
          onPress={handleLogout}
          icon={<MaterialIcons name="logout" size={20} color="#fff" />}
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
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
    width: 280,
    backgroundColor: "#3433CD", 
    paddingVertical: 20,
    paddingHorizontal: 16,
    zIndex: 1000,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff", 
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#3433CD",
    fontSize: 22,
    fontWeight: "bold",
  },
  userTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", 
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)", 
    marginBottom: 4,
  },
  //barra divide
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.2)", 
    marginBottom: 20,
  },
  menuButtons: {
    flex: 1,
    gap: 8,
  },
  sidebarButton: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)", 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  sidebarButtonText: {
    fontSize: 15,
    color: "#fff", 
    fontWeight: "500",
    marginLeft: 0,
  },
  logoutContainer: {
   marginBottom:50
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    borderRadius: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});