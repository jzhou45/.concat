import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import LoadingContainer from '../util/loading_container'
import RoomItemContainer from './room_item'
import { fetchRooms } from '../../actions/room_actions'
import { openModal } from '../../actions/modal_actions'
import SearchIcon from '../../assets/images/search-icon.png'
import ProgressTracker from '../progress_tracker/progress_tracker'

const RoomsPageContainer = (props) => {

    const currentUser = props.currentUser.username

    const { fetchRooms, rooms, openModal} = props

    const [query, setQuery] = useState('')
    const updateQuery = (e) => {
        setQuery(e.currentTarget.value)
    }

    useEffect( () => {
        fetchRooms().finally(() => setLoading(false))
    }, [query])
        
    const [loading, setLoading] = useState(true)

    const userRooms = Object.keys(rooms).map((roomId) => rooms[roomId])

    const handleCreateClick = (e) => {
        e.preventDefault()
        openModal("createroom")
    }
    
    const content = () => {
        return (
            <div className="rooms-page-container">
                <ProgressTracker/>
                <div className='rooms-header'>
                    <div className="rooms-header-title">
                        {`${currentUser}'s rooms`}
                    </div>
                </div>
                <div className='rooms-container'>
                    <div className='search-bar'>
                        <input type="text" onChange={updateQuery} placeholder="Find room"/>
                        <img className="magnifying-glass" src={SearchIcon} alt="" />
                    </div>
                    <div className='rooms'>
                        {userRooms.map((room, i) => <RoomItemContainer 
                            key={i}
                            currentUser={currentUser}
                            room={room}
                            query={query
                            }
                            /> )}
                        <div onClick={handleCreateClick}>
                            {<RoomItemContainer query={query} room={"Create Room"}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return loading ? <LoadingContainer/> : content()
}

const mSTP = ({session: {user}, rooms}) => {
    return {
        currentUser: user, 
        rooms
    }
}

const mDTP = (dispatch) => {
    return {
        fetchRooms: () => dispatch(fetchRooms()), 
        openModal: (formType) => dispatch(openModal(formType))
    }
}

export default connect(mSTP, mDTP)(RoomsPageContainer)
