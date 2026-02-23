import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { eventosApi } from "../api/eventos";
import CustomButton from "../components/botonBoton";
import FooterMovil from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function NuevoEventoFormu() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [nombreEvento, setNombreEvento] = useState("");
  
  const [plazasTotales, setPlazasTotales] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHoraInicioPicker, setShowHoraInicioPicker] = useState(false);
  const [showHoraFinPicker, setShowHoraFinPicker] = useState(false);

  const creacionEvento = async () => {
    const nuevoEvento = {
      nombreEvento,
      plazasTotales: parseInt(plazasTotales),
      fecha: fecha.toISOString().split("T")[0],
      horaInicio,
      horaFin,
    };
    console.log(nuevoEvento);
    
    // const respuesta = await eventosApi.crearEvento(nuevoEvento);
    // if (respuesta.success) {
    //   Alert.alert("Exito", "Evento creado correctamente");
    //   router.push("/gestionEventos");
    // } else {
    //   Alert.alert("Error", respuesta.error);
    // }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Crear Evento"
        onMenuPress={() => setShowSidebar(!showSidebar)}
      />

        <View style={styles.formCard}>

          {/* Nombre del evento */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre del evento</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="event" size={20} color="#0307d6a8" style={styles.inputIcon} />
              <TextInput
                placeholder="Ej: Concierto de Rock"
                placeholderTextColor="#aaa"
                value={nombreEvento}
                onChangeText={setNombreEvento}
                style={styles.input}
              />
            </View>
          </View>

          
          {/* Plazas totales */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Plazas disponibles</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="people" size={20} color="#0307d6a8" style={styles.inputIcon} />
              <TextInput
                placeholder="Ej: 100"
                placeholderTextColor="#aaa"
                value={plazasTotales}
                onChangeText={setPlazasTotales}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          </View>

          {/* Fecha */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fecha del evento</Text>
            <TouchableOpacity 
              style={styles.inputContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <MaterialIcons name="calendar-today" size={20} color="#0307d6a8" style={styles.inputIcon} />
              <Text style={[styles.input, styles.inputText]}>
                {fecha.toLocaleDateString()}
              </Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="#0307d6a8" />
            </TouchableOpacity>
          </View>

          {/* Hora inicio */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hora de inicio</Text>
            <TouchableOpacity 
              style={styles.inputContainer}
              onPress={() => setShowHoraInicioPicker(true)}
            >
              <MaterialIcons name="access-time" size={20} color="#0307d6a8" style={styles.inputIcon} />
              <Text style={[styles.input, styles.inputText]}>
                {horaInicio || "Seleccionar hora"}
              </Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="#0307d6a8" />
            </TouchableOpacity>
          </View>

          {/* Hora fin */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hora de finalización</Text>
            <TouchableOpacity 
              style={styles.inputContainer}
              onPress={() => setShowHoraFinPicker(true)}
            >
              <MaterialIcons name="access-time" size={20} color="#0307d6a8" style={styles.inputIcon} />
              <Text style={[styles.input, styles.inputText]}>
                {horaFin || "Seleccionar hora"}
              </Text>
              <MaterialIcons name="arrow-drop-down" size={24} color="#0307d6a8" />
            </TouchableOpacity>
          </View>

          {/* Botón crear */}
          <CustomButton
            title="Crear Evento"
            onPress={creacionEvento}
            style={styles.createButton}
            textStyle={styles.createButtonText}
          />
        </View>

      {/* DatePickers */}
      {showDatePicker && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setFecha(selectedDate);
          }}
        />
      )}

      {showHoraInicioPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowHoraInicioPicker(false);
            if (selectedTime) {
              const horas = selectedTime.getHours().toString().padStart(2, "0");
              const minutos = selectedTime.getMinutes().toString().padStart(2, "0");
              setHoraInicio(`${horas}:${minutos}`);
            }
          }}
        />
      )}

      {showHoraFinPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowHoraFinPicker(false);
            if (selectedTime) {
              const horas = selectedTime.getHours().toString().padStart(2, "0");
              const minutos = selectedTime.getMinutes().toString().padStart(2, "0");
              setHoraFin(`${horas}:${minutos}`);
            }
          }}
        />
      )}

      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}

      <FooterMovil />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    margin: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  formSubtitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 12,
    minHeight: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: 12,
  },
  inputText: {
    color: "#333",
    paddingVertical: 12,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  createButton: {
    backgroundColor: "#0307d6d5",
    borderRadius: 12,
    height: 52,
    marginTop: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});