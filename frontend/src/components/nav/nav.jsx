import React from 'react'
import logo from '../../assets/images/concat_logo.png'
import { logout } from '../../actions/session_actions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const LoggedInNav = (props) => {

    const currentUser = props.currentUser?.username
    const history = useHistory()

    const handleLogout = (e) => {
        e.preventDefault()
        props.logout()
        history.push('/')
    }

    const content = () => {
        return (
            <div className='logged-in-nav-container'>
                <div className='logged-in-nav-header'>
                    <img src={logo} alt="" />
                    <h1>.concat</h1>
                    <div className="logged-in-nav-user">
                        <h1>Welcome {currentUser} </h1>
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

    return currentUser ? content() : ""
}

const mSTP = ({session: {user}}) => {
    return {
        currentUser: user
    }
}

const mDTP = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mSTP, mDTP)(LoggedInNav)

