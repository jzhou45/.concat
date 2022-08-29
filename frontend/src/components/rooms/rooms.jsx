import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import LoadingContainer from '../util/loading_container'
import RoomItemContainer from './room_item'
import Logo from '../../assets/images/concat_logo.png'

const RoomsPageContainer = (props) => {

    const currentUser = props.currentUser.username
    // change everything with currentUser to currentUser.username

    // const { fetchUserRooms, currentUser } = props
    
    // const [loading, setLoading] = useState(true)

    // useEffect( () => {
    //     fetchUserRooms(user).finally(() => setLoading(false))
    // }, [])
    
    const content = () => {
        return (
            <div className="rooms-page-container">
                <div className='rooms-header'>
                    <div className="rooms-header-title">
                        {`${currentUser}'s rooms`}
                    </div>
                </div>
                <div className='rooms-container'>
                    <div className='rooms'>
                        {<RoomItemContainer roomName={"Personal Room "} roomPhotoUrl={"default"} currentUser={currentUser}/>}
                        {<RoomItemContainer roomName={"testing"} roomPhotoUrl={ "https://fs-pinteresting-dev.s3.amazonaws.com/png/01.png"}/> }
                        {<RoomItemContainer roomName={"Create Room"}/>}
                    </div>
                </div>
            </div>
        )
    }

    // return loading ? <LoadingContainer/> : content()
    return content()
}

const mSTP = ({session: {user}}) => {
    return {
        currentUser: user
    }
}

// const mDTP = (dispatch) => {
//     fetchUserRooms: (user) => dispatch(fetchUserRooms(user))
// }

export default connect(mSTP, null)(RoomsPageContainer)
