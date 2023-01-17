import React, {useState, useEffect, useRef} from "react"
import io from 'socket.io-client'
import SendIcon from '../../assets/images/send-icon.png'
import { connect } from "react-redux"
import { useLocation } from 'react-router-dom'
import { sendMessage } from "../../util/room_api_util"

// const socket = io(process.env.PORT || 'http://localhost:3000')
const socket = io('https://concat.herokuapp.com')

const Chat = (props) => {

    const bottomRef = useRef(null)
    const location = useLocation();
    const roomId = location.pathname.split('/')[2];
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        if (props.rooms && chat.length <= 1) setChat(chat.concat(props.rooms[roomId]?.messages));
    }, [props.rooms])

    const addMessage = payload => {
        if (chat && roomId === payload.roomId) setChat([...chat, payload.message]);
    }
    
    useEffect(() => {
        socket.on('message', payload => addMessage(payload));
        socket.on('joinRoom', payload => addMessage(payload));
        socket.on('leaveRoom', payload => addMessage(payload));
        
        return () => {
            socket.off('message');
            socket.off('joinRoom');
            socket.off('leaveRoom');
        }
    });

    useEffect(() => {
        socket.emit('joinRoom', {
            message: {
                log: [props.username, "joined the room"],
                timestamp: new Date()
            },
            roomId
        });

        return () => socket.emit('leaveRoom', {
            message: {
                log: [props.username, "left the room"],
                timestamp: new Date()
            },
            roomId
        });
    }, []);
    
    useEffect( () => {
        bottomRef.current?.scrollIntoView({behavior:'smooth'})
    }, [chat]);

    const updateMessage = (e) => {
        setMessage(e.currentTarget.value)
        setTyping(e.currentTarget.value !=="")
    }

    const messageSubmit = (e) => {
        e.preventDefault()
        if (message.trim().length > 0) {
            const messageObj = { username: props.username, message, timestamp: new Date() };
            socket.emit('message', { message: messageObj, roomId });
            sendMessage(roomId, messageObj);
            setMessage('');
        }
    }

    const getTime = (dateObject) => {
        if (!dateObject) return 
        let newDateObject = dateObject;
        if (typeof dateObject === 'string') {
            newDateObject = new Date(dateObject)
        }
        return newDateObject.toLocaleDateString([], {hour: '2-digit', minute: '2-digit'}).split(',')[1]
    }

    if (chat) return (
        <div className="websocket-container">
            <div className="messages">
                <div className="messages-text">
                    {chat.map((message, index) => {
                        if (message?.log) return (
                            <div className="chat-log" key={index}>
                                <div className="chat-blue">
                                    {message.log[0]}
                                </div>
                                <div className="log chat-timestamp">
                                    {getTime(message?.timestamp)}
                                </div>
                                <div>
                                    {message.log[1]}
                                </div>
                            </div>
                        )
                        else return (
                            <div className="chat-line" key={index}>
                                <div className="chat-user">
                                    {message?.username}
                                </div>
                                <div className="chat-message">
                                    {message?.message}
                                </div>
                                <div className="chat-timestamp">
                                    {getTime(message?.timestamp)}
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
