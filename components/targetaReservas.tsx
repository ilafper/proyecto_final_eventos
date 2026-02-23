import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useDatosUsuario from "../hooks/usuarioDatos";


// propiedades targeta y las funciones que se pueden usar que por defecto son opciones
interface ReservaProps {
  code_reserva?: string;
  nombre_evento: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
  cancelar?: () => void;
  cambiarEstado?: () => void;
}

export default function TargetaReserva({
  nombre_evento,
  fecha,
  horaInicio,
  horaFin,
  estado,
  code_reserva,
  cancelar,
  cambiarEstado
}: ReservaProps) {
  const usuario = useDatosUsuario();
  
  // colores segun estado by nuetro primo
  const colorEstado = () => {
    switch(estado) {
      case "activa": return "#319736";
      case "cancelada": return "#c91a14";
      case "finalizada": return "#888";
      case "No asistido": return "#000000";
    }
  };

  return (
    <View style={styles.card}>
      {/* Cabecera con icono y estado */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title} numberOfLines={1}>{nombre_evento}</Text>
        </View>
        {/* cambiar el color segun estado */}
        <View style={[styles.estadoBadge, { backgroundColor: colorEstado() }]}>
          <Text style={styles.estadoText}>{estado}</Text>
        </View>
      </View>

      {/* linea divisoria */}
      <View style={styles.divider} />

      
      <View style={styles.infoRow}>
        <MaterialIcons name="calendar-today" size={16} color="#666" />
        <Text style={styles.infoText}>{fecha}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons name="access-time" size={16} color="#666" />
        <Text style={styles.infoText}>{horaInicio} - {horaFin}</Text>
      </View>

      {/* Acciones según rol */}
      <View style={styles.actionsContainer}>
        {usuario?.rol === "user" && (
          <Pressable 
            style={[styles.actionButton, styles.cancelButton]} 
            onPress={cancelar}
          >
            <MaterialIcons name="cancel" size={18} color="#fff" />
            <Text style={styles.actionText}>Cancelar</Text>
          </Pressable>
        )}

        {usuario?.rol === "admin" && (
          <Pressable 
            style={[styles.actionButton, styles.adminButton]} 
            onPress={cambiarEstado}
          >
            <MaterialIcons name="edit" size={18} color="#fff" />
            <Text style={styles.actionText}>Cambiar estado</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width:300,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  estadoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  estadoText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: "#555",
    flex: 1,
  },
  actionsContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  cancelButton: {
    backgroundColor: "#d9534f",
  },
  adminButton: {
    backgroundColor: "#2E86C1",
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});