import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../components/header";
import Sidebar from "../components/sidebar";



export default function reservasEventos() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <View style={styles.container}>
      <Header title="Reservas evento" onMenuPress={() => setShowSidebar(!showSidebar)} />

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

