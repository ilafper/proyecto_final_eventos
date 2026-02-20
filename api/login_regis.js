import api from "./config";

export const login_register = {
  //funcion para logearte
  login: async (datos_login) => {
    try {
      //peticion al endpoint
      const respuesta = await api.post("api/login", datos_login);
      return {
        success: true,
        message: respuesta.data.message,
        user: respuesta.data.user,
      };
    } catch (error) {
      //en el caso de error con el server o que este caido
      return {
        success: false,
        error: error.response?.data?.message || "Error de conexión",
      };
    }
  },
  // lo mismo pero con el registro, mandamos los datos del formu
  register: async (datos) => {
    try {
      const respuesta = await api.post("api/crearusuario", datos);
      return {
        success: true,
        message: respuesta.data.message,
        user: respuesta.data.message,
      };
    } catch (error) {
      console.log("Error axios:", error.response?.data);
      return {
        success: false,
        error: error.response?.data?.message || "Error en el registro",
      };
    }
  },
};
