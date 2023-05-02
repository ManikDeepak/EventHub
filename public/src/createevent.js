import styled from "styled-components"
import Navbar from "./Navbar"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import demoImage from './images/demoImage.jpg' 
import { createRoute } from "./utils/APIRoutes";
import axios from "axios"

const CreateEvent = () => {
    const allowedFile = ["image/png", "image/jpeg", "image/jpg"]
    const username = JSON.parse(localStorage.getItem("user")).username
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
    const [Image, setImage] = useState(null)
    const [Value, setValue] = useState({})

    const handleFileChange = ( event ) => {
        const file = event.target.files[0]
        if(allowedFile.includes(file.type)){
            setImage(event.target.files[0])

        }else{
            toast.error("Please Choose a valid file",toastOptions)
        }
    }
    
    const handleChange = (event) => {
        setValue({...Value,[event.target.name]:event.target.value})
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        const { event_name, event_desc, date, time, location } = Value
        const image = Image
        if(event_name && event_desc && date && time && location && image){
            const formData = new FormData()
            formData.append("event_name",event_name)
            formData.append("event_desc",event_desc)
            formData.append("date",date)
            formData.append("time",time)
            formData.append("location",location)
            formData.append("image",image)
            formData.append("username",username)
            const response = await axios.post(createRoute, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if(response.status){
                toast.success("Event Created Successfully",toastOptions)
                setImage(null)
                setValue({})
            }else{
                toast.error("Something went wrong",toastOptions)
            }
        }else{
            toast.error("Please enter all the fields")
        }

    }

    return (
        <>
        <Navbar />
        <Container>
            <h1>Create Your Event</h1>
            <div className="form">
                <input type="text" name="event_name" placeholder="Event Name" onChange={(e) => handleChange(e)} required/>
                <input type="date" name="date"onChange={(e) => handleChange(e)} required/>
                <input type="time" name="time"onChange={(e) => handleChange(e)} required/>
                <input type="text" name="location" placeholder="Location"onChange={(e) => handleChange(e)}required />
                <input type="text" name="event_desc" placeholder="Event description"onChange={(e) => handleChange(e)}required />
                <label htmlFor="">Event Banner</label>
                <input type="file" onChange={(e) => handleFileChange(e)} accept="image/png, image/jpeg, image/jpg" multiple={false}required/>
                    
            </div>
            <div className="card">
                    <img src={Image ? URL.createObjectURL(Image):demoImage } alt="" />
                    <div className="props">

                    <p className="title">{Value["event_name"] ? Value["event_name"] : "Title Here" }</p>
                    <p className="description">{Value["desc"] ? Value["desc"] : "Description Here"}</p>
                    <div className="meta">

                    <p className="date">{Value["date"] ? Value["date"] : "22/07/2001"}</p>
                    <p className="location">{Value["location"] ? Value["location"] : "Location Here"}</p>
                    <p className="time">{Value["time"] ? Value["time"] : "12:00"}</p>
                    </div>
                    </div>
            </div>
            <button className="submitBtn" onClick={handleSubmit}>Create</button>
        </Container>
        <ToastContainer />
        </>
    )
}

const Container = styled.div`
position:absolute;
height:100vh;
width:80%;
left:10%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:flex-start;
.form{
    height:25vh;
    display:flex;
    flex-direction:row;
    align-items:center;
    width:80%;
    flex-wrap:wrap;
    input,label{
        margin-right:10px;
        text-align:center;
    }
}
.card{
    display:flex;
    flex-direction:row;    
    height:40vh;
    background:rgb(253 247 247);
    border:none;
    border-radius:10px;
    
    img{
        
        padding:10px;
        aspest-ratio:16/9;
        width:40%;
    }
    .props{
        width:60%;
        display:flex;
        flex-direction:column;
        align-items:flex-start;
         & >p,div{
            margin:10px 0;
         }
        .title{
            font-weight:700;
            font-size:30px;
        }
        .description{
            font-size:20px;
            color:rgb(61 59 59);
        }
        .meta{
            display:flex;
            flex-direction:row;
            align-items:flex-start;
            justify-content:flex-start;
            width:100%;
            font-weight:700;
            p{
                margin-right:20px;
                color:rgb(61 59 59);
            }
        }
    }
}
.submitBtn{
    background:#f05537;
    border:none;
    border-radius:10px;
    width:100px;
    aspect-ratio:20/10;
    color:white;
    font-weight:700;
    font-size:18px;
    margin:10px;
    transition: 0.1s ease-in;
    &:hover{
        cursor:pointer;
        transform:scale(1.2);
    }
}
`

export default CreateEvent