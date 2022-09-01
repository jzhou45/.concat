import React, {useState, useEffect, useRef} from "react"
import io from 'socket.io-client'
import SendIcon from '../../assets/images/send-icon.png'
import { connect } from "react-redux"
import { useLocation } from 'react-router-dom'
import { sendMessage } from "../../util/room_api_util"

const socket = io(process.env.PORT || 'http://localhost:3000')
// const socket = io('https://concat-mern.herokuapp.com')

const Chat = (props) => {

    const bottomRef = useRef(null)
    const location = useLocation();
    const roomId = location.pathname.split('/')[2];
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState(null);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        if (props.rooms) setChat(props.rooms[roomId].messages);
    }, [props.rooms])
    
    useEffect(() => {
        socket.on('message', payload => {
            if (roomId === payload.roomId) setChat([...chat, payload.message]);
        })
        
        return () => socket.off('message');
    })
    
    useEffect( () => {
        bottomRef.current?.scrollIntoView({behavior:'smooth'})
    }, [chat])
    const updateMessage = (e) => {
        setMessage(e.currentTarget.value)
        setTyping(e.currentTarget.value !=="")
    }

    const messageSubmit = (e) => {
        e.preventDefault()
        if (message.trim().length > 0) {
            const sentMessage = { username: props.username, message };
            socket.emit('message',{ message: sentMessage, roomId });
            sendMessage(roomId, sentMessage);
            setMessage('');
        }
    }

    if (chat) return (
        <div className="websocket-container">
            <div className="messages">
                <div className="messages-text">
                    {chat.map((message, index) => {
                        return (
                            <div className="chat-line" key={index}>
                                <div className="chat-user">
                                    {message.username}
                                </div>
                                <div className="chat-message">
                                    {message.message}
                                </div>
                            </div>
                        )
                    })}
                    <div ref={bottomRef} className="bottom-of-div"></div>
                </div>
            </div>
            <form className="message-form" onSubmit={messageSubmit}>
                <input type="text" 
                name="message" 
                placeholder="Type Message" 
                value={message}
                className="message-input"
                autoComplete="off"
                onChange={updateMessage}
                />
                <button className={`send-message-button ${typing ? "" : "hide"}`} type="">
                    <img src={SendIcon} alt="" />
                </button>
            </form>
        </div>
    )
}

const mSTP = ({session, rooms}) => ({
    username: session.user.username,
    rooms
});

export default connect(mSTP)(Chat);
