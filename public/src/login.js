import styled from "styled-components"
import background  from "./images/loginBg.jpg"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { loginRoute } from "./utils/APIRoutes"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'; 


const Login = () => {
    const navigate = useNavigate()

    const [Value, setValue] = useState()
    const toastOptions = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }

    const handleChange = (e) =>{
        setValue({...Value,[e.target.name]:e.target.value})
    }
    

    const handleSubmit = async(event) => {
        event.preventDefault()
        const { username, password } = Value
        const response = await axios.post(loginRoute, {
            username, password
        })
        if(response.data.status){

            const answer = JSON.parse(response.data.result)
            localStorage.setItem("user", JSON.stringify(answer["0"]['fields']))
            navigate("/")
        }else{
            const answer = JSON.parse(response.data)
            toast.error(answer.msg,toastOptions)

        }
        
    }
    
    return (
        <Container>
        <div className="form">
            <div className="header"><Link to="/">EventHub</Link></div>
            <h2>Log In</h2>
            <input type="text" name="username" placeholder="Username" onChange={(e)=>handleChange(e)}/>
            <input type="password" name="password" placeholder="Password" onChange={(e)=>handleChange(e)}/>
            <button className="loginBtn" onClick={(e) => handleSubmit(e)}>Log in</button>
            <hr />
            <button>Sign in With Google</button>
            <button>Sign in With Facebook</button>
            <div className="login">
                New User? <Link to="/register">Register</Link>
            </div>

        </div>
        <ToastContainer />
        </Container>
    )
}

const Container = styled.div`
background:url(${background});
height:100vh;
background-size:cover;
.form{
    .login{
    color:white;
    a{
        color:white;
        text-decoration:none;
    }
    padding-bottom:10px;
}
    .header a{
    font-family: 'Sono', sans-serif;
    font-size:45px;
    color:#f05537;
    width:20%;
    padding:0 10px;
    font-weight:700;
    &:hover{
        cursor:pointer;
    }
    text-decoration:none;
}
    display: flex;
    flex-direction:column;
    width:30%;
    align-items:center;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    border:none;
    border-radius:10px;
    background: linear-gradient(rgba(255,255,255,0.4),rgba(255,255,255,0.4));
    input{
        margin: 10px 0;
        text-align:center;
        width:70%;
        height:30px;
        border:none;
        &:focus{
            border:1px solid blue;

        }
    }
    button{
        width:70%;
        height:40px;
        margin:10px 0;
        background:linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8));
        color:rgb(79 77 100);
        border:none;
        font-weight:700;
        border-radius:2px;
        transition: 0.1s ease-in;
        &:hover{
            color:black;
            cursor:pointer;
        }
    }
    .loginBtn{
        width:70%;
        height:30px;
        margin: 10px 0;
        background:#f05537;
        color:white;
        font-weight:700;
        border:none;
        border-radius:8px;
        &:hover{
            color:white;
            cursor:pointer;
        }

    }
}

`

export default Login