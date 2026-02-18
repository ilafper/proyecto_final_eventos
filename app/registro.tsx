import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { login_register } from "../api/login_regis";
import CustomButton from "../components/botonBoton";

export default function RegisterView() {
    //campos de registro con setNombreCampo para "recordar"
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setEmail] = useState("");
    const [contraseña, setPassword] = useState("");
    const [contraseña2, setPassword2] = useState("");
    //para oculatar y mostrar contraseñas por defecto estan ocultas
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    // Funcion para registrarse
    const registro = async () => {
        //datos del registro
        const datos = {
            nombre,
            apellidos,
            correo,
            contraseña,
            contraseña2
        };

        const res = await login_register.register(datos);

        if (res.success) {
            Alert.alert("yupi", res.message);
            router.push("/login");
        } else {
            Alert.alert("Error", res.error);
        }
    };


    return (

        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>Registro</Text>

            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />

            <TextInput
                placeholder="Apellidos"
                value={apellidos}
                onChangeText={setApellidos}
                style={styles.input}
            />

            <TextInput
                placeholder="Email"
                value={correo}
                onChangeText={setEmail}
                style={styles.input}
            />

            {/* juntar el input del contaseñña con el de boton */}
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Contraseña"
                    value={contraseña}
                    onChangeText={setPassword}
                    style={styles.passwordInput}
                    secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                    <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
                        size={24}
                        color="gray"
                    />
                </Pressable>
            </View>

            {/* Repetir contraseña */}
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Repite la contraseña"
                    value={contraseña2}
                    onChangeText={setPassword2}
                    style={styles.passwordInput}
                    secureTextEntry={!showPassword2}
                />
                <Pressable onPress={() => setShowPassword2(!showPassword2)} style={styles.icon}>
                    <MaterialIcons
                        name={showPassword2 ? "visibility" : "visibility-off"}
                        size={24}
                        color="gray"
                    />
                </Pressable>
            </View>

            {/* Boton para registrarse */}
            <CustomButton title="Registrarme" onPress={registro} />

            <View style={{ marginTop: 10, flexDirection: "row", gap: 5 }}>
                <Text>Ya tienes cuenta?</Text>
                <Text style={styles.enlace} onPress={() => router.push("/login")}>
                    Inicia Sesión
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderColor: "red",
        borderWidth: 1
    },
    title: {
        fontSize: 28,
        marginBottom: 20
    },
    input: {
        width: "100%",
        borderWidth: 1,
        padding: 10,
        marginVertical: 8,
        borderRadius: 8
    },
    passwordContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 8,
    },
    passwordInput: {
        flex: 1,
        padding: 10,
    },
    icon: {
        paddingHorizontal: 10,
    },
    enlace: {
        color: "blue",
        fontWeight: "bold"
    }
});
