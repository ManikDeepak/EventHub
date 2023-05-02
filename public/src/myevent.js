import Navbar from "./Navbar"
import axios from "axios"
import { addLikeRoute, deleteLikeRoute, getMyEventRoute, getMyIdRoute, getMyLikesRoute } from "./utils/APIRoutes"
import { useEffect, useState } from "react"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from "styled-components";


const EventCard = (props) => {
    return(
        <Component>
            <div className="card">
                <img src={props.image} alt="" />
                <div className="props">

                    <p className="title">{props.title}</p>
                    <p className="description">{props.description}</p>
                    <div className="meta">

                        <p className="date">{props.date}</p>
                        <p className="location">{props.location}</p>
                        <p className="time">{props.time}</p>
                    </div>
                    <div className="heart" onClick={props.onEventClick}>

                { props.isLiked ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon style={{ color: 'grey' }} />}
                    </div>
                </div>
            </div>
        </Component>
    )
}

const Myevent = () => {
    const username = JSON.parse(localStorage.getItem("user")).username
    const [Event, setEvent] = useState([])
    const [likedEvents, setlikedEvents] = useState([])
    const [userId,setUserID] = useState()

    const getMyEvent =  () => {
        axios.get(getMyEventRoute,{
            params: {
                username: username
            }
        }).then(response => {
            setEvent(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const getMyLikes = () => {
        axios.get(getMyLikesRoute,{
            params:{
                username:username
            }
        }).then(response => {
            var larray =[]
            for (let i = 0; i < response.data.length; i++) {
                const element = response.data[i];
                larray.push(element["event_id"])
            }
            setlikedEvents(larray)
        }).catch(error => {
            console.log(error)
        })
    }

    const getMyId = () => {
        axios.get(getMyIdRoute,{
            params:{
                username:username
            }
        }).then(response => {
            setUserID(response.data.num)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getMyEvent()
        getMyLikes()
        getMyId()
    },[])

    const handleClick = async(e,event_id) => {
        e.preventDefault()
        if(!likedEvents.includes(event_id)){
            const user_id = userId
            const res = await axios.post(addLikeRoute,{
                user:user_id,
                event:event_id
            })
            
        }else{
            const user_id = userId
            await axios.delete(deleteLikeRoute,{
                params:{
                    user_id,event_id
                }
            })
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })

        }
        getMyLikes()

    }

    return (
        <>
        <Navbar />
        <Container>

        <div className="events">

            {Event.map(event => (
                <div key={event.event_id}>
                    
                    <EventCard onEventClick={(e)=>handleClick(e,event.event_id)} className="event_card" title={event.event_name} description={event.event_desc} date={event.date} time={event.time} location={event.location} isLiked={likedEvents.includes(event.event_id)} image={`http://127.0.0.1:8000${event.image.slice(13)}`} />
                </div>
            ))}
            </div>
            </Container>
        

        </>
    )
}

const Component = styled.div`
.card{
    display:flex;
    flex-direction:row;    
    height:40vh;
    background:rgb(253 247 247);
    border:none;
    border-radius:10px;
    margin:10px;
    margin-bottom:40px;
    
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
        .heart{
            &:hover{
                cursor:pointer;
            }
        }
    }
`

const Container = styled.div`
.events{
    width:80%;
    position:absolute;
    left:10%;
    margin-top:50px;
}
.event_card{
     
}
`

export default Myevent