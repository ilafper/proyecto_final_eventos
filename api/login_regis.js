import api from "./config";



export const login_register = {
    login: async (datos_login) => {
        try {
            const respuesta = await api.post('api/login', datos_login);
            return {
                success: true,
                message: respuesta.data.message,
                user:respuesta.data.user
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error de conexión'
            };
        }
    },

    register: async (datos) => {
  try {
    const respuesta = await api.post('api/crearusuario', datos);
    return {
      success: true,
      message: respuesta.data.message,
      user:respuesta.data.message
    };
  } catch (error) {
    console.log("Error axios:", error.response?.data);
    return {
      success: false,
      error: error.response?.data?.message || 'Error en el registro'
    };
  }
}


};