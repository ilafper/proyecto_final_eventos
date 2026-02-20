import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
}

export default function Footer({ title, onMenuPress }: HeaderProps) {
  

  

  return (
    <View style={styles.footer}>
      
      <View style={styles.leftSection}>
        <Pressable onPress={onMenuPress} style={styles.menuButton}>
          <MaterialIcons name="menu" size={28} color="#fff" />
        </Pressable>

        <Text style={styles.title}>{title}</Text>
      </View>


    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    height: 85,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuButton: {
    marginRight: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
