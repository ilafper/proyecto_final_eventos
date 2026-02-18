import { useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import fondo from "../assets/images/fondo.png";
import CustomButton from "../components/botonBoton";
import Header from "../components/header";

import Sidebar from "../components/sidebar";


export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header title="Home" onMenuPress={() => setShowSidebar(!showSidebar)} />

      <ImageBackground source={fondo} style={styles.background} resizeMode="cover">
        <View style={styles.overlay}>
          <Text style={styles.texto}>Descubre nuestros eventos</Text>
          <CustomButton
            title="Eventos"
            onPress={() => router.push("/eventos")}
            style={styles.boton}
            textStyle={styles.botonTexto}
          />
        </View>
      </ImageBackground>

      
      {/* sidebard */}
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
  main: {
    display:"flex",
    padding: 0,
    flexDirection:"column"
  },

  sidebarOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 10,
    elevation: 10,
  },
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height:250,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"

  },
  overlay: {
    width:"100%",
    height:"100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  texto: {
    width:300,
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  boton: {
    width:100,
    borderRadius: 8,
    backgroundColor: "#bb1212",
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
