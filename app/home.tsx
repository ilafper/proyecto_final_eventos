import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/header";
import CustomButton from "../components/botonBoton";

export default function HomeView() {
  const [showSidebar, setShowSidebar] = useState(false); // controla la barra lateral

  return (
    <View style={styles.container}>
      {/* Header siempre visible */}
      <Header
        title="Home"
        onMenuPress={() => setShowSidebar(!showSidebar)} // alterna visibilidad
      />

      {/* Contenido principal */}
      <ScrollView style={styles.content}>
        <Text style={styles.welcome}>Bienvenido</Text>
        <Text style={styles.subtitle}>
          Accede rápidamente a las acciones principales
        </Text>

        <View style={styles.cardsContainer}>
          <CustomButton
            title="Eventos"
            onPress={() => router.push("/eventos")}
            icon={<MaterialIcons name="event" size={24} color="#fff" />}
            style={styles.cardButton}
          />
          <CustomButton
            title="Reservas"
            onPress={() => router.push("/reservas")}
            icon={<MaterialIcons name="book-online" size={24} color="#fff" />}
            style={styles.cardButton}
          />
        </View>
      </ScrollView>

      {/* Sidebar simple que se muestra solo si showSidebar = true */}
      {showSidebar && (
        <View style={styles.sidebar}>
          <Pressable
            style={styles.closeButton}
            onPress={() => setShowSidebar(false)}
          >
            <MaterialIcons name="close" size={28} color="#fff" />
          </Pressable>

          <CustomButton
            title="Home"
            onPress={() => router.push("/")}
            icon={<MaterialIcons name="home" size={20} color="#fff" />}
            style={styles.sidebarButton}
            textStyle={styles.sidebarButtonText}
          />
          <CustomButton
            title="Eventos"
            onPress={() => router.push("/eventos")}
            icon={<MaterialIcons name="event" size={20} color="#fff" />}
            style={styles.sidebarButton}
            textStyle={styles.sidebarButtonText}
          />
          <CustomButton
            title="Reservas"
            onPress={() => router.push("/reservas")}
            icon={<MaterialIcons name="book-online" size={20} color="#fff" />}
            style={styles.sidebarButton}
            textStyle={styles.sidebarButtonText}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e6f0ff",
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1055a0",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#1055a0",
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardButton: {
    width: "48%",
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 12,
    backgroundColor: "#1055a0",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: "100%",
    backgroundColor: "#1055a0",
    paddingTop: 50,
    paddingHorizontal: 10,
    zIndex: 1000,
  },
  sidebarButton: {
    width: "100%",
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#0c3d70",
  },
  sidebarButtonText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 8,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
});
