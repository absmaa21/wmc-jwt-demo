import axios from "axios";
import {API_URL} from "../config";

/*
//TODO: Projektbezogen Anpassen
New Axio Stub / Proxy
 */
// Basis-URL aus Umgebungsvariable oder Fallback
const API_BASE_URL = API_URL;

const token = "";

// Axios-Instanz mit voreingestellten Optionen - Stub
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});
