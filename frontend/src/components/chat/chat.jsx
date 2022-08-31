import React, {useState, useEffect} from "react"
import io from 'socket.io-client'

const socket = io('http://localhost:3000')
// const socket = io('https://concat-mern.herokuapp.com')

const userName = 'User ' + parseInt(Math.random()*10)

const Chat = () => {

    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])

    useEffect(() => {
        socket.on('message', payload => {
            setChat([...chat, payload])
        })
    })

    const sendMessage = (e) => {
        e.preventDefault()
        console.log(message)
        socket.emit('message',{userName, message})
        setMessage('')
    }

    return (
        <div>
            {chat.map((payload, index) => {
                return (
                    <div key={index}>{payload.userName}<span>{payload.message}</span></div>
                )
            })}
            <form onSubmit={sendMessage}>
                <input type="text" 
                name="message" 
                placeholder="Type Message" 
                value={message}
                onChange={(e) => {setMessage(e.target.value)}}/>
                <button type="">Send</button>
            </form>
        </div>
    )
}

export default Chat 