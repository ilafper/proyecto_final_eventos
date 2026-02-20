import api from "./config";

export const reservasApi = {
  getReservas: async (code_usuario) => {
    try {
      const respuesta = await api.get(`api/reservas/usuario/${code_usuario}`);
        //console.log(respuesta);
      return {
        success: true,
        reservas: respuesta.data.reservas,
      };
      
    } catch (error) {
      //console.log("Error al obtener eventos:", error.response?.data);

      return {
        success: false,
        data: [],
        error: error.response?.data.error || "Error carga reservas",
      };
    }
  }, 

  CancelarReserva: async (code_reserva) => {
    try {
      const respuesta = await api.put(`/api/cancelarreserva/usuario/${code_reserva}`);
      //console.log(respuesta);
      return {
        success: true,
        mensage: respuesta.message,
      };

    } catch (error) {
      //console.log("Error al obtener eventos:", error.response?.data);

      return {
        success: false,
        error: error.response?.data.error || "Error cancerlar reserva",
      };
    }
  },

  reservasEvento: async (code_evento) => {
    try {
      const respuesta = await api.get(`api/reservas/eventos/${code_evento}`);
        //console.log(respuesta);
      return {
        success: true,
        reservas: respuesta.data.reservas,
      };
      
    } catch (error) {
      //console.log("Error al obtener eventos:", error.response?.data);

      return {
        success: false,
        data: [],
        error: error.response?.data.error || "Error carga reservas del evento",
      };
    }
  },

};
