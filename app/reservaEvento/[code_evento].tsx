import { reservasApi } from "@/api/reservas";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import TargetaReserva from "../../components/targetaReservas";



export default function ReservasEventos() {
    const [showSidebar, setShowSidebar] = useState(false);
    // recoger el codifo evento de la url local o como sea
    const { code_evento } = useLocalSearchParams();
    const [reservasEventos, setReservasEvento] = useState([]);
    
    //cargar reservas del eventos
    const cargaReservaEventos = async () => {

        const respuesta = await reservasApi.reservasEvento(code_evento);
        console.log("todos reservas de evento");

        console.log(respuesta);

        if (respuesta.success) {
            setReservasEvento(respuesta.reservas)
        } else {
            console.log("Error", respuesta.error);
            Alert.alert("Error", respuesta.error);
        }

    };

    useEffect(() => {
        cargaReservaEventos();
    }, []);



    return (
        <View style={styles.container}>
            <Header title="Reservas del evento" onMenuPress={() => setShowSidebar(!showSidebar)} />
            <Text>Codifo del evento:{code_evento}</Text>
            
            <FlatList
                    data={reservasEventos}
                    keyExtractor={(cada_reserva) => cada_reserva.code_reserva}
                    contentContainerStyle={styles.lista}
                    renderItem={({ item:cada_reserva }) => (
                      <TargetaReserva
                        nombreEvento={cada_reserva.nombre_evento}
                        fecha={cada_reserva.fecha}
                        horaInicio={cada_reserva.horaInicio}
                        horaFin={cada_reserva.horaFin}
                        estado={cada_reserva.estado}
                        
                      />
                    )}
                  />
            
            
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

  lista: {
    paddingTop: 20,
    paddingBottom: 100,
    alignItems: "center",
    gap: 18,
  },

});

