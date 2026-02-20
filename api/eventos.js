import api from "./config";

export const eventosApi = {
  getEventos: async () => {
    try {
      const respuesta = await api.get("api/eventos");
      //console.log(respuesta);
      return {
        success: true,
        eventos: respuesta.data.todos_eventos,
      };
    } catch (error) {

      //console.log("Error al obtener eventos:", error.response?.data);

      return {
        success: false,

        error: error.response?.data?.message || "Error carga eventos",
      };
    }
  },

  apuntarseEvento: async (reserva_nueva) => {
    try {
      const respuesta = await api.post("api/crearreserva", { reserva_nueva });
      console.log(respuesta.mensaje);
      return {
        success: true,
        mensaje: respuesta.data.mensaje,
      };
    } catch (error) {
      console.log("Error reservas crear", error.response?.data);

      return {
        success: false,
        error: error.response?.data.error || "Error apuntarse reserva",
      };
    }
  },

  
  //craer eventos nuevo en admin
  crearEvento: async (nuevo_evento) => {
    console.log("nuevo evento en eventos.js", nuevo_evento);

    try {
      const respuesta = await api.post("api/creareventos", nuevo_evento);
      console.log(respuesta.mensaje); 
      return {
        success: true,
        mensaje: respuesta.data.mensaje,
      };
    } catch (error) {
      console.log("Error reservas crear", error.response?.data);

      return {
        success: false,
        error: error.response?.data.error || "Error crear evento",
      };
    }
  },



  eliminarEvento: async (code_evento) => {
    console.log("nuevo evento en eventos.js", code_evento);

    try {
      const respuesta = await api.delete(`/api/eliminarEvento/${code_evento}`);
      console.log(respuesta.mensaje);
      return {
        success: true,
        mensaje: respuesta.data.mensaje,
      };
    } catch (error) {
      console.log("Error reservas crear", error.response?.data);

      return {
        success: false,
        error: error.response?.data.error || "Error crear evento",
      };
    }
  },
};
