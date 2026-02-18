import api from "./config";

export const eventosApi = {
  getEventos: async () => {
    try {
      const respuesta = await api.get("/api/eventos");
        console.log(respuesta);
      return {
        success: true,
        eventos: respuesta.data.todos_eventos,
      };
      
    } catch (error) {
      console.log("Error al obtener eventos:", error.response?.data);

      return {
        success: false,
        data: [],
        error: error.response?.data?.message || "Error carga eventos",
      };
    }
  },
};
