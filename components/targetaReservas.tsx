import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ReservaProps {
  code_reserva?: string;
  nombre_evento: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
  rol?: "user" | "admin";

  cancelar?: () => void;
}

export default function TargetaReserva({
  nombre_evento,
  fecha,
  horaInicio,
  horaFin,
  estado,
  code_reserva,
  cancelar,
}: ReservaProps) {
  return (
    <View style={styles.card}>
      {/*datos*/}
      <View style={styles.header}>
        <Text style={styles.title}>{nombre_evento}</Text>

        <View style={styles.estadoBox}>
          <Text style={styles.estadoText}>{estado}</Text>
        </View>
      </View>

      <Text style={styles.info}>{fecha}</Text>

      <Text style={styles.info}>
        {horaInicio} - {horaFin}
      </Text>

      <Pressable style={styles.cancelBtn} onPress={cancelar}>
        <MaterialIcons name="cancel" size={20} color="#fff" />
        <Text style={styles.cancelText}>Cancelar reserva</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 15,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1055a0",
    flex: 1,
  },

  estadoBox: {
    backgroundColor: "#1055a0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  estadoText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  info: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },

  cancelBtn: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },

  cancelText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
