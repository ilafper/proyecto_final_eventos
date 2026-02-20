import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/botonBoton";
import useDatosUsuario from "../hooks/usuarioDatos";
//priedades de cada evento y las funciones qu ese puede hacer


interface EventoTargetaPropiedades {
    nombreEvento:string;
    descripcionEvento:string;
    plazasTotales:number;
    PlazasDisponibles:number;
    fecha:string;
    horaInicio:string;
    horaFin:string;
    estado:string;
    code_Evento:string;
    //funciones en funcion de tipo de usuario
    rol?:"user" | "admin";
    editar?: () => void;
    eliminar?: () => void;
    apuntarse?: () => void;
    verReservas?: () => void;
}


export default function TargetaEvento({
  nombreEvento,
  descripcionEvento,
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
  verReservas,
}: EventoTargetaPropiedades) {
    
    const usuario = useDatosUsuario();
    const [expandido, setExpandido] = useState(false);
    const router = useRouter();
    
    return (
    <View style={styles.card}>
      {/* parte siempre visible */}
      <View style={styles.header}>
        <Text style={styles.title}>{nombreEvento}</Text>

        <Text style={styles.estado}>{estado}</Text>
      </View>

      <Text style={styles.fecha}>
         {fecha} | {horaInicio} - {horaFin}
      </Text>

      {/* boton para expandir*/}
      <Pressable
        style={styles.detallesBtn}
        onPress={() => setExpandido(!expandido)}
      >
        <Text style={styles.detallesText}>
          {expandido ? "Ocultar detalles ▲" : "Ver detalles ▼"}
        </Text>

      </Pressable>

      {/* cotenido oculto*/}
      {expandido && (
        <View style={styles.extraInfo}>
          <Text style={styles.description}>{descripcionEvento}</Text>

          <Text style={styles.plazas}>
             Plazas: {PlazasDisponibles} / {plazasTotales}
          </Text>

          {/* ACCIONES SEGÚN ROL */}
          <View style={styles.actions}>
            {usuario?.rol === "user" && (
              <Pressable  style={styles.btnPrimary} onPress={apuntarse}>
                <Text style={styles.btnText}>Apuntarse</Text>
              </Pressable>
            )}

            {usuario?.rol === "admin" && (
              <>
                
                <CustomButton
                  title="Editar"
                  onPress={editar}
                  icon={<MaterialIcons name="edit" size={15} color="#ffffff" />}
                  style={styles.btnEdit}
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
                  title="Ver reservas"
                  onPress={() => router.push("/reservasEvento")}
                  icon={<MaterialIcons name="visibility" size={15} color="#ffffff" />}
                  style={styles.estiloBtonReservas}
                  textStyle={styles.textoReservas}
                />
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
}




const styles = StyleSheet.create({
  card: {
    width:350,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1055a0",
  },

  estado: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#1055a0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  fecha: {
    marginTop: 6,
    fontSize: 14,
    color: "#333",
  },

  detallesBtn: {
    marginTop: 10,
  },

  detallesText: {
    color: "#1055a0",
    fontWeight: "600",
  },

  extraInfo: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },

  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },

  plazas: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
  },

  actions: {
    flexDirection: "row",
    gap: 5,
  },

  btnPrimary: {
    backgroundColor: "#1055a0",
    padding: 10,
    borderRadius: 10,
  },

  btnEdit: {
    backgroundColor: "#f0a500",
    padding: 10,
    borderRadius: 10,
  },

  btnDelete: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
  estiloBtonReservas: {
    backgroundColor:"#174dfd",
    padding: 10,
    borderRadius: 10,
  },
  textoReservas: {
    color: "#fff",
    fontWeight: "600",
  },
});
