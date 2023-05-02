import { useEffect, useState } from "react"
import styled from "styled-components"
import { Link, useNavigate} from "react-router-dom"


const Navbar = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if(!localStorage.getItem("user")){
            setIsLoggedIn(false)
        }else{
            setIsLoggedIn(true)
        }
    },[isLoggedIn])
    
    const handleClick =(link) => {
        if(isLoggedIn){
            navigate(`/${link}`)
        }else{
            navigate('/login')
        }
    }

    const Logout = () => {
        localStorage.clear()
        setIsLoggedIn(false)
        navigate('/')
    }

    return (
        <>
            <Container>
                <div className="header"><Link to="/">EventHub</Link></div>
                <div className="search">
                    <span onClick={() => {navigate('/')}}>All Event</span>
                    <span onClick={() => handleClick("myEvent")}>My Event</span>
                    <span onClick={() => handleClick("CreateEvent")}>Create Event</span>
                </div>
                <div className="logDetail">
                    {
                        isLoggedIn ?<div className="profile">
                                <span onClick={() => Logout()}>Logout</span>
                            </div>: <div className="logInOut">
                            <span> <Link to="/login">Login</Link></span>
                            <span><Link to="/register">Register </Link></span>
                        </div>
                            
                    }
                    
                </div>
            </Container>

        </>
    )
}

const Container = styled.div`
// padding: 5px 0px;
display: flex;
flex-direction:row;
justify-content:space-between;
align-items:center;
.header a{
    font-family: 'Sono', sans-serif;
    font-size:30px;
    color:#f05537;
    width:20%;
    padding:0 10px;
    font-weight:700;
    &:hover{
        cursor:pointer;
    }
    text-decoration:none;
}
.search{
    font-family: 'Roboto Slab', serif;

    span{
        text-align:center;
        padding:10px 10px;
        font-weight:700;
        &:hover{
            background-color:whitesmoke;
            cursor:pointer;
        }
    }
    
}
.logDetail{
    width:20%;
    display:flex;
    justify-content:space-around;
    span{
        text-align:center;
        padding:10px 10px;
        font-weight:700;
        a{
            text-decoration:none;
            color:black;
        }
        &:hover{
            background-color:whitesmoke;
            cursor:pointer;
        }
        
}

`

export default Navbar
