import React, {useState, useEffect, useRef} from "react"
import io from 'socket.io-client'
import SendIcon from '../../assets/images/send-icon.png'
import { connect } from "react-redux"

const socket = io(process.env.PORT || 'http://localhost:3000')
// const socket = io('https://concat-mern.herokuapp.com')

const Chat = (props) => {

    const userName = props.currentUser.username
    const bottomRef = useRef(null)
    
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const [typing, setTyping] = useState(false)
    
    useEffect(() => {
        socket.on('message', payload => {
            setChat([...chat, payload])
        })
        
        return () => socket.off('message')
    })
    
    useEffect( () => {
        bottomRef.current?.scrollIntoView({behavior:'smooth'})
    }, [chat])
    const updateMessage = (e) => {
        setMessage(e.currentTarget.value)
        setTyping(e.currentTarget.value !=="")
    }

    const sendMessage = (e) => {
        e.preventDefault()
        if (message.trim().length > 0) {
            socket.emit('message',{userName, message})
        }
        setMessage('')
    }

    const content = () => {
        return (
            <div className="websocket-container">
                <div className="messages">
                    <div className="messages-text">
                        {chat.map((payload, index) => {
                            return (
                                <div className="chat-line" key={index}>
                                    <div className="chat-user">
                                        {payload.userName}
                                    </div>
                                    <div className="chat-message">
                                        {payload.message}
                                    </div>
                                </div>
                            )
                        })}
                        <div ref={bottomRef} className="bottom-of-div"></div>
                    </div>
                </div>
                <form className="message-form" onSubmit={sendMessage}>
                    <input type="text" 
                    name="message" 
                    placeholder="Type Message" 
                    value={message}
                    className="message-input"
                    autoComplete="off"
                    onChange={updateMessage}
                    />
                    <button className={`${typing ? "" : "hide"}`}type="">
                        <img src={SendIcon} alt="" />
                    </button>
                </form>
            </div>
        )
    }
    
    return content()
}

const mSTP = ({session: {user}}) => {
    return {
        currentUser: user
    }
}

export default connect(mSTP, null)(Chat)