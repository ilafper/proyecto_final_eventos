import { useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground, StyleSheet, Text, View, ScrollView } from "react-native";
import fondo from "../assets/images/fondo.png";
import CustomButton from "../components/botonBoton";
import FooterMovil from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { MaterialIcons } from '@expo/vector-icons';

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="Home" onMenuPress={() => setShowSidebar(!showSidebar)} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Imagen de fondo con texto y botón */}
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

        {/* Accesos directos */}
        <View style={styles.directoContainer}>
          <Text style={styles.directo}>Accesos directos</Text>

          <View style={styles.cartWrap}>
            <CustomButton
              title="Eventos"
              onPress={() => router.push("/eventos")}
              style={styles.botonAcc}
              textStyle={styles.botonTexto}
              icon={<MaterialIcons name="event" size={20} color="#fff" />}
            />

            <CustomButton
              title="Reservas"
              onPress={() => router.push("/reservas")}
              style={styles.botonAcc}
              textStyle={styles.botonTexto}
              icon={<MaterialIcons name="book" size={20} color="#fff" />}
            />

            <CustomButton
              title="Crear"
              onPress={() => router.push("/nuevoEventoFormu")}
              style={styles.botonAcc}
              textStyle={styles.botonTexto}
              icon={<MaterialIcons name="add-circle" size={20} color="#fff" />}
            />
          </View>
        </View>

      

        {/* Información adicional */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialIcons name="people" size={30} color="#3433CD" />
            <Text style={styles.infoNumero}>150+</Text>
            <Text style={styles.infoTexto}>Usuarios</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="event" size={30} color="#3433CD" />
            <Text style={styles.infoNumero}>25+</Text>
            <Text style={styles.infoTexto}>Eventos</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="star" size={30} color="#3433CD" />
            <Text style={styles.infoNumero}>4.8</Text>
            <Text style={styles.infoTexto}>Valoración</Text>
          </View>
        </View>
      </ScrollView>
      
      {/* Sidebar */}
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
      
      <FooterMovil />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3eded",
  },
  scrollContent: {
    paddingBottom: 100, 
  },
  background: {
    height: 300,
    width: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  texto: {
    width: 300,
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  boton: {
    width: 150,
    borderRadius: 10,
    backgroundColor: "#d41515",
    padding: 12,
  },
  botonTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  directoContainer: {
    padding: 20,
    marginTop: 10,
  },
  directo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  cartWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  botonAcc: {
    width: '48%',
    padding: 15,
    backgroundColor: "#3433CD",
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  destacadosContainer: {
    padding: 20,
  },
  destacadosTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoNumero: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3433CD',
    marginTop: 5,
  },
  infoTexto: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});