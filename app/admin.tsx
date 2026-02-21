import { useState } from "react";
import { StyleSheet, View } from "react-native";
import FooterMovil from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/sidebar";


export default function HomeView() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <View style={styles.container}>
      <Header title="Panel admin" onMenuPress={() => setShowSidebar(!showSidebar)} />

      {showSidebar && (
              <Sidebar
                onClose={() => setShowSidebar(false)}
              />
            )}
      <FooterMovil />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

});

