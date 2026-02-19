import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { eventosApi } from "../api/eventos";
import CustomButton from "../components/botonBoton";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function NuevoEventoFormu() {
  const [showSidebar, setShowSidebar] = useState(false);
  //const router = useRouter();

  // campos formu
  const [nombreEvento, setNombreEvento] = useState("");
  const [descripcionEvento, setDescripcionEvento] = useState("");
  const [plazasTotales, setPlazasTotales] = useState("");

  const [fecha, setFecha] = useState(new Date());
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHoraInicioPicker, setShowHoraInicioPicker] = useState(false);
  const [showHoraFinPicker, setShowHoraFinPicker] = useState(false);

  //const plazas_maximas = 100;

  //creacionEvento(nombreEvento,descripcionEvento,plazasTotales,fecha,horaInicio,horaFin)}
  // Función para enviar formulario

  const creacionEvento = async (
    nombreEvento: string,
    descripcionEvento: string,
    plazasTotales: number,
    fecha: Date,
    horaInicio: string,
    horaFin: string,
  ) => {
    console.log(
      nombreEvento,
      descripcionEvento,
      plazasTotales,
      fecha,
      horaInicio,
      horaFin,
    );
    console.log(fecha);

    console.log("fecha fecha ", fecha.toLocaleDateString());

    const nuevoEvento = {
      nombreEvento,
      descripcionEvento,
      plazasTotales,
      fecha: fecha.toISOString().split("T")[0],
      horaInicio,
      horaFin,
    };

    console.log("enviar evento sisi:", nuevoEvento);
    const respuesta = await eventosApi.crearEvento(nuevoEvento);
    console.log("crear evento");
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

  return (
    <View style={styles.container}>
      <Header
        title="Creación de Evento"
        onMenuPress={() => setShowSidebar(!showSidebar)}
      />

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Nombre del evento"
          value={nombreEvento}
          onChangeText={setNombreEvento}
          style={styles.input}
        />
        <TextInput
          placeholder="Descripción del evento"
          value={descripcionEvento}
          onChangeText={setDescripcionEvento}
          style={styles.input}
        />
        <TextInput
          placeholder="Plazas totales"
          value={plazasTotales}
          onChangeText={setPlazasTotales}
          //tipo de teclado a mostrar
          keyboardType="numeric"
          style={styles.input}
        />

        {/* input de fecha cambiado  con el pakete de fecha para poder elegir como sifuese calendario */}
        <TextInput
          placeholder="Fecha"
          value={fecha.toLocaleDateString()}
          onFocus={() => setShowDatePicker(true)}
          style={styles.input}
        />
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

        {/* lo mismo para la hora de inicio y fin */}
        <TextInput
          placeholder="Hora inicio"
          value={horaInicio}
          onFocus={() => setShowHoraInicioPicker(true)}
          style={styles.input}
        />

        {showHoraInicioPicker && (
          <DateTimePicker
            //siempre devuelve en formato date Iso
            value={new Date()}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowHoraInicioPicker(false);
              if (selectedTime) {
                //pasar la hora inicio de formato date a por ejemplo "22:12 que por defecto el de eleigir mediante un reloj es formato date aunque diga time"
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

        <TextInput
          placeholder="Hora Fin"
          value={horaFin}
          onFocus={() => setShowHoraFinPicker(true)}
          style={styles.input}
        />

        {showHoraFinPicker && (
          <DateTimePicker
            //siempre devuelve en formato date Iso
            value={new Date()}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowHoraFinPicker(false);
              if (selectedTime) {
                //pasar la hora inicio de formato date a por ejemplo "22:12 que por defecto el de eleigir mediante un reloj es formato date aunque diga time"
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
          title="Crear evento"
          onPress={() =>
            creacionEvento(
              nombreEvento,
              descripcionEvento,
              plazasTotales,
              fecha,
              horaInicio,
              horaFin,
            )
          }
          style={styles.estiloBoton}
        />
      </View>

      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  formContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "red",
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: 310,
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  estiloBoton: {
    marginTop: 10,
    backgroundColor: "#2e2beb",
    color: "white",
    width: 200,
  },
});
