import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import RoomErrorsReducer from './room_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer, 
  room: RoomErrorsReducer
});