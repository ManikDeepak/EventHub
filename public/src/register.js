import styled from "styled-components"
import { useState } from "react"
import background from "./images/loginBg.jpg"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { registerRoute } from "./utils/APIRoutes"
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'; 


const Register = () => {
    const navigate= useNavigate()
    const [Value, setValue] = useState({})

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

    const handleChange = (event) => {
        setValue({...Value,[event.target.name]:event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleValidation()){

            const {username,phone,email,password} = Value
            const response = await axios.post(registerRoute,{
                username,phone,email,password
            })
            if(response.status === 201){
                navigate("/login")
            }else{

                const answer = JSON.parse(response.data)
                toast.error(answer.msg, toastOptions)
            }
            
        }
    }
    
    const handleValidation = () => {
        const {username, phone,password,confirmPassword} = Value
        if(username.length < 3){
            toast.error("Name must be atlest 3 letters long", toastOptions)
            return false
        }
        if(password !== confirmPassword){
            toast.error("Password and Confirm Password do not match", toastOptions)
            return false
        }
        if(password.length < 8){
            toast.error("Password must be atleast of 8 characters", toastOptions)
            return false
        }
        if(phone.length !== 10){
            toast.error("enter a valid phone number", toastOptions)
            return false
        }
        return true
    }

    return (
        <Container>
            <div className="form">

            <div className="header"><Link to="/">EventHub</Link></div>
            <h1>Register</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="username" placeholder="Username" onChange={(e) => handleChange(e)} />
            <input type="digit" name="phone" placeholder="Phone Number" onChange={(e) => handleChange(e)}/>
            <input type="email" name="email" placeholder="Email id" onChange={(e) => handleChange(e)}/>
            <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)}/>
            <input type="text" name="confirmPassword" placeholder="Confirm Password" onChange={(e) => handleChange(e)}/>
            <button className="btn">Submit</button>
        </form>
        <div className="login">
            Already a user? <Link to="/login">Login</Link> 
        </div>
            </div>
            <ToastContainer />
        </Container>
    )
}

const Container = styled.div`
background:url(${background});
background-size:cover;
background-position:center;
height:100vh;
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
.form{
    padding:20px;
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
    form{
        width:100%;
    }
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
        form{
            display:flex;
            flex-direction:column;
            align-items:center;
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
        .btn{
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
            transform: scale(1.2);  
        }

    }
}
.login{
    color:white;
    a{
        color:white;
        text-decoration:none;
    }
    padding-bottom:10px;
}

`

export default Register