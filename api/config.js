//conexion a la api de express
import axios from "axios";
// direccion api, tengo que colocar la ip local de mi esquipo y cambiar en la api que en vez de local host que escuche de todas pero no entiendia por que ya estaba en la misma red
const mi_api = "http://192.168.0.54:3000/";

const api = axios.create({
  baseURL: mi_api,
  timeout: 10000,
});

//usarlo en otros archivos
export default api;
