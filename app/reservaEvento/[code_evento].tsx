import { reservasApi } from "@/api/reservas";
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import FooterMovil from "../../components/footer";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import TargetaReserva from "../../components/targetaReservas";
export default function ReservasEventos() {
  const [showSidebar, setShowSidebar] = useState(false);
  // recoger el codifo evento de la url local o como sea
  const { code_evento } = useLocalSearchParams();
  const [reservasEventos, setReservasEvento] = useState([]);

  // modal para el estado

  const [modalVisible, setModalVisible] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [estadoActual, setEstadoActual] = useState("");
  
  
  const mostrarModal = (reserva) => {
    console.log("Sisisisis reserva moodal");

    //console.log(reserva);
    console.log(reserva.estado);

    // seleccioanr la reserva que seleccionas

    setReservaSeleccionada(reserva);
    setEstadoActual(reserva.estado);
    setModalVisible(true);

  }

  const cambiarEstado = async (nuevoEstado) => {
    console.log("Cambiando estado estado");
    console.log("codifo reserva modi", reservaSeleccionada?.code_reserva);
    
    //console.log("que reserva:",reservaSeleccionada.code_reserva);
    
    let reserva_modi={
      code_reserva:reservaSeleccionada?.code_reserva,
      estado:nuevoEstado
    }
    console.log("reserva a modi estado23234", reserva_modi);
    
    const respuesta = await reservasApi.actualizarEstado(reserva_modi);
    if (respuesta.success) {
      console.log("okokkoko");
      
    }else {
      console.log("Error", respuesta.error);
      Alert.alert("Error", respuesta.error);
    }
    setModalVisible(false);
    
    //cargaReservaEventos();

  };





  //cargar reservas del eventos
  const cargaReservaEventos = async () => {
    // coger las reserva del evento que le pasamos el codigo
    const respuesta = await reservasApi.reservasEvento(code_evento);


    console.log("todos reservas de evento");

    console.log(respuesta);

    if (respuesta.success) {
      setReservasEvento(respuesta.reservas);
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
      <Header
        title="Reservas del evento"
        onMenuPress={() => setShowSidebar(!showSidebar)}
      />

      {/* <Text>Codifo del evento:{code_evento}</Text> */}

      <FlatList
        data={reservasEventos}
        keyExtractor={(cada_reserva) => cada_reserva.code_reserva}
        contentContainerStyle={styles.lista}
        renderItem={({ item: cada_reserva }) => (
          <TargetaReserva
            nombre_evento={cada_reserva.nombre_evento}
            fecha={cada_reserva.fecha}
            horaInicio={cada_reserva.horaInicio}
            horaFin={cada_reserva.horaFin}
            estado={cada_reserva.estado}
            cambiarEstado={() => mostrarModal(cada_reserva)}
          />
        )}
      />

      {/* modal para cambiar estado reserva */}
        {/* Propio de react native */}
      <Modal animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>

        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>
              Cambiar estado de reserva
            </Text>



            {/* Usar picke para las opciones*/}
            
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={estadoActual}
                onValueChange={(itemValue) => {
                  console.log("Valor seleccionado:", itemValue);

                  //actualizar el estado al seleccionar la opcion que si no pilla la que viene por defecto
                  setEstadoActual(itemValue);
                }}
                style={styles.picker}
                dropdownIconColor="#1055a0"
              >
                
                {/* opciones disponibles */}
                <Picker.Item label="No asistido" value="No asistido" />
                <Picker.Item label="cancelada" value="cancelada" />
              </Picker>
            </View>

            {/* Botón cancelar */}
            <View style={styles.accionesmodal}>
            <Pressable
              style={styles.modalCancelar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelarTexto}>Cancelar</Text>
            </Pressable>
            

            <Pressable
              style={styles.guardarEstado}
              onPress={() => cambiarEstado(estadoActual)}
            >
              <Text style={styles.guardar}>Guardar</Text>
            </Pressable>
            </View>
            
          </View>
        </View>



      </Modal>


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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    width: 300,
    height: 200,
    maxWidth: 300,
  },
  accionesmodal: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:40
  },
  modalCancelarTexto: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
  },
  guardar: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  guardarEstado: {
    backgroundColor:'#1a0fbd',
    padding:10,
    borderRadius:10
  },
  modalCancelar: {
    backgroundColor:'#da2121',
    padding:10,
    borderRadius:10
  },
});
