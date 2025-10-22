import {useState} from "react";
import {Button, Container, TextField, Typography} from "@mui/material";
import {useAuthStore} from "../services/useAuthStore";
import {useNavigate} from "react-router-dom";

//TODO LEARN
function Register() {

  const Auth = useAuthStore()
  const nav = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  function handleRegister() {
    Auth.register(username, password).then(r => {
      if (r) setError(r)
    })
  }

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>

      <Typography variant={'h3'} component={'h1'}>
        Register Screen
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

      <Button onClick={handleRegister} variant={'contained'}>
        Register
      </Button>

      <Button onClick={() => nav('/login')}>
        Back to login
      </Button>

    </Container>
  );
}

export default Register;