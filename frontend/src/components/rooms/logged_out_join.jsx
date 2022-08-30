import { connect } from 'react-redux'
import SplashContainer from '../splash/splash'

const LoggedOutJoinContainer = (props) => {

    const {path, roomId} = props

    return <SplashContainer joinPath={path} roomId={roomId}/>
}

export default connect(null, null)(LoggedOutJoinContainer)