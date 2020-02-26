import React, { useState } from 'react'
import Button from '../components/normalButton'
import TextButton from '../components/textButton'
import '../assets/css/login.css'
import TextInput from "../components/TextInput"
import Card from "../components/Card"
import { useHistory } from "react-router-dom"



const Login = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    

    const handleUsername = e => {
        setUsername(e.target.value);
    }
    const handlePassword = e => {
        setPassword(e.target.value);
    }

    //console.log(username,password)

    return(
        <Card >
            <TextInput 
                label="Usuario"
                value={username}
                change={handleUsername}
            />
            <TextInput
                password 
                label="Contraseña"
                value={password}
                change={handlePassword}
            />            
            <Button darkmode click={ () => {
                
            } }>
               Iniciar Sesión
            </Button>
            <div className='column'>
                <TextButton click={ () => {
                
            } }>
                    Olvidé mi contraseña
                </TextButton>
                <div className="below-line" />
                <TextButton click={ () => {
                history.push("/register")
            } }>
                    ¿No tienes una cuenta?
                </TextButton>
            </div>
           <div className='row'>
           <Button  click={ () => {
                
            } }>
               Iniciar con Google
            </Button>
            <Button darkmode click={ () => {
                history.push("/register")
            } }>
               Crear cuenta
            </Button>
           </div>

           
        </Card>
    )
}

export default Login