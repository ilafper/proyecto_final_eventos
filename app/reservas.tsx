import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";

import { reservasApi } from "../api/reservas";
import FooterMovil from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import TargetaReserva from "../components/targetaReservas";
import useDatosUsuario from "../hooks/usuarioDatos";
export default function Reservas() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [reservas, setReservas] = useState([]);

  const usuario = useDatosUsuario();

  console.log("Usuario logeado:", usuario);

  /* Cargar reservas */
  const cargarReservas = async () => {
    let code_usuario = usuario?.code_user;
    console.log("codigo Usuario", code_usuario);

    const respuesta = await reservasApi.getReservas(code_usuario);
    console.log("reservas", respuesta);

    if (respuesta.success) {
      setReservas(respuesta.reservas);
    } else {
      Alert.alert("Error", respuesta.error);
    }
  };

  /* Cancelar reserva */
  const cancelarReserva = async (code_reserva: string) => {
    console.log("reserva a eliminar", code_reserva);

    // alert para confirmar
    Alert.alert(
      "Cancelar reserva",
      "¿Seguro que quieres cancelar esta reserva?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí",
          onPress: async () => {
            const respuesta = await reservasApi.CancelarReserva(code_reserva);
            if (respuesta.success) {
              Alert.alert("Éxito", respuesta.mensage);
              cargarReservas(); // recargar lista
            } else {
              Alert.alert("Error", respuesta.error);
            }
          },
        },
      ],
    );
  };

  /* Ejecutar al entrar */
  useEffect(() => {
    cargarReservas();
  }, [usuario]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="Reservas"
        onMenuPress={() => setShowSidebar(!showSidebar)}
      />

      {/* Lista reservas */}
      <FlatList
        data={reservas}
        keyExtractor={(cada_reserva) => cada_reserva.code_reserva}
        contentContainerStyle={styles.lista}
        renderItem={({ item: cada_reserva }) => (
          <TargetaReserva
            nombre_evento={cada_reserva.nombre_evento}
            fecha={cada_reserva.fecha}
            horaInicio={cada_reserva.horaInicio}
            horaFin={cada_reserva.horaFin}
            estado={cada_reserva.estado}
            cancelar={() => cancelarReserva(cada_reserva.code_reserva)}
          />
        )}
      />

      {/* Sidebar */}
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
      <FooterMovil />
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
