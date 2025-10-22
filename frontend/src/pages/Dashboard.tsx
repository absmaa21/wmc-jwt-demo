import React from "react";
import {Button, Container, Typography} from "@mui/material";
import {useAuthStore} from "../services/useAuthStore";

//TODO LEARN
export default function Dashboard() {

  const Auth = useAuthStore()

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>

      <Typography>
        {JSON.stringify(Auth.user)}
      </Typography>

      <Button onClick={Auth.logout}>
        Logout
      </Button>

    </Container>
  )
}
