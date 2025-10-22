import {BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Register from "./pages/Register";
import Login from "./pages/Login";
import {useEffect} from "react";
import {useAuthStore} from "./services/useAuthStore";

//TODO LEARN
export default function App() {

  const Auth = useAuthStore()
  const nav = useNavigate()

  function isAuthPage() {
    return location.pathname.includes('login') || location.pathname.includes('register')
  }

  useEffect(() => {
    if (Auth.user) {
      if (isAuthPage()) nav('/')
    } else {
      Auth.refresh().then(r => {
        if (!r) nav('/login')
      })
    }
  }, [Auth.user]);

  return (
    <Routes>
      <Route index element={<Navigate to={'/dashboard'}/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}
