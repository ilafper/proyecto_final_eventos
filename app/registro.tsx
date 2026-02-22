import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { login_register } from "../api/login_regis";
import CustomButton from "../components/botonBoton";

export default function RegisterView() {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setEmail] = useState("");
    const [contraseña, setPassword] = useState("");
    const [contraseña2, setPassword2] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const registro = async () => {
        const datos = {
            nombre,
            apellidos,
            correo,
            contraseña,
            contraseña2
        };

        const res = await login_register.register(datos);

        if (res.success) {
            Alert.alert("¡Bienvenido!", res.message);
            router.push("/login");
        } else {
            Alert.alert("Error", res.error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Header decorativo */}
            <View style={styles.headerDecoration}>
                <View style={styles.circle1} />
                <View style={styles.circle2} />
            </View>

            {/* Contenido principal centrado */}
            <View style={styles.centeredContent}>
                {/* Título */}
                <Text style={styles.welcomeText}>Crear cuenta</Text>
                <Text style={styles.subtitle}>Regístrate para comenzar</Text>

                {/* Formulario */}
                <View style={styles.formContainer}>
                    {/* Nombre */}
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="person" size={20} color="#3433CD" style={styles.inputIcon} />
                        <TextInput
                            placeholder="Nombre"
                            placeholderTextColor="#aaa"
                            value={nombre}
                            onChangeText={setNombre}
                            style={styles.input}
                        />
                    </View>

                    {/* Apellidos */}
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="people" size={20} color="#3433CD" style={styles.inputIcon} />
                        <TextInput
                            placeholder="Apellidos"
                            placeholderTextColor="#aaa"
                            value={apellidos}
                            onChangeText={setApellidos}
                            style={styles.input}
                        />
                    </View>

                    {/* Email */}
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="email" size={20} color="#3433CD" style={styles.inputIcon} />
                        <TextInput
                            placeholder="Correo electrónico"
                            placeholderTextColor="#aaa"
                            value={correo}
                            onChangeText={setEmail}
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Contraseña */}
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={20} color="#3433CD" style={styles.inputIcon} />
                        <TextInput
                            placeholder="Contraseña"
                            placeholderTextColor="#aaa"
                            value={contraseña}
                            onChangeText={setPassword}
                            style={[styles.input, { flex: 1 }]}
                            secureTextEntry={!showPassword}
                        />
                        <Pressable onPress={() => setShowPassword(!showPassword)}>
                            <MaterialIcons
                                name={showPassword ? "visibility" : "visibility-off"}
                                size={20}
                                color="#3433CD"
                            />
                        </Pressable>
                    </View>

                    {/* Repetir contraseña */}
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock-outline" size={20} color="#3433CD" style={styles.inputIcon} />
                        <TextInput
                            placeholder="Repite la contraseña"
                            placeholderTextColor="#aaa"
                            value={contraseña2}
                            onChangeText={setPassword2}
                            style={[styles.input, { flex: 1 }]}
                            secureTextEntry={!showPassword2}
                        />
                        <Pressable onPress={() => setShowPassword2(!showPassword2)}>
                            <MaterialIcons
                                name={showPassword2 ? "visibility" : "visibility-off"}
                                size={20}
                                color="#3433CD"
                            />
                        </Pressable>
                    </View>

                    {/* Botón de registro */}
                    <CustomButton 
                        title="Registrarme" 
                        onPress={registro} 
                        style={styles.registerButton}
                        textStyle={styles.registerButtonText}
                    />
                </View>

                {/* Enlace a login */}
                <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
                    <Pressable onPress={() => router.push("/login")}>
                        <Text style={styles.loginLink}>Inicia Sesión</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerDecoration: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 200,
        overflow: 'hidden',
    },
    circle1: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#3333cdef',
    },
    circle2: {
        position: 'absolute',
        top: 30,
        left: -30,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#3333cd',
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        marginBottom: 30,
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
        maxWidth: 350,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#180db975',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#ffffff',
        height: 56,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 17,
        color: '#00000098',
        
    },
    registerButton: {
        backgroundColor: '#3433CD',
        borderRadius: 16,
        height: 56,
        shadowColor: '#3433CD',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginTop: 10,
        marginBottom: 20,
    },
    registerButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    loginText: {
        color: '#888',
        fontSize: 14,
    },
    loginLink: {
        color: '#3433CD',
        fontSize: 14,
        fontWeight: '600',
    },
});