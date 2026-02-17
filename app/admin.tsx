import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function HomeView() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 26, marginBottom: 20 }}>vista admin</Text>



      <Button
        title="Cerrar sesión"
        onPress={() => router.push("/login")}
      />
    </View>
  );
}
