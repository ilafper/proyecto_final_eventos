
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
//importante siempre en los hooks o como se llamen que empoiece por usetatata por que si no no los reconoce, me daba todo null, acuerdate ivan del futuro
export default function useDatosUsuario() {
  const [usuario, setUsuario] = useState<{ nombre: string; apellidos:string; code_user:string; correo: string; rol: string }>();

  useEffect(() => {
    const cargarUsuario = async () => {
      const usuarioGuardado = await AsyncStorage.getItem("usuario");
      if (usuarioGuardado) {
        setUsuario(JSON.parse(usuarioGuardado));
      }
    };
    cargarUsuario();
  }, []);

  return usuario;
}
