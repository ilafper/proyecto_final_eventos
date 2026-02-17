
// Este archivo guarda la dirección de tu backend
//conexion a la api de express
import axios from 'axios';

const mi_api = "http://192.168.1.131:3000/";

const api = axios.create({
  baseURL: mi_api,
  timeout: 10000,
});

//usarlo en otros archivos
export default api;