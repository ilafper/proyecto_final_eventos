
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { eventosApi } from "../api/eventos";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import TargetaEvento from "../components/targetaEvento";
import useDatosUsuario from "../hooks/usuarioDatos";

export default function eventos() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [eventos, setEventos] = useState([]);
  const usuario = useDatosUsuario();

  console.log("lalalal");

  console.log("datos user", usuario);

  //funcion para cargar eventos
  const cargaEventos = async () => {
    const respuesta = await eventosApi.getEventos();
    console.log("todos eventos");

    console.log(respuesta);

    if (respuesta.success) {
      setEventos(respuesta.eventos);
    } else {
      console.log("Error", respuesta.error);
      Alert.alert("Error", respuesta.error);
    }
  };

  //  const reserva_nueva={
  //             codigo_evento: cada_evento.code_Evento,
  //             nombre_evento:cada_evento.nombreEvento,
  //             fecha:cada_evento.fecha,
  //             code_usuario:this.user.code_user,
  //             horaInicio:cada_evento.horaInicio,
  //             horaFin:cada_evento.horaFin,
  //         }

  // apuntarse evento
  const apuntarseEvento = async (reserva_nueva: any) => {
    console.log("reserva nueva", reserva_nueva);
    const respuesta = await eventosApi.apuntarseEvento(reserva_nueva);
    console.log("respueste reserva nueva");
    console.log(respuesta);

    if (respuesta.success) {
      Alert.alert("Exito", respuesta.mensaje);
      cargaEventos();
    } else {
      console.log("Error", respuesta.error);
      Alert.alert("Error", respuesta.error);
    }
  };

  //ejecuatr al entrar en la vista
  useEffect(() => {
    cargaEventos();
  }, [usuario]);

  return (
    <View style={styles.container}>
      {/* componete header con su titulo */}
      <Header
        title="Eventos"
        onMenuPress={() => setShowSidebar(!showSidebar)}
      />
      {/* como un bocle for para mostrar los eventos en sus targetas */}
      <FlatList
        // coge la "lista de eventos que le pasamos de cargar los eventos"
        data={eventos}
        keyExtractor={(cada_evento) => cada_evento.code_Evento}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 20,
          gap: 18,
          alignItems: "center",
          borderWidth: 1,
          borderColor: "red",
          paddingBottom: 100,
        }}
        renderItem={({ item: cada_evento }) => (
          // llamar al compoente de targeta y carga los datos y se mostrar con el tilo que le pusimos en el componente
          <TargetaEvento
            nombreEvento={cada_evento.nombreEvento}
            descripcionEvento={cada_evento.descripcionEvento}
            fecha={cada_evento.fecha}
            horaInicio={cada_evento.horaInicio}
            horaFin={cada_evento.horaFin}
            estado={cada_evento.estado}
            PlazasDisponibles={cada_evento.PlazasDisponibles}
            plazasTotales={cada_evento.plazasTotales}
            code_Evento={cada_evento.code_Evento}
            rol="user"
            apuntarse={() =>
              apuntarseEvento({
                codigo_evento: cada_evento.code_Evento,
                nombre_evento: cada_evento.nombreEvento,
                fecha: cada_evento.fecha,
                horaInicio: cada_evento.horaInicio,
                horaFin: cada_evento.horaFin,
                code_usuario: usuario?.code_user,
              })
            }
          />
        )}
      />

      {/* Sidebar flotante */}
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});
