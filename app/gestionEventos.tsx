import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { eventosApi } from "../api/eventos";
import CustomButton from "../components/botonBoton";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import TargetaEvento from "../components/targetaEvento";
import useDatosUsuario from "../hooks/usuarioDatos";
export default function GestionEventos() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [eventos, setEventos] = useState([]);
  const usuario = useDatosUsuario();
  
  
  //funcion para cargar eventos
    const cargaEventos= async () => {

        const respuesta= await eventosApi.getEventos();
        console.log("todos eventos");
        
        console.log(respuesta);
        
        if (respuesta.success) {
            setEventos(respuesta.eventos)
        }else {
            console.log("Error", respuesta.error);
            Alert.alert("Error", respuesta.error);
        }

    };

    const eliminarEvento= async (code_evento:string) => {
        //console.log(code_evento);
        
        const respuesta= await eventosApi.eliminarEvento(code_evento);
        console.log("evento eleiminar");
        
        console.log(respuesta);
        
        if (respuesta.success) {
    
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
      <Header title="Gestion eventos" onMenuPress={() => setShowSidebar(!showSidebar)} />


        <CustomButton
              title=""
              onPress={() => router.push("/nuevoEventoFormu")
              }
              icon={<MaterialIcons name="add" size={24} color="#ffffff" />}
              style={styles.estilo}
            />


        {/* como un bocle for para mostrar los eventos en sus targetas */}
          <FlatList
              data={eventos}
              keyExtractor={(cada_evento) => cada_evento.code_Evento}
              contentContainerStyle={{
                  flexGrow: 1,
                  marginTop:20,
                  gap:18,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "red",
                  paddingBottom:100
              }}

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
                      rol="admin"
                      eliminar={() =>eliminarEvento(cada_evento.code_Evento)}
                      
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

    estilo: {
        position: "absolute",
        bottom: 80,
        right: 25,
        width: 65,
        height: 65,
        borderRadius: 32,
        backgroundColor: "#0e549e",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },
});
