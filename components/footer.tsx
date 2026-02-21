// components/FooterSimple.jsx
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import useDatosUsuario from "../hooks/usuarioDatos";
import CustomButton from './botonBoton';
export default function FooterMovil() {
  const router = useRouter();
  const usuario = useDatosUsuario();
  return (
    <View style={styles.footer}>

      {usuario?.rol === "admin" && (
        <>
          <CustomButton
            title="Inicio"
            onPress={() => router.push("/admin")}
            icon={<MaterialIcons name="home" size={24} color="#B3B4B4" />}
            style={styles.footerButton}
            textStyle={styles.testoEstilo}
          />

          {/* Eventos */}
          <CustomButton
            title="Eventos"
            onPress={() => router.push("/gestionEventos")}
            icon={<MaterialIcons name="event" size={24} color="#B3B4B4" />}
            style={styles.footerButton}
            textStyle={styles.testoEstilo}
          />

          {/* Reservas */}
          <CustomButton
            title="Evento +"
            onPress={() => router.push("/nuevoEventoFormu")}
            icon={<MaterialIcons name="book" size={24} color="#B3B4B4" />}
            style={styles.footerButton}
            textStyle={styles.testoEstilo}
          />
        </>
      )}
      {usuario?.rol === "user" && (
          <>
            <CustomButton
            title="Inicio"
            onPress={() => router.push("/home")}
            icon={<MaterialIcons name="home" size={24} color="#B3B4B4" />}
            style={styles.footerButton}
            textStyle={styles.testoEstilo}
          />

          {/* Eventos */}
          <CustomButton
            title="Eventos"
            onPress={() => router.push("/eventos")}
            icon={<MaterialIcons name="event" size={24} color="#B3B4B4" />}
            style={styles.footerButton}
            textStyle={styles.testoEstilo}
          />

          {/* Reservas */}
          <CustomButton
            title="Reservas"
            onPress={() => router.push("/reservas")}
            icon={<MaterialIcons name="book" size={24} color="#B3B4B4" />}
            style={styles.footerButton}
            textStyle={styles.testoEstilo}
          />
          </>
        )}




      {/* Inicio */}


    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    display:"flex",
    flexDirection: 'row',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 35
  },
  footerButton: {
    backgroundColor: 'transparent',
    padding: 5,
    width: 65,
    height: 60,
    borderRadius: 10,
    flexDirection: 'column', 
  },
  testoEstilo: {
    fontSize: 10,
    color: '#666',
    marginLeft: 0, 
    marginTop: 2,
    textAlign: 'center',
  },
  fabButton: {
    width: 65,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1055a0',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    padding: 5,
    flexDirection: 'column',
  },
  fabtestoEstilo: {
    fontSize: 10,
    color: '#3433CD',
    marginLeft: 0,
    marginTop: 2,
    textAlign: 'center',

  },
});