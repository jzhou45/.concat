import React from 'react'
import logo from '../../assets/images/concat_logo.png'
// import logout
import { connect } from 'react-redux'

const LoggedInNav = ({currentUser}) => {

    // const handleLogout = () => {
    //     logout()
    // }

    const content = () => {
        return (
            <div className='logged-in-nav-container'>
                <div className='logged-in-nav-header'>
                    <img src={logo} alt="" />
                    <h1>.concat</h1>
                    <div className="logged-in-nav-user">
                        <h1>Welcome {currentUser} </h1>
                    </div>
                    <div className='logout-button'>
                        <div>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return content()
}

// const mSTP = ({session, entities: {users}}) => {
//     currentUser: users[session.id]
// }

// const mDTP = (dispatch) => {
//     logout: () => dispatch(logout)
// }

// export default connect(mSTP, mDTP)(LoggedInNav)
export default LoggedInNav

