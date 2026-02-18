import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../components/header";
import Sidebar from "../components/sidebar";



export default function HomeView() {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Header title="Admin" onMenuPress={() => setShowSidebar(!showSidebar)} />



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

