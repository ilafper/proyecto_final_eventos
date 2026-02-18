import { Pressable, StyleSheet, Text, View } from "react-native";

import { useState } from "react";

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
    verDetalles?: () => void;
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
  rol = "user",
  code_Evento,
  editar,
  eliminar,
  apuntarse,
}: EventoTargetaPropiedades) {
    
    
    const [expandido, setExpandido] = useState(false);
    
    
    
    return (
    <View style={styles.card}>
      {/* parte siempre visible */}
      <View style={styles.header}>
        <Text style={styles.title}>{nombreEvento}</Text>

        <Text style={styles.estado}>{estado}</Text>
      </View>

      <Text style={styles.fecha}>
        📅 {fecha} | ⏰ {horaInicio} - {horaFin}
      </Text>

      {/* BOTÓN EXPANDIR */}
      <Pressable
        style={styles.detallesBtn}
        onPress={() => setExpandido(!expandido)}
      >
        <Text style={styles.detallesText}>
          {expandido ? "Ocultar detalles ▲" : "Ver detalles ▼"}
        </Text>

      </Pressable>

      {/* CONTENIDO OCULTO */}
      {expandido && (
        <View style={styles.extraInfo}>
          <Text style={styles.description}>{descripcionEvento}</Text>

          <Text style={styles.plazas}>
            👥 Plazas: {PlazasDisponibles} / {plazasTotales}
          </Text>

          {/* ACCIONES SEGÚN ROL */}
          <View style={styles.actions}>
            {rol === "user" && (
              <Pressable  style={styles.btnPrimary} onPress={apuntarse}>
                <Text style={styles.btnText}>Apuntarse</Text>
              </Pressable>
            )}

            {rol === "admin" && (
              <>
                <Pressable style={styles.btnEdit} onPress={editar}>
                  <Text style={styles.btnText}>Editar</Text>
                </Pressable>

                <Pressable style={styles.btnDelete} onPress={eliminar}>
                  <Text style={styles.btnText}>Eliminar</Text>
                </Pressable>
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
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginVertical: 10,
    elevation: 4,
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
    color: "#444",
    marginBottom: 8,
  },

  plazas: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
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
});
