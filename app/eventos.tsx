import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";

import { eventosApi } from "../api/eventos";
import Header from "../components/header";

import Sidebar from "../components/sidebar";
import TargetaEvento from "../components/targetaEvento";


export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [eventos, setEventos] = useState([]);

  //funcion para cargar eventos
    const cargaEventos= async () => {

        const respuesta= await eventosApi.getEventos();

        if (respuesta.success) {
            setEventos(respuesta.eventos)
        }else {
            console.log("Error", respuesta.error);
            Alert.alert("Error", respuesta.error);
        }

    };

    //ejecuatr al entrar en la vista
    useEffect(() => {
        cargaEventos();
    }, []);



  return (
    <View style={styles.container}>
      {/* componete header con su titulo */}
      <Header title="Eventos" onMenuPress={() => setShowSidebar(!showSidebar)} />
        {/* como un bocle for para mostrar los eventos en sus targetas */}
        <FlatList
        data={eventos}
        keyExtractor={(cada_evento) => cada_evento.code_Evento}
        renderItem={({ item: cada_evento }) => (
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
              console.log("Usuario se apunta a:", cada_evento.code_Evento)
            }

          />
        )}
      />


      {/* Sidebar flotante */}
      {showSidebar && (
        <Sidebar
          onClose={() => setShowSidebar(false)}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});
