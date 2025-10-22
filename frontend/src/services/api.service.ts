import axios from "axios";
import {API_URL} from "../config";

// Basis-URL aus Umgebungsvariable oder Fallback
const API_BASE_URL = API_URL;

// Axios-Instanz mit voreingestellten Optionen - Stub
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  //TODO LEARN GANZ WICHTIG
  withCredentials: true,
});
