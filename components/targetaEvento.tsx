import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/botonBoton";
import useDatosUsuario from "../hooks/usuarioDatos";

// propeidades de targeta evento, y funciones 
interface EventoTargetaPropiedades {
  nombreEvento: string;
  plazasTotales: number;
  PlazasDisponibles: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  estado: string;
  code_Evento: string;
  editar?: () => void;
  eliminar?: () => void;
  apuntarse?: () => void;
  verReservas?: () => void;
}

export default function TargetaEvento({
  nombreEvento,
  plazasTotales,
  PlazasDisponibles,
  fecha,
  horaInicio,
  horaFin,
  estado,
  code_Evento,
  editar,
  eliminar,
  apuntarse,
}: EventoTargetaPropiedades) {
  const usuario = useDatosUsuario();
  const router = useRouter();
  // basicamente calcular la barra de espacio
  //8-4 = 4 , 4 entre 8 = 0.5 por 100 = 100%
  const porcentajeOcupado = ((plazasTotales - PlazasDisponibles) / plazasTotales) * 100;

  return (
    <View style={styles.card}>
      {/* Borde decorativo izquierdo */}
      <View style={[styles.bordeLeft, { backgroundColor: estado === "finalizado" ? "#ca1414" : "#3433CD" }]} />
      
      <View style={styles.content}>
        {/* Header con título y estado */}
        <View style={styles.header}>
          <Text style={styles.title}>{nombreEvento}</Text>
          <View style={[styles.estadoBadge, { backgroundColor: estado === "finalizado" ? "#ca1414" : "#3433CD" }]}>
            <Text style={styles.estadoText}>{estado}</Text>
          </View>
        </View>

        {/* Info */}
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <MaterialIcons name="calendar-today" size={16} color="#3433CD" />
            <Text style={styles.infoText}>{fecha}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="access-time" size={16} color="#3433CD" />
            <Text style={styles.infoText}>{horaInicio} - {horaFin}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="people" size={16} color="#3433CD" />
            <Text style={styles.infoText}>
              <Text style={styles.infoDestacado}>{PlazasDisponibles}</Text> / {plazasTotales} plazas
            </Text>
          </View>
        </View>

        {/* barrita pogreso de ocupacion */}
        <View style={styles.progressBarContainer}>
          {/* ajustar el acnho de la barra con las plazas */}
          <View style={[styles.progressBar, { width: `${porcentajeOcupado}%` }]} />
        </View>

        {/* Acciones segun rol */}
        <View style={styles.actions}>
          {usuario?.rol === "user" && (
            <CustomButton
                title="Apuntarse"
                onPress={apuntarse}
                disabled={estado === "finalizado"}
                icon={<MaterialIcons name="event-available" size={18} color="#fff" />}
                style={[styles.btnPrimary, estado === "finalizado" && styles.btnDisabled]}
                textStyle={styles.btnText}
              />


           
          )}

          {usuario?.rol === "admin" && (
            <>

              <CustomButton
                title="Editar"
                //pasarle los parametros del evento por params
                onPress={() =>
                  router.push({
                    pathname: "/actualizar_evento",
                    params: { 
                      code_evento: code_Evento, 
                      nombreEvento,
                      fecha, 
                      horaInicio, 
                      horaFin 
                    },
                  })
                }
                disabled={estado === "finalizado"}
                icon={<MaterialIcons name="edit" size={15} color="#ffffff" />}
                style={[styles.btnEdit, estado === "finalizado" && styles.btnDisabled]}
                textStyle={styles.btnText}
              />

              <CustomButton
                title="Eliminar"
                onPress={eliminar}
                icon={<MaterialIcons name="delete-outline" size={15} color="#ffffff" />}
                style={styles.btnDelete}
                textStyle={styles.btnText}
              />

              <CustomButton
                title="Reservas"
                onPress={() =>
                  router.push({
                    pathname: "/reservaEvento/[code_evento]",
                    params: { code_evento: code_Evento },
                  })
                }
                icon={<MaterialIcons name="visibility" size={15} color="#ffffff" />}
                style={styles.btnReservas}
                textStyle={styles.btnText}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 8,
    overflow: "hidden",
  },
  bordeLeft: {
    width: 6,
    height: "100%",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  estadoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 10,
  },
  estadoText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
  },
  descripcionContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    flex: 1,
    lineHeight: 20,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minWidth: "45%",
  },
  infoText: {
    fontSize: 13,
    color: "#666",
  },
  infoDestacado: {
    fontWeight: "bold",
    color: "#3433CD",
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 3,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#3433CD",
    borderRadius: 3,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: "center",
  },


  btnPrimary: {
    backgroundColor: "#3433CD",
    width:300,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },


  btnEdit: {
    backgroundColor: "#f0a500",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  btnDelete: {
    backgroundColor: "#d9534f",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  btnReservas: {
    backgroundColor: "#3433CD",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
});