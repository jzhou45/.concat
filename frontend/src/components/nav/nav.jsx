import React from 'react'
import logo from '../../assets/images/concat_logo.png'
import { logout } from '../../actions/session_actions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Chat from '../chat/chat'
import { useLocation } from 'react-router-dom'

const LoggedInNav = (props) => {
    
    const {currentUser, rooms} = props

    const history = useHistory()
    const location = useLocation()

    const currentUsersUsername = currentUser?.username

    const handleLogout = (e) => {
        e.preventDefault()
        props.logout()
        history.push('/')
    }

    const roomIsUsers = () => {
        if (location.pathname === "/rooms") return false
        const roomId = location.pathname.split('/')[2];
        return rooms[roomId].solo;
    }

    const content = () => {
        return (
            <div className='logged-in-nav-container'>
                <div className='logged-in-nav-header'>
                    <img src={logo} alt="" />
                    <h1>.concat</h1>
                    <div className="logged-in-nav-user">
                        <h1>why hello {currentUsersUsername} </h1>
                    </div>
                    <div onClick={handleLogout} className='logout-button'>
                        <div>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const chat = () => {
        return (
            <div className='websocket logged-in-nav-container'>
                <div className='websocket logged-in-nav-header'>
                    <img src={logo} alt="" />
                    <h1>.concat</h1>
                </div>
                <div className='chat-container'>
                    <Chat/>
                </div>
            </div>
        )
    }

    if (Object.keys(rooms).length > 0) return currentUsersUsername ? location.pathname !== "/rooms" && !roomIsUsers() ? chat() : content() : ""
}

const mSTP = ({session: {user}, rooms}) => {
    return {
        currentUser: user,
        rooms
    }
}

const mDTP = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mSTP, mDTP)(LoggedInNav)

