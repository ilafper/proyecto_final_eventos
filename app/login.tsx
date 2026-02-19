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
    
    // funcion para logearse y conectarse con las funciones de axios
    const login = async () => {
        //datos
        const datos_login = {
            correo,
            contraseña
        };
        //funcion del archivo de api
        const res = await login_register.login(datos_login);

        if (res.success) {
            Alert.alert("Exito", res.message);
            let usuario= res.user
            // guardar usuario para usarlo en otras vistas compoentes etc etc , como local stotage en javascript
            await AsyncStorage.setItem("usuario", JSON.stringify(usuario));

            //redirigir segun rol
            console.log(usuario);
            if (usuario.rol==="user") {
                router.push('/home')
            }else if(usuario.rol==="admin"){
                router.push('/admin')
            }
            
        } else {
            Alert.alert("Error", res.error);
        }
    };


    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>Login</Text>
            
            <TextInput
                placeholder="Email"
                value={correo}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

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

            <CustomButton title="Iniciar sesión" onPress={login} />

            <View style={ { marginTop: 10, display:"flex", flexDirection:"row", gap:20 }}>
                <Text>No tienes cuenta?</Text> 
                <Text
                    style={styles.enlace}
                    onPress={() => router.push("/registro")}>
                    Registrate
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
    enlace:{
        color:"blue"
    }
});
