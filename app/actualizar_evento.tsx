import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { eventosApi } from "../api/eventos";
import CustomButton from "../components/botonBoton";
import FooterMovil from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
export default function ActuEevento() {
  const [showSidebar, setShowSidebar] = useState(false);
  // recoger los datos de param
  const params = useLocalSearchParams();

  const [code_evento] = useState(params.code_evento as string);
  const [nombreEvento, setNombre] = useState(params.nombreEvento as string);

  const [fecha, setFecha] = useState(params.fecha as string);
  const [horaInicio, setHoraInicio] = useState(params.horaInicio as string);
  const [horaFin, setHoraFin] = useState(params.horaFin as string);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHoraInicioPicker, setShowHoraInicioPicker] = useState(false);
  const [showHoraFinPicker, setShowHoraFinPicker] = useState(false);

  // actualizar evento
  const actualizarEvento = async (
    code_evento: string,
    nombreEvento: string,
    fechaDate: Date,
    horaInicio: string,
    horaFin: string,
  ) => {
    console.log(
      code_evento,
      nombreEvento,
      fechaDate,
      horaInicio,
      horaFin,
    );

    let eventoActualizado = {
      code_evento,
      nombreEvento,
      fechaDate,
      horaInicio,
      horaFin,
    }
    console.log( eventoActualizado);
    
    const respuesta = await eventosApi.modiEvento(eventoActualizado);
    console.log("modi evento  evento");
    console.log(respuesta);
    if (respuesta.success) {
      console.log("sisisi");
      console.log(respuesta.success);

      Alert.alert("Exito", respuesta.mensaje);
      router.push("/gestionEventos");
      
    } else {
      console.log("Error", respuesta.error);
    }
  };

  console.log("fecha modi", fecha);
  // pasar la fecha a date
  let fechaDate = new Date(fecha);
  console.log(fechaDate);

  return (
    <View style={styles.container}>
      <Header
        title="Modificacion Evento"
        onMenuPress={() => setShowSidebar(!showSidebar)}
      />

      <View style={styles.formCard}>


        {/* nomvre*/}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nombre del evento</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="event" size={20} color="#0307d6a8" style={styles.inputIcon} />
            <TextInput
              placeholder="Nombre del evento"
              placeholderTextColor="#aaa"
              value={nombreEvento}
              onChangeText={setNombre}
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
            activeOpacity={0.7}
          >
            <MaterialIcons name="calendar-today" size={20} color="#0307d6a8" style={styles.inputIcon} />
            <Text style={[styles.input, styles.inputText]}>
              {fechaDate.toLocaleDateString()}
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
            activeOpacity={0.7}
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
            activeOpacity={0.7}
          >
            <MaterialIcons name="access-time" size={20} color="#0307d6a8" style={styles.inputIcon} />
            <Text style={[styles.input, styles.inputText]}>
              {horaFin || "Seleccionar hora"}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#0307d6a8" />
          </TouchableOpacity>
        </View>

        {/* DatePickers */}
        {showDatePicker && (
          <DateTimePicker
            value={fechaDate}
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
                // mostrar solo la hora 22:15
                const horas = selectedTime
                  .getHours()
                  .toString()
                  .padStart(2, "0");
                const minutos = selectedTime
                  .getMinutes()
                  .toString()
                  .padStart(2, "0");
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
                const horas = selectedTime
                  .getHours()
                  .toString()
                  .padStart(2, "0");
                const minutos = selectedTime
                  .getMinutes()
                  .toString()
                  .padStart(2, "0");
                setHoraFin(`${horas}:${minutos}`);
              }
            }}
          />
        )}

        <CustomButton
          title="Modificar evento"
          onPress={() =>
            actualizarEvento(
              code_evento,
              nombreEvento,
              fechaDate,
              horaInicio,
              horaFin,
            )
          }
          style={styles.createButton}
          textStyle={styles.createButtonText}
        />
      </View>

      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
      <FooterMovil />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fac2",
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
    fontSize: 14,
    color: "#888",
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 16,
    minHeight: 50,
  },
  inputIcon: {
    marginRight: 12,
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
  createButton: {
    backgroundColor: "#0307d6d5",
    borderRadius: 12,
    height: 52,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
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