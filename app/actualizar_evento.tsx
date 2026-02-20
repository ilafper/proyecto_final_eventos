import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import CustomButton from "../components/botonBoton";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

import { eventosApi } from "../api/eventos";

export default function ActuEevento() {
  const [showSidebar, setShowSidebar] = useState(false);
  // recoger los datos de param
  const params = useLocalSearchParams();

  const [code_evento] = useState(params.code_evento as string);
  const [nombreEvento, setNombre] = useState(params.nombreEvento as string);

  const [descripcionEvento, setdesc] = useState(
    params.descripcionEvento as string,
  );

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
    descripcionEvento: string,
    fechaDate: Date,
    horaInicio: string,
    horaFin: string,
  ) => {
    console.log(
      code_evento,
      nombreEvento,
      descripcionEvento,
      fechaDate,
      horaInicio,
      horaFin,
    );

    let eventoActualizado = {
      code_evento,
      nombreEvento,
      descripcionEvento,
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

    } else {
      console.log("Error", respuesta.error);
    }





  };

  console.log("fecha modi", fecha);

  let fechaDate = new Date(fecha);

  console.log(fechaDate);

  return (
    <View style={styles.container}>
      <Header
        title="Modificacion Evento"
        onMenuPress={() => setShowSidebar(!showSidebar)}
      />

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Nombre del evento"
          value={nombreEvento}
          onChangeText={setNombre}
          style={styles.input}
        />

        <TextInput
          placeholder="Descripcion del evento"
          value={descripcionEvento}
          onChangeText={setdesc}
          style={styles.input}
        />

        <TextInput
          placeholder="Fecha"
          value={fechaDate.toLocaleDateString()}
          onFocus={() => setShowDatePicker(true)}
          style={styles.input}
        />
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

        {/* hora de inicio */}

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
          title="Modificar evento"
          onPress={() =>
            actualizarEvento(
              code_evento,
              nombreEvento,
              descripcionEvento,
              fechaDate,
              horaInicio,
              horaFin,
            )
          }
          style={styles.estiloBoton}
        />
      </View>

      {/* input de fecha cambiado  con el pakete de fecha para poder elegir como sifuese calendario */}

      {/* <Text>Codifo del evento:{code_evento}</Text>
      <Text>desc del evento:{descripcionEvento}</Text>
      <Text>fecha del evento:{fecha}</Text>
      <Text>patata del evento:{nombreEvento}</Text>
      <Text>patata del evento:{horaInicio}</Text>
      <Text>patata del evento:{horaFin}</Text> */}

      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  lista: {
    paddingTop: 20,
    paddingBottom: 100,
    alignItems: "center",
    gap: 18,
  },
  input: {
    width: 300,
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  formContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "red",
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  estiloBoton: {
    marginTop: 10,
    backgroundColor: "#2e2beb",
    color: "white",
    width: 200,
  },
});
