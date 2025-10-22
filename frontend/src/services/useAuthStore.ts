import { create } from "zustand";
import { ISafeUser } from "../models/auth.interfaces";
import {api} from "./api.service";

// Zustand Store Interface
//TODO LEARN
interface AuthState {
  user: ISafeUser | null,
  login: (username: string, password: string) => Promise<string>,
  register: (username: string, password: string) => Promise<string>,
  refresh: () => Promise<boolean>,
  logout: () => Promise<void>,
}

//TODO LEARN
type ErrorResponse = {
  message: string
}

//TODO LEARN
type AuthResponse = {
  user: ISafeUser
}

//TODO LEARN
export const useAuthStore = create<AuthState>((set) => ({

  user: null,

  login: async (username: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {username, password})
      set({user: response.data.user})
      return ""
    } catch (e: any) {
      const errMsg = e.response.data.message ?? JSON.stringify(e)
      console.log(`Error while login: ${errMsg}`)
      return errMsg
    }
  },

  register: async (username: string, password: string) => {
    try {
      await api.post<AuthResponse>('/auth/register', {username, password})
      return ""
    } catch (e: any) {
      const errMsg = e.response.data.message ?? JSON.stringify(e)
      console.log(`Error while register: ${errMsg}`)
      return errMsg
    }
  },

  refresh: async () => {
    try {
      const response = await api.post<AuthResponse>('/auth/refresh', {})
      set({user: response.data.user})
      return true
    } catch (e: any) {
      return false
    }
  },

  logout: async () => {
    await api.post('/auth/logout', {})
    set({user: null})
  },

}))
