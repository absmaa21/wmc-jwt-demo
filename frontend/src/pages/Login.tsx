import {useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import {useAuthStore} from "../services/useAuthStore";
import {useNavigate} from "react-router-dom";

//TODO LEARN
function Login() {

  const Auth = useAuthStore()
  const nav = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  function handleLogin() {
    Auth.login(username, password).then(r => {
      if (r) setError(r)
    })
  }

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>

      <Typography variant={'h3'} component={'h1'}>
        Login Screen
      </Typography>

      <TextField value={username} label={'Username'} onChange={e => {
        setUsername(e.target.value)
        setError('')
      }} />

      <TextField type={'password'} value={password} label={'Password'} onChange={e => {
        setPassword(e.target.value)
        setError('')
      }} />

      <Typography variant={'caption'} color={'error'}>
        {error}
      </Typography>

      <Button onClick={handleLogin} variant={'contained'}>
        Login
      </Button>

      <Button onClick={() => nav('/register')}>
        Register an account
      </Button>

    </Container>
  );
}

export default Login;