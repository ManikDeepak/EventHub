import axios from "axios"
import {useState} from 'react'
import { loginRoute } from "./utils/APIRoutes"

const Testform = () => {

    const [value, setValue] = useState()

    const handleChange = (event)=>{
        setValue({...value,[event.target.name]:event.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {username,password} = value
        const response = await axios.post(loginRoute,{
            username,password
        })
        console.log(response.data.status)
        const answer = JSON.parse(response.data.result)
        console.log(answer["0"]['fields']['username'])
    }

    return(
        <>
        <input type="text" name="username" onChange={(e)=>handleChange(e)} />
        <input type="text" name="password" onChange={(e)=>handleChange(e)} />
        <button onClick={(e) => handleSubmit(e)}>submit</button>
        </>
    )
}

export default Testform