import { create } from "zustand";
import { ISafeUser } from "../models/auth.interfaces";
import axios from "axios";
import { AxiosResponse } from "axios";
import {API_URL} from "../config";

// Zustand Store Interface
//TODO: Projektbezogen Anpassen
