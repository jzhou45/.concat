import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import LoadingContainer from '../util/loading_container'
import RoomItemContainer from './room_item'

const RoomsPageContainer = (props) => {

    const currentUser = "deborah"

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

// const mSTp = ({sessions, entities: {users}}) => {
//     currentUser: users[sessions.id]
// }

// const mDTP = (dispatch) => {
//     fetchUserRooms: (user) => dispatch(fetchUserRooms(user))
// }

export default connect(null, null)(RoomsPageContainer)
