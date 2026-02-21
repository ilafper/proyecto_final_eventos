import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { login_register } from "../api/login_regis";
import CustomButton from "../components/botonBoton";

export default function LoginView() {
    const [correo, setEmail] = useState("");
    const [contraseña, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const login = async () => {
        const datos_login = { correo, contraseña };
        const res = await login_register.login(datos_login);
        
        if (res.success) {
            Alert.alert("Éxito", res.message);
            let usuario = res.user;
            await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
            
            if (usuario.rol === "user") {
                router.push('/home');
            } else if (usuario.rol === "admin") {
                router.push('/admin');
            }
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
                <Text style={styles.welcomeText}>¡Bienvenido!</Text>
                <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

                {/* Formulario */}
                <View style={styles.formContainer}>
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

                    {/* Olvidé contraseña */}
                    <Pressable style={styles.forgotContainer}>
                        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
                    </Pressable>

                    {/* Botón de login */}
                    <CustomButton 
                        title="Iniciar sesión" 
                        onPress={login} 
                        style={styles.loginButton}
                        textStyle={styles.loginButtonText}
                    />

                   

                    
                </View>

                {/* Registro */}
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>¿No tienes cuenta? </Text>
                    <Pressable onPress={() => router.push("/registro")}>
                        <Text style={styles.registerLink}>Regístrate</Text>
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
        top: 40,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#3433CD',
    },
    circle2: {
        position: 'absolute',
        top: 30,
        left: -30,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#3433CD',
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 60,
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
        marginBottom: 40,
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
    forgotContainer: {
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    forgotText: {
        color: '#3433CD',
        fontSize: 14,
        fontWeight: '500',
    },
    loginButton: {
        backgroundColor: '#3433CD',
        borderRadius: 16,
        height: 56,
        shadowColor: '#3433CD',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 24,
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e0e0e0',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#888',
        fontSize: 13,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    socialButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    registerText: {
        color: '#888',
        fontSize: 14,
    },
    registerLink: {
        color: '#3433CD',
        fontSize: 14,
        fontWeight: '600',
    },
});